// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Handle anchor links when navigating from other pages
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash) {
    const hash = window.location.hash;
    const target = document.querySelector(hash);
    if (target) {
      // Small delay to ensure page is fully loaded
      setTimeout(() => {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }
});

// Add active class to current navigation item
const currentLocation = location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentLocation || (currentLocation === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll(
    '.achievement-card, .education-card, .project-card, .service-card, .timeline-item, .expertise-item, .hero-highlight, .stat'
  );
  animateElements.forEach(el => observer.observe(el));
});

// Contact form handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Client-side only: show success message (no backend)
    let messageEl = document.querySelector('.form-message');
    if (!messageEl) {
      messageEl = document.createElement('div');
      messageEl.className = 'form-message';
      contactForm.appendChild(messageEl);
    }
    messageEl.textContent = 'Thank you for your message! I will get back to you soon.';
    messageEl.classList.add('success');
    messageEl.style.display = 'block';
    contactForm.reset();
  });
}

// Navbar scroll effect
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
      }
    });
  }
});
