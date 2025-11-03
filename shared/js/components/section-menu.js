// ===================================
// Section Navigation Overlay (build list, toggle panel, positioning)
// ===================================

(function(global) {
    const LuxAuto = global.LuxAuto = global.LuxAuto || {};
    LuxAuto.components = LuxAuto.components || {};

    const { qs, qsa, on, addClass, removeClass, lockScrollWithin, setAriaExpanded } = LuxAuto.dom;
    const { smoothScrollTo } = LuxAuto.scroll;

    const ensureLandingDismissed = options => {
        const landing = LuxAuto.components.landing;
        if (landing && typeof landing.ensureLandingDismissed === 'function') {
            landing.ensureLandingDismissed(options);
        }
    };

    const initSectionMenu = () => {
        const menuPanel = qs('#sectionMenuPanel');
        const menuList = qs('#sectionMenuList');
        const menuCloseBtn = qs('#sectionMenuClose');
        const menuTriggers = qsa('.nav-menu-trigger');
        const navbarMenuBtn = qs('#landingMenuBtn');
        const sections = qsa('section[id]');

        if (!menuPanel || !menuList || !menuTriggers.length) {
            return;
        }

        let menuOpen = false;
        let menuAnchorElement = null;

        const getNavbarHeight = () => {
            const navbar = qs('.navbar');
            return navbar ? navbar.offsetHeight : 0;
        };

    // Scrolls to headings while accounting for nav height and dynamic layout shifts.
    const scrollToTarget = selector => {
            const targetElement = document.querySelector(selector);
            if (!targetElement) {
                return;
            }

            ensureLandingDismissed({ revealHero: true });

            const navbarHeight = getNavbarHeight();
            const innerHeading = targetElement.querySelector('h1, h2, h3, h4, h5, h6');
            const scrollAnchor = innerHeading || targetElement;
            const anchorTop = scrollAnchor.getBoundingClientRect().top + global.pageYOffset;
            const spacingOffset = innerHeading ? 32 : 16;
            const finalPosition = Math.max(anchorTop - navbarHeight - spacingOffset, 0);

            smoothScrollTo(finalPosition);

            // Re-align once animations settle so the heading stays locked below the navbar.
            setTimeout(() => {
                const refreshedNavbar = qs('.navbar');
                const refreshedHeight = refreshedNavbar ? refreshedNavbar.offsetHeight : 0;
                const currentRect = scrollAnchor.getBoundingClientRect();
                const desiredTop = (innerHeading ? 32 : 16) + refreshedHeight;
                const delta = currentRect.top - desiredTop;
                if (Math.abs(delta) > 1) {
                    global.scrollBy({ top: delta, behavior: 'auto' });
                }
            }, 350);
        };

        // Compile the section index dynamically so new sections auto-populate the overlay.
        const buildMenuItems = () => {
            menuList.innerHTML = '';

            const menuItems = [];
            const landingSection = qs('#landingAnimation');
            if (landingSection) {
                menuItems.push({ label: 'Home', target: '#landingAnimation' });
            }

            sections.forEach(section => {
                if (section.id === 'landingAnimation') {
                    return;
                }
                const heading = section.querySelector('h2, h3, h4, h5');
                const label = heading ? heading.textContent.trim() : section.id.replace(/-/g, ' ');
                menuItems.push({ label, target: `#${section.id}` });
            });

            menuItems.forEach(item => {
                const listItem = document.createElement('li');
                const anchor = document.createElement('a');
                anchor.href = item.target;
                anchor.innerHTML = `<span>${item.label}</span><i class="bi bi-arrow-right-short"></i>`;
                anchor.addEventListener('click', event => {
                    event.preventDefault();
                    closeMenu();
                    if (item.target === '#landingAnimation') {
                        smoothScrollTo(0);
                    } else {
                        scrollToTarget(item.target);
                    }
                });
                listItem.appendChild(anchor);
                menuList.appendChild(listItem);
            });
        };

    // Keep the floating panel anchored to the trigger without overflowing the viewport.
    const positionMenuPanel = anchorElement => {
            if (!anchorElement) {
                return;
            }
            const anchorRect = anchorElement.getBoundingClientRect();
            const panelWidth = menuPanel.offsetWidth || 0;
            const viewportWidth = global.innerWidth;
            const horizontalPadding = 16;
            const maxLeft = viewportWidth - panelWidth - horizontalPadding;
            const computedLeft = Math.max(horizontalPadding, Math.min(anchorRect.left, maxLeft));
            menuPanel.style.left = `${computedLeft}px`;
            menuPanel.style.top = `${anchorRect.bottom + 12}px`;
        };

        const setTriggersExpanded = state => {
            menuTriggers.forEach(trigger => setAriaExpanded(trigger, state));
        };

        // Open the floating panel near the trigger while locking scroll within the list.
        const openMenu = anchor => {
            menuAnchorElement = anchor || navbarMenuBtn || menuTriggers[0];
            positionMenuPanel(menuAnchorElement);
            addClass(menuPanel, 'open');
            menuPanel.setAttribute('aria-hidden', 'false');
            menuOpen = true;
            setTriggersExpanded('true');
            document.body.classList.add('section-menu-open');
        };

        // Close the overlay and restore page scroll without disrupting focus order.
        const closeMenu = () => {
            removeClass(menuPanel, 'open');
            menuPanel.setAttribute('aria-hidden', 'true');
            menuOpen = false;
            setTriggersExpanded('false');
            document.body.classList.remove('section-menu-open');
        };

        // Toggle entry point for button clicks so repeated taps behave predictably.
        const toggleMenu = anchor => {
            if (menuOpen) {
                closeMenu();
            } else {
                openMenu(anchor);
            }
        };

        menuTriggers.forEach(trigger => {
            on(trigger, 'click', event => {
                event.preventDefault();
                toggleMenu(event.currentTarget);
            });
        });

        if (menuCloseBtn) {
            on(menuCloseBtn, 'click', closeMenu);
        };

        on(document, 'click', event => {
            if (!menuOpen) {
                return;
            }
            const clickedInsidePanel = menuPanel.contains(event.target);
            const clickedTrigger = menuTriggers.some(trigger => trigger.contains(event.target));
            if (!clickedInsidePanel && !clickedTrigger) {
                closeMenu();
            }
        });

        on(document, 'keydown', event => {
            if (event.key === 'Escape' && menuOpen) {
                closeMenu();
            }
        });

        global.addEventListener('resize', () => {
            if (menuOpen) {
                positionMenuPanel(menuAnchorElement || navbarMenuBtn || menuTriggers[0]);
            }
        });

        lockScrollWithin(menuPanel, menuList);
        buildMenuItems();
    };

    LuxAuto.components.sectionMenu = {
        initSectionMenu
    };
})(window);
