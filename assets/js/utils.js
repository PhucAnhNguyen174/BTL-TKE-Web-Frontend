// Small shared utilities (no side effects)
window.$ = (sel, root = document) => root.querySelector(sel);
window.$$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
window.debounce = (fn, wait = 150) => { let t; return function(...args){ clearTimeout(t); t = setTimeout(() => fn.apply(this, args), wait); }; };
