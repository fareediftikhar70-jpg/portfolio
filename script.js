/**
 * Ghulam Fareed - Portfolio Script
 * Modern micro-interactions, project filtering, scroll spy, copy-to-clipboard, and navigation
 */

document.addEventListener('DOMContentLoaded', function() {
  // 1. Dynamic Year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Header Scroll Effect & Back-to-Top visibility
  const siteHeader = document.getElementById('siteHeader');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    if (backToTopBtn) {
      if (scrollY > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  // 4. Back to Top Click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 5. Mobile Navigation Drawer
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');

  if (mobileMenuToggle && mobileNavDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = mobileNavDrawer.classList.toggle('open');
      const icon = mobileMenuToggle.querySelector('i');
      if (icon) {
        icon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    // Close mobile drawer when clicking a link
    mobileNavDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('open');
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!siteHeader.contains(e.target)) {
        mobileNavDrawer.classList.remove('open');
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });
  }

  // 6. Smooth Scroll for Navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerHeight = 85;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 7. Active Navigation Link Scroll Spy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // 8. Project Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Toggle active button state
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.classList.add('in-view');
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 9. Copy-to-Clipboard with Toast Notification
  const toastEl = document.getElementById('copyToast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimeout;

  function showToast(message) {
    if (!toastEl) return;
    if (toastMsg) toastMsg.textContent = message;

    toastEl.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2800);
  }

  document.querySelectorAll('.copy-trigger').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const textToCopy = this.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied: ${textToCopy}`);
        }).catch(() => {
          // Fallback
          const tempInput = document.createElement('input');
          tempInput.value = textToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast(`Copied: ${textToCopy}`);
        });
      }
    });
  });

  // 10. Contact Form Mailto Handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Launching Mail...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

      setTimeout(() => {
        window.location.href = `mailto:fareediftikhar70@gmail.com?subject=${subject}&body=${body}`;
        submitBtn.innerHTML = '<span>Message Ready!</span> <i class="fa-solid fa-check"></i>';
        showToast('Opening your default email client...');

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
          contactForm.reset();
        }, 3500);
      }, 700);
    });
  }

  // 11. Resume Download Triggers
  document.querySelectorAll('.cv-download-trigger').forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Allow the default link download or trigger programmatic fallback
      const link = document.createElement('a');
      link.href = 'Ghulam_Fareed_CV_A4.pdf';
      link.download = 'Ghulam_Fareed_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Downloading Ghulam_Fareed_CV.pdf...');
    });
  });
});
