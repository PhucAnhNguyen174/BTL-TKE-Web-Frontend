// ===================================
// Back-to-Top Button Behavior
// ===================================

(function(global) {
    const LuxAuto = global.LuxAuto = global.LuxAuto || {};
    LuxAuto.components = LuxAuto.components || {};

    const { qs, on, addClass, removeClass } = LuxAuto.dom;
    const { getScrollTop, smoothScrollTo } = LuxAuto.scroll;

    // Set up the floating button that appears after scrolling and jumps to the top smoothly.
    const initBackToTop = () => {
        const button = qs('#backToTop');
        if (!button) {
            return;
        }

        // Reveal the control once the visitor has scrolled past the hero section.
        const toggleVisibility = () => {
            if (getScrollTop() > 300) {
                addClass(button, 'show');
            } else {
                removeClass(button, 'show');
            }
        };

        toggleVisibility();
        global.addEventListener('scroll', toggleVisibility, { passive: true });

        on(button, 'click', () => {
            smoothScrollTo(0);
        });
    };

    LuxAuto.components.backToTop = {
        initBackToTop
    };
})(window);
