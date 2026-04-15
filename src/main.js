/* ============================================
   CITYFIX – Main Application Entry Point
   ============================================ */

// Wait for DOM and Firebase to be ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('🏙️ CityFix – Initializing...');

  // Register all routes
  Router.register({
    'home':              { page: HomePage },
    'about':             { page: AboutPage },
    'login':             { page: LoginPage },
    'register':          { page: RegisterPage },
    'dashboard':         { page: DashboardPage, requiresAuth: true },
    'submit-complaint':  { page: SubmitComplaintPage, requiresAuth: true },
    'complaint-status':  { page: ComplaintStatusPage, requiresAuth: true },
    'admin-login':       { page: AdminLoginPage },
    'admin':             { page: AdminPage, requiresAdmin: true },
    'information':       { page: InformationPage, requiresAuth: true },
    'contact':           { page: ContactPage },
    'faq':               { page: FaqPage }
  });

  // Initialize authentication
  Auth.init();

  // Listen for auth state changes to re-render if needed
  Auth.onAuthStateChanged((user) => {
    console.log('Auth state changed:', user ? user.email : 'signed out');
    // Re-render current page to update navbar/sidebar
    Router.handleRoute();
  });

  // Initialize router
  Router.init();

  // Hide loading screen after a delay
  setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
      loader.classList.add('hide');
      setTimeout(() => loader.remove(), 500);
    }
  }, 1500);

  console.log('✅ CityFix – Ready!');
});
