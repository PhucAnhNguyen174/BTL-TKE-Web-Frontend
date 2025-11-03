// Navbar / Section Menu shared behaviours extracted from global.js
(function() {
  'use strict';

  // Wheel/Touch Lock Function for internal panel scrolling
  function enableWheelLock(container, scrollableElement) {
    if (!container || container.dataset.wheelLock === 'enabled') {
      return;
    }
    const target = scrollableElement || container;
    let touchStartY = 0;
    const shouldLock = deltaY => {
      const { scrollTop, scrollHeight, clientHeight } = target;
      if (scrollHeight <= clientHeight) return true;
      const atTop = scrollTop <= 0 && deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && deltaY > 0;
      return atTop || atBottom;
    };
    const handleWheel = e => { if (shouldLock(e.deltaY)) { e.preventDefault(); e.stopPropagation(); } };
    const handleTouchStart = e => { if (e.touches && e.touches.length) { touchStartY = e.touches[0].clientY; } };
    const handleTouchMove = e => {
      if (!e.touches || !e.touches.length) return;
      const deltaY = touchStartY - e.touches[0].clientY;
      if (shouldLock(deltaY)) { e.preventDefault(); e.stopPropagation(); }
    };
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.dataset.wheelLock = 'enabled';
  }

  // Body scroll lock helpers (safe)
  let scrollPosition = 0;
  let isBodyLocked = false;
  function lockBodyScroll() {
    if (isBodyLocked) return;
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop || 0;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
    isBodyLocked = true;
  }
  function unlockBodyScroll() {
    if (!isBodyLocked) return;
    const savedScrollPosition = scrollPosition || 0;
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    isBodyLocked = false;
    // Use requestAnimationFrame to ensure smooth restore without jumping
    requestAnimationFrame(() => {
      window.scrollTo(0, savedScrollPosition);
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    const menuPanel = document.getElementById('sectionMenuPanel');
    const menuList = document.getElementById('sectionMenuList');
    const menuCloseBtn = document.getElementById('sectionMenuClose');
    const menuTriggers = document.querySelectorAll('.nav-menu-trigger');
    const navbarMenuBtn = document.getElementById('landingMenuBtn');
    if (!menuPanel || !menuList) return;

    enableWheelLock(menuPanel, menuList);

    const menuItems = [];
    const sectionNodes = document.querySelectorAll('section[id], .form-card, .preview-card');
    sectionNodes.forEach(section => {
      let label = '', targetId = '';
      if (section.tagName === 'SECTION' && section.id) {
        const heading = section.querySelector('h1, h2, h3, h4, h5, h6');
        label = heading ? heading.textContent.trim() : section.id.replace(/-/g, ' ');
        targetId = section.id;
      } else if (section.classList.contains('form-card')) {
        const heading = section.querySelector('.form-header h2, h2, h3');
        label = heading ? heading.textContent.trim() : 'Vehicle Listing Form';
        targetId = 'form-section';
        section.id = targetId;
      } else if (section.classList.contains('preview-card')) {
        label = 'Live Preview';
        targetId = 'preview-section';
        section.id = targetId;
      }
      if (label && targetId) menuItems.push({ label, target: `#${targetId}` });
    });

    menuList.innerHTML = '';
    menuItems.forEach(item => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item.target;
      a.innerHTML = `<span>${item.label}</span><i class="bi bi-arrow-right-short"></i>`;
      a.addEventListener('click', e => {
        e.preventDefault();
        closeMenu();
        smoothScrollTo(item.target);
      });
      li.appendChild(a);
      menuList.appendChild(li);
    });

    function smoothScrollTo(sel) {
      const el = document.querySelector(sel);
      if (!el) return;
      const navbar = document.querySelector('.navbar');
      const nh = navbar ? navbar.offsetHeight : 0;
      const top = el.getBoundingClientRect().top + window.pageYOffset;
      const spacingOffset = 32;
      window.scrollTo({ top: Math.max(top - nh - spacingOffset, 0), behavior: 'smooth' });
    }

    function positionMenuPanel(anchor) {
      if (!menuPanel || !anchor) return;
      const r = anchor.getBoundingClientRect();
      const w = menuPanel.offsetWidth || 0;
      const vw = window.innerWidth;
      const pad = 16;
      const maxLeft = vw - w - pad;
      const left = Math.max(pad, Math.min(r.left, maxLeft));
      menuPanel.style.left = `${left}px`;
      menuPanel.style.top = `${r.bottom + 12}px`;
    }

    function setTriggersExpanded(state) { menuTriggers.forEach(t => t.setAttribute('aria-expanded', state)); }

    let open = false; let anchorEl = null;
    function openMenu() {
      positionMenuPanel(anchorEl || navbarMenuBtn || menuTriggers[0]);
      menuPanel.classList.add('open');
      menuPanel.setAttribute('aria-hidden', 'false');
      lockBodyScroll();
      open = true; setTriggersExpanded('true');
    }
    function closeMenu() {
      if (!open) return; // Do nothing if already closed
      menuPanel.classList.remove('open');
      menuPanel.setAttribute('aria-hidden', 'true');
      unlockBodyScroll();
      open = false; setTriggersExpanded('false');
    }

    menuTriggers.forEach(t => t.addEventListener('click', e => { e.preventDefault(); anchorEl = t; open ? closeMenu() : openMenu(); }));
    if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenu);
    document.addEventListener('click', e => {
      // Only attempt to close if currently open
      if (open && !e.target.closest('#sectionMenuPanel') && !e.target.closest('.nav-menu-trigger')) {
        closeMenu();
      }
    });
    window.addEventListener('resize', () => { if (open) positionMenuPanel(anchorEl || navbarMenuBtn || menuTriggers[0]); });
  });
})();
