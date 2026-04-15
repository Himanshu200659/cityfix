/* ============================================
   CITYFIX – Contact Us Page
   ============================================ */

const ContactPage = {
  render() {
    return `
      ${Navbar.render()}

      <section class="about-hero">
        <div class="container">
          <div class="section-badge" style="background:rgba(59,130,246,0.15);color:var(--accent-400);border:1px solid rgba(59,130,246,0.2);">
            <span>📞</span> Get In Touch
          </div>
          <h1>Contact <span class="text-gradient">Us</span></h1>
          <p>Have questions or feedback? We'd love to hear from you.</p>
        </div>
      </section>

      <section class="section" style="background:white;">
        <div class="container">
          <div class="contact-grid">
            <!-- Contact Info -->
            <div>
              <h3 style="margin-bottom:8px;">Reach Out to Us</h3>
              <p style="margin-bottom:24px;">Choose your preferred way to contact us and we'll get back to you within 24 hours.</p>

              <div class="contact-info-cards">
                <div class="contact-info-card">
                  <div class="contact-icon">📍</div>
                  <div>
                    <h4 style="font-size:var(--text-base);margin-bottom:4px;">Office Address</h4>
                    <p style="font-size:var(--text-sm);">Municipal Corporation Building,<br/>City Hall, Bhopal, M.P. 462001</p>
                  </div>
                </div>
                <div class="contact-info-card">
                  <div class="contact-icon" style="background:var(--success-50);color:var(--success-600);">📞</div>
                  <div>
                    <h4 style="font-size:var(--text-base);margin-bottom:4px;">Phone</h4>
                    <p style="font-size:var(--text-sm);">+91 98765 43210<br/>+91 0755 2540000</p>
                  </div>
                </div>
                <div class="contact-info-card">
                  <div class="contact-icon" style="background:var(--accent-50, #ecfeff);color:var(--accent-600);">📧</div>
                  <div>
                    <h4 style="font-size:var(--text-base);margin-bottom:4px;">Email</h4>
                    <p style="font-size:var(--text-sm);">support@cityfix.gov.in<br/>admin@cityfix.gov.in</p>
                  </div>
                </div>
                <div class="contact-info-card">
                  <div class="contact-icon" style="background:var(--warning-50);color:var(--warning-600);">🕐</div>
                  <div>
                    <h4 style="font-size:var(--text-base);margin-bottom:4px;">Working Hours</h4>
                    <p style="font-size:var(--text-sm);">Monday – Saturday: 9:00 AM – 6:00 PM<br/>Sunday: Closed (Emergency: 24/7)</p>
                  </div>
                </div>
              </div>

              <!-- Map -->
              <div class="map-container" id="contact-map" style="margin-top:20px;height:220px;border-radius:12px;"></div>
            </div>

            <!-- Contact Form -->
            <div>
              <div class="card" style="padding:32px;">
                <h3 style="margin-bottom:4px;">Send a Message</h3>
                <p style="margin-bottom:24px;font-size:var(--text-sm);">Fill out the form below and we'll respond promptly.</p>

                <form id="contact-form">
                  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
                    <div class="form-group">
                      <label for="contact-name">Your Name</label>
                      <input type="text" class="input-field" id="contact-name" placeholder="John Doe" required />
                    </div>
                    <div class="form-group">
                      <label for="contact-email">Email Address</label>
                      <input type="email" class="input-field" id="contact-email" placeholder="you@example.com" required />
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="contact-subject">Subject</label>
                    <select class="input-field" id="contact-subject">
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="complaint">Complaint Follow-up</option>
                      <option value="feedback">Feedback</option>
                      <option value="technical">Technical Issue</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="contact-message">Message</label>
                    <textarea class="input-field" id="contact-message" placeholder="Write your message here..." required style="min-height:150px;"></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary btn-lg" style="width:100%;" id="contact-submit-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      ${Footer.render()}
    `;
  },

  init() {
    Navbar.init();

    // Init map
    setTimeout(() => {
      const mapEl = document.getElementById('contact-map');
      if (mapEl) {
        const map = L.map('contact-map').setView([23.2599, 77.4126], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap'
        }).addTo(map);
        L.marker([23.2599, 77.4126]).addTo(map)
          .bindPopup('<strong>CityFix HQ</strong><br>Municipal Corporation, Bhopal').openPopup();
      }
    }, 200);

    // Form submit
    document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('contact-submit-btn');
      btn.innerHTML = '<div class="btn-loader"></div> Sending...';
      btn.disabled = true;

      try {
        await DB.submitContactForm({
          name: document.getElementById('contact-name').value.trim(),
          email: document.getElementById('contact-email').value.trim(),
          subject: document.getElementById('contact-subject').value,
          message: document.getElementById('contact-message').value.trim()
        });
        Toast.show('Message sent successfully! We\'ll get back to you soon. ✉️', 'success');
        document.getElementById('contact-form').reset();
      } catch (e) {
        Toast.show('Failed to send message. Please try again.', 'error');
      }

      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg> Send Message';
      btn.disabled = false;
    });

    // Auto-fill if logged in
    if (Auth.currentUser) {
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      if (nameInput && !nameInput.value) nameInput.value = Auth.currentUser.displayName || '';
      if (emailInput && !emailInput.value) emailInput.value = Auth.currentUser.email || '';
    }
  }
};
