/**
 * General Utilities
 */

const Utils = {
  /**
   * Safely sets HTML content of an element by ID.
   */
  safeSetHtml(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  },

  /**
   * Generates a 64-character cryptographically secure random hex string
   */
  generateSecureSecret() {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
  },

  /**
   * Shows a toast notification.
   * If the function already exists in app.js, this serves as a central reference.
   */
  showToastNotification(message, duration = 3000) {
    // Check if original function exists (for backward compatibility during refactor)
    if (typeof window.showToastNotification === 'function') {
      window.showToastNotification(message, duration);
      return;
    }
    
    // Fallback implementation if removed from app.js
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.style.position = 'fixed';
      toastContainer.style.bottom = '20px';
      toastContainer.style.right = '20px';
      toastContainer.style.zIndex = '999999';
      document.body.appendChild(toastContainer);
    }
    
    const toast = document.createElement('div');
    toast.style.background = 'var(--bg-card)';
    toast.style.color = 'var(--text-primary)';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.border = '1px solid var(--border-active)';
    toast.style.marginBottom = '10px';
    toast.style.fontFamily = "'JetBrains Mono', monospace";
    toast.style.fontSize = '12px';
    toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5)';
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.5s ease';
      setTimeout(() => toast.remove(), 500);
    }, duration);
  }
};
