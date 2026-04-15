/* ============================================
   CITYFIX – FAQ Page
   ============================================ */

const FaqPage = {
  faqs: [
    {
      category: 'General',
      items: [
        { q: 'What is CityFix?', a: 'CityFix is a smart municipal problem reporting and resolution platform that allows citizens to report civic issues like potholes, garbage, water leaks, and streetlight problems directly to municipal authorities.' },
        { q: 'Is CityFix free to use?', a: 'Yes! CityFix is completely free for all citizens. Our goal is to make civic problem reporting accessible to everyone.' },
        { q: 'Which cities does CityFix cover?', a: 'Currently CityFix is available in Bhopal and surrounding areas. We are working to expand to more cities across India.' },
        { q: 'How does the Smart City initiative relate to CityFix?', a: 'CityFix is designed as part of the Smart City initiative, leveraging technology to improve urban governance, transparency, and citizen engagement.' }
      ]
    },
    {
      category: 'Complaints',
      items: [
        { q: 'How do I report an issue?', a: 'Simply sign up, click "Report Issue", select the category, upload a photo, pin the location on the map, and describe the problem. Your complaint will be submitted with a unique tracking ID.' },
        { q: 'What types of issues can I report?', a: 'You can report garbage/waste issues, potholes/road damage, water leakage, broken streetlights, sewage/drainage problems, and other municipal issues.' },
        { q: 'Can I upload photos with my complaint?', a: 'Yes! We strongly encourage uploading photos as evidence. This helps municipal teams verify and prioritize issues quickly.' },
        { q: 'How is my complaint location tracked?', a: 'You can either auto-detect your location using GPS or manually pin the location on our interactive map. This ensures precise location tagging for faster response.' }
      ]
    },
    {
      category: 'Tracking',
      items: [
        { q: 'How do I track my complaint status?', a: 'After logging in, go to your Dashboard or the "Track Status" page. You\'ll see real-time status updates: Pending → Acknowledged → In Progress → Resolved.' },
        { q: 'What is the 48-hour escalation system?', a: 'If your complaint is not addressed within 48 hours, it is automatically escalated to higher authorities. You\'ll see an escalation indicator on your complaint.' },
        { q: 'Will I be notified when my complaint is resolved?', a: 'Yes, you can check your dashboard for real-time status updates. The status will change to "Resolved" once the issue has been fixed.' }
      ]
    },
    {
      category: 'Account',
      items: [
        { q: 'How do I create an account?', a: 'You can sign up using your email and password, or quickly register with your Google account.' },
        { q: 'I forgot my password. What do I do?', a: 'On the login page, click "Forgot Password?" and enter your email. You\'ll receive a password reset link.' },
        { q: 'Can I update my profile information?', a: 'Yes! Go to the "My Profile" section in your dashboard to update your name, phone number, address, and ward information.' },
        { q: 'How do I become an admin?', a: 'Admin access is restricted to authorized municipal officials. If you are an official, contact the system administrator for an authorization code.' }
      ]
    },
    {
      category: 'Technical',
      items: [
        { q: 'What browsers are supported?', a: 'CityFix works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience.' },
        { q: 'Is CityFix mobile-friendly?', a: 'Absolutely! CityFix is fully responsive and works seamlessly on mobile phones, tablets, and desktops.' },
        { q: 'Is my data secure?', a: 'Yes. We use Firebase (Google Cloud) for secure data storage and authentication. Your personal information is encrypted and protected.' }
      ]
    }
  ],

  activeCategory: 'General',

  render() {
    return `
      ${Navbar.render()}

      <section class="about-hero">
        <div class="container">
          <div class="section-badge" style="background:rgba(59,130,246,0.15);color:var(--accent-400);border:1px solid rgba(59,130,246,0.2);">
            <span>❓</span> Help Center
          </div>
          <h1>Frequently Asked <span class="text-gradient">Questions</span></h1>
          <p>Find answers to common questions about CityFix.</p>
        </div>
      </section>

      <section class="section" style="background:white;">
        <div class="container">
          <!-- Search -->
          <div style="max-width:500px;margin:0 auto var(--space-8);">
            <div class="search-bar" style="max-width:100%;">
              <span class="search-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </span>
              <input type="text" placeholder="Search FAQs..." id="faq-search" style="border-radius:var(--radius-md);" />
            </div>
          </div>

          <!-- Categories -->
          <div class="faq-categories">
            ${FaqPage.faqs.map(cat => `
              <button class="chip ${cat.category === FaqPage.activeCategory ? 'active' : ''}" data-category="${cat.category}">
                ${cat.category}
              </button>
            `).join('')}
          </div>

          <!-- FAQ List -->
          <div class="faq-list" id="faq-list">
            ${FaqPage.renderFaqs()}
          </div>
        </div>
      </section>

      <!-- Still have questions? -->
      <section class="section" style="background:var(--bg-secondary);">
        <div class="container" style="text-align:center;">
          <div style="max-width:500px;margin:0 auto;">
            <h2 style="margin-bottom:8px;">Still Have Questions?</h2>
            <p style="margin-bottom:24px;">Can't find the answer you're looking for? Reach out to our team.</p>
            <a href="#/contact" class="btn btn-primary btn-lg">Contact Support</a>
          </div>
        </div>
      </section>

      ${Footer.render()}
    `;
  },

  renderFaqs(searchTerm = '') {
    let items = [];
    const activeCat = FaqPage.activeCategory;
    
    FaqPage.faqs.forEach(cat => {
      if (activeCat !== 'All' && cat.category !== activeCat && !searchTerm) return;
      cat.items.forEach(item => {
        if (searchTerm) {
          const q = searchTerm.toLowerCase();
          if (!item.q.toLowerCase().includes(q) && !item.a.toLowerCase().includes(q)) return;
        }
        items.push(item);
      });
    });

    if (items.length === 0) {
      return `
        <div class="empty-state" style="padding:40px;">
          <div class="empty-icon">🔍</div>
          <h3>No results found</h3>
          <p>Try a different search term or category.</p>
        </div>
      `;
    }

    return items.map((item, i) => `
      <div class="accordion-item" id="faq-${i}">
        <button class="accordion-header" onclick="FaqPage.toggle('faq-${i}')">
          <span>${Helpers.escapeHtml(item.q)}</span>
          <svg class="accordion-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
        </button>
        <div class="accordion-body">
          <div class="accordion-content">${Helpers.escapeHtml(item.a)}</div>
        </div>
      </div>
    `).join('');
  },

  init() {
    Navbar.init();

    // Category filter
    document.querySelectorAll('.faq-categories .chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.faq-categories .chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        FaqPage.activeCategory = chip.dataset.category;
        document.getElementById('faq-list').innerHTML = FaqPage.renderFaqs();
        document.getElementById('faq-search').value = '';
      });
    });

    // Search
    document.getElementById('faq-search')?.addEventListener('input', Helpers.debounce((e) => {
      document.getElementById('faq-list').innerHTML = FaqPage.renderFaqs(e.target.value);
    }));
  },

  toggle(id) {
    const item = document.getElementById(id);
    if (item) item.classList.toggle('open');
  }
};
