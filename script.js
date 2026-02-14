// Mobile Menu Toggle - Initialize immediately if navbar exists, or wait for header to load
function initMobileMenu() {
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
}

// Initialize mobile menu on page load
initMobileMenu();

// Image fallback handler - replaces inline onerror handlers
function initImageFallbacks() {
  document.querySelectorAll('img[data-fallback]').forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
      const fallback = this.nextElementSibling;
      if (fallback) fallback.style.display = 'flex';
    });
    // Trigger error handler if image already failed before listener was attached
    if (img.complete && img.naturalWidth === 0) {
      img.dispatchEvent(new Event('error'));
    }
  });
}

// Initialize image fallbacks on page load
initImageFallbacks();

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
function setActiveNavItem() {
  const currentLocation = location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentLocation || (currentLocation === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Set active nav item on page load
setActiveNavItem();

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
    '.achievement-card, .education-card, .cert-card, .project-card, .service-card, .timeline-item, .expertise-item, .hero-highlight, .stat'
  );
  animateElements.forEach(el => {
    el.classList.add('will-animate');
    observer.observe(el);
  });
});


// Get base path for loading components (handles subdirectories)
function getBasePath() {
  const path = window.location.pathname;
  // If we're in a category subdirectory (like blog/posts/artificial-intelligence/), go up 3 levels
  if (path.match(/\/blog\/posts\/[^\/]+\//)) {
    return '../../../';
  } else if (path.includes('/blog/posts/')) {
    return '../../';
  } else if (path.includes('/blog/')) {
    return '../';
  }
  return '';
}

// Load header component
function loadHeader() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    const basePath = getBasePath();
    fetch(basePath + 'header.html')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        headerPlaceholder.innerHTML = html;
        // Re-initialize navigation after header loads
        initializeNavigation();
      })
      .catch(error => {
        console.error('Error loading header:', error);
      });
  }
}

// Load footer component
function loadFooter() {
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    const basePath = getBasePath();
    fetch(basePath + 'footer.html')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        footerPlaceholder.innerHTML = html;
      })
      .catch(error => {
        console.error('Error loading footer:', error);
        // Fallback: show error message or keep placeholder empty
      });
  }
}

// Initialize navigation functionality after header loads
function initializeNavigation() {
  initMobileMenu();
  setActiveNavItem();
  initImageFallbacks();
}

// Load header and footer when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
  });
} else {
  // DOM is already ready
  loadHeader();
  loadFooter();
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
