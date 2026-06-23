document.addEventListener('DOMContentLoaded', function() {
  // Update year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Cursor Glow Effect
  const cursorGlow = document.querySelector('.cursor-glow');
  if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = e.clientX + 'px';
      cursorGlow.style.top = e.clientY + 'px';
    });
  }

  // Scroll Reveal Animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // entry.target.style.transitionDelay = entry.target.dataset.delay || '0s';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach((el, index) => {
    // Optional: Add staggered delay
    // el.style.transitionDelay = `${index * 0.1}s`;
    revealObserver.observe(el);
  });

  // Header Scroll Effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Smooth Scroll for Nav
  document.querySelectorAll('.nav a, .hero-btns a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = target.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const message = document.getElementById('message').value;
      const email = document.getElementById('email').value;

      const subject = encodeURIComponent(`Portfolio Message from ${name}`);
      const body = encodeURIComponent(`From: ${email}\n\n${message}`);

      const btn = contactForm.querySelector('button');
      btn.innerHTML = 'Sending... <i class="fa-solid fa-circle-notch fa-spin"></i>';

      setTimeout(() => {
        window.location.href = `mailto:fareediftikhar70@gmail.com?subject=${subject}&body=${body}`;
        btn.innerHTML = 'Sent! <i class="fa-solid fa-check"></i>';
        setTimeout(() => {
          btn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
        }, 3000);
      }, 800);
    });
  }

  // Resume Download
  const downloadBtn = document.getElementById('downloadResume');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
      const link = document.createElement('a');
      link.href = 'Ghulam_Fareed_CV.docx';
      link.download = 'Ghulam_Fareed_CV.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
});
