/* ============================================
   CITYFIX – Login Page
   ============================================ */

const LoginPage = {
  render() {
    return `
      ${Navbar.render()}

      <section class="auth-page">
        <div class="auth-visual">
          <div class="auth-visual-content">
            <span class="auth-visual-icon">🏙️</span>
            <h2>Welcome Back to CityFix</h2>
            <p>Sign in to track your complaints, report new issues, and contribute to a smarter city.</p>
            <div style="margin-top:40px;display:flex;gap:20px;justify-content:center;">
              <div style="text-align:center;">
                <div style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:800;color:white;">5K+</div>
                <div style="font-size:var(--text-sm);color:var(--neutral-400);">Active Users</div>
              </div>
              <div style="text-align:center;">
                <div style="font-family:var(--font-heading);font-size:var(--text-2xl);font-weight:800;color:white;">98%</div>
                <div style="font-size:var(--text-sm);color:var(--neutral-400);">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        <div class="auth-form-side">
          <div class="auth-form-container">
            <h1>Sign In</h1>
            <p class="auth-subtitle">Enter your credentials to access your account</p>

            <button class="google-btn" id="google-login-btn">
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              Continue with Google
            </button>

            <div class="divider"><span>or sign in with email</span></div>

            <form id="login-form">
              <div class="form-group">
                <label for="login-email">Email Address</label>
                <div class="input-icon-wrapper">
                  <span class="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </span>
                  <input type="email" class="input-field" id="login-email" placeholder="you@example.com" required />
                </div>
                <span class="input-error">Please enter a valid email</span>
              </div>

              <div class="form-group">
                <label for="login-password">Password</label>
                <div class="input-icon-wrapper">
                  <span class="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </span>
                  <input type="password" class="input-field" id="login-password" placeholder="Enter your password" required />
                </div>
                <span class="input-error">Password is required</span>
              </div>

              <div class="remember-row">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#" id="forgot-password-link">Forgot password?</a>
              </div>

              <button type="submit" class="btn btn-primary btn-lg" style="width:100%;" id="login-submit-btn">
                Sign In
              </button>
            </form>

            <div class="auth-footer">
              Don't have an account? <a href="#/register">Create one</a>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init() {
    Navbar.init();

    // Google login
    document.getElementById('google-login-btn')?.addEventListener('click', async () => {
      try {
        await Auth.signInWithGoogle();
        Router.navigate('dashboard');
      } catch (e) { /* handled in Auth */ }
    });

    // Email login
    document.getElementById('login-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      
      if (!Helpers.isValidEmail(email)) {
        document.getElementById('login-email').classList.add('error');
        return;
      }

      const btn = document.getElementById('login-submit-btn');
      btn.innerHTML = '<div class="btn-loader"></div> Signing in...';
      btn.disabled = true;

      try {
        await Auth.signInWithEmail(email, password);
        Router.navigate('dashboard');
      } catch (e) {
        btn.innerHTML = 'Sign In';
        btn.disabled = false;
      }
    });

    // Forgot password
    document.getElementById('forgot-password-link')?.addEventListener('click', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      if (!email) {
        Toast.show('Enter your email address first', 'warning');
        document.getElementById('login-email').focus();
        return;
      }
      Auth.resetPassword(email);
    });

    // Clear error on input
    document.querySelectorAll('.input-field').forEach(input => {
      input.addEventListener('input', () => input.classList.remove('error'));
    });
  }
};
