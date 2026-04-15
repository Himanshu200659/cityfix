/* ============================================
   CITYFIX – Navbar Component
   ============================================ */

const Navbar = {
  render(options = {}) {
    const user = Auth.currentUser;
    const isLoggedIn = !!user;
    const currentRoute = Router ? Router.currentRoute : 'home';
    const isDashboard = ['dashboard', 'submit-complaint', 'complaint-status', 'admin', 'information'].includes(currentRoute);

    return `
      <nav class="navbar" id="main-navbar">
        <a href="#/home" class="nav-brand">
          <span class="nav-brand-icon">🏙️</span>
          <span class="nav-brand-text">CityFix</span>
        </a>

        <div class="nav-links" id="nav-links">
          <a href="#/home" class="nav-link ${currentRoute === 'home' ? 'active' : ''}">Home</a>
          <a href="#/about" class="nav-link ${currentRoute === 'about' ? 'active' : ''}">About</a>
          ${isLoggedIn ? `<a href="#/dashboard" class="nav-link ${currentRoute === 'dashboard' ? 'active' : ''}">Dashboard</a>` : ''}
          ${AdminSession.isLoggedIn ? `<a href="#/admin" class="nav-link ${currentRoute === 'admin' ? 'active' : ''}">Admin</a>` : `<a href="#/admin-login" class="nav-link ${currentRoute === 'admin-login' ? 'active' : ''}">Admin Portal</a>`}
          <a href="#/contact" class="nav-link ${currentRoute === 'contact' ? 'active' : ''}">Contact</a>
          <a href="#/faq" class="nav-link ${currentRoute === 'faq' ? 'active' : ''}">FAQ</a>
        </div>

        <div class="nav-actions">
          ${isLoggedIn ? `
            <a href="#/submit-complaint" class="btn btn-primary btn-sm" style="font-size:13px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Report Issue
            </a>
            <div class="nav-user" id="nav-user-dropdown">
              <div class="avatar avatar-sm avatar-placeholder" style="width:34px;height:34px;font-size:12px;">
                ${user.photoURL 
                  ? `<img src="${user.photoURL}" alt="avatar" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" />`
                  : Auth.getInitials(user.displayName)
                }
              </div>
              <span class="nav-user-name" style="max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">
                ${Helpers.escapeHtml(user.displayName || 'User')}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
            </div>
            <div class="nav-dropdown" id="user-dropdown" style="display:none;position:absolute;top:60px;right:20px;background:white;border:1px solid var(--border-color);border-radius:12px;box-shadow:var(--shadow-xl);padding:8px;min-width:200px;z-index:100;">
              <a href="#/information" class="sidebar-link" style="padding:10px 14px;font-size:14px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                My Profile
              </a>
              <a href="#/dashboard" class="sidebar-link" style="padding:10px 14px;font-size:14px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                Dashboard
              </a>
              <a href="#/admin-login" class="sidebar-link" style="padding:10px 14px;font-size:14px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                ${AdminSession.isLoggedIn ? 'Admin Panel' : 'Admin Portal'}
              </a>
              <hr style="border:none;border-top:1px solid var(--border-color);margin:4px 0;" />
              <button class="sidebar-link" style="padding:10px 14px;font-size:14px;width:100%;text-align:left;color:var(--danger-500);" id="logout-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Sign Out
              </button>
            </div>
          ` : `
            <a href="#/login" class="btn btn-outline btn-sm">Log In</a>
            <a href="#/register" class="btn btn-primary btn-sm">Sign Up</a>
          `}

          <div class="hamburger" id="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <!-- Mobile Menu -->
      <div class="mobile-menu" id="mobile-menu">
        <a href="#/home" class="nav-link" onclick="Navbar.closeMobile()">Home</a>
        <a href="#/about" class="nav-link" onclick="Navbar.closeMobile()">About</a>
        ${isLoggedIn ? `<a href="#/dashboard" class="nav-link" onclick="Navbar.closeMobile()">Dashboard</a>` : ''}
        ${AdminSession.isLoggedIn ? `<a href="#/admin" class="nav-link" onclick="Navbar.closeMobile()">Admin Panel</a>` : `<a href="#/admin-login" class="nav-link" onclick="Navbar.closeMobile()">Admin Portal</a>`}
        <a href="#/contact" class="nav-link" onclick="Navbar.closeMobile()">Contact</a>
        <a href="#/faq" class="nav-link" onclick="Navbar.closeMobile()">FAQ</a>
        <hr style="border:none;border-top:1px solid var(--border-color);margin:8px 0;" />
        ${isLoggedIn ? `
          <a href="#/submit-complaint" class="btn btn-primary" onclick="Navbar.closeMobile()" style="text-align:center;">Report Issue</a>
          <button class="btn btn-ghost" id="mobile-logout-btn" style="color:var(--danger-500);">Sign Out</button>
        ` : `
          <a href="#/login" class="btn btn-outline" onclick="Navbar.closeMobile()" style="text-align:center;">Log In</a>
          <a href="#/register" class="btn btn-primary" onclick="Navbar.closeMobile()" style="text-align:center;">Sign Up</a>
        `}
      </div>
    `;
  },

  init() {
    // Hamburger toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        mobileMenu.classList.toggle('active');
      });
    }

    // User dropdown toggle
    const userDropdown = document.getElementById('nav-user-dropdown');
    const dropdown = document.getElementById('user-dropdown');
    if (userDropdown && dropdown) {
      userDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
      });
      document.addEventListener('click', () => {
        if (dropdown) dropdown.style.display = 'none';
      });
    }

    // Logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => Auth.signOut());
    }

    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');
    if (mobileLogoutBtn) {
      mobileLogoutBtn.addEventListener('click', () => {
        Navbar.closeMobile();
        Auth.signOut();
      });
    }

    // Admin portal button is now a link, no click handler needed

    // Scroll effect
    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('main-navbar');
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
      }
    });
  },

  closeMobile() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger) hamburger.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('active');
  }
};
