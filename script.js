// Smooth scrolling for header links
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('.top-nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (!targetId) return;
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  });
});

// Soft scroll for CTA buttons that link internally
document.querySelectorAll('.hero-actions a, .contact-panel .btn.secondary').forEach(button => {
  button.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId?.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(targetId);
      target?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  });
});

// Mobile navigation toggle
const mobileToggle = document.querySelector('.mobile-nav-toggle');
const topNav = document.querySelector('.top-nav');

if (mobileToggle && topNav) {
  const closeMenu = () => {
    topNav.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
  };

  mobileToggle.addEventListener('click', () => {
    const isOpen = topNav.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when a link is clicked
  topNav.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => closeMenu());
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!topNav.classList.contains('open')) return;
    const target = e.target;
    if (!(target instanceof Node)) return;
    if (topNav.contains(target) || mobileToggle.contains(target)) return;
    closeMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

const sections = document.querySelectorAll('main section[id]');
const navLinks = Array.from(document.querySelectorAll('.top-nav a[href^="#"]'));

const setActiveNav = (id) => {
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${id}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, {
  threshold: 0.18
});

const activeSectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.id) {
      setActiveNav(entry.target.id);
    }
  });
}, {
  threshold: 0.5
});

sections.forEach(section => {
  revealObserver.observe(section);
  activeSectionObserver.observe(section);
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Scroll-to-top button
const toTopButton = document.querySelector('.to-top');
if (toTopButton) {
  const onScroll = () => {
    const show = window.scrollY > 600;
    toTopButton.classList.toggle('show', show);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}
