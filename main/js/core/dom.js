// ===================================
// DOM Helpers (query, events, class utilities)
// ===================================

(function(global) {
    const LuxAuto = global.LuxAuto = global.LuxAuto || {};

    const qs = (selector, scope = document) => scope.querySelector(selector);
    const qsa = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

    const on = (element, event, handler, options) => {
        if (!element) {
            return;
        }
        element.addEventListener(event, handler, options);
    };

    const off = (element, event, handler, options) => {
        if (!element) {
            return;
        }
        element.removeEventListener(event, handler, options);
    };

    const addClass = (element, className) => {
        if (element) {
            element.classList.add(className);
        }
    };

    const removeClass = (element, className) => {
        if (element) {
            element.classList.remove(className);
        }
    };

    const toggleClass = (element, className, force) => {
        if (element) {
            element.classList.toggle(className, force);
        }
    };

    const setAriaExpanded = (element, state) => {
        if (element) {
            element.setAttribute('aria-expanded', String(state));
        }
    };

    // Prevent scroll bleed when a nested panel reaches its bounds.
    const lockScrollWithin = (container, scrollableElement) => {
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
    };

    LuxAuto.dom = {
        qs,
        qsa,
        on,
        off,
        addClass,
        removeClass,
        toggleClass,
        setAriaExpanded,
        lockScrollWithin
    };
})(window);
