/* ============================================================
   PORTFOLIO JAVASCRIPT
   - Native color-scheme adaptation (light/dark follows the OS)
   - Smooth scrolling for navigation links
   - Active navigation highlighting (scroll spy)
   - Fade-in animation on scroll (reduced-motion aware)
   ============================================================ */

// ============================================
// COLOR SCHEME ADAPTATION (no manual toggle —
// the site follows the device's light/dark setting,
// which also drives the CSS via prefers-color-scheme)
// ============================================

(() => {
    const root = document.documentElement;
    const mq = window.matchMedia('(prefers-color-scheme: light)');

    const applyScheme = () => {
        // Helps native UI (scrollbars, form controls) match the theme.
        root.style.colorScheme = mq.matches ? 'light' : 'dark';
    };

    applyScheme();
    mq.addEventListener('change', applyScheme);
})();

// ============================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// (CSS scroll-behavior handles it; this adds
//  focus management for keyboard/screen-reader users)
// ============================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Move focus for accessibility without an extra scroll jump.
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus({ preventScroll: true });
    });
});

// ============================================
// ACTIVE NAVIGATION HIGHLIGHTING (SCROLL SPY)
// ============================================

const navLinks = document.querySelectorAll('.nav-link');

const setActiveLink = () => {
    let currentSection = '';

    document.querySelectorAll('section[id], header[id]').forEach((section) => {
        if (window.scrollY >= section.offsetTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${currentSection}`;
        link.classList.toggle('active', isActive);
    });
};

window.addEventListener('scroll', setActiveLink, { passive: true });
setActiveLink();

// ============================================
// FADE-IN ANIMATION ON SCROLL
// (skipped entirely for reduced-motion users;
//  visual state handled by the .reveal CSS below)
// ============================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.project-card, .skill-card, .highlight').forEach((element) => {
        element.classList.add('reveal');
        observer.observe(element);
    });
}
