/* ============================================
   CITYFIX – Admin Login Page
   ============================================
   Dedicated login for municipal officers/admins
   with username, password, and officer position.
*/

const AdminLoginPage = {
  // Pre-configured admin credentials
  // In production, these would be stored securely in a backend
  adminCredentials: [
    { username: 'admin', password: 'admin123', name: 'Chief Municipal Officer', position: 'CMO', department: 'Municipal Corporation' },
    { username: 'officer1', password: 'officer123', name: 'Rajesh Kumar', position: 'Ward Officer', department: 'Ward 5 – Sanitation' },
    { username: 'officer2', password: 'officer123', name: 'Priya Sharma', position: 'Junior Engineer', department: 'Roads & Infrastructure' },
    { username: 'officer3', password: 'officer123', name: 'Amit Verma', position: 'Health Inspector', department: 'Public Health' },
    { username: 'supervisor', password: 'super123', name: 'Sunil Patel', position: 'Zone Supervisor', department: 'Zone B – Maintenance' },
  ],

  render() {
    return `
      ${Navbar.render()}

      <section class="auth-page">
        <!-- Left Visual Panel -->
        <div class="auth-visual" style="background:linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0c4a6e 100%);">
          <div class="auth-visual-content">
            <span class="auth-visual-icon">🛡️</span>
            <h2>Admin Portal</h2>
            <p style="margin-bottom:32px;">Authorized access for municipal officers and administrators only.</p>
            
            <div style="text-align:left;display:flex;flex-direction:column;gap:16px;">
              <div style="display:flex;align-items:center;gap:14px;background:rgba(255,255,255,0.06);padding:14px 18px;border-radius:12px;border:1px solid rgba(255,255,255,0.08);">
                <span style="font-size:1.3rem;">📊</span>
                <div>
                  <div style="color:white;font-weight:600;font-size:14px;">Manage Complaints</div>
                  <div style="color:var(--neutral-400);font-size:12px;">Review, assign & resolve citizen issues</div>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:14px;background:rgba(255,255,255,0.06);padding:14px 18px;border-radius:12px;border:1px solid rgba(255,255,255,0.08);">
                <span style="font-size:1.3rem;">⚡</span>
                <div>
                  <div style="color:white;font-weight:600;font-size:14px;">Escalation Alerts</div>
                  <div style="color:var(--neutral-400);font-size:12px;">48-hour auto-escalation monitoring</div>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:14px;background:rgba(255,255,255,0.06);padding:14px 18px;border-radius:12px;border:1px solid rgba(255,255,255,0.08);">
                <span style="font-size:1.3rem;">📈</span>
                <div>
                  <div style="color:white;font-weight:600;font-size:14px;">Analytics Dashboard</div>
                  <div style="color:var(--neutral-400);font-size:12px;">Real-time stats and reports</div>
                </div>
              </div>
            </div>

            <div style="margin-top:36px;padding:16px;background:rgba(239,68,68,0.1);border:1px solid rgba(239,68,68,0.2);border-radius:12px;">
              <p style="color:#fca5a5;font-size:12px;margin:0;">
                ⚠️ Unauthorized access is strictly prohibited and may result in legal action under the IT Act, 2000.
              </p>
            </div>
          </div>
        </div>

        <!-- Right Login Form -->
        <div class="auth-form-side">
          <div class="auth-form-container" style="max-width:440px;">
            <!-- Admin Badge -->
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:24px;">
              <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,var(--primary-600),var(--accent-600));display:flex;align-items:center;justify-content:center;">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
              </div>
              <div>
                <h1 style="font-size:var(--text-2xl);margin-bottom:0;">Officer Login</h1>
                <p style="font-size:var(--text-sm);color:var(--text-muted);margin:0;">Municipal Administration Panel</p>
              </div>
            </div>

            <form id="admin-login-form">
              <!-- Username -->
              <div class="form-group">
                <label for="admin-username">Officer ID / Username</label>
                <div class="input-icon-wrapper">
                  <span class="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </span>
                  <input type="text" class="input-field" id="admin-username" placeholder="Enter your officer ID" required autocomplete="username" />
                </div>
              </div>

              <!-- Password -->
              <div class="form-group">
                <label for="admin-password">Password</label>
                <div class="input-icon-wrapper">
                  <span class="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </span>
                  <input type="password" class="input-field" id="admin-password" placeholder="Enter your password" required autocomplete="current-password" />
                </div>
              </div>

              <!-- Officer Position (Display/Select) -->
              <div class="form-group">
                <label for="admin-position">Officer Position</label>
                <div class="input-icon-wrapper">
                  <span class="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                  </span>
                  <select class="input-field" id="admin-position" style="padding-left:44px;" required>
                    <option value="">Select your position</option>
                    <option value="CMO">Chief Municipal Officer (CMO)</option>
                    <option value="Ward Officer">Ward Officer</option>
                    <option value="Zone Supervisor">Zone Supervisor</option>
                    <option value="Junior Engineer">Junior Engineer</option>
                    <option value="Health Inspector">Health Inspector</option>
                    <option value="Sanitation Officer">Sanitation Officer</option>
                    <option value="Assistant Engineer">Assistant Engineer</option>
                    <option value="Executive Engineer">Executive Engineer</option>
                    <option value="Commissioner">Municipal Commissioner</option>
                  </select>
                </div>
              </div>

              <!-- Remember & Error -->
              <div class="remember-row">
                <label>
                  <input type="checkbox" id="admin-remember" /> Remember me
                </label>
              </div>

              <!-- Login Error Message -->
              <div id="admin-login-error" style="display:none;background:var(--danger-50);border:1px solid var(--danger-400);border-radius:10px;padding:12px 16px;margin-bottom:16px;font-size:13px;color:var(--danger-600);display:none;">
                <strong>⚠ Login Failed:</strong> <span id="admin-error-msg"></span>
              </div>

              <button type="submit" class="btn btn-primary btn-lg" style="width:100%;" id="admin-login-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                Sign In as Officer
              </button>
            </form>

            <!-- Demo Credentials -->
            <div style="margin-top:24px;padding:16px;background:var(--bg-secondary);border-radius:12px;border:1px solid var(--border-color);">
              <div style="font-size:12px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:10px;">
                🔑 Demo Credentials
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
                <button class="btn btn-ghost btn-sm" style="justify-content:flex-start;font-size:12px;padding:8px 12px;" onclick="AdminLoginPage.fillDemo('admin','admin123','CMO')">
                  <span style="color:var(--primary-500);font-weight:700;">CMO</span> admin / admin123
                </button>
                <button class="btn btn-ghost btn-sm" style="justify-content:flex-start;font-size:12px;padding:8px 12px;" onclick="AdminLoginPage.fillDemo('officer1','officer123','Ward Officer')">
                  <span style="color:var(--primary-500);font-weight:700;">Ward</span> officer1 / officer123
                </button>
                <button class="btn btn-ghost btn-sm" style="justify-content:flex-start;font-size:12px;padding:8px 12px;" onclick="AdminLoginPage.fillDemo('officer2','officer123','Junior Engineer')">
                  <span style="color:var(--primary-500);font-weight:700;">JE</span> officer2 / officer123
                </button>
                <button class="btn btn-ghost btn-sm" style="justify-content:flex-start;font-size:12px;padding:8px 12px;" onclick="AdminLoginPage.fillDemo('supervisor','super123','Zone Supervisor')">
                  <span style="color:var(--primary-500);font-weight:700;">Sup.</span> supervisor / super123
                </button>
              </div>
            </div>

            <div class="auth-footer" style="margin-top:20px;">
              <p style="color:var(--text-muted);font-size:13px;">
                Are you a citizen? <a href="#/login">Login here</a> | <a href="#/home">Back to Home</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init() {
    Navbar.init();

    // Form submit
    document.getElementById('admin-login-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      AdminLoginPage.handleLogin();
    });

    // Clear error on input
    document.querySelectorAll('#admin-login-form .input-field').forEach(input => {
      input.addEventListener('input', () => {
        document.getElementById('admin-login-error').style.display = 'none';
      });
    });
  },

  fillDemo(username, password, position) {
    document.getElementById('admin-username').value = username;
    document.getElementById('admin-password').value = password;
    document.getElementById('admin-position').value = position;
  },

  showError(msg) {
    const errorDiv = document.getElementById('admin-login-error');
    const errorMsg = document.getElementById('admin-error-msg');
    if (errorDiv && errorMsg) {
      errorMsg.textContent = msg;
      errorDiv.style.display = 'block';
    }
  },

  async handleLogin() {
    const username = document.getElementById('admin-username').value.trim().toLowerCase();
    const password = document.getElementById('admin-password').value;
    const position = document.getElementById('admin-position').value;

    if (!username || !password || !position) {
      AdminLoginPage.showError('Please fill in all fields.');
      return;
    }

    const btn = document.getElementById('admin-login-btn');
    btn.innerHTML = '<div class="btn-loader"></div> Authenticating...';
    btn.disabled = true;

    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));

    // Validate credentials
    const officer = AdminLoginPage.adminCredentials.find(
      c => c.username === username && c.password === password
    );

    if (!officer) {
      AdminLoginPage.showError('Invalid username or password. Please try again.');
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg> Sign In as Officer';
      btn.disabled = false;
      return;
    }

    // Validate position matches
    if (officer.position !== position) {
      AdminLoginPage.showError('Officer position does not match your credentials.');
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg> Sign In as Officer';
      btn.disabled = false;
      return;
    }

    // Store admin session
    AdminSession.login(officer);

  }
};
