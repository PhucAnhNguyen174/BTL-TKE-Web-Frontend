// ===================================
// Scroll Utilities (throttle, smooth scroll, observers)
// ===================================

(function(global) {
    const LuxAuto = global.LuxAuto = global.LuxAuto || {};

    // Leading-edge throttle with a trailing catch-up to keep scroll reactions smooth.
    const throttle = (fn, wait = 100) => {
        let last = 0;
        let timeoutId = null;

        return (...args) => {
            const now = Date.now();
            const remaining = wait - (now - last);

            if (remaining <= 0) {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                    timeoutId = null;
                }
                last = now;
                fn(...args);
            } else if (!timeoutId) {
                timeoutId = setTimeout(() => {
                    last = Date.now();
                    timeoutId = null;
                    fn(...args);
                }, remaining);
            }
        };
    };

    const getScrollTop = () => global.scrollY || global.pageYOffset || 0;

    const smoothScrollTo = (targetY, options = {}) => {
        global.scrollTo({
            top: targetY,
            behavior: options.behavior || 'smooth'
        });
    };

    const smoothScrollIntoView = (element, offset = 0) => {
        if (!element) {
            return;
        }
        const targetY = element.getBoundingClientRect().top + getScrollTop() - offset;
        smoothScrollTo(Math.max(targetY, 0));
    };

    const createInViewObserver = (callback, options) => new IntersectionObserver(callback, options);

    LuxAuto.scroll = {
        throttle,
        getScrollTop,
        smoothScrollTo,
        smoothScrollIntoView,
        createInViewObserver
    };
})(window);
