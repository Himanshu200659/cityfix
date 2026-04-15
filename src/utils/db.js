/* ============================================
   CITYFIX – Database (Firestore) Operations
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
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        statusHistory: [{
          status: 'pending',
          timestamp: new Date().toISOString(),
          note: 'Complaint submitted'
        }],
        resolvedAt: null,
        assignedTo: null,
        escalated: false
      };

      const docRef = await db.collection('complaints').add(complaint);
      return docRef.id;
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
      const snapshot = await db.collection('complaints')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();

      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
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
      let query = db.collection('complaints').orderBy('createdAt', 'desc');

      if (filters.status && filters.status !== 'all') {
        query = db.collection('complaints')
          .where('status', '==', filters.status)
          .orderBy('createdAt', 'desc');
      }

      const snapshot = await query.get();

      let complaints = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Client-side filtering for category
      if (filters.category && filters.category !== 'all') {
        complaints = complaints.filter(c => c.category === filters.category);
      }

      // Client-side search
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
      const doc = await db.collection('complaints').doc(complaintId).get();
      if (!doc.exists) return null;
      return { id: doc.id, ...doc.data() };
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
      const complaintRef = db.collection('complaints').doc(complaintId);
      const updateData = {
        status: newStatus,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        statusHistory: firebase.firestore.FieldValue.arrayUnion({
          status: newStatus,
          timestamp: new Date().toISOString(),
          note: note || `Status updated to ${newStatus}`
        })
      };

      if (newStatus === 'resolved') {
        updateData.resolvedAt = firebase.firestore.FieldValue.serverTimestamp();
      }

      await complaintRef.update(updateData);
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
      const doc = await db.collection('users').doc(userId).get();
      if (!doc.exists) return null;
      return { id: doc.id, ...doc.data() };
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
      await db.collection('users').doc(userId).update({
        ...data,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
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
      const snapshot = await db.collection('complaints').get();
      const complaints = snapshot.docs.map(doc => doc.data());

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
      await db.collection('contacts').add({
        ...data,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
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
    return db.collection('complaints')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const complaints = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        callback(complaints);
      });
  }
};
