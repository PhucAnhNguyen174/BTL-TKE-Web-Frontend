// ===================================
// Home Page Bootstrapping (page-specific helpers & UX polish)
// ===================================

(function(global) {
    const LuxAuto = global.LuxAuto = global.LuxAuto || {};
    LuxAuto.pages = LuxAuto.pages || {};

    const { qs, qsa, on } = LuxAuto.dom;

    const setFooterYear = () => {
        const currentYear = new Date().getFullYear();
        const footerTarget = qs('[data-footer-year]') || qs('.footer p');
        if (!footerTarget) {
            return;
        }
        footerTarget.innerHTML = `&copy; ${currentYear} LuxAuto. All rights reserved.`;
    };

    // Prevent users from leaving placeholder legal pages until real content ships.
    const disableFooterLinks = () => {
        const selectors = [
            '.footer-nav a[href="../main/pages/terms.html"]',
            '.footer-bottom-links a[href="../main/pages/terms.html"]'
        ];

        selectors.forEach(selector => {
            qsa(selector).forEach(link => {
                if (link.dataset.disabled === 'true') {
                    return;
                }
                on(link, 'click', event => {
                    event.preventDefault();
                    event.stopPropagation();
                });
                link.setAttribute('aria-disabled', 'true');
                link.dataset.disabled = 'true';
            });
        });
    };

    // Block dummy marketing CTAs while keeping the layout interactive.
    const disableMarketingLinks = () => {
        const linkSelectors = [
            '#blog .stretched-link',
            '#reviews a.btn',
            '#app .app-store-btn',
            '.footer a[href="pages/privacy.html"]',
            '.footer a[href="pages/terms.html"]',
            '.footer a[href="#"]'

        ];

        qsa(linkSelectors.join(',')).forEach(link => {
            link.setAttribute('aria-disabled', 'true');
            on(link, 'click', event => {
                event.preventDefault();
                event.stopImmediatePropagation();
            });
            on(link, 'keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                }
            });
        });
    };

    // Give a subtle loading cue by spinning inline icons when stub links are clicked.
    const initExternalLinkIndicators = () => {
        qsa('a[href^="pages/"]').forEach(link => {
            on(link, 'click', () => {
                const icon = link.querySelector('i');
                if (icon) {
                    icon.classList.add('bi-arrow-clockwise');
                    icon.style.animation = 'spin 1s linear infinite';
                }
            });
        });
    };

    // Quick keyboard shortcuts for demos, but ignore them when typing in inputs.
    const initKeyboardShortcuts = () => {
        on(document, 'keydown', event => {
            const target = event.target;
            if (target && (target.matches('input') || target.matches('textarea'))) {
                return;
            }

            if (event.key === 'h' || event.key === 'H') {
                qs('#why-choose-us')?.scrollIntoView({ behavior: 'smooth' });
            }

            if (event.key === 't' || event.key === 'T') {
                global.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    };

    const initCardHoverEffects = () => {
        qsa('.car-card').forEach(card => {
            on(card, 'mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            on(card, 'mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    };

    const logConsoleGreeting = () => {
        console.log('%c Welcome to LuxAuto! ', 'background: #0d6efd; color: white; font-size: 20px; padding: 10px;');
        console.log('%c Your trusted platform for buying and selling vehicles ', 'font-size: 14px; color: #6c757d;');
    };

    // Run page-specific polish only when the home landing experience is active.
    const initHomePage = () => {
        setFooterYear();
        disableFooterLinks();
        disableMarketingLinks();

        const isHomePage = document.body?.dataset.page === 'home' || !!qs('#landingAnimation');
        if (!isHomePage) {
            return;
        }

        initExternalLinkIndicators();
        initKeyboardShortcuts();
        initCardHoverEffects();
        logConsoleGreeting();
    };

    LuxAuto.pages.home = {
        initHomePage
    };
})(window);
