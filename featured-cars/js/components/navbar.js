// ===================================
// Featured Page Navbar Highlighting
// ===================================
(function (global) {
    const LuxAuto = global.LuxAuto = global.LuxAuto || {};
    LuxAuto.components = LuxAuto.components || {};

    /**
     * Activates the Featured Cars navigation link by removing any lingering
     * active classes from shared navigation behaviours, ensuring aria-current
     * points at the featured entry after global navbar scripts execute.
     */
    const initFeaturedNavbar = () => {
        const navLinks = global.document.querySelectorAll('#mainNav .nav-link');
        const featuredLink = global.document.querySelector('#mainNav .nav-link[data-page="featured-cars"]');

        if (!navLinks.length || !featuredLink) {
            return;
        }

        navLinks.forEach(link => {
            link.classList.remove('nav-current-page', 'active');
            link.removeAttribute('aria-current');
        });

        featuredLink.classList.add('nav-current-page', 'active');
        featuredLink.setAttribute('aria-current', 'page');
    };

    LuxAuto.components.featuredNavbar = {
        initFeaturedNavbar
    };
})(window);
