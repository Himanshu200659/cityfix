/* ============================================
   CITYFIX – Sidebar Component (Dashboard)
   ============================================ */

const Sidebar = {
  render(activeItem = 'dashboard') {
    const user = Auth.currentUser;
    return `
      <aside class="dashboard-sidebar" id="dashboard-sidebar">
        <div style="margin-bottom:24px;">
          <div style="display:flex;align-items:center;gap:12px;padding:8px;border-radius:12px;background:var(--bg-secondary);">
            <div class="avatar avatar-placeholder" style="width:42px;height:42px;font-size:14px;flex-shrink:0;">
              ${user && user.photoURL 
                ? `<img src="${user.photoURL}" alt="avatar" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" />`
                : Auth.getInitials(user?.displayName)
              }
            </div>
            <div style="min-width:0;">
              <div style="font-weight:600;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                ${user ? Helpers.escapeHtml(user.displayName || 'User') : 'Guest'}
              </div>
              <div style="font-size:12px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                ${user ? Helpers.escapeHtml(user.email) : ''}
              </div>
            </div>
          </div>
        </div>

        <span class="sidebar-section-title">Main</span>
        <nav class="sidebar-nav">
          <a href="#/dashboard" class="sidebar-link ${activeItem === 'dashboard' ? 'active' : ''}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
            Dashboard
          </a>
          <a href="#/submit-complaint" class="sidebar-link ${activeItem === 'submit-complaint' ? 'active' : ''}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
            New Complaint
          </a>
          <a href="#/complaint-status" class="sidebar-link ${activeItem === 'complaint-status' ? 'active' : ''}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            Track Status
          </a>
        </nav>

        <span class="sidebar-section-title" style="margin-top:16px;">Account</span>
        <nav class="sidebar-nav">
          <a href="#/information" class="sidebar-link ${activeItem === 'information' ? 'active' : ''}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            My Profile
          </a>
        </nav>

        ${Auth.isAdmin ? `
          <span class="sidebar-section-title" style="margin-top:16px;">Admin</span>
          <nav class="sidebar-nav">
            <a href="#/admin" class="sidebar-link ${activeItem === 'admin' ? 'active' : ''}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
              Admin Panel
            </a>
          </nav>
        ` : ''}

        <div style="margin-top:auto;padding-top:24px;">
          <button class="sidebar-link" style="color:var(--danger-500);width:100%;" onclick="Auth.signOut()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Sign Out
          </button>
        </div>
      </aside>
    `;
  },

  init() {
    // Mobile sidebar toggle
    const sidebar = document.getElementById('dashboard-sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
    }
  }
};
