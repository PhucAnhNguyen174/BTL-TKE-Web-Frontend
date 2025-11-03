// ===================================
// Navbar Behaviors (smooth scrolling, active state, background updates)
// ===================================

(function(global) {
    const LuxAuto = global.LuxAuto = global.LuxAuto || {};
    LuxAuto.components = LuxAuto.components || {};

    const { qs, qsa, on } = LuxAuto.dom;
    const { smoothScrollTo, getScrollTop } = LuxAuto.scroll;

    const resolveLandingThreshold = () => {
        const landing = LuxAuto.components.landing;
        return landing ? landing.LANDING_HIDE_THRESHOLD : 0;
    };

    const getNavbarHeight = () => {
        const navbar = qs('.navbar');
        return navbar ? navbar.offsetHeight : 0;
    };

    // Guard against scroll jumps by collapsing any expanded mobile menu after navigation.
    const collapseMobileMenu = () => {
        const navbarCollapse = qs('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show') && global.bootstrap?.Collapse) {
            const instance = global.bootstrap.Collapse.getInstance(navbarCollapse) || new global.bootstrap.Collapse(navbarCollapse);
            instance.hide();
        }
    };

    // Smoothly scroll to in-page anchors while compensating for the sticky navbar height.
    const handleAnchorClick = event => {
        const targetId = event.currentTarget.getAttribute('href');
        if (!targetId || targetId === '#') {
            return;
        }

        const targetElement = document.querySelector(targetId);
        if (!targetElement) {
            return;
        }

        event.preventDefault();

        const navbarHeight = getNavbarHeight();
        let targetPosition = targetElement.getBoundingClientRect().top + getScrollTop() - navbarHeight;

        if (targetElement.id === 'featured') {
            const threshold = resolveLandingThreshold();
            targetPosition = Math.max(targetPosition, threshold + 32);
        }

        smoothScrollTo(targetPosition);
        collapseMobileMenu();
    };

    // Compute a fuzzy score so deep links (e.g., folder/file) still highlight the right tab.
    const highlightCurrentPageNav = () => {
        const navLinks = qsa('#mainNav .nav-link');
        if (!navLinks.length) {
            return;
        }

        const rawPath = global.location.pathname || '';
        const normalizedPath = rawPath.replace(/\\/g, '/');
        const segments = normalizedPath.split('/').filter(Boolean);
        const fileName = segments.length ? segments[segments.length - 1] : 'main.html';
        const folderName = segments.length > 1 ? segments[segments.length - 2] : '';
        const combinedName = folderName ? `${folderName}/${fileName}` : fileName;

        let activeLink = null;
        let bestScore = 0;

        const computeScore = dataPage => {
            if (!dataPage) {
                return 0;
            }
            const key = dataPage.toLowerCase();
            const combinedKey = combinedName.toLowerCase();
            if (key === combinedKey) {
                return 3;
            }
            if (folderName && key === folderName.toLowerCase()) {
                return 2;
            }
            if (key === fileName.toLowerCase()) {
                return 1;
            }
            return 0;
        };

        navLinks.forEach(link => {
            link.classList.remove('nav-current-page', 'active');
            link.removeAttribute('aria-current');

            const score = computeScore(link.dataset.page || '');
            if (score > bestScore) {
                bestScore = score;
                activeLink = link;
            }
        });

        if (activeLink) {
            activeLink.classList.add('nav-current-page', 'active');
            activeLink.setAttribute('aria-current', 'page');
            return;
        }

        if (fileName.toLowerCase() === 'main.html') {
            const homeLink = qs('#mainNav .nav-link[data-page="main.html"]');
            if (homeLink) {
                homeLink.classList.add('nav-current-page', 'active');
                homeLink.setAttribute('aria-current', 'page');
            }
        }
    };

    // Apply a glass background once the user scrolls to improve legibility.
    const handleNavbarScroll = () => {
        const navbar = qs('.navbar');
        if (!navbar) {
            return;
        }

        if (getScrollTop() > 50) {
            navbar.style.backgroundColor = 'rgb(18, 18, 18)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = 'rgb(18, 18, 18)';
            navbar.style.backdropFilter = 'none';
        }
    };

    // Hook up anchor navigation, active-state detection, and scroll reactions.
    const initNavbar = () => {
        const anchorLinks = qsa('a[href^="#"]');
        anchorLinks.forEach(link => on(link, 'click', handleAnchorClick));

        highlightCurrentPageNav();
        on(document, 'pageshow', highlightCurrentPageNav);

        handleNavbarScroll();
        global.addEventListener('scroll', handleNavbarScroll, { passive: true });
    };

    LuxAuto.components.navbar = {
        initNavbar
    };
})(window);
