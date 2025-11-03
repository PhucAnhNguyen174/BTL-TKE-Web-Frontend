// Small shared utilities (no side effects)
window.$ = (sel, root = document) => root.querySelector(sel);
window.$$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
window.debounce = (fn, wait = 150) => { let t; return function(...args){ clearTimeout(t); t = setTimeout(() => fn.apply(this, args), wait); }; };

// Prevent hash links from scrolling to top (except those with specific handlers)
document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('click', function(e) {
    const target = e.target.closest('a[href="#"]');
    if (target && !target.classList.contains('nav-menu-trigger')) {
      // Only prevent default if the link doesn't have a specific handler class
      if (!target.hasAttribute('data-bs-toggle') && !target.classList.contains('nav-link')) {
        e.preventDefault();
        return false;
      }
    }
  }, false);
});

