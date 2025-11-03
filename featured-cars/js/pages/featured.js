// ===================================
// Featured Cars Page Entry Point
// ===================================
(function (global) {
    const LuxAuto = global.LuxAuto = global.LuxAuto || {};
    LuxAuto.pages = LuxAuto.pages || {};

    /**
     * Guards optional component hooks so missing imports do not throw during
     * the page bootstrap sequence.
     */
    const safeInvoke = (object, method) => {
        if (object && typeof object[method] === 'function') {
            object[method]();
        }
    };

    /**
     * Central initializer that runs every featured-specific component after
     * the shared LuxAuto scripts finish wiring the global namespace.
     */
    const initFeaturedPage = () => {
        const components = LuxAuto.components || {};

        safeInvoke(components.featuredNavbar, 'initFeaturedNavbar');
        safeInvoke(components.featuredFooter, 'initFeaturedFooter');
        safeInvoke(components.inventoryFilter, 'initInventoryFilter');
        safeInvoke(components.featuredSectionMenu, 'initFeaturedSectionMenu');
    };

    LuxAuto.pages.featured = {
        initFeaturedPage
    };

    if (global.document.readyState === 'loading') {
        global.document.addEventListener('DOMContentLoaded', initFeaturedPage);
    } else {
        initFeaturedPage();
    }
})(window);
