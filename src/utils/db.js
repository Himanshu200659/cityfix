/* ============================================
   CITYFIX – Database (Realtime DB) Operations
   ============================================ */

const DB = {
  /**
   * Submit a new complaint
   */
  async submitComplaint(data) {
    try {
      const user = Auth.currentUser;
      if (!user) throw new Error('Not authenticated');

      const complaint = {
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        userEmail: user.email,
        category: data.category,
        title: data.title,
        description: data.description,
        location: data.location || null,
        address: data.address || '',
        priority: data.priority || 'medium',
        imageUrl: data.imageUrl || '',
        status: 'pending',
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        updatedAt: firebase.database.ServerValue.TIMESTAMP,
        statusHistory: [{
          status: 'pending',
          timestamp: new Date().toISOString(),
          note: 'Complaint submitted'
        }],
        resolvedAt: null,
        assignedTo: null,
        escalated: false
      };

      const newRef = rtdb.ref('complaints').push();
      await newRef.set(complaint);
      return newRef.key;
    } catch (error) {
      console.error('Submit Complaint Error:', error);
      throw error;
    }
  },

  /**
   * Get complaints for current user
   */
  async getUserComplaints(userId) {
    try {
      const snapshot = await rtdb.ref('complaints').orderByChild('userId').equalTo(userId).once('value');
      const val = snapshot.val() || {};
      const complaints = Object.keys(val).map(key => ({ id: key, ...val[key] }));
      return complaints.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } catch (error) {
      console.error('Get User Complaints Error:', error);
      return [];
    }
  },

  /**
   * Get all complaints (admin)
   */
  async getAllComplaints(filters = {}) {
    try {
      const snapshot = await rtdb.ref('complaints').once('value');
      const val = snapshot.val() || {};
      let complaints = Object.keys(val).map(key => ({ id: key, ...val[key] }));

      // Sort
      complaints.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

      if (filters.status && filters.status !== 'all') {
        complaints = complaints.filter(c => c.status === filters.status);
      }
      if (filters.category && filters.category !== 'all') {
        complaints = complaints.filter(c => c.category === filters.category);
      }
      if (filters.search) {
        const search = filters.search.toLowerCase();
        complaints = complaints.filter(c =>
          (c.title && c.title.toLowerCase().includes(search)) ||
          (c.description && c.description.toLowerCase().includes(search)) ||
          (c.userName && c.userName.toLowerCase().includes(search))
        );
      }

      return complaints;
    } catch (error) {
      console.error('Get All Complaints Error:', error);
      return [];
    }
  },

  /**
   * Get single complaint by ID
   */
  async getComplaint(complaintId) {
    try {
      const snapshot = await rtdb.ref(`complaints/${complaintId}`).once('value');
      if (!snapshot.exists()) return null;
      return { id: snapshot.key, ...snapshot.val() };
    } catch (error) {
      console.error('Get Complaint Error:', error);
      return null;
    }
  },

  /**
   * Update complaint status (admin)
   */
  async updateComplaintStatus(complaintId, newStatus, note = '') {
    try {
      const compRef = rtdb.ref(`complaints/${complaintId}`);
      const snap = await compRef.child('statusHistory').once('value');
      const history = snap.val() || [];
      history.push({
        status: newStatus,
        timestamp: new Date().toISOString(),
        note: note || `Status updated to ${newStatus}`
      });

      const updateData = {
        status: newStatus,
        updatedAt: firebase.database.ServerValue.TIMESTAMP,
        statusHistory: history
      };

      if (newStatus === 'resolved') {
        updateData.resolvedAt = firebase.database.ServerValue.TIMESTAMP;
      }

      await compRef.update(updateData);
      return true;
    } catch (error) {
      console.error('Update Status Error:', error);
      throw error;
    }
  },

  /**
   * Upload image to Firebase Storage
   */
  async uploadImage(file) {
    try {
      const compressed = await Helpers.compressImage(file);
      const fileName = `complaints/${Helpers.generateId()}.jpg`;
      const ref = storage.ref().child(fileName);
      await ref.put(compressed);
      const url = await ref.getDownloadURL();
      return url;
    } catch (error) {
      console.error('Upload Image Error:', error);
      throw error;
    }
  },

  /**
   * Get user profile
   */
  async getUserProfile(userId) {
    try {
      const snapshot = await rtdb.ref(`users/${userId}`).once('value');
      if (!snapshot.exists()) return null;
      return { id: snapshot.key, ...snapshot.val() };
    } catch (error) {
      console.error('Get User Profile Error:', error);
      return null;
    }
  },

  /**
   * Update user profile
   */
  async updateUserProfile(userId, data) {
    try {
      await rtdb.ref(`users/${userId}`).update({
        ...data,
        updatedAt: firebase.database.ServerValue.TIMESTAMP
      });
      return true;
    } catch (error) {
      console.error('Update Profile Error:', error);
      throw error;
    }
  },

  /**
   * Get complaint statistics
   */
  async getStats() {
    try {
      const snapshot = await rtdb.ref('complaints').once('value');
      const val = snapshot.val() || {};
      const complaints = Object.values(val);

      return {
        total: complaints.length,
        pending: complaints.filter(c => c.status === 'pending').length,
        inProgress: complaints.filter(c => c.status === 'in-progress' || c.status === 'acknowledged').length,
        resolved: complaints.filter(c => c.status === 'resolved').length,
        escalated: complaints.filter(c => {
          if (c.status === 'resolved') return false;
          if (!c.createdAt) return false;
          return Helpers.isEscalated(c.createdAt, c.status);
        }).length
      };
    } catch (error) {
      console.error('Get Stats Error:', error);
      return { total: 0, pending: 0, inProgress: 0, resolved: 0, escalated: 0 };
    }
  },

  /**
   * Submit contact form
   */
  async submitContactForm(data) {
    try {
      await rtdb.ref('contacts').push({
        ...data,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
      return true;
    } catch (error) {
      console.error('Submit Contact Error:', error);
      throw error;
    }
  },

  /**
   * Listen to real-time complaint updates
   */
  listenToComplaints(userId, callback) {
    const ref = rtdb.ref('complaints');
    const listener = ref.orderByChild('userId').equalTo(userId).on('value', (snapshot) => {
      const val = snapshot.val() || {};
      const complaints = Object.keys(val).map(key => ({ id: key, ...val[key] }));
      complaints.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      callback(complaints);
    });
    // Return unsubscribe function
    return () => ref.off('value', listener);
  }
};
