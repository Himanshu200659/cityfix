/* ============================================
   CITYFIX – Admin Panel Page
   ============================================ */

const AdminPage = {
  complaints: [],
  stats: null,

  render() {
    const officer = AdminSession.officer || {};
    return `
      ${Navbar.render()}
      <div class="dashboard-layout">
        ${Sidebar.render('admin')}
        <main class="dashboard-main">
          <!-- Officer Profile Header -->
          <div style="background:linear-gradient(135deg,#0f172a,#1e3a5f);border-radius:16px;padding:24px 28px;margin-bottom:24px;color:white;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;">
            <div style="display:flex;align-items:center;gap:16px;">
              <div style="width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,var(--primary-500),var(--accent-500));display:flex;align-items:center;justify-content:center;font-size:1.5rem;">
                🛡️
              </div>
              <div>
                <h1 style="font-size:var(--text-xl);font-weight:800;margin-bottom:2px;color:white;">Admin Panel</h1>
                <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                  <span style="font-size:13px;color:var(--neutral-300);">
                    👤 ${Helpers.escapeHtml(officer.name || 'Officer')}
                  </span>
                  <span style="background:rgba(59,130,246,0.25);color:#93c5fd;padding:2px 10px;border-radius:20px;font-size:11px;font-weight:600;border:1px solid rgba(59,130,246,0.3);">
                    ${Helpers.escapeHtml(officer.position || 'N/A')}
                  </span>
                  <span style="font-size:12px;color:var(--neutral-400);">
                    🏢 ${Helpers.escapeHtml(officer.department || '')}
                  </span>
                </div>
              </div>
            </div>
            <div style="display:flex;gap:10px;align-items:center;">
              <div style="text-align:right;font-size:11px;color:var(--neutral-400);">
                <div>Logged in at</div>
                <div style="color:var(--neutral-300);">${officer.loginTime ? new Date(officer.loginTime).toLocaleTimeString() : '-'}</div>
              </div>
              <button class="btn btn-sm" id="admin-logout-btn" style="background:rgba(239,68,68,0.15);color:#fca5a5;border:1px solid rgba(239,68,68,0.3);font-size:12px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Logout
              </button>
            </div>
          </div>

          <!-- Admin Stats -->
          <div class="dashboard-stats" id="admin-stats">
            <div class="stat-card">
              <div class="stat-icon" style="background:var(--primary-50);color:var(--primary-500);">📋</div>
              <div class="stat-value" id="admin-total">-</div>
              <div class="stat-label">Total Complaints</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon" style="background:var(--warning-50);color:var(--warning-500);">⏳</div>
              <div class="stat-value" id="admin-pending">-</div>
              <div class="stat-label">Pending</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon" style="background:var(--success-50);color:var(--success-500);">✅</div>
              <div class="stat-value" id="admin-resolved">-</div>
              <div class="stat-label">Resolved</div>
            </div>
            <div class="stat-card">
              <div class="stat-icon" style="background:var(--danger-50);color:var(--danger-500);">🔔</div>
              <div class="stat-value" id="admin-escalated">-</div>
              <div class="stat-label">Escalated</div>
            </div>
          </div>

          <!-- Analytics -->
          <div class="admin-analytics">
            <div class="chart-card">
              <h4 style="margin-bottom:16px;">📊 Complaints Overview</h4>
              <div class="chart-placeholder" id="bar-chart">
                <!-- Dynamic bars -->
              </div>
              <div style="display:flex;justify-content:space-around;margin-top:8px;font-size:var(--text-xs);color:var(--text-muted);">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
            <div class="chart-card">
              <h4 style="margin-bottom:16px;">📈 Status Distribution</h4>
              <div class="donut-container" id="donut-chart">
                <!-- Dynamic donut -->
              </div>
            </div>
          </div>

          <!-- Filters & Table -->
          <div style="background:white;border:1px solid var(--border-color);border-radius:16px;padding:24px;">
            <div class="flex-between" style="margin-bottom:16px;flex-wrap:wrap;gap:12px;">
              <h3 style="font-size:var(--text-lg);">All Complaints</h3>
              <div class="admin-filters">
                <div class="search-bar" style="max-width:250px;">
                  <span class="search-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  </span>
                  <input type="text" placeholder="Search..." id="admin-search" />
                </div>
                <select class="filter-select" id="admin-filter-status">
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="acknowledged">Acknowledged</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                <select class="filter-select" id="admin-filter-category">
                  <option value="all">All Categories</option>
                  <option value="garbage">Garbage</option>
                  <option value="pothole">Pothole</option>
                  <option value="water-leak">Water Leak</option>
                  <option value="streetlight">Streetlight</option>
                  <option value="sewage">Sewage</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div class="table-wrapper">
              <table class="data-table" id="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody id="admin-table-body">
                  <tr><td colspan="7" style="text-align:center;padding:40px;">Loading complaints...</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    `;
  },

  async init() {
    Navbar.init();
    Sidebar.init();

    // Check admin session (officer login)
    if (!AdminSession.isLoggedIn) {
      Toast.show('Officer login required', 'warning');
      Router.navigate('admin-login');
      return;
    }

    // Admin logout button
    document.getElementById('admin-logout-btn')?.addEventListener('click', () => {
      AdminSession.logout();
    });

    await AdminPage.loadData();

    // Filter listeners
    document.getElementById('admin-search')?.addEventListener('input', Helpers.debounce(() => AdminPage.applyFilters()));
    document.getElementById('admin-filter-status')?.addEventListener('change', () => AdminPage.applyFilters());
    document.getElementById('admin-filter-category')?.addEventListener('change', () => AdminPage.applyFilters());
  },

  async loadData() {
    try {
      AdminPage.complaints = await DB.getAllComplaints();
      AdminPage.stats = await DB.getStats();
      AdminPage.updateUI();
    } catch (e) {
      console.error('Admin load error:', e);
    }
  },

  updateUI() {
    const stats = AdminPage.stats;
    if (stats) {
      const el = (id) => document.getElementById(id);
      if (el('admin-total')) el('admin-total').textContent = stats.total;
      if (el('admin-pending')) el('admin-pending').textContent = stats.pending;
      if (el('admin-resolved')) el('admin-resolved').textContent = stats.resolved;
      if (el('admin-escalated')) el('admin-escalated').textContent = stats.escalated;
    }

    AdminPage.renderBarChart();
    AdminPage.renderDonut();
    AdminPage.renderTable(AdminPage.complaints);
  },

  renderBarChart() {
    const chartEl = document.getElementById('bar-chart');
    if (!chartEl) return;
    const heights = [65, 45, 80, 55, 70, 90, 40];
    chartEl.innerHTML = heights.map(h => `<div class="chart-bar" style="height:${h}%;"></div>`).join('');
  },

  renderDonut() {
    const el = document.getElementById('donut-chart');
    if (!el || !AdminPage.stats) return;
    const { pending, inProgress, resolved, escalated, total } = AdminPage.stats;
    const r = 70, c = 2 * Math.PI * r;

    const segments = [
      { value: pending, color: '#fbbf24', label: 'Pending' },
      { value: inProgress, color: '#3b82f6', label: 'In Progress' },
      { value: resolved, color: '#10b981', label: 'Resolved' },
      { value: escalated, color: '#ef4444', label: 'Escalated' }
    ];
    
    let offset = 0;
    const circles = segments.map(seg => {
      if (total === 0) return '';
      const pct = seg.value / total;
      const dashLength = pct * c;
      const html = `<circle cx="90" cy="90" r="${r}" fill="none" stroke="${seg.color}" stroke-width="20" stroke-dasharray="${dashLength} ${c - dashLength}" stroke-dashoffset="${-offset}" />`;
      offset += dashLength;
      return html;
    }).join('');

    el.innerHTML = `
      <div class="donut-chart">
        <svg viewBox="0 0 180 180">${circles}</svg>
        <div class="donut-center">
          <div class="donut-value">${total}</div>
          <div class="donut-label">Total</div>
        </div>
      </div>
      <div class="donut-legend">
        ${segments.map(s => `
          <div class="legend-item">
            <div class="legend-dot" style="background:${s.color};"></div>
            <span>${s.label}: ${s.value}</span>
          </div>
        `).join('')}
      </div>
    `;
  },

  applyFilters() {
    const search = document.getElementById('admin-search')?.value || '';
    const status = document.getElementById('admin-filter-status')?.value || 'all';
    const category = document.getElementById('admin-filter-category')?.value || 'all';

    let filtered = AdminPage.complaints;

    if (status !== 'all') {
      filtered = filtered.filter(c => c.status === status);
    }
    if (category !== 'all') {
      filtered = filtered.filter(c => c.category === category);
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(c =>
        (c.title && c.title.toLowerCase().includes(q)) ||
        (c.userName && c.userName.toLowerCase().includes(q)) ||
        (c.description && c.description.toLowerCase().includes(q))
      );
    }

    AdminPage.renderTable(filtered);
  },

  renderTable(complaints) {
    const tbody = document.getElementById('admin-table-body');
    if (!tbody) return;

    if (complaints.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:40px;">No complaints found</td></tr>';
      return;
    }

    tbody.innerHTML = complaints.map(c => {
      const isEsc = Helpers.isEscalated(c.createdAt, c.status);
      return `
        <tr class="${isEsc ? 'escalated-row' : ''}">
          <td style="font-family:monospace;font-size:var(--text-xs);">${c.id.substring(0, 8)}...</td>
          <td>
            <div style="font-weight:600;font-size:var(--text-sm);">${Helpers.escapeHtml(Helpers.truncate(c.title || c.category, 30))}</div>
          </td>
          <td><span style="font-size:var(--text-xs);">${Helpers.getCategoryIcon(c.category)} ${Helpers.getCategoryLabel(c.category)}</span></td>
          <td style="font-size:var(--text-xs);">${Helpers.escapeHtml(c.userName || 'Unknown')}</td>
          <td style="font-size:var(--text-xs);">${Helpers.formatDate(c.createdAt)}</td>
          <td>
            <span class="badge ${Helpers.getStatusBadge(isEsc ? 'escalated' : c.status)}">
              ${isEsc ? '⚠ Escalated' : c.status}
            </span>
          </td>
          <td>
            <div class="admin-complaint-actions">
              <select class="status-select" data-id="${c.id}" onchange="AdminPage.updateStatus(this)">
                <option value="" disabled selected>Update</option>
                <option value="acknowledged" ${c.status === 'acknowledged' ? 'disabled' : ''}>Acknowledged</option>
                <option value="in-progress" ${c.status === 'in-progress' ? 'disabled' : ''}>In Progress</option>
                <option value="resolved" ${c.status === 'resolved' ? 'disabled' : ''}>Resolved</option>
              </select>
              <a href="#/complaint-status?id=${c.id}" class="btn btn-ghost btn-icon-sm" title="View Details">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              </a>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  async updateStatus(selectEl) {
    const id = selectEl.dataset.id;
    const newStatus = selectEl.value;
    if (!id || !newStatus) return;

    try {
      await DB.updateComplaintStatus(id, newStatus);
      Toast.show(`Status updated to "${newStatus}" ✓`, 'success');
      await AdminPage.loadData();
    } catch (e) {
      Toast.show('Failed to update status', 'error');
      selectEl.value = '';
    }
  }
};
