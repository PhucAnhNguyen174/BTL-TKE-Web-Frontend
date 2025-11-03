// ===================================
// LuxAuto Frontend Entry Point
// ===================================

(function(global) {
    const LuxAuto = global.LuxAuto = global.LuxAuto || {};

    const invokeIfAvailable = (object, method) => {
        if (object && typeof object[method] === 'function') {
            object[method]();
        }
    };

    const bootstrapLuxAuto = () => {
        LuxAuto.components = LuxAuto.components || {};
        LuxAuto.pages = LuxAuto.pages || {};

        if (document.body?.dataset?.page === 'home') {
            // Shrink the home page layout so it matches the previous 90% zoom presentation.
            document.documentElement.classList.add('layout-scale-90');
        }

        invokeIfAvailable(LuxAuto.components.landing, 'initLanding');
        invokeIfAvailable(LuxAuto.components.navbar, 'initNavbar');
        invokeIfAvailable(LuxAuto.components.sectionMenu, 'initSectionMenu');
        invokeIfAvailable(LuxAuto.components.backToTop, 'initBackToTop');
        invokeIfAvailable(LuxAuto.components.sectionReveal, 'initSectionReveal');
        invokeIfAvailable(LuxAuto.components.forms, 'initForms');
        invokeIfAvailable(LuxAuto.pages.home, 'initHomePage');
    };

    document.addEventListener('DOMContentLoaded', bootstrapLuxAuto);
})(window);
