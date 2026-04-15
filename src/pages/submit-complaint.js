/* ============================================
   CITYFIX – Submit Complaint Page
   ============================================ */

const SubmitComplaintPage = {
  selectedCategory: '',
  selectedLocation: null,
  map: null,
  marker: null,
  currentStep: 1,

  render() {
    return `
      ${Navbar.render()}
      <div class="dashboard-layout">
        ${Sidebar.render('submit-complaint')}
        <main class="dashboard-main">
          <div class="dashboard-header">
            <div>
              <h1>Report an Issue</h1>
              <p class="header-subtitle">Help us fix your city by reporting problems</p>
            </div>
          </div>

          <!-- Steps Indicator -->
          <div class="steps" id="form-steps">
            <div class="step active" data-step="1">
              <div class="step-number">1</div>
              <span class="step-label">Category</span>
            </div>
            <div class="step-connector"></div>
            <div class="step" data-step="2">
              <div class="step-number">2</div>
              <span class="step-label">Details</span>
            </div>
            <div class="step-connector"></div>
            <div class="step" data-step="3">
              <div class="step-number">3</div>
              <span class="step-label">Location</span>
            </div>
          </div>

          <div class="complaint-form-card">
            <!-- Step 1: Category -->
            <div class="form-step" id="step-1">
              <h3 style="margin-bottom:8px;">Select Issue Category</h3>
              <p style="margin-bottom:24px;font-size:var(--text-sm);">Choose the type of problem you want to report</p>
              <div class="category-grid" id="category-grid">
                <div class="category-option" data-category="garbage">
                  <span class="cat-icon">🗑️</span>
                  <span class="cat-label">Garbage / Waste</span>
                </div>
                <div class="category-option" data-category="pothole">
                  <span class="cat-icon">🕳️</span>
                  <span class="cat-label">Pothole / Road</span>
                </div>
                <div class="category-option" data-category="water-leak">
                  <span class="cat-icon">💧</span>
                  <span class="cat-label">Water Leakage</span>
                </div>
                <div class="category-option" data-category="streetlight">
                  <span class="cat-icon">💡</span>
                  <span class="cat-label">Streetlight</span>
                </div>
                <div class="category-option" data-category="sewage">
                  <span class="cat-icon">🚰</span>
                  <span class="cat-label">Sewage / Drainage</span>
                </div>
                <div class="category-option" data-category="other">
                  <span class="cat-icon">📋</span>
                  <span class="cat-label">Other Issue</span>
                </div>
              </div>
              <div style="display:flex;justify-content:flex-end;margin-top:24px;">
                <button class="btn btn-primary" id="step1-next" disabled>
                  Next: Add Details →
                </button>
              </div>
            </div>

            <!-- Step 2: Details -->
            <div class="form-step" id="step-2" style="display:none;">
              <h3 style="margin-bottom:8px;">Describe the Issue</h3>
              <p style="margin-bottom:24px;font-size:var(--text-sm);">Provide details and evidence about the problem</p>

              <div class="form-group">
                <label for="complaint-title">Title / Summary</label>
                <input type="text" class="input-field" id="complaint-title" placeholder="e.g., Large pothole on Main Street" maxlength="100" />
              </div>

              <div class="form-group">
                <label for="complaint-desc">Description</label>
                <textarea class="input-field" id="complaint-desc" placeholder="Describe the issue in detail. Include any relevant information that will help resolve it quickly." maxlength="1000"></textarea>
                <div style="text-align:right;font-size:var(--text-xs);color:var(--text-muted);margin-top:4px;">
                  <span id="char-count">0</span>/1000
                </div>
              </div>



              <div class="form-group">
                <label>Priority Level</label>
                <div class="chip-group">
                  <button class="chip" data-priority="low">🟢 Low</button>
                  <button class="chip active" data-priority="medium">🟡 Medium</button>
                  <button class="chip" data-priority="high">🔴 High</button>
                </div>
              </div>

              <div style="display:flex;justify-content:space-between;margin-top:24px;">
                <button class="btn btn-ghost" id="step2-back">← Back</button>
                <button class="btn btn-primary" id="step2-next">Next: Set Location →</button>
              </div>
            </div>

            <!-- Step 3: Location -->
            <div class="form-step" id="step-3" style="display:none;">
              <h3 style="margin-bottom:8px;">Pin the Location</h3>
              <p style="margin-bottom:24px;font-size:var(--text-sm);">Set the exact location of the problem</p>

              <div class="form-group">
                <div style="display:flex;gap:8px;margin-bottom:12px;">
                  <button class="btn btn-outline btn-sm" id="detect-location-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>
                    Auto-detect Location
                  </button>
                </div>
                <div class="map-container" id="complaint-map"></div>
              </div>

              <div class="form-group">
                <label for="complaint-address">Address / Landmark</label>
                <input type="text" class="input-field" id="complaint-address" placeholder="e.g., Near City Mall, Main Road, Ward 5" />
              </div>

              <div style="display:flex;justify-content:space-between;margin-top:24px;">
                <button class="btn btn-ghost" id="step3-back">← Back</button>
                <button class="btn btn-success btn-lg" id="submit-complaint-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                  Submit Complaint
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    `;
  },

  init() {
    Navbar.init();
    Sidebar.init();

    if (!Auth.currentUser) {
      Router.navigate('login');
      return;
    }

    const page = SubmitComplaintPage;

    // Category selection
    document.querySelectorAll('.category-option').forEach(opt => {
      opt.addEventListener('click', () => {
        document.querySelectorAll('.category-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        page.selectedCategory = opt.dataset.category;
        document.getElementById('step1-next').disabled = false;
      });
    });

    // Step navigation
    document.getElementById('step1-next')?.addEventListener('click', () => page.goToStep(2));
    document.getElementById('step2-back')?.addEventListener('click', () => page.goToStep(1));
    document.getElementById('step2-next')?.addEventListener('click', () => {
      const title = document.getElementById('complaint-title').value.trim();
      const desc = document.getElementById('complaint-desc').value.trim();
      if (!title) { Toast.show('Please enter a title', 'warning'); return; }
      if (!desc) { Toast.show('Please describe the issue', 'warning'); return; }
      page.goToStep(3);
    });
    document.getElementById('step3-back')?.addEventListener('click', () => page.goToStep(2));

    // Character count
    document.getElementById('complaint-desc')?.addEventListener('input', (e) => {
      document.getElementById('char-count').textContent = e.target.value.length;
    });



    // Priority chips
    document.querySelectorAll('.chip[data-priority]').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.chip[data-priority]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });

    // Auto-detect location
    document.getElementById('detect-location-btn')?.addEventListener('click', async () => {
      try {
        Toast.show('Detecting your location...', 'info', 2000);
        const loc = await Helpers.getCurrentLocation();
        page.selectedLocation = loc;
        if (page.map) {
          page.map.setView([loc.lat, loc.lng], 16);
          if (page.marker) page.marker.setLatLng([loc.lat, loc.lng]);
          else page.marker = L.marker([loc.lat, loc.lng]).addTo(page.map);
        }
        Toast.show('Location detected! 📍', 'success');
      } catch (e) {
        Toast.show('Could not detect location. Please click on the map.', 'warning');
      }
    });

    // Submit
    document.getElementById('submit-complaint-btn')?.addEventListener('click', () => page.submit());
  },

  goToStep(step) {
    const page = SubmitComplaintPage;
    page.currentStep = step;

    // Hide all steps
    document.querySelectorAll('.form-step').forEach(s => s.style.display = 'none');
    document.getElementById(`step-${step}`).style.display = 'block';

    // Update step indicator
    document.querySelectorAll('#form-steps .step').forEach(s => {
      const sNum = parseInt(s.dataset.step);
      s.className = 'step';
      if (sNum < step) s.classList.add('completed');
      else if (sNum === step) s.classList.add('active');
    });
    document.querySelectorAll('#form-steps .step-connector').forEach((c, i) => {
      c.className = 'step-connector';
      if (i + 1 < step) c.classList.add('completed');
    });

    // Init map if step 3
    if (step === 3 && !page.map) {
      setTimeout(() => {
        page.map = L.map('complaint-map').setView([23.2599, 77.4126], 13); // Bhopal default
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(page.map);

        page.map.on('click', (e) => {
          page.selectedLocation = { lat: e.latlng.lat, lng: e.latlng.lng };
          if (page.marker) page.marker.setLatLng(e.latlng);
          else page.marker = L.marker(e.latlng).addTo(page.map);
        });
      }, 100);
    }
  },



  async submit() {
    const page = SubmitComplaintPage;
    const title = document.getElementById('complaint-title').value.trim();
    const desc = document.getElementById('complaint-desc').value.trim();
    const address = document.getElementById('complaint-address').value.trim();
    const priority = document.querySelector('.chip[data-priority].active')?.dataset.priority || 'medium';

    if (!page.selectedCategory || !title || !desc) {
      Toast.show('Please fill in all required fields', 'warning');
      return;
    }

    const btn = document.getElementById('submit-complaint-btn');
    btn.innerHTML = '<div class="btn-loader"></div> Submitting...';
    btn.disabled = true;

    try {
      let imageUrl = '';

      const complaintId = await DB.submitComplaint({
        category: page.selectedCategory,
        title,
        description: desc,
        location: page.selectedLocation,
        address,
        priority,
        imageUrl
      });

      Toast.show('Complaint submitted successfully! 🎉', 'success');
      Router.navigate('complaint-status', { id: complaintId });
    } catch (e) {
      console.error('Submit error:', e);
      Toast.show('Failed to submit. Please try again.', 'error');
      btn.innerHTML = 'Submit Complaint';
      btn.disabled = false;
    }
  }
};
