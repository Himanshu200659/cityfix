/* ============================================
   CITYFIX – Complaint Status / Tracking Page
   ============================================ */

const ComplaintStatusPage = {
  complaint: null,

  render() {
    return `
      ${Navbar.render()}
      <div class="dashboard-layout">
        ${Sidebar.render('complaint-status')}
        <main class="dashboard-main">
          <div class="dashboard-header">
            <div>
              <h1>Complaint Tracker</h1>
              <p class="header-subtitle">View and track the status of your complaints</p>
            </div>
            <a href="#/dashboard" class="btn btn-ghost">← Back to Dashboard</a>
          </div>

          <div id="status-content">
            <div class="empty-state">
              <div class="empty-icon">🔍</div>
              <h3>Loading complaint details...</h3>
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

    // Get complaint ID from URL
    const params = new URLSearchParams(window.location.hash.split('?')[1]);
    const complaintId = params.get('id');

    if (complaintId) {
      await ComplaintStatusPage.loadComplaint(complaintId);
    } else {
      // Show list of user's complaints
      await ComplaintStatusPage.loadAllUserComplaints();
    }
  },

  async loadComplaint(id) {
    try {
      const complaint = await DB.getComplaint(id);
      if (!complaint) {
        document.getElementById('status-content').innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">❌</div>
            <h3>Complaint Not Found</h3>
            <p>This complaint may have been deleted or doesn't exist.</p>
            <a href="#/dashboard" class="btn btn-primary" style="margin-top:8px;">Back to Dashboard</a>
          </div>
        `;
        return;
      }

      ComplaintStatusPage.complaint = complaint;
      ComplaintStatusPage.renderDetail(complaint);
    } catch (e) {
      console.error('Load complaint error:', e);
    }
  },

  renderDetail(c) {
    const isEscalated = Helpers.isEscalated(c.createdAt, c.status);
    const hoursLeft = Helpers.hoursUntilEscalation(c.createdAt);
    const statusSteps = ['pending', 'acknowledged', 'in-progress', 'resolved'];
    const currentIdx = statusSteps.indexOf(c.status);

    const content = document.getElementById('status-content');
    content.innerHTML = `
      ${isEscalated ? `
        <div class="escalation-banner">
          <span class="esc-icon">⚠️</span>
          <div>
            <h4>Escalation Alert</h4>
            <p>This complaint has exceeded the 48-hour resolution window and has been escalated to higher authorities.</p>
          </div>
        </div>
      ` : (c.status !== 'resolved' && hoursLeft < 12) ? `
        <div style="background:var(--warning-50);border:1px solid var(--warning-400);padding:14px 20px;border-radius:12px;display:flex;align-items:center;gap:12px;margin-bottom:16px;">
          <span style="font-size:1.25rem;">⏰</span>
          <div>
            <div style="font-weight:600;font-size:var(--text-sm);color:var(--warning-600);">Approaching Escalation</div>
            <div style="font-size:var(--text-xs);color:var(--text-muted);">${Math.round(hoursLeft)} hours remaining before auto-escalation</div>
          </div>
        </div>
      ` : ''}

      <!-- Progress Steps -->
      <div class="status-header-card">
        <div class="progress-steps">
          ${statusSteps.map((step, i) => `
            <div class="progress-step ${i < currentIdx ? 'completed' : ''} ${i === currentIdx ? 'active' : ''}">
              <div class="step-circle">${i < currentIdx ? '✓' : i + 1}</div>
              <div class="step-title">${step.charAt(0).toUpperCase() + step.slice(1).replace('-', ' ')}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="status-grid">
        <!-- Details Column -->
        <div>
          <div class="card" style="margin-bottom:16px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
              <h3>${Helpers.escapeHtml(c.title || c.category)}</h3>
              <span class="badge ${Helpers.getStatusBadge(isEscalated ? 'escalated' : c.status)}">${isEscalated ? '⚠ Escalated' : c.status}</span>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:16px;font-size:var(--text-sm);color:var(--text-muted);">
              <span>${Helpers.getCategoryIcon(c.category)} ${Helpers.getCategoryLabel(c.category)}</span>
              <span>📅 ${Helpers.formatDate(c.createdAt)}</span>
              <span>🔷 Priority: ${c.priority || 'medium'}</span>
            </div>
            <p style="line-height:1.8;margin-bottom:16px;">${Helpers.escapeHtml(c.description || '')}</p>
            ${c.imageUrl ? `
              <div style="border-radius:12px;overflow:hidden;border:1px solid var(--border-color);">
                <img src="${c.imageUrl}" alt="complaint image" style="width:100%;max-height:400px;object-fit:cover;" />
              </div>
            ` : ''}
          </div>

          ${c.address ? `
            <div class="card" style="margin-bottom:16px;">
              <h4 style="margin-bottom:8px;">📍 Location</h4>
              <p style="font-size:var(--text-sm);">${Helpers.escapeHtml(c.address)}</p>
              ${c.location ? `
                <div class="map-container" id="status-map" style="margin-top:12px;height:200px;"></div>
              ` : ''}
            </div>
          ` : ''}
        </div>

        <!-- Timeline Column -->
        <div>
          <div class="card">
            <h4 style="margin-bottom:16px;">📜 Status Timeline</h4>
            <div class="timeline">
              ${(c.statusHistory || []).map((entry, i) => {
                const isLast = i === (c.statusHistory.length - 1);
                return `
                  <div class="timeline-item ${isLast ? 'active' : 'completed'}">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                      <h4>${entry.status.charAt(0).toUpperCase() + entry.status.slice(1).replace('-', ' ')}</h4>
                      <p>${Helpers.escapeHtml(entry.note || '')}</p>
                      <div class="timeline-date">${Helpers.formatDate(entry.timestamp)}</div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div class="card" style="margin-top:16px;">
            <h4 style="margin-bottom:8px;">ℹ️ Complaint Info</h4>
            <div style="font-size:var(--text-sm);display:flex;flex-direction:column;gap:8px;">
              <div style="display:flex;justify-content:space-between;">
                <span style="color:var(--text-muted);">ID</span>
                <span style="font-weight:600;font-family:monospace;font-size:var(--text-xs);">${c.id}</span>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <span style="color:var(--text-muted);">Filed by</span>
                <span style="font-weight:500;">${Helpers.escapeHtml(c.userName)}</span>
              </div>
              <div style="display:flex;justify-content:space-between;">
                <span style="color:var(--text-muted);">Filed on</span>
                <span>${Helpers.formatDate(c.createdAt)}</span>
              </div>
              ${c.resolvedAt ? `
                <div style="display:flex;justify-content:space-between;">
                  <span style="color:var(--text-muted);">Resolved on</span>
                  <span style="color:var(--success-600);">${Helpers.formatDate(c.resolvedAt)}</span>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    // Init map if location exists
    if (c.location) {
      setTimeout(() => {
        const mapEl = document.getElementById('status-map');
        if (mapEl) {
          const map = L.map('status-map').setView([c.location.lat, c.location.lng], 15);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
          }).addTo(map);
          L.marker([c.location.lat, c.location.lng]).addTo(map);
        }
      }, 200);
    }
  },

  async loadAllUserComplaints() {
    try {
      const complaints = await DB.getUserComplaints(Auth.currentUser.uid);
      const content = document.getElementById('status-content');

      if (complaints.length === 0) {
        content.innerHTML = `
          <div class="empty-state">
            <div class="empty-icon">📭</div>
            <h3>No Complaints Yet</h3>
            <p>You haven't submitted any complaints.</p>
            <a href="#/submit-complaint" class="btn btn-primary" style="margin-top:8px;">Report an Issue</a>
          </div>
        `;
        return;
      }

      content.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${complaints.map(c => {
            const isEsc = Helpers.isEscalated(c.createdAt, c.status);
            return `
              <a href="#/complaint-status?id=${c.id}" class="complaint-card ${isEsc ? 'escalated' : ''}" style="text-decoration:none;color:inherit;">
                ${c.imageUrl ? `<img src="${c.imageUrl}" alt="" class="complaint-img" />` : `
                  <div class="complaint-img" style="display:flex;align-items:center;justify-content:center;background:var(--bg-secondary);font-size:2rem;">
                    ${Helpers.getCategoryIcon(c.category)}
                  </div>
                `}
                <div class="complaint-info">
                  <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                    <span class="complaint-title">${Helpers.escapeHtml(c.title || c.category)}</span>
                    <span class="badge ${Helpers.getStatusBadge(isEsc ? 'escalated' : c.status)}">${isEsc ? '⚠ Escalated' : c.status}</span>
                  </div>
                  <div class="complaint-desc">${Helpers.escapeHtml(c.description || '')}</div>
                  <div class="complaint-meta">
                    <span>${Helpers.getCategoryLabel(c.category)}</span>
                    <span>📅 ${Helpers.formatDate(c.createdAt)}</span>
                  </div>
                </div>
              </a>
            `;
          }).join('')}
        </div>
      `;
    } catch (e) {
      console.error('Load complaints error:', e);
    }
  }
};
