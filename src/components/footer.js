/* ============================================
   CITYFIX – Footer Component
   ============================================ */

const Footer = {
  render() {
    return `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a href="#/home" class="nav-brand" style="margin-bottom:16px;">
                <span class="nav-brand-icon">🏙️</span>
                <span class="nav-brand-text">CityFix</span>
              </a>
              <p>Empowering citizens to report and track municipal issues for a smarter, cleaner, and better-maintained city.</p>
              <div class="footer-social">
                <a href="#" class="social-icon" aria-label="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="#" class="social-icon" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" class="social-icon" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="20" x="2" y="2" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
                </a>
                <a href="#" class="social-icon" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>
            </div>
            <div class="footer-col">
              <h4>Quick Links</h4>
              <div class="footer-links">
                <a href="#/home" class="footer-link">Home</a>
                <a href="#/about" class="footer-link">About Us</a>
                <a href="#/contact" class="footer-link">Contact</a>
                <a href="#/faq" class="footer-link">FAQ</a>
              </div>
            </div>
            <div class="footer-col">
              <h4>Services</h4>
              <div class="footer-links">
                <a href="#/submit-complaint" class="footer-link">Report Issue</a>
                <a href="#/dashboard" class="footer-link">Track Complaint</a>
                <a href="#/information" class="footer-link">My Profile</a>
                <a href="#/login" class="footer-link">Login</a>
              </div>
            </div>
            <div class="footer-col">
              <h4>Contact Info</h4>
              <div class="footer-links">
                <span class="footer-link">📍 City Hall, Bhopal, M.P.</span>
                <span class="footer-link">📞 +91 98765 43210</span>
                <span class="footer-link">📧 support@cityfix.gov.in</span>
                <span class="footer-link">🕐 Mon-Sat: 9AM - 6PM</span>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2025 CityFix. All rights reserved. | Smart City Initiative</p>
            <p style="display:flex;gap:16px;">
              <a href="#" class="footer-link">Privacy Policy</a>
              <a href="#" class="footer-link">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>
    `;
  }
};
