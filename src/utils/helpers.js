/* ============================================
   CITYFIX – Helper Utilities
   ============================================ */

const Helpers = {
  /**
   * Format date to readable string
   */
  formatDate(date) {
    if (!date) return '';
    const d = date instanceof Date ? date : date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  },

  /**
   * Format date to relative time string
   */
  timeAgo(date) {
    if (!date) return '';
    const d = date instanceof Date ? date : date.toDate ? date.toDate() : new Date(date);
    const now = new Date();
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return Helpers.formatDate(d);
  },

  /**
   * Check if a complaint should be escalated (48h rule)
   */
  isEscalated(createdAt, status) {
    if (status === 'resolved') return false;
    const d = createdAt instanceof Date ? createdAt : createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
    const hoursDiff = (Date.now() - d.getTime()) / (1000 * 60 * 60);
    return hoursDiff >= 48;
  },

  /**
   * Get hours remaining before escalation
   */
  hoursUntilEscalation(createdAt) {
    const d = createdAt instanceof Date ? createdAt : createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
    const hoursDiff = (Date.now() - d.getTime()) / (1000 * 60 * 60);
    return Math.max(0, 48 - hoursDiff);
  },

  /**
   * Validate email
   */
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  /**
   * Validate password strength
   */
  getPasswordStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 1) return { level: 'weak', text: 'Weak', score: 1 };
    if (score <= 3) return { level: 'medium', text: 'Medium', score: 2 };
    return { level: 'strong', text: 'Strong', score: 3 };
  },

  /**
   * Generate unique ID
   */
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  /**
   * Compress image before upload
   */
  compressImage(file, maxWidth = 1200, quality = 0.7) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ratio = Math.min(maxWidth / img.width, maxWidth / img.height, 1);
          canvas.width = img.width * ratio;
          canvas.height = img.height * ratio;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(resolve, 'image/jpeg', quality);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  },

  /**
   * Get user's current location
   */
  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => reject(err),
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  },

  /**
   * Animate number counting
   */
  animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = Math.floor(start + (target - start) * eased);
      element.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  },

  /**
   * Debounce function
   */
  debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  },

  /**
   * Truncate text
   */
  truncate(text, length = 100) {
    if (!text || text.length <= length) return text;
    return text.substring(0, length) + '...';
  },

  /**
   * Get status color class
   */
  getStatusBadge(status) {
    const map = {
      'pending': 'badge-pending',
      'acknowledged': 'badge-progress',
      'in-progress': 'badge-progress',
      'resolved': 'badge-resolved',
      'escalated': 'badge-escalated'
    };
    return map[status] || 'badge-info';
  },

  /**
   * Get category icon
   */
  getCategoryIcon(category) {
    const map = {
      'garbage': '🗑️',
      'pothole': '🕳️',
      'water-leak': '💧',
      'streetlight': '💡',
      'sewage': '🚰',
      'other': '📋'
    };
    return map[category] || '📋';
  },

  /**
   * Get category label
   */
  getCategoryLabel(category) {
    const map = {
      'garbage': 'Garbage / Waste',
      'pothole': 'Pothole / Road',
      'water-leak': 'Water Leakage',
      'streetlight': 'Streetlight',
      'sewage': 'Sewage / Drainage',
      'other': 'Other Issue'
    };
    return map[category] || category;
  },

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};
