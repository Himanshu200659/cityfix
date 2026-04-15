/* ============================================
   CITYFIX – Toast Notification Component
   ============================================ */

const Toast = {
  /**
   * Show a toast notification
   * @param {string} message - The message to display
   * @param {string} type - 'success', 'error', 'warning', 'info'
   * @param {number} duration - Duration in ms (default: 4000)
   */
  show(message, type = 'info', duration = 4000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || icons.info}</div>
      <div class="toast-message">${message}</div>
      <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
      <div class="toast-progress">
        <div class="toast-progress-bar" style="animation-duration:${duration}ms"></div>
      </div>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => toast.classList.add('show'));

    // Auto remove
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};

// Add toast styles dynamically
const toastStyles = document.createElement('style');
toastStyles.textContent = `
  .toast-container {
    position: fixed;
    top: 84px;
    right: 20px;
    z-index: var(--z-toast);
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 400px;
  }
  .toast {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 18px;
    border-radius: 12px;
    background: white;
    box-shadow: 0 10px 30px rgba(0,0,0,0.12);
    border-left: 4px solid var(--neutral-400);
    transform: translateX(120%);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
    position: relative;
    overflow: hidden;
  }
  .toast.show {
    transform: translateX(0);
    opacity: 1;
  }
  .toast-success { border-left-color: var(--success-500); }
  .toast-error { border-left-color: var(--danger-500); }
  .toast-warning { border-left-color: var(--warning-500); }
  .toast-info { border-left-color: var(--primary-500); }
  .toast-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    flex-shrink: 0;
    color: white;
    background: var(--neutral-400);
  }
  .toast-success .toast-icon { background: var(--success-500); }
  .toast-error .toast-icon { background: var(--danger-500); }
  .toast-warning .toast-icon { background: var(--warning-500); }
  .toast-info .toast-icon { background: var(--primary-500); }
  .toast-message {
    flex: 1;
    font-size: 14px;
    color: var(--text-primary);
    font-weight: 500;
    line-height: 1.4;
  }
  .toast-close {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 14px;
    padding: 2px;
    line-height: 1;
  }
  .toast-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--neutral-100);
  }
  .toast-progress-bar {
    height: 100%;
    background: var(--primary-500);
    animation: toastCountdown linear forwards;
  }
  .toast-success .toast-progress-bar { background: var(--success-500); }
  .toast-error .toast-progress-bar { background: var(--danger-500); }
  @keyframes toastCountdown {
    from { width: 100%; }
    to { width: 0%; }
  }
  @media (max-width: 480px) {
    .toast-container { left: 10px; right: 10px; max-width: none; }
  }
`;
document.head.appendChild(toastStyles);
