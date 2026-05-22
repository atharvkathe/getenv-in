/* animations.js */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Setup CSS Prefix formatting for all buttons containing text
  const primaryButtons = document.querySelectorAll('.btn');
  primaryButtons.forEach(btn => {
    // Only wrap the text if there isn't already a btn-anim-text wrapper
    if (!btn.querySelector('.btn-anim-text')) {
      const textSpan = btn.querySelector('.btn-text');
      if (textSpan) {
        textSpan.classList.add('btn-anim-text');
        textSpan.innerHTML = `<span class="btn-anim-prefix">> </span>${textSpan.innerHTML}`;
      } else {
        // Find text nodes directly inside btn
        const childNodes = Array.from(btn.childNodes);
        // Let's only handle buttons that don't have complex structures if btn-text isn't found
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
          // Wrap the innerHTML
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
    btnStep2Back.innerHTML = `<span class="btn-anim-text"><span class="arrow">←</span> Back</span>`; // Arrow on left, no > prefix needed
  }

  // 2. Ripple Effect Engine
  document.addEventListener('mousedown', (e) => {
    // Only target primary buttons, cards, and specific action buttons
    const btn = e.target.closest('.btn-primary, .framework-card, .btn-action, .btn-secondary, .back-to-home');
    if (!btn) return;
    
    // Don't spawn ripples on disabled buttons
    if (btn.hasAttribute('disabled')) return;
    
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    
    // Calculate max dimension to cover the button
    const maxDim = Math.max(rect.width, rect.height) * 2;
    ripple.style.width = `${maxDim}px`;
    ripple.style.height = `${maxDim}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    
    btn.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 500);
  });

  // Floating text utility
  window.spawnFloatingText = (element, text, color = '#22c55e') => {
    const rect = element.getBoundingClientRect();
    const floating = document.createElement('span');
    floating.className = 'floating-feedback';
    floating.textContent = text;
    floating.style.color = color;
    floating.style.left = `${rect.left + rect.width/2}px`;
    floating.style.top = `${window.scrollY + rect.top - 10}px`;
    floating.style.transform = `translateX(-50%)`;
    document.body.appendChild(floating);
    
    setTimeout(() => {
      floating.remove();
    }, 800);
  };

  // Specific Button Animations
  
  // 1. Next (Step 1)
  if(btnNextStep1) {
    btnNextStep1.addEventListener('mousedown', () => {
      if(!btnNextStep1.hasAttribute('disabled')) {
        btnNextStep1.classList.add('anim-click');
        setTimeout(() => btnNextStep1.classList.remove('anim-click'), 300);
      }
    });
  }

  // 2. Generate .env (Step 2)
  if(btnStep2Next) {
    // We listen to mousedown for the visual effect so it feels instant
    btnStep2Next.addEventListener('mousedown', () => {
      btnStep2Next.classList.add('anim-click');
      setTimeout(() => btnStep2Next.classList.remove('anim-click'), 800);
    });
  }
  
  // 3. Download .env (Step 3)
  const btnDownload = document.getElementById('btn-download-env');
  if (btnDownload) {
    btnDownload.addEventListener('mousedown', () => {
      btnDownload.classList.add('anim-click', 'anim-glow');
      const textNode = btnDownload.querySelector('.btn-text');
      const origText = textNode.textContent;
      textNode.textContent = "✓ Downloading!";
      setTimeout(() => {
        textNode.textContent = origText;
        btnDownload.classList.remove('anim-click', 'anim-glow');
      }, 1500);
    });
  }

  // 4. Copy to Clipboard
  const btnCopyEnv = document.getElementById('btn-copy-env');
  if (btnCopyEnv) {
    btnCopyEnv.addEventListener('mousedown', () => {
      btnCopyEnv.classList.add('anim-flash');
      const iconNode = btnCopyEnv.querySelector('.btn-icon');
      const textNode = btnCopyEnv.querySelector('.btn-text');
      
      // Store original contents if not stored
      if (!btnCopyEnv.dataset.origIcon) btnCopyEnv.dataset.origIcon = iconNode.textContent;
      if (!btnCopyEnv.dataset.origText) btnCopyEnv.dataset.origText = textNode.textContent;
      
      iconNode.textContent = "✓";
      textNode.innerHTML = "✓ Copied!";
      spawnFloatingText(btnCopyEnv, "+copied");
      
      setTimeout(() => {
        iconNode.textContent = btnCopyEnv.dataset.origIcon;
        textNode.innerHTML = btnCopyEnv.dataset.origText;
        btnCopyEnv.classList.remove('anim-flash');
      }, 2000);
    });
  }
  
  // 5. Generate All Secrets
  const btnGenAll = document.getElementById('btn-generate-secrets');
  if (btnGenAll) {
    btnGenAll.addEventListener('mousedown', () => {
      btnGenAll.classList.add('anim-click');
      const textNode = btnGenAll.querySelector('.btn-text');
      if (!btnGenAll.dataset.origText) btnGenAll.dataset.origText = textNode.textContent;
      
      // Spinner sequence
      let dots = '';
      let frames = ['⣾','⣽','⣻','⢿','⡿','⣟','⣯','⣷'];
      let frameIdx = 0;
      
      const spinnerInterval = setInterval(() => {
        dots = dots.length < 6 ? dots + '.' : '.';
        textNode.textContent = `${frames[frameIdx % frames.length]} generating secrets${dots}`;
        frameIdx++;
      }, 80);
      
      setTimeout(() => {
        clearInterval(spinnerInterval);
        textNode.textContent = "✓ All Secrets Generated";
        setTimeout(() => {
          textNode.textContent = btnGenAll.dataset.origText;
          btnGenAll.classList.remove('anim-click');
        }, 2000);
      }, 600);
    });
  }

  // 6. Start Over
  const btnStartOver = document.getElementById('btn-start-over');
  if (btnStartOver) {
    btnStartOver.addEventListener('mousedown', () => {
      btnStartOver.classList.add('anim-shake');
      setTimeout(() => btnStartOver.classList.remove('anim-shake'), 300);
    });
  }

  // 7. Copy Link
  const btnShareCopy = document.getElementById('btn-share-copy');
  if (btnShareCopy) {
    btnShareCopy.addEventListener('mousedown', () => {
      const textNode = btnShareCopy.querySelector('.btn-text');
      if (!btnShareCopy.dataset.origText) btnShareCopy.dataset.origText = textNode.textContent;
      
      textNode.textContent = "✓ Link Copied!";
      spawnFloatingText(btnShareCopy, "link copied!");
      setTimeout(() => {
        textNode.textContent = btnShareCopy.dataset.origText;
      }, 2000);
    });
  }

  // 8. Back (Step 2)
  if (btnStep2Back) {
    btnStep2Back.addEventListener('mousedown', () => {
      btnStep2Back.classList.add('anim-click');
      setTimeout(() => btnStep2Back.classList.remove('anim-click'), 200);
    });
  }

  // 9. Nav Links
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    link.addEventListener('mousedown', () => {
      link.classList.add('anim-click');
      setTimeout(() => link.classList.remove('anim-click'), 150);
    });
  });

  // 11. Tab Buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('mousedown', () => {
      btn.classList.add('anim-click');
      setTimeout(() => btn.classList.remove('anim-click'), 300);
    });
  });

  // 12. Env Buttons
  document.querySelectorAll('.env-btn').forEach(btn => {
    btn.addEventListener('mousedown', (e) => {
      btn.classList.add('anim-click');
      document.querySelectorAll('.env-btn').forEach(other => {
        if (other !== btn) {
          other.classList.add('anim-slide-away');
          setTimeout(() => other.classList.remove('anim-slide-away'), 300);
        }
      });
      setTimeout(() => btn.classList.remove('anim-click'), 300);
    });
  });

  // 13. Back to Generator
  document.querySelectorAll('.back-to-home').forEach(btn => {
    btn.addEventListener('mousedown', () => {
      btn.classList.add('anim-click');
      setTimeout(() => btn.classList.remove('anim-click'), 200);
    });
  });

  // 14. Blog Card Read ->
  document.querySelectorAll('.blog-card-link').forEach(link => {
    link.addEventListener('mousedown', () => {
      link.classList.add('anim-click');
      setTimeout(() => link.classList.remove('anim-click'), 300);
    });
  });
  
  // FRAMEWORK CARDS
  document.querySelectorAll('.framework-card').forEach(card => {
    card.addEventListener('mousedown', () => {
      card.classList.add('anim-select');
      setTimeout(() => card.classList.remove('anim-select'), 500);
    });
  });
  
  // SERVICE CHECKBOXES
  document.querySelectorAll('.service-checkbox-card').forEach(card => {
    card.addEventListener('mousedown', () => {
      // Toggle logic usually happens via click event in app.js, we just do visual here
      const isChecking = !card.classList.contains('checked');
      if (isChecking) {
        card.classList.add('anim-check-bg');
        spawnFloatingText(card, "+added", "#22c55e");
        setTimeout(() => card.classList.remove('anim-check-bg'), 400);
      } else {
        card.classList.add('anim-uncheck');
        spawnFloatingText(card, "-removed", "#888888");
        setTimeout(() => card.classList.remove('anim-uncheck'), 300);
      }
    });
  });
});
