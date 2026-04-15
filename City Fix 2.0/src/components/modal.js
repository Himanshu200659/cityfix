/* ============================================
   CITYFIX – Modal Component
   ============================================ */

const Modal = {
  /**
   * Show a modal dialog
   * @param {object} options - { title, content, onConfirm, confirmText, cancelText }
   */
  show(options = {}) {
    const { title = '', content = '', onConfirm = null, confirmText = 'Confirm', cancelText = 'Cancel', showCancel = true } = options;

    // Remove existing modal
    const existing = document.querySelector('.modal-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="modal-close" id="modal-close-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          ${content}
        </div>
        <div class="modal-actions" style="display:flex;gap:12px;justify-content:flex-end;margin-top:24px;">
          ${showCancel ? `<button class="btn btn-ghost" id="modal-cancel-btn">${cancelText}</button>` : ''}
          ${onConfirm ? `<button class="btn btn-primary" id="modal-confirm-btn">${confirmText}</button>` : ''}
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(() => overlay.classList.add('active'));

    // Close handlers
    const close = () => {
      overlay.classList.remove('active');
      setTimeout(() => overlay.remove(), 300);
    };

    overlay.querySelector('#modal-close-btn').addEventListener('click', close);
    if (showCancel) {
      overlay.querySelector('#modal-cancel-btn')?.addEventListener('click', close);
    }
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    if (onConfirm) {
      overlay.querySelector('#modal-confirm-btn').addEventListener('click', () => {
        onConfirm();
        close();
      });
    }

    return { close };
  },

  /**
   * Show admin code entry modal
   */
  showAdminCode() {
    Modal.show({
      title: '🔐 Admin Authorization',
      content: `
        <p style="color:var(--text-secondary);margin-bottom:16px;">Enter the admin authorization code to access the admin panel.</p>
        <div class="form-group">
          <label>Authorization Code</label>
          <input type="password" class="input-field" id="admin-code-input" placeholder="Enter secret code" />
        </div>
      `,
      confirmText: 'Authorize',
      onConfirm: async () => {
        const code = document.getElementById('admin-code-input')?.value;
        if (code) {
          const success = await Auth.registerAsAdmin(code);
          if (success) {
            Router.navigate('admin');
          }
        }
      }
    });
  }
};
