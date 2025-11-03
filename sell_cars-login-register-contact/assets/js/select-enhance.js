// Reusable custom select enhancer (index-style) for any page
// Usage: add class="filter-enhance" on <select> elements and include this script
(function(){
  // Wheel/Touch handler confines scroll to dropdown list area
  function enableWheelLock(container, scrollableElement) {
    if (!container || container.dataset.wheelLock === 'enabled') {
      return;
    }

    const target = scrollableElement || container;
    let touchStartY = 0;

    const handleWheel = event => {
      event.preventDefault();
      event.stopPropagation();

      const maxScroll = target.scrollHeight - target.clientHeight;
      if (maxScroll <= 0) {
        return;
      }
      const nextScroll = Math.max(0, Math.min(target.scrollTop + event.deltaY, maxScroll));
      target.scrollTop = nextScroll;
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
      event.preventDefault();
      event.stopPropagation();

      const maxScroll = target.scrollHeight - target.clientHeight;
      if (maxScroll <= 0) {
        return;
      }
      const nextScroll = Math.max(0, Math.min(target.scrollTop + deltaY, maxScroll));
      target.scrollTop = nextScroll;
      touchStartY = currentY;
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
        if (wrapper){
          wrapper.classList.remove('panel-open');
          const parentSection = wrapper.closest('.form-section');
          if (parentSection){ parentSection.classList.remove('dropdown-active'); }
        }
        const trigger = wrapper && wrapper.querySelector('.filter-select-trigger');
        if (trigger){
          trigger.classList.remove('open');
          trigger.setAttribute('aria-expanded','false');
        }
      }
    });
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
      panel.dataset.placement = 'below';

      const list = document.createElement('ul');
      list.className = 'filter-select-list';

      Array.from(select.options).forEach(option=>{
        // Skip placeholder entry so it stays only on the trigger
        const isPlaceholderOption = option === select.options[0] && option.value === '';
        if (option.disabled || option.hidden || isPlaceholderOption) return;
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

      // Position dropdown based on available viewport space
      const positionPanel = () => {
        const triggerRect = trigger.getBoundingClientRect();
        const availableBelow = window.innerHeight - triggerRect.bottom - 16;
        const availableAbove = triggerRect.top - 16;
        const shouldOpenAbove = availableAbove > availableBelow;
        const placement = shouldOpenAbove ? 'above' : 'below';
        panel.dataset.placement = placement;

        if (list) {
          if (placement === 'above') {
            list.style.maxHeight = availableAbove > 0 ? `${Math.min(availableAbove, 420)}px` : '';
          } else {
            list.style.maxHeight = availableBelow > 0 ? `${Math.min(availableBelow, 420)}px` : '';
          }
        }
      };

      if (!panel.dataset.repositionListener) {
        const reposition = () => {
          if (panel.classList.contains('open')) {
            positionPanel();
          }
        };
        window.addEventListener('resize', reposition);
        window.addEventListener('scroll', reposition, true);
        panel.dataset.repositionListener = 'true';
      }

      function openPanel(){
        closeAllPanels(panel);
        positionPanel();
        panel.classList.add('open');
        panel.setAttribute('aria-hidden','false');
        trigger.classList.add('open');
        trigger.setAttribute('aria-expanded','true');
        wrapper.classList.add('panel-open');
        const parentSection = wrapper.closest('.form-section');
        if (parentSection){ parentSection.classList.add('dropdown-active'); }
      }

      function closePanel(){
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden','true');
        trigger.classList.remove('open');
        trigger.setAttribute('aria-expanded','false');
        wrapper.classList.remove('panel-open');
        const parentSection = wrapper.closest('.form-section');
        if (parentSection){ parentSection.classList.remove('dropdown-active'); }
        if (list) {
          list.style.maxHeight = '';
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
        } else {
          const placeholderText = select.getAttribute('data-placeholder') || select.options[0]?.textContent || 'Select';
          trigger.querySelector('span').textContent = placeholderText;
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
