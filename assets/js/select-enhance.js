// Reusable custom select enhancer (index-style) for any page
// Usage: add class="filter-enhance" on <select> elements and include this script
(function(){
  // Wheel/Touch Lock Function
  function enableWheelLock(container, scrollableElement) {
    if (!container || container.dataset.wheelLock === 'enabled') {
      return;
    }

    const target = scrollableElement || container;
    let touchStartY = 0;

    const shouldLock = deltaY => {
      const { scrollTop, scrollHeight, clientHeight } = target;
      if (scrollHeight <= clientHeight) {
        return true;
      }
      const atTop = scrollTop <= 0 && deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && deltaY > 0;
      return atTop || atBottom;
    };

    const handleWheel = event => {
      if (shouldLock(event.deltaY)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const handleTouchStart = event => {
      if (event.touches && event.touches.length) {
        touchStartY = event.touches[0].clientY;
      }
    };

    const handleTouchMove = event => {
      if (!event.touches || !event.touches.length) {
        return;
      }
      const currentY = event.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      if (shouldLock(deltaY)) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.dataset.wheelLock = 'enabled';
  }

  function closeAllPanels(except){
    document.querySelectorAll('.filter-select-panel.open').forEach(p=>{
      if (p!==except){
        p.classList.remove('open');
        p.setAttribute('aria-hidden','true');
        const wrapper = p.closest('.filter-select-wrapper');
        if (wrapper){ wrapper.classList.remove('panel-open'); }
        const trigger = wrapper && wrapper.querySelector('.filter-select-trigger');
        if (trigger){
          trigger.classList.remove('open');
          trigger.setAttribute('aria-expanded','false');
        }
      }
    });
    if (!document.querySelector('.filter-select-panel.open')) {
      document.body.style.overflow = '';
    }
  }

  function enhanceSelects(){
    const selects = Array.from(document.querySelectorAll('select.filter-enhance'));
    selects.forEach(select=>{
      if (select.dataset.enhanced === 'true') return;

      const wrapper = document.createElement('div');
      wrapper.className = 'filter-select-wrapper';
      select.parentNode.insertBefore(wrapper, select);
      wrapper.appendChild(select);

      select.classList.add('filter-native-select');

      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'filter-select-trigger';
      trigger.setAttribute('aria-haspopup','listbox');
      trigger.setAttribute('aria-expanded','false');

      const activeOption = select.options[select.selectedIndex];
      const initialLabel = activeOption ? activeOption.textContent : (select.getAttribute('data-placeholder') || 'Select');
      trigger.innerHTML = `<span>${initialLabel}</span><i class="bi bi-chevron-down"></i>`;
      wrapper.appendChild(trigger);

      const panel = document.createElement('div');
      panel.className = 'filter-select-panel';
      panel.setAttribute('aria-hidden','true');
      panel.setAttribute('role','listbox');

      const list = document.createElement('ul');
      list.className = 'filter-select-list';

      Array.from(select.options).forEach(option=>{
        if (option.disabled || option.hidden) return;
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'filter-select-option';
        btn.dataset.value = option.value;
        btn.textContent = option.textContent;
        btn.setAttribute('role','option');
        if (option.selected) btn.classList.add('active');
        btn.addEventListener('click', ()=>{
          select.value = option.value;
          trigger.querySelector('span').textContent = option.textContent;
          list.querySelectorAll('.filter-select-option').forEach(b=>b.classList.remove('active'));
          btn.classList.add('active');
          select.dispatchEvent(new Event('change', { bubbles:true }));
          closePanel();
        });
        li.appendChild(btn);
        list.appendChild(li);
      });

      panel.appendChild(list);
      wrapper.appendChild(panel);

      // Enable wheel lock immediately after panel is created
      enableWheelLock(panel, list);

      // Move/open the panel as a portal under <body> to escape stacking contexts
      let portalAttached = false;
      let originalNextSibling = null;
      function updatePanelPosition(){
        const margin = 12;
        const wrapperRect = wrapper.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const spaceAbove = wrapperRect.top;
        const spaceBelow = viewportHeight - wrapperRect.bottom;

        // Ensure the panel is attached to body as fixed layer
        if (!portalAttached){
          originalNextSibling = panel.nextSibling;
          panel.style.position = 'fixed';
          panel.style.left = `${Math.max(8, Math.min(wrapperRect.left, viewportWidth - wrapperRect.width - 8))}px`;
          panel.style.width = `${wrapperRect.width}px`;
          document.body.appendChild(panel);
          portalAttached = true;
        } else {
          panel.style.left = `${Math.max(8, Math.min(wrapperRect.left, viewportWidth - wrapperRect.width - 8))}px`;
          panel.style.width = `${wrapperRect.width}px`;
        }

        panel.classList.remove('drop-up');
        panel.style.bottom = 'auto';
        panel.style.top = 'auto';

        const listEl = panel.querySelector('.filter-select-list');
        const panelHeight = Math.min(420, Math.round(viewportHeight * 0.55));
        // Choose up or down based on available space
        if (spaceBelow < Math.min(panelHeight + margin, spaceAbove)){
          panel.classList.add('drop-up');
          panel.style.top = 'auto';
          panel.style.bottom = `${Math.max(8, viewportHeight - wrapperRect.top + margin)}px`;
          const maxH = Math.max(160, Math.min(panelHeight, spaceAbove - margin));
          if (listEl){ listEl.style.maxHeight = `${maxH}px`; }
        } else {
          panel.classList.remove('drop-up');
          panel.style.top = `${Math.max(8, wrapperRect.bottom + margin)}px`;
          const maxH = Math.max(160, Math.min(panelHeight, spaceBelow - margin));
          if (listEl){ listEl.style.maxHeight = `${maxH}px`; }
        }
      }

      function openPanel(){
        closeAllPanels(panel);
        panel.classList.add('open');
        panel.setAttribute('aria-hidden','false');
        trigger.classList.add('open');
        trigger.setAttribute('aria-expanded','true');
        wrapper.classList.add('panel-open');
        // Lock body scroll when panel opens
        document.body.style.overflow = 'hidden';
        // Position panel (drop-up/down) and size
        updatePanelPosition();
        window.addEventListener('resize', updatePanelPosition, { passive: true });
        window.addEventListener('scroll', updatePanelPosition, { passive: true });
      }
      function closePanel(){
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden','true');
        trigger.classList.remove('open');
        trigger.setAttribute('aria-expanded','false');
        wrapper.classList.remove('panel-open');
        // Unlock body scroll when panel closes
        if (!document.querySelector('.filter-select-panel.open')) {
          document.body.style.overflow = '';
        }
        window.removeEventListener('resize', updatePanelPosition);
        window.removeEventListener('scroll', updatePanelPosition);
        // Restore panel back into wrapper
        if (portalAttached){
          panel.style.position = '';
          panel.style.left = '';
          panel.style.top = '';
          panel.style.bottom = '';
          panel.style.width = '';
          panel.classList.remove('drop-up');
          if (originalNextSibling && originalNextSibling.parentNode === wrapper){
            wrapper.insertBefore(panel, originalNextSibling);
          } else {
            wrapper.appendChild(panel);
          }
          portalAttached = false;
        }
      }

      trigger.addEventListener('click', (e)=>{
        e.preventDefault();
        if (panel.classList.contains('open')) closePanel(); else openPanel();
      });
      trigger.addEventListener('keydown',(e)=>{
        if (e.key==='Enter' || e.key===' ') { 
          e.preventDefault(); 
          if(panel.classList.contains('open')) closePanel(); else openPanel(); 
        }
      });

      select.addEventListener('change', ()=>{
        const match = Array.from(list.querySelectorAll('.filter-select-option')).find(b=>b.dataset.value===select.value);
        list.querySelectorAll('.filter-select-option').forEach(b=>b.classList.remove('active'));
        if (match) {
          match.classList.add('active');
          trigger.querySelector('span').textContent = match.textContent;
        }
      });

      select.dataset.enhanced = 'true';
    });
  }

  document.addEventListener('click', (e)=>{
    if (!e.target.closest('.filter-select-wrapper')) closeAllPanels(null);
  });
  document.addEventListener('keydown', (e)=>{ if (e.key==='Escape') closeAllPanels(null); });
  document.addEventListener('DOMContentLoaded', enhanceSelects);
})();
