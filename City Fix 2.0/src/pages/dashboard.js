/* ============================================
   CITYFIX – Dashboard Page
   ============================================ */

const DashboardPage = {
  complaints: [],

  render() {
    return `
      ${Navbar.render()}
      <div class="dashboard-layout">
        ${Sidebar.render('dashboard')}
        <main class="dashboard-main">
          <div class="dashboard-header">
            <div>
              <h1>Dashboard</h1>
              <p class="header-subtitle">Welcome back, ${Auth.currentUser ? Helpers.escapeHtml(Auth.currentUser.displayName || 'User') : 'User'} 👋</p>
            </div>
            <div style="display:flex;gap:12px;">
              <button class="btn btn-ghost btn-icon" id="sidebar-toggle" title="Toggle sidebar" style="display:none;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
              </button>
              <a href="#/submit-complaint" class="btn btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
                New Complaint
              </a>
            </div>
          </div>

          <!-- Stats -->
          <div class="dashboard-stats" id="dashboard-stats">
            <div class="stat-card">
              <div class="stat-icon" style="background:var(--primary-50);color:var(--primary-500);">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/></svg>
              </div>
              <div class="stat-value" id="stat-total">-</div>
              <div class="stat-label">Total Complaints</div>
            </div>
            <div class="stat-card" style="--stat-color:var(--warning-500);">
              <div class="stat-icon" style="background:var(--warning-50);color:var(--warning-500);">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div class="stat-value" id="stat-pending">-</div>
              <div class="stat-label">Pending</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon" style="background:var(--primary-50);color:var(--primary-500);">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <div class="stat-value" id="stat-progress">-</div>
              <div class="stat-label">In Progress</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon" style="background:var(--success-50);color:var(--success-500);">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <div class="stat-value" id="stat-resolved">-</div>
              <div class="stat-label">Resolved</div>
            </div>
          </div>

          <!-- Recent Complaints -->
          <div style="background:white;border:1px solid var(--border-color);border-radius:16px;padding:24px;">
            <div class="flex-between" style="margin-bottom:20px;">
              <h3 style="font-size:var(--text-lg);">Recent Complaints</h3>
              <div class="search-bar">
                <span class="search-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                </span>
                <input type="text" placeholder="Search complaints..." id="dashboard-search" />
              </div>
            </div>

            <div class="chip-group" style="margin-bottom:16px;">
              <button class="chip active" data-filter="all">All</button>
              <button class="chip" data-filter="pending">Pending</button>
              <button class="chip" data-filter="in-progress">In Progress</button>
              <button class="chip" data-filter="resolved">Resolved</button>
            </div>

            <div id="complaints-list" style="display:flex;flex-direction:column;gap:12px;">
              <div class="empty-state">
                <div class="empty-icon">📋</div>
                <h3>Loading complaints...</h3>
                <p>Please wait while we fetch your data.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    `;
  },

  async init() {
    Navbar.init();
    Sidebar.init();

    if (!Auth.currentUser) {
      Router.navigate('login');
      return;
    }

    // Mobile sidebar toggle
    if (window.innerWidth <= 768) {
      const toggleBtn = document.getElementById('sidebar-toggle');
      if (toggleBtn) toggleBtn.style.display = 'flex';
    }

    // Load data
    await DashboardPage.loadData();

    // Filter chips
    document.querySelectorAll('.chip[data-filter]').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.chip[data-filter]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        DashboardPage.renderComplaints(chip.dataset.filter);
      });
    });

    // Search
    document.getElementById('dashboard-search')?.addEventListener('input', Helpers.debounce((e) => {
      const activeFilter = document.querySelector('.chip.active')?.dataset.filter || 'all';
      DashboardPage.renderComplaints(activeFilter, e.target.value);
    }));
  },

  async loadData() {
    try {
      DashboardPage.complaints = await DB.getUserComplaints(Auth.currentUser.uid);
      DashboardPage.updateStats();
      DashboardPage.renderComplaints('all');
    } catch (e) {
      console.error('Load dashboard data error:', e);
    }
  },

  updateStats() {
    const complaints = DashboardPage.complaints;
    document.getElementById('stat-total').textContent = complaints.length;
    document.getElementById('stat-pending').textContent = complaints.filter(c => c.status === 'pending').length;
    document.getElementById('stat-progress').textContent = complaints.filter(c => c.status === 'in-progress' || c.status === 'acknowledged').length;
    document.getElementById('stat-resolved').textContent = complaints.filter(c => c.status === 'resolved').length;
  },

  renderComplaints(filter = 'all', search = '') {
    let filtered = DashboardPage.complaints;

    if (filter !== 'all') {
      filtered = filtered.filter(c => {
        if (filter === 'in-progress') return c.status === 'in-progress' || c.status === 'acknowledged';
        return c.status === filter;
      });
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(c => 
        (c.title && c.title.toLowerCase().includes(q)) ||
        (c.description && c.description.toLowerCase().includes(q)) ||
        (c.category && c.category.toLowerCase().includes(q))
      );
    }

    const list = document.getElementById('complaints-list');
    if (!list) return;

    if (filtered.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📭</div>
          <h3>No complaints found</h3>
          <p>${filter === 'all' ? "You haven't submitted any complaints yet." : `No ${filter} complaints.`}</p>
          <a href="#/submit-complaint" class="btn btn-primary" style="margin-top:8px;">Report an Issue</a>
        </div>
      `;
      return;
    }

    list.innerHTML = filtered.map(c => {
      const isEsc = Helpers.isEscalated(c.createdAt, c.status);
      const status = isEsc ? 'escalated' : c.status;
      return `
        <a href="#/complaint-status?id=${c.id}" class="complaint-card ${isEsc ? 'escalated' : ''}" style="text-decoration:none;color:inherit;">
          ${c.imageUrl ? `<img src="${c.imageUrl}" alt="complaint" class="complaint-img" />` : `
            <div class="complaint-img" style="display:flex;align-items:center;justify-content:center;background:var(--bg-secondary);font-size:2rem;">
              ${Helpers.getCategoryIcon(c.category)}
            </div>
          `}
          <div class="complaint-info">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
              <span class="complaint-title">${Helpers.escapeHtml(c.title || c.category)}</span>
              <span class="badge ${Helpers.getStatusBadge(status)}">${isEsc ? '⚠ Escalated' : status}</span>
            </div>
            <div class="complaint-desc">${Helpers.escapeHtml(c.description || '')}</div>
            <div class="complaint-meta">
              <span>${Helpers.getCategoryIcon(c.category)} ${Helpers.getCategoryLabel(c.category)}</span>
              <span>📅 ${Helpers.formatDate(c.createdAt)}</span>
              ${isEsc ? '<span style="color:var(--danger-500);font-weight:600;">⚠ Exceeded 48h</span>' : ''}
            </div>
          </div>
        </a>
      `;
    }).join('');
  }
};
