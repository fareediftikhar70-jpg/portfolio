document.addEventListener('DOMContentLoaded', function() {
  // Update year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Scroll Reveal Animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  // Header Scroll Effect - adds shadow/glass background on scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Smooth Scroll for Navigation
  document.querySelectorAll('.nav a, .hero-btns a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = 80;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Contact Form Handling (mailto fallback)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

      const btn = contactForm.querySelector('button');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Opening Mail Client... <i class="fa-solid fa-spinner fa-spin"></i>';

      setTimeout(() => {
        window.location.href = `mailto:fareediftikhar70@gmail.com?subject=${subject}&body=${body}`;
        btn.innerHTML = 'Mail Client Opened <i class="fa-solid fa-check"></i>';
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 3000);
      }, 700);
    });
  }

  // Resume Download / Trigger Logic
  document.querySelectorAll('.cv-download-trigger').forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Allow default link behavior or ensure download
      const link = document.createElement('a');
      link.href = 'Ghulam_Fareed_CV_A4.pdf';
      link.download = 'Ghulam_Fareed_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  });
});
