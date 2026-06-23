document.addEventListener('DOMContentLoaded', function() {
  // Update year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Reveal animations on scroll
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('.nav a, .hero-btns a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const message = document.getElementById('message').value;

      const subject = encodeURIComponent(`Portfolio Message from ${name}`);
      const body = encodeURIComponent(message);

      // Feedback to user
      const btn = contactForm.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = 'Opening Mail...';

      setTimeout(() => {
        window.location.href = `mailto:fareediftikhar70@gmail.com?subject=${subject}&body=${body}`;
        btn.textContent = originalText;
      }, 500);
    });
  }

  // Resume Download Button
  const downloadBtn = document.getElementById('downloadResume');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
      // Assuming Ghulam_Fareed_CV.docx is in the root as seen in file list
      const link = document.createElement('a');
      link.href = 'Ghulam_Fareed_CV.docx';
      link.download = 'Ghulam_Fareed_CV.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
});
