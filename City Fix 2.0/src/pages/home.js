/* ============================================
   CITYFIX – Home Page
   ============================================ */

const HomePage = {
  render() {
    return `
      ${Navbar.render()}

      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-bg-pattern"></div>
        <div class="hero-grid-lines"></div>
        <div class="container">
          <div class="hero-content">
            <div class="hero-text">
              <div class="hero-badge">
                <span>🚀</span> Smart City Initiative
              </div>
              <h1 class="hero-title">
                Fix Your City,<br/>
                <span class="highlight">One Report at a Time</span>
              </h1>
              <p class="hero-description">
                Report municipal issues like potholes, garbage, water leaks, and broken streetlights. 
                Track progress in real-time with our 48-hour resolution guarantee.
              </p>
              <div class="hero-actions">
                <a href="#/submit-complaint" class="btn btn-accent btn-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
                  Report an Issue
                </a>
                <a href="#/about" class="btn btn-white btn-lg">
                  Learn More →
                </a>
              </div>
              <div class="hero-stats">
                <div class="hero-stat">
                  <div class="hero-stat-value" data-count="5280">0</div>
                  <div class="hero-stat-label">Issues Reported</div>
                </div>
                <div class="hero-stat">
                  <div class="hero-stat-value" data-count="4120">0</div>
                  <div class="hero-stat-label">Issues Resolved</div>
                </div>
                <div class="hero-stat">
                  <div class="hero-stat-value" data-count="98">0</div>
                  <div class="hero-stat-label">% Satisfaction</div>
                </div>
              </div>
            </div>
            <div class="hero-visual">
              <div class="hero-illustration">
                <div class="hero-illustration-card">
                  <div class="hero-card-content">
                    <div class="hero-card-header">
                      <div class="hero-card-dot" style="background:var(--success-400);"></div>
                      <div class="hero-card-dot" style="background:var(--warning-400);"></div>
                      <div class="hero-card-dot" style="background:var(--danger-400);"></div>
                      <span class="hero-card-title" style="margin-left:8px;">Live Dashboard</span>
                    </div>
                    <div class="hero-mini-cards">
                      <div class="hero-mini-card">
                        <div class="mini-icon">🕳️</div>
                        <div class="mini-label">Potholes</div>
                        <div class="mini-value">142</div>
                      </div>
                      <div class="hero-mini-card">
                        <div class="mini-icon">🗑️</div>
                        <div class="mini-label">Garbage</div>
                        <div class="mini-value">89</div>
                      </div>
                      <div class="hero-mini-card">
                        <div class="mini-icon">💧</div>
                        <div class="mini-label">Water Leak</div>
                        <div class="mini-value">56</div>
                      </div>
                      <div class="hero-mini-card">
                        <div class="mini-icon">💡</div>
                        <div class="mini-label">Streetlights</div>
                        <div class="mini-value">33</div>
                      </div>
                    </div>
                    <div style="margin-top:16px;padding:12px;background:rgba(16,185,129,0.15);border-radius:8px;border:1px solid rgba(16,185,129,0.2);">
                      <div style="display:flex;align-items:center;gap:8px;">
                        <span style="color:var(--success-400);">✓</span>
                        <span style="color:var(--success-400);font-size:13px;font-weight:600;">78% resolved within 48 hrs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section section">
        <div class="container">
          <div class="section-header">
            <div class="section-badge">
              <span>⚡</span> Why CityFix
            </div>
            <h2>Smart Solutions for <span class="text-gradient">Urban Problems</span></h2>
            <p>Our platform bridges the gap between citizens and municipal authorities with cutting-edge technology.</p>
          </div>
          <div class="grid-4">
            <div class="feature-card animate-fade-in-up">
              <div class="feature-icon" style="background:var(--primary-50);color:var(--primary-500);">📸</div>
              <h4>Photo Evidence</h4>
              <p>Upload images of issues directly from your phone for quick verification.</p>
            </div>
            <div class="feature-card animate-fade-in-up delay-1">
              <div class="feature-icon" style="background:var(--success-50);color:var(--success-500);">📍</div>
              <h4>GPS Location</h4>
              <p>Auto-detect issue locations with precise GPS mapping for faster response.</p>
            </div>
            <div class="feature-card animate-fade-in-up delay-2">
              <div class="feature-icon" style="background:var(--accent-50, #ecfeff);color:var(--accent-500);">📊</div>
              <h4>Real-Time Tracking</h4>
              <p>Monitor your complaint status from submission to resolution in real-time.</p>
            </div>
            <div class="feature-card animate-fade-in-up delay-3">
              <div class="feature-icon" style="background:var(--danger-50);color:var(--danger-500);">⏰</div>
              <h4>48-Hour Escalation</h4>
              <p>Unresolved issues are automatically escalated to higher authorities.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section class="how-it-works section">
        <div class="container">
          <div class="section-header">
            <div class="section-badge">
              <span>🔄</span> How It Works
            </div>
            <h2>Report Issues in <span class="text-gradient">3 Simple Steps</span></h2>
            <p>Our streamlined process makes civic problem reporting quick and effective.</p>
          </div>
          <div class="steps-grid">
            <div class="step-card animate-fade-in-up">
              <div class="step-num">1</div>
              <h4>Report the Problem</h4>
              <p>Take a photo, pin the location, and describe the issue in detail.</p>
            </div>
            <div class="step-card animate-fade-in-up delay-1">
              <div class="step-num" style="background:linear-gradient(135deg, var(--accent-500), var(--success-500));">2</div>
              <h4>Track Progress</h4>
              <p>Get real-time updates as municipal teams acknowledge and work on your report.</p>
            </div>
            <div class="step-card animate-fade-in-up delay-2">
              <div class="step-num" style="background:linear-gradient(135deg, var(--success-500), #10b981);">3</div>
              <h4>Issue Resolved</h4>
              <p>Receive confirmation when the problem is fixed. Rate the resolution quality.</p>
            </div>
            <div class="step-card animate-fade-in-up delay-3">
              <div class="step-num" style="background:linear-gradient(135deg, var(--warning-500), var(--danger-500));">⚡</div>
              <h4>Auto-Escalation</h4>
              <p>If not resolved in 48 hours, the issue is automatically escalated to senior officials.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="stats-section">
        <div class="container">
          <div class="stats-grid">
            <div class="stats-item animate-fade-in-up">
              <div class="stats-value" data-count="12500">0</div>
              <div class="stats-label">Citizens Registered</div>
            </div>
            <div class="stats-item animate-fade-in-up delay-1">
              <div class="stats-value" data-count="5280">0</div>
              <div class="stats-label">Complaints Filed</div>
            </div>
            <div class="stats-item animate-fade-in-up delay-2">
              <div class="stats-value" data-count="4120">0</div>
              <div class="stats-label">Issues Resolved</div>
            </div>
            <div class="stats-item animate-fade-in-up delay-3">
              <div class="stats-value" data-count="15">0</div>
              <div class="stats-label">City Zones Covered</div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-card animate-scale-in">
            <h2>🏗️ Ready to Make Your City Better?</h2>
            <p>Join thousands of active citizens who are helping build a smarter, cleaner city.</p>
            <div style="display:flex;gap:16px;justify-content:center;position:relative;z-index:1;">
              <a href="#/register" class="btn btn-white btn-lg">Get Started Free</a>
              <a href="#/about" class="btn btn-lg" style="background:rgba(255,255,255,0.15);color:white;border:1px solid rgba(255,255,255,0.3);">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      ${Footer.render()}
    `;
  },

  init() {
    Navbar.init();
    HomePage.animateCounters();
  },

  animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-count'));
          Helpers.animateCounter(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }
};
