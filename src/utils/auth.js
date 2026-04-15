/* ============================================
   CITYFIX – Authentication Utilities
   ============================================ */

const Auth = {
  currentUser: null,
  isAdmin: false,
  listeners: [],

  /**
   * Initialize auth state listener
   */
  init() {
    auth.onAuthStateChanged(async (user) => {
      Auth.currentUser = user;
      if (user) {
        // Check if user is admin
        try {
          const adminDoc = await rtdb.ref(`admins/${user.uid}`).once('value');
          Auth.isAdmin = adminDoc.exists();
        } catch (e) {
          Auth.isAdmin = false;
        }
        // Save user profile to Firestore
        await Auth.saveUserProfile(user);
      } else {
        Auth.isAdmin = false;
      }
      // Notify all listeners of auth state change
      Auth.listeners.forEach(cb => cb(user));
    });
  },

  /**
   * Sign in with Google
   */
  async signInWithGoogle() {
    try {
      const result = await auth.signInWithPopup(googleProvider);
      Toast.show('Welcome back! 👋', 'success');
      return result.user;
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      Toast.show('Sign-in failed. Please try again.', 'error');
      throw error;
    }
  },

  /**
   * Sign in with email and password
   */
  async signInWithEmail(email, password) {
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      Toast.show('Welcome back! 👋', 'success');
      return result.user;
    } catch (error) {
      console.error('Email Sign-In Error:', error);
      const msg = Auth.getErrorMessage(error.code);
      Toast.show(msg, 'error');
      throw error;
    }
  },

  /**
   * Register with email and password
   */
  async registerWithEmail(email, password, displayName) {
    try {
      const result = await auth.createUserWithEmailAndPassword(email, password);
      // Update display name
      await result.user.updateProfile({ displayName });
      Toast.show('Account created successfully! 🎉', 'success');
      return result.user;
    } catch (error) {
      console.error('Registration Error:', error);
      const msg = Auth.getErrorMessage(error.code);
      Toast.show(msg, 'error');
      throw error;
    }
  },

  /**
   * Sign out
   */
  async signOut() {
    try {
      await auth.signOut();
      Auth.currentUser = null;
      Auth.isAdmin = false;
      Toast.show('Signed out successfully', 'info');
      Router.navigate('home');
    } catch (error) {
      console.error('Sign-Out Error:', error);
      Toast.show('Sign-out failed', 'error');
    }
  },

  /**
   * Send password reset
   */
  async resetPassword(email) {
    try {
      await auth.sendPasswordResetEmail(email);
      Toast.show('Password reset email sent! Check your inbox.', 'success');
    } catch (error) {
      console.error('Password Reset Error:', error);
      Toast.show('Failed to send reset email.', 'error');
      throw error;
    }
  },

  /**
   * Register as admin (with secret code)
   */
  async registerAsAdmin(secretCode) {
    const ADMIN_CODE = 'CITYFIX2024'; // Change this to your secret admin code
    if (secretCode !== ADMIN_CODE) {
      Toast.show('Invalid authorization code', 'error');
      return false;
    }
    if (!Auth.currentUser) {
      Toast.show('Please sign in first', 'error');
      return false;
    }
    try {
      await rtdb.ref(`admins/${Auth.currentUser.uid}`).set({
        email: Auth.currentUser.email,
        name: Auth.currentUser.displayName,
        registeredAt: firebase.database.ServerValue.TIMESTAMP
      });
      Auth.isAdmin = true;
      Toast.show('Admin access granted! 🔐', 'success');
      return true;
    } catch (error) {
      console.error('Admin Registration Error:', error);
      Toast.show('Failed to register as admin', 'error');
      return false;
    }
  },

  /**
   * Save user profile to Firestore
   */
  async saveUserProfile(user) {
    try {
      const userRef = rtdb.ref(`users/${user.uid}`);
      const doc = await userRef.once('value');
      if (!doc.exists()) {
        await userRef.set({
          email: user.email,
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          phone: '',
          address: '',
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          lastLogin: firebase.database.ServerValue.TIMESTAMP
        });
      } else {
        await userRef.update({
          lastLogin: firebase.database.ServerValue.TIMESTAMP
        });
      }
    } catch (error) {
      console.error('Save profile error:', error);
    }
  },

  /**
   * Add auth state change listener
   */
  onAuthStateChanged(callback) {
    Auth.listeners.push(callback);
  },

  /**
   * Get user-friendly error message
   */
  getErrorMessage(code) {
    const messages = {
      'auth/user-not-found': 'No account found with this email.',
      'auth/wrong-password': 'Incorrect password. Try again.',
      'auth/email-already-in-use': 'An account with this email already exists.',
      'auth/weak-password': 'Password should be at least 6 characters.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/popup-closed-by-user': 'Sign-in popup was closed.',
      'auth/network-request-failed': 'Network error. Check your connection.',
      'auth/too-many-requests': 'Too many attempts. Try again later.',
      'auth/invalid-credential': 'Invalid credentials. Please try again.'
    };
    return messages[code] || 'An error occurred. Please try again.';
  },

  /**
   * Get initials from name
   */
  getInitials(name) {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }
};
