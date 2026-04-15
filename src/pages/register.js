/* ============================================
   CITYFIX – Register Page
   ============================================ */

const RegisterPage = {
  render() {
    return `
      ${Navbar.render()}

      <section class="auth-page">
        <div class="auth-visual">
          <div class="auth-visual-content">
            <span class="auth-visual-icon">🌟</span>
            <h2>Join the Movement</h2>
            <p>Create your account and start making a difference in your community today.</p>
            <div style="margin-top:40px;">
              <div style="display:flex;flex-direction:column;gap:16px;text-align:left;">
                <div style="display:flex;align-items:center;gap:12px;">
                  <span style="background:rgba(16,185,129,0.2);padding:8px;border-radius:8px;">✓</span>
                  <span style="color:var(--neutral-300);font-size:var(--text-sm);">Free to use, always</span>
                </div>
                <div style="display:flex;align-items:center;gap:12px;">
                  <span style="background:rgba(16,185,129,0.2);padding:8px;border-radius:8px;">✓</span>
                  <span style="color:var(--neutral-300);font-size:var(--text-sm);">Track complaints in real-time</span>
                </div>
                <div style="display:flex;align-items:center;gap:12px;">
                  <span style="background:rgba(16,185,129,0.2);padding:8px;border-radius:8px;">✓</span>
                  <span style="color:var(--neutral-300);font-size:var(--text-sm);">48-hour resolution guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="auth-form-side">
          <div class="auth-form-container">
            <h1>Create Account</h1>
            <p class="auth-subtitle">Fill in your details to get started</p>

            <button class="google-btn" id="google-register-btn">
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              Continue with Google
            </button>

            <div class="divider"><span>or register with email</span></div>

            <form id="register-form">
              <div class="form-group">
                <label for="register-name">Full Name</label>
                <div class="input-icon-wrapper">
                  <span class="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </span>
                  <input type="text" class="input-field" id="register-name" placeholder="John Doe" required />
                </div>
              </div>

              <div class="form-group">
                <label for="register-email">Email Address</label>
                <div class="input-icon-wrapper">
                  <span class="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </span>
                  <input type="email" class="input-field" id="register-email" placeholder="you@example.com" required />
                </div>
                <span class="input-error">Please enter a valid email</span>
              </div>

              <div class="form-group">
                <label for="register-phone">Phone Number</label>
                <div class="input-icon-wrapper">
                  <span class="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </span>
                  <input type="tel" class="input-field" id="register-phone" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div class="form-group">
                <label for="register-password">Password</label>
                <div class="input-icon-wrapper">
                  <span class="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </span>
                  <input type="password" class="input-field" id="register-password" placeholder="Min. 8 characters" required />
                </div>
                <div class="password-strength" id="password-strength">
                  <div class="strength-bar" id="str-bar-1"></div>
                  <div class="strength-bar" id="str-bar-2"></div>
                  <div class="strength-bar" id="str-bar-3"></div>
                </div>
                <div class="strength-text" id="strength-text"></div>
              </div>

              <div class="form-group">
                <label style="display:flex;align-items:flex-start;gap:8px;cursor:pointer;font-weight:400;font-size:var(--text-sm);color:var(--text-secondary);">
                  <input type="checkbox" id="register-terms" style="margin-top:3px;" />
                  I agree to the <a href="#" style="color:var(--primary-600);">Terms of Service</a> and <a href="#" style="color:var(--primary-600);">Privacy Policy</a>
                </label>
              </div>

              <button type="submit" class="btn btn-primary btn-lg" style="width:100%;" id="register-submit-btn">
                Create Account
              </button>
            </form>

            <div class="auth-footer">
              Already have an account? <a href="#/login">Sign in</a>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init() {
    Navbar.init();

    // Google register
    document.getElementById('google-register-btn')?.addEventListener('click', async () => {
      try {
        await Auth.signInWithGoogle();
        Router.navigate('dashboard');
      } catch (e) { /* handled in Auth */ }
    });

    // Password strength indicator
    document.getElementById('register-password')?.addEventListener('input', (e) => {
      const strength = Helpers.getPasswordStrength(e.target.value);
      const bars = [
        document.getElementById('str-bar-1'),
        document.getElementById('str-bar-2'),
        document.getElementById('str-bar-3')
      ];
      const text = document.getElementById('strength-text');

      bars.forEach((bar, i) => {
        bar.className = 'strength-bar';
        if (i < strength.score) bar.classList.add(strength.level);
      });

      text.textContent = e.target.value ? strength.text : '';
      text.style.color = strength.level === 'weak' ? 'var(--danger-500)' 
        : strength.level === 'medium' ? 'var(--warning-500)' 
        : 'var(--success-500)';
    });

    // Form submit
    document.getElementById('register-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('register-name').value.trim();
      const email = document.getElementById('register-email').value.trim();
      const password = document.getElementById('register-password').value;
      const terms = document.getElementById('register-terms').checked;

      if (!name) { Toast.show('Please enter your name', 'warning'); return; }
      if (!Helpers.isValidEmail(email)) {
        document.getElementById('register-email').classList.add('error');
        return;
      }
      if (password.length < 6) { Toast.show('Password must be at least 6 characters', 'warning'); return; }
      if (!terms) { Toast.show('Please agree to the terms', 'warning'); return; }

      const btn = document.getElementById('register-submit-btn');
      btn.innerHTML = '<div class="btn-loader"></div> Creating account...';
      btn.disabled = true;

      try {
        await Auth.registerWithEmail(email, password, name);
        // Save phone number
        const phone = document.getElementById('register-phone').value.trim();
        if (phone && Auth.currentUser) {
          await DB.updateUserProfile(Auth.currentUser.uid, { phone, displayName: name });
        }
        Router.navigate('dashboard');
      } catch (e) {
        btn.innerHTML = 'Create Account';
        btn.disabled = false;
      }
    });

    // Clear error on input
    document.querySelectorAll('.input-field').forEach(input => {
      input.addEventListener('input', () => input.classList.remove('error'));
    });
  }
};
