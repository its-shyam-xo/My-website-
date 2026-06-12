/* ================================================
   THE SPECIALIST UNISEX SALON — MAIN JAVASCRIPT
   ================================================ */

'use strict';

/* ── DOM READY ── */
document.addEventListener('DOMContentLoaded', function () {
  initNavbar();
  initHamburger();
  initFAQ();
  initScrollReveal();
  initBackToTop();
  initSmoothScroll();
  initNavActiveLinks();
});

/* ════════════════════════════════
   1. NAVBAR SCROLL EFFECT
════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ════════════════════════════════
   2. HAMBURGER / MOBILE NAV
════════════════════════════════ */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  function openMenu() {
    hamburger.classList.add('active');
    navLinks.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on overlay click
  document.addEventListener('click', function (e) {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ════════════════════════════════
   3. FAQ ACCORDION
════════════════════════════════ */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', function () {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(function (i) {
        i.classList.remove('active');
        const q = i.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ════════════════════════════════
   4. SCROLL REVEAL (IntersectionObserver)
════════════════════════════════ */
function initScrollReveal() {
  // Add reveal class to target elements
  const targets = [
    '.service-card',
    '.why-card',
    '.review-card',
    '.problem-card',
    '.stat-item',
    '.about-grid',
    '.offer-inner',
    '.local-inner',
    '.faq-item',
    '.section-header',
    '.trust-item',
  ];

  targets.forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (el, index) {
      el.classList.add('reveal');
      // Stagger siblings
      if (index % 3 === 1) el.classList.add('reveal-delay-1');
      if (index % 3 === 2) el.classList.add('reveal-delay-2');
    });
  });

  // Observer
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
}

/* ════════════════════════════════
   5. BACK TO TOP
════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener(
    'scroll',
    function () {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    },
    { passive: true }
  );

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ════════════════════════════════
   6. SMOOTH SCROLL FOR ANCHOR LINKS
════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const navbarHeight = document.getElementById('navbar')
        ? document.getElementById('navbar').offsetHeight
        : 0;

      const targetPos = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 8;

      window.scrollTo({
        top: targetPos,
        behavior: 'smooth',
      });
    });
  });
}

/* ════════════════════════════════
   7. ACTIVE NAV LINKS ON SCROLL
════════════════════════════════ */
function initNavActiveLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const navbarHeight = document.getElementById('navbar')
    ? document.getElementById('navbar').offsetHeight
    : 70;

  function onScroll() {
    let currentSection = '';

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - navbarHeight - 80;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active-nav');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active-nav');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ════════════════════════════════
   8. PHONE NUMBER CLICK TRACKING (Optional analytics hook)
════════════════════════════════ */
document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
  link.addEventListener('click', function () {
    if (typeof gtag === 'function') {
      gtag('event', 'phone_call', {
        event_category: 'engagement',
        event_label: 'CTA Phone Click',
      });
    }
  });
});

/* ════════════════════════════════
   9. WHATSAPP CLICK TRACKING
════════════════════════════════ */
document.querySelectorAll('a[href*="wa.me"]').forEach(function (link) {
  link.addEventListener('click', function () {
    if (typeof gtag === 'function') {
      gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'WhatsApp CTA',
      });
    }
  });
});

/* ════════════════════════════════
   10. HERO PARALLAX (Subtle)
════════════════════════════════ */
(function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  // Only on non-touch devices
  if ('ontouchstart' in window) return;

  window.addEventListener(
    'scroll',
    function () {
      const scrolled = window.scrollY;
      const heroContent = hero.querySelector('.hero-content');
      if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = 'translateY(' + scrolled * 0.12 + 'px)';
        heroContent.style.opacity = 1 - scrolled / (window.innerHeight * 0.9);
      }
    },
    { passive: true }
  );
})();

/* ════════════════════════════════
   11. SERVICE CARD HOVER GLOW
════════════════════════════════ */
(function initCardGlow() {
  document.querySelectorAll('.service-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });
})();

/* ════════════════════════════════
   12. LAZY LOAD FALLBACK
════════════════════════════════ */
(function initLazyLoad() {
  if ('loading' in HTMLImageElement.prototype) return;

  document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          observer.unobserve(img);
        }
      });
    });
    observer.observe(img);
  });
})();
