/* ============================================
   CITYFIX – Information / Profile Page
   ============================================ */

const InformationPage = {
  profile: null,

  render() {
    return `
      ${Navbar.render()}
      <div class="dashboard-layout">
        ${Sidebar.render('information')}
        <main class="dashboard-main">
          <div class="dashboard-header">
            <div>
              <h1>My Profile</h1>
              <p class="header-subtitle">Manage your personal information</p>
            </div>
          </div>

          <div class="info-grid">
            <!-- Profile Card -->
            <div>
              <div class="info-sidebar-card">
                <div class="info-avatar" id="profile-avatar">
                  ${Auth.currentUser?.photoURL 
                    ? `<img src="${Auth.currentUser.photoURL}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" />`
                    : Auth.getInitials(Auth.currentUser?.displayName)
                  }
                </div>
                <h3 style="font-size:var(--text-lg);margin-bottom:4px;" id="profile-name">
                  ${Auth.currentUser ? Helpers.escapeHtml(Auth.currentUser.displayName || 'User') : 'Guest'}
                </h3>
                <p style="font-size:var(--text-sm);color:var(--text-muted);margin-bottom:16px;" id="profile-email">
                  ${Auth.currentUser ? Helpers.escapeHtml(Auth.currentUser.email) : ''}
                </p>
                <span class="badge badge-info">${Auth.isAdmin ? '🛡️ Admin' : '👤 Citizen'}</span>
                <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border-color);">
                  <div style="font-size:var(--text-sm);color:var(--text-muted);margin-bottom:4px;">Member since</div>
                  <div style="font-size:var(--text-sm);font-weight:600;" id="profile-joined">-</div>
                </div>
              </div>
            </div>

            <!-- Profile Form -->
            <div>
              <div class="card">
                <h3 style="margin-bottom:20px;">Personal Information</h3>
                <form id="profile-form">
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                    <div class="form-group">
                      <label for="info-name">Full Name</label>
                      <input type="text" class="input-field" id="info-name" placeholder="Your full name" />
                    </div>
                    <div class="form-group">
                      <label for="info-email">Email</label>
                      <input type="email" class="input-field" id="info-email" placeholder="your@email.com" disabled style="opacity:0.7;" />
                    </div>
                    <div class="form-group">
                      <label for="info-phone">Phone Number</label>
                      <input type="tel" class="input-field" id="info-phone" placeholder="+91 98765 43210" />
                    </div>
                    <div class="form-group">
                      <label for="info-city">City</label>
                      <input type="text" class="input-field" id="info-city" placeholder="Bhopal" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="info-address">Full Address</label>
                    <textarea class="input-field" id="info-address" placeholder="Enter your full address" style="min-height:80px;"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="info-ward">Ward / Zone Number</label>
                    <input type="text" class="input-field" id="info-ward" placeholder="e.g., Ward 15, Zone A" />
                  </div>
                  <div style="display:flex;gap:12px;justify-content:flex-end;margin-top:8px;">
                    <button type="button" class="btn btn-ghost" onclick="InformationPage.loadProfile()">Cancel</button>
                    <button type="submit" class="btn btn-primary" id="save-profile-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>

              <!-- User's Dynamic Info Display -->
              <div class="card" style="margin-top:16px;">
                <h3 style="margin-bottom:16px;">📊 Your Activity</h3>
                <div id="user-activity" style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
                  <div style="text-align:center;padding:16px;background:var(--bg-secondary);border-radius:12px;">
                    <div style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:800;color:var(--primary-600);" id="user-total">0</div>
                    <div style="font-size:var(--text-xs);color:var(--text-muted);">Total Filed</div>
                  </div>
                  <div style="text-align:center;padding:16px;background:var(--bg-secondary);border-radius:12px;">
                    <div style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:800;color:var(--success-500);" id="user-resolved">0</div>
                    <div style="font-size:var(--text-xs);color:var(--text-muted);">Resolved</div>
                  </div>
                  <div style="text-align:center;padding:16px;background:var(--bg-secondary);border-radius:12px;">
                    <div style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:800;color:var(--warning-500);" id="user-pending">0</div>
                    <div style="font-size:var(--text-xs);color:var(--text-muted);">Pending</div>
                  </div>
                </div>
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

    await InformationPage.loadProfile();
    await InformationPage.loadActivity();

    // Save profile form
    document.getElementById('profile-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('save-profile-btn');
      btn.innerHTML = '<div class="btn-loader"></div> Saving...';
      btn.disabled = true;

      try {
        await DB.updateUserProfile(Auth.currentUser.uid, {
          displayName: document.getElementById('info-name').value.trim(),
          phone: document.getElementById('info-phone').value.trim(),
          city: document.getElementById('info-city').value.trim(),
          address: document.getElementById('info-address').value.trim(),
          ward: document.getElementById('info-ward').value.trim()
        });
        Toast.show('Profile updated successfully! ✓', 'success');
      } catch (e) {
        Toast.show('Failed to save', 'error');
      }

      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Save Changes';
      btn.disabled = false;
    });
  },

  async loadProfile() {
    try {
      const profile = await DB.getUserProfile(Auth.currentUser.uid);
      if (profile) {
        InformationPage.profile = profile;
        document.getElementById('info-name').value = profile.displayName || Auth.currentUser.displayName || '';
        document.getElementById('info-email').value = profile.email || Auth.currentUser.email || '';
        document.getElementById('info-phone').value = profile.phone || '';
        document.getElementById('info-city').value = profile.city || '';
        document.getElementById('info-address').value = profile.address || '';
        document.getElementById('info-ward').value = profile.ward || '';
        if (profile.createdAt) {
          document.getElementById('profile-joined').textContent = Helpers.formatDate(profile.createdAt);
        }
      }
    } catch (e) {
      console.error('Load profile error:', e);
    }
  },

  async loadActivity() {
    try {
      const complaints = await DB.getUserComplaints(Auth.currentUser.uid);
      document.getElementById('user-total').textContent = complaints.length;
      document.getElementById('user-resolved').textContent = complaints.filter(c => c.status === 'resolved').length;
      document.getElementById('user-pending').textContent = complaints.filter(c => c.status === 'pending').length;
    } catch (e) {
      console.error('Load activity error:', e);
    }
  }
};
