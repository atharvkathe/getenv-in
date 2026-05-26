/* animations.js - Premium Modern Motion Controller */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Setup Vercel-style interactive Caret Prefix for standard action buttons
  const primaryButtons = document.querySelectorAll('.btn');
  primaryButtons.forEach(btn => {
    if (!btn.querySelector('.btn-anim-text')) {
      const textSpan = btn.querySelector('.btn-text');
      if (textSpan) {
        textSpan.classList.add('btn-anim-text');
        textSpan.innerHTML = `<span class="btn-anim-prefix">> </span>${textSpan.innerHTML}`;
      } else {
        const childNodes = Array.from(btn.childNodes);
        let hasText = false;
        let textContent = '';
        for (let node of childNodes) {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
            hasText = true;
            textContent = node.textContent;
            break;
          }
        }
        if (hasText && btn.id !== 'btn-step1-next' && btn.id !== 'btn-step2-back') {
          btn.innerHTML = `<span class="btn-anim-text"><span class="btn-anim-prefix">> </span>${btn.innerHTML}</span>`;
        }
      }
    }
  });

  // Handle specific buttons that don't have .btn-text but we want animated prefixes for
  const btnNextStep1 = document.getElementById('btn-step1-next');
  if (btnNextStep1 && !btnNextStep1.querySelector('.btn-anim-text')) {
    btnNextStep1.innerHTML = `<span class="btn-anim-text"><span class="btn-anim-prefix">> </span>Next <span class="arrow">→</span></span>`;
  }
  
  const btnStep2Next = document.getElementById('btn-step2-next');
  if (btnStep2Next && !btnStep2Next.querySelector('.btn-anim-text')) {
    btnStep2Next.innerHTML = `<span class="btn-anim-text"><span class="btn-anim-prefix">> </span>Generate .env <span class="arrow">→</span></span>`;
  }
  
  const btnStep2Back = document.getElementById('btn-step2-back');
  if (btnStep2Back && !btnStep2Back.querySelector('.btn-anim-text')) {
    btnStep2Back.innerHTML = `<span class="btn-anim-text"><span class="arrow">←</span> Back</span>`;
  }

  // 2. Performant Low-Opacity Ripple Engine
  document.addEventListener('mousedown', (e) => {
    const btn = e.target.closest('.btn-primary, .framework-card, .btn-action, .btn-secondary, .back-to-home');
    if (!btn || btn.hasAttribute('disabled')) return;
    
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    
    const maxDim = Math.max(rect.width, rect.height) * 2;
    ripple.style.width = `${maxDim}px`;
    ripple.style.height = `${maxDim}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    btn.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 450);
  });

  // Sleek Floating text feedback utility (Fast decel path)
  window.spawnFloatingText = (element, text, color = '#22c55e') => {
    const rect = element.getBoundingClientRect();
    const floating = document.createElement('span');
    floating.className = 'floating-feedback';
    floating.textContent = text;
    floating.style.color = color;
    floating.style.left = `${rect.left + rect.width / 2}px`;
    floating.style.top = `${window.scrollY + rect.top - 8}px`;
    floating.style.transform = `translateX(-50%)`;
    document.body.appendChild(floating);
    
    setTimeout(() => {
      floating.remove();
    }, 450);
  };

  // 3. Precise Tactile Micro-Transitions
  
  // Download .env (Step 3) - Functional download visual update
  const btnDownload = document.getElementById('btn-download-env');
  if (btnDownload) {
    btnDownload.addEventListener('click', () => {
      const textNode = btnDownload.querySelector('.btn-text');
      if (!btnDownload.dataset.origText) btnDownload.dataset.origText = textNode.textContent;
      
      textNode.textContent = "✓ Downloading...";
      setTimeout(() => {
        textNode.textContent = btnDownload.dataset.origText;
      }, 1500);
    });
  }

  // Copy to Clipboard (Step 3) - satisfy-quick clipboard indicator
  const btnCopyEnv = document.getElementById('btn-copy-env');
  if (btnCopyEnv) {
    btnCopyEnv.addEventListener('click', () => {
      const iconNode = btnCopyEnv.querySelector('.btn-icon');
      const textNode = btnCopyEnv.querySelector('.btn-text');
      
      if (!btnCopyEnv.dataset.origIcon) btnCopyEnv.dataset.origIcon = iconNode.textContent;
      if (!btnCopyEnv.dataset.origText) btnCopyEnv.dataset.origText = textNode.textContent;
      
      iconNode.textContent = "✓";
      textNode.innerHTML = "✓ Copied!";
      spawnFloatingText(btnCopyEnv, "+copied");
      
      setTimeout(() => {
        iconNode.textContent = btnCopyEnv.dataset.origIcon;
        textNode.innerHTML = btnCopyEnv.dataset.origText;
      }, 1500);
    });
  }
  
  // Generate All Secrets (Step 3) - Minimal spinner indicator
  const btnGenAll = document.getElementById('btn-generate-secrets');
  if (btnGenAll) {
    btnGenAll.addEventListener('click', () => {
      const textNode = btnGenAll.querySelector('.btn-text');
      if (!btnGenAll.dataset.origText) btnGenAll.dataset.origText = textNode.textContent;
      
      let dots = '';
      let frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
      let frameIdx = 0;
      
      const spinnerInterval = setInterval(() => {
        dots = dots.length < 3 ? dots + '.' : '.';
        textNode.textContent = `${frames[frameIdx % frames.length]} generating secrets${dots}`;
        frameIdx++;
      }, 60);
      
      setTimeout(() => {
        clearInterval(spinnerInterval);
        textNode.textContent = "✓ Secrets Generated";
        setTimeout(() => {
          textNode.textContent = btnGenAll.dataset.origText;
        }, 1500);
      }, 600);
    });
  }

  // Copy Link (Step 3) - Functional success toggle
  const btnShareCopy = document.getElementById('btn-share-copy');
  if (btnShareCopy) {
    btnShareCopy.addEventListener('click', () => {
      const textNode = btnShareCopy.querySelector('.btn-text');
      if (!btnShareCopy.dataset.origText) btnShareCopy.dataset.origText = textNode.textContent;
      
      textNode.textContent = "✓ Link Copied!";
      spawnFloatingText(btnShareCopy, "link copied!");
      setTimeout(() => {
        textNode.textContent = btnShareCopy.dataset.origText;
      }, 1500);
    });
  }

  // SERVICE CHECKBOXES Micro-feedback
  document.querySelectorAll('.service-checkbox-card').forEach(card => {
    card.addEventListener('mousedown', () => {
      const isChecking = !card.classList.contains('checked');
      if (isChecking) {
        card.classList.add('anim-check-bg');
        spawnFloatingText(card, "+added", "#22c55e");
        setTimeout(() => card.classList.remove('anim-check-bg'), 250);
      } else {
        spawnFloatingText(card, "-removed", "#888888");
      }
    });
  });
});
