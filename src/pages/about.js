/* ============================================
   CITYFIX – About Page
   ============================================ */

const AboutPage = {
  render() {
    return `
      ${Navbar.render()}

      <!-- Hero -->
      <section class="about-hero">
        <div class="container">
          <div class="section-badge" style="background:rgba(59,130,246,0.15);color:var(--accent-400);border:1px solid rgba(59,130,246,0.2);">
            <span>🏙️</span> About CityFix
          </div>
          <h1>Empowering Citizens,<br/><span class="text-gradient">Transforming Cities</span></h1>
          <p>A smart civic platform that bridges the gap between citizens and municipal authorities for efficient problem resolution.</p>
        </div>
      </section>

      <!-- Mission Section -->
      <section class="section" style="background:white;">
        <div class="container">
          <div class="about-grid">
            <div class="about-img-placeholder animate-fade-in-left">
              🏗️
            </div>
            <div class="animate-fade-in-right">
              <div class="section-badge"><span>🎯</span> Our Mission</div>
              <h2 style="margin-bottom:16px;">Making Urban Living Better</h2>
              <p style="margin-bottom:16px;line-height:1.8;">
                CityFix is a municipal problem reporting and resolution platform designed to streamline the process of 
                reporting civic issues. Our system ensures transparency, accountability, and timely resolution through 
                technology-driven solutions.
              </p>
              <p style="margin-bottom:24px;line-height:1.8;">
                With features like GPS-tagged complaints, photographic evidence, real-time tracking, and our unique 
                48-hour escalation system, we ensure that no complaint goes unattended.
              </p>
              <div style="display:flex;gap:24px;">
                <div>
                  <div style="font-family:var(--font-heading);font-size:var(--text-3xl);font-weight:800;color:var(--primary-600);">48h</div>
                  <div style="font-size:var(--text-sm);color:var(--text-muted);">Max Response Time</div>
                </div>
                <div>
                  <div style="font-family:var(--font-heading);font-size:var(--text-3xl);font-weight:800;color:var(--success-500);">95%</div>
                  <div style="font-size:var(--text-sm);color:var(--text-muted);">Resolution Rate</div>
                </div>
                <div>
                  <div style="font-family:var(--font-heading);font-size:var(--text-3xl);font-weight:800;color:var(--accent-500);">24/7</div>
                  <div style="font-size:var(--text-sm);color:var(--text-muted);">Report Anytime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Objectives -->
      <section class="section" style="background:var(--bg-secondary);">
        <div class="container">
          <div class="section-header">
            <div class="section-badge"><span>📋</span> Objectives</div>
            <h2>Project <span class="text-gradient">Objectives</span></h2>
            <p>Key goals that drive the CityFix platform forward.</p>
          </div>
          <div class="grid-3">
            <div class="card animate-fade-in-up">
              <div style="font-size:2rem;margin-bottom:16px;">🤝</div>
              <h4 style="margin-bottom:8px;">Citizen Empowerment</h4>
              <p style="font-size:var(--text-sm);">Enable every citizen to actively participate in civic improvement by making complaint filing effortless and accessible.</p>
            </div>
            <div class="card animate-fade-in-up delay-1">
              <div style="font-size:2rem;margin-bottom:16px;">⚡</div>
              <h4 style="margin-bottom:8px;">Fast Resolution</h4>
              <p style="font-size:var(--text-sm);">Guarantee timely resolution through our 48-hour escalation system that ensures no complaint is left unattended.</p>
            </div>
            <div class="card animate-fade-in-up delay-2">
              <div style="font-size:2rem;margin-bottom:16px;">📊</div>
              <h4 style="margin-bottom:8px;">Data-Driven Governance</h4>
              <p style="font-size:var(--text-sm);">Provide municipal authorities with actionable insights and analytics to improve city services effectively.</p>
            </div>
            <div class="card animate-fade-in-up delay-3">
              <div style="font-size:2rem;margin-bottom:16px;">🔍</div>
              <h4 style="margin-bottom:8px;">Full Transparency</h4>
              <p style="font-size:var(--text-sm);">Real-time status tracking keeps citizens informed at every step of the resolution process.</p>
            </div>
            <div class="card animate-fade-in-up delay-4">
              <div style="font-size:2rem;margin-bottom:16px;">📱</div>
              <h4 style="margin-bottom:8px;">Mobile Accessible</h4>
              <p style="font-size:var(--text-sm);">Fully responsive design ensures seamless access from any device, anywhere, anytime.</p>
            </div>
            <div class="card animate-fade-in-up delay-5">
              <div style="font-size:2rem;margin-bottom:16px;">🌱</div>
              <h4 style="margin-bottom:8px;">Sustainable Cities</h4>
              <p style="font-size:var(--text-sm);">Contributing to UN SDG 11 – making cities inclusive, safe, resilient, and sustainable.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Values -->
      <section class="section" style="background:white;">
        <div class="container">
          <div class="section-header">
            <div class="section-badge"><span>💎</span> Core Values</div>
            <h2>What We <span class="text-gradient">Stand For</span></h2>
          </div>
          <div class="values-grid">
            <div class="feature-card">
              <div class="feature-icon" style="background:var(--primary-50);color:var(--primary-500);">🏛️</div>
              <h4>Accountability</h4>
              <p>Every complaint is tracked, and every authority is held responsible for timely resolution.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon" style="background:var(--success-50);color:var(--success-500);">🤲</div>
              <h4>Inclusivity</h4>
              <p>Simple, accessible interface designed for citizens of all demographics and tech-literacy levels.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon" style="background:var(--warning-50);color:var(--warning-500);">💡</div>
              <h4>Innovation</h4>
              <p>Leveraging technology like GPS, real-time updates, and automated escalation for better governance.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Tech Stack -->
      <section class="section section-dark">
        <div class="container">
          <div class="section-header">
            <div class="section-badge" style="background:rgba(59,130,246,0.15);color:var(--accent-400);border:1px solid rgba(59,130,246,0.2);">
              <span>🛠️</span> Tech Stack
            </div>
            <h2>Built With Modern <span style="background:linear-gradient(135deg,var(--accent-400),var(--success-400));-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Technology</span></h2>
            <p>Our platform is built using industry-standard tools and frameworks.</p>
          </div>
          <div class="grid-4">
            <div class="card-dark" style="text-align:center;padding:32px;">
              <div style="font-size:2.5rem;margin-bottom:12px;">🌐</div>
              <h4 style="color:white;font-size:var(--text-base);margin-bottom:4px;">HTML5 / CSS3</h4>
              <p style="font-size:var(--text-xs);color:var(--neutral-400);">Frontend Structure</p>
            </div>
            <div class="card-dark" style="text-align:center;padding:32px;">
              <div style="font-size:2.5rem;margin-bottom:12px;">⚡</div>
              <h4 style="color:white;font-size:var(--text-base);margin-bottom:4px;">JavaScript</h4>
              <p style="font-size:var(--text-xs);color:var(--neutral-400);">Dynamic Interactivity</p>
            </div>
            <div class="card-dark" style="text-align:center;padding:32px;">
              <div style="font-size:2.5rem;margin-bottom:12px;">🔥</div>
              <h4 style="color:white;font-size:var(--text-base);margin-bottom:4px;">Firebase</h4>
              <p style="font-size:var(--text-xs);color:var(--neutral-400);">Auth + Database</p>
            </div>
            <div class="card-dark" style="text-align:center;padding:32px;">
              <div style="font-size:2.5rem;margin-bottom:12px;">🗺️</div>
              <h4 style="color:white;font-size:var(--text-base);margin-bottom:4px;">Leaflet.js</h4>
              <p style="font-size:var(--text-xs);color:var(--neutral-400);">Map Integration</p>
            </div>
          </div>
        </div>
      </section>

      ${Footer.render()}
    `;
  },

  init() {
    Navbar.init();
  }
};
