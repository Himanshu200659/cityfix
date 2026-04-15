/* ============================================
   CITYFIX – Admin Session Manager
   ============================================
   Manages officer login state separately from Firebase auth.
*/

const AdminSession = {
  officer: null,
  isLoggedIn: false,

  login(officer) {
    AdminSession.officer = {
      username: officer.username,
      name: officer.name,
      position: officer.position,
      department: officer.department,
      loginTime: new Date().toISOString()
    };
    AdminSession.isLoggedIn = true;

    // Persist in sessionStorage
    try {
      sessionStorage.setItem('cityfix_admin', JSON.stringify(AdminSession.officer));
    } catch (e) { /* silent */ }
  },

  logout() {
    AdminSession.officer = null;
    AdminSession.isLoggedIn = false;
    try {
      sessionStorage.removeItem('cityfix_admin');
    } catch (e) { /* silent */ }
    Toast.show('Admin session ended.', 'info');
    Router.navigate('admin-login');
  },

  restore() {
    try {
      const saved = sessionStorage.getItem('cityfix_admin');
      if (saved) {
        AdminSession.officer = JSON.parse(saved);
        AdminSession.isLoggedIn = true;
      }
    } catch (e) { /* silent */ }
  },

  getOfficerName() {
    return AdminSession.officer?.name || 'Officer';
  },

  getPosition() {
    return AdminSession.officer?.position || 'Unknown';
  },

  getDepartment() {
    return AdminSession.officer?.department || '';
  }
};

// Restore session on load
AdminSession.restore();
