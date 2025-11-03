// ===================================
// Landing Overlay, Hero Reveal, and Filter/Search Enhancements
// ===================================

(function(global) {
    const LuxAuto = global.LuxAuto = global.LuxAuto || {};
    LuxAuto.components = LuxAuto.components || {};

    const { qs, qsa, on, addClass, removeClass, lockScrollWithin } = LuxAuto.dom;
    const { getScrollTop } = LuxAuto.scroll;

    // Single-pixel buffer ensures the landing overlay hides as soon as the user scrolls.
    const LANDING_HIDE_THRESHOLD = 1;

    let landingAnimation = null;
    let navbar = null;
    let heroSection = null;
    let hasScrolledPastLanding = false;
    let heroReadyToShow = false;

    // Track open filter panels so we can close siblings when toggling.
    const filterDropdownRegistry = [];

    // Lazily grab commonly reused landing elements to avoid repeated DOM queries.
    const resolveLandingNodes = () => {
        landingAnimation = landingAnimation || qs('#landingAnimation');
        navbar = navbar || qs('#mainNav');
        heroSection = heroSection || qs('#why-choose-us');
    };

    // Reveal the hero once the landing overlay is dismissed and the section is ready.
    const revealHeroSection = () => {
        resolveLandingNodes();
        if (!heroSection || !heroReadyToShow) {
            return;
        }
        removeClass(heroSection, 'section-hidden');
        addClass(heroSection, 'section-visible');
    };

    // Reset hero visibility so repeated landings replay the reveal animation smoothly.
    const resetHeroSection = () => {
        resolveLandingNodes();
        heroReadyToShow = false;
        if (!heroSection) {
            return;
        }
        removeClass(heroSection, 'section-visible');
        addClass(heroSection, 'section-hidden');
    };

    const markHeroReady = () => {
        heroReadyToShow = true;
        revealHeroSection();
    };

    // Force-hide the landing overlay and optionally unlock the hero section based on context.
    const ensureLandingDismissed = ({ revealHero = true } = {}) => {
        resolveLandingNodes();

        if (landingAnimation && !landingAnimation.classList.contains('hidden')) {
            landingAnimation.classList.add('hidden');
        }

        if (navbar) {
            navbar.classList.remove('navbar-hidden');
            navbar.classList.add('navbar-visible');
        }

        if (revealHero) {
            heroReadyToShow = true;
            revealHeroSection();
        }
    };

    // Toggle the landing overlay and nav visibility in response to scroll progress.
    const handleLandingScroll = () => {
        resolveLandingNodes();
        if (!landingAnimation || !navbar) {
            return;
        }

        const scrollY = getScrollTop();

        if (scrollY > LANDING_HIDE_THRESHOLD && !hasScrolledPastLanding) {
            hasScrolledPastLanding = true;
            landingAnimation.classList.add('hidden');
            navbar.classList.remove('navbar-hidden');
            navbar.classList.add('navbar-visible');
            revealHeroSection();
            return;
        }

        if (scrollY <= LANDING_HIDE_THRESHOLD && hasScrolledPastLanding) {
            hasScrolledPastLanding = false;
            landingAnimation.classList.remove('hidden');
            navbar.classList.remove('navbar-visible');
            navbar.classList.add('navbar-hidden');
            resetHeroSection();
            return;
        }

        if (scrollY > LANDING_HIDE_THRESHOLD) {
            navbar.classList.remove('navbar-hidden');
            navbar.classList.add('navbar-visible');
            revealHeroSection();
        }
    };

    const closeAllFilterPanels = exceptPanel => {
        filterDropdownRegistry.forEach(entry => {
            if (entry.panel !== exceptPanel) {
                entry.close();
            }
        });
    };

    // Replace native <select> with an accessible custom dropdown + listbox.
    const enhanceSelectElement = selectElement => {
        if (!selectElement || selectElement.dataset.enhanced === 'true') {
            return;
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'filter-select-wrapper';
        selectElement.parentNode.insertBefore(wrapper, selectElement);
        wrapper.appendChild(selectElement);

        selectElement.classList.add('filter-native-select');

        const trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.className = 'filter-select-trigger';
        trigger.setAttribute('aria-haspopup', 'listbox');
        trigger.setAttribute('aria-expanded', 'false');

        const activeOption = selectElement.options[selectElement.selectedIndex];
        const placeholder = selectElement.getAttribute('data-placeholder') || 'Select';
        trigger.innerHTML = `<span>${activeOption ? activeOption.textContent : placeholder}</span><i class="bi bi-chevron-down"></i>`;
        wrapper.appendChild(trigger);

        const panel = document.createElement('div');
        panel.className = 'filter-select-panel section-menu-card';
        panel.setAttribute('aria-hidden', 'true');
        panel.setAttribute('role', 'listbox');

        const list = document.createElement('ul');
        list.className = 'filter-select-list';

        Array.from(selectElement.options).forEach(option => {
            if (option.disabled || option.hidden) {
                return;
            }

            const listItem = document.createElement('li');
            const optionButton = document.createElement('button');
            optionButton.type = 'button';
            optionButton.className = 'filter-select-option';
            optionButton.dataset.value = option.value;
            optionButton.textContent = option.textContent;
            optionButton.setAttribute('role', 'option');

            if (option.selected) {
                optionButton.classList.add('active');
            }

            optionButton.addEventListener('click', () => {
                selectElement.value = option.value;
                trigger.querySelector('span').textContent = option.textContent;
                list.querySelectorAll('.filter-select-option').forEach(btn => btn.classList.remove('active'));
                optionButton.classList.add('active');
                selectElement.dispatchEvent(new Event('change', { bubbles: true }));
                panelClose();
            });

            listItem.appendChild(optionButton);
            list.appendChild(listItem);
        });

        panel.appendChild(list);
        wrapper.appendChild(panel);
        lockScrollWithin(panel, list);

        const panelClose = () => {
            panel.classList.remove('open');
            panel.setAttribute('aria-hidden', 'true');
            trigger.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
        };

        const panelOpen = () => {
            closeAllFilterPanels(panel);
            panel.classList.add('open');
            panel.setAttribute('aria-hidden', 'false');
            trigger.classList.add('open');
            trigger.setAttribute('aria-expanded', 'true');
        };

        trigger.addEventListener('click', event => {
            event.preventDefault();
            if (panel.classList.contains('open')) {
                panelClose();
            } else {
                panelOpen();
            }
        });

        trigger.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                if (panel.classList.contains('open')) {
                    panelClose();
                } else {
                    panelOpen();
                }
            }
        });

        selectElement.addEventListener('change', () => {
            const matchingOption = Array.from(list.querySelectorAll('.filter-select-option')).find(btn => btn.dataset.value === selectElement.value);
            list.querySelectorAll('.filter-select-option').forEach(btn => btn.classList.remove('active'));
            if (matchingOption) {
                matchingOption.classList.add('active');
                trigger.querySelector('span').textContent = matchingOption.textContent;
            }
        });

        filterDropdownRegistry.push({ panel, close: panelClose });
        selectElement.dataset.enhanced = 'true';
    };

    const enhanceLandingFilters = () => {
        const selects = qsa('.landing-filter');
        selects.forEach(enhanceSelectElement);
        return selects;
    };

    // Manage the filter toggle animation and keep dropdown panels mutually exclusive.
    const initFilterToggle = (filterToggle, filterGroup) => {
        if (!filterToggle || !filterGroup) {
            return;
        }

        // Lightweight ripple to give the toggle a tactile feel without external libs.
        const createRipple = button => {
            if (!button) {
                return;
            }
            button.classList.remove('ripple');
            void button.offsetWidth;
            button.classList.add('ripple');
            setTimeout(() => button.classList.remove('ripple'), 800);
        };

        filterToggle.addEventListener('click', event => {
            event.preventDefault();
            createRipple(filterToggle);

            if (filterGroup.classList.contains('show')) {
                filterGroup.classList.add('hide');
                filterToggle.classList.remove('active');
                closeAllFilterPanels();
                setTimeout(() => {
                    filterGroup.classList.remove('show', 'hide');
                    closeAllFilterPanels();
                }, 500);
            } else {
                filterGroup.classList.add('show');
                filterToggle.classList.add('active');
            }
        });
    };

    // Wire up the hero search bar, fake filtering, and smooth scroll hand-off to featured cars.
    const initLandingSearch = () => {
        const searchInput = qs('.landing-search-input');
        const searchBtn = qs('.landing-search-btn');
        const filterToggle = qs('#filterToggle');
        const filterGroup = qs('#filterGroup');

        const [brandFilter, typeFilter, priceFilter] = enhanceLandingFilters();
        initFilterToggle(filterToggle, filterGroup);

    // Build query parameters from the landing filters and jump into the Buy Cars catalogue.
        const performSearch = () => {
            const query = searchInput ? searchInput.value.trim() : '';
            const brandValue = brandFilter ? brandFilter.value : '';
            const typeValue = typeFilter ? typeFilter.value : '';
            const priceValue = priceFilter ? priceFilter.value : '';

            const brandLabelMap = {
                'ferrari': 'Ferrari',
                'bugatti': 'Bugatti',
                'lamborghini': 'Lamborghini',
                'porsche': 'Porsche',
                'rolls-royce': 'Rolls-Royce'
            };

            const priceRangeMap = {
                '0-50k': { min: 0, max: 50000 },
                '50k-100k': { min: 50000, max: 100000 },
                '100k-200k': { min: 100000, max: 200000 },
                '200k-500k': { min: 200000, max: 500000 },
                '500k-1m': { min: 500000, max: 1000000 },
                '1m+': { min: 1000000, max: null }
            };

            const params = new URLSearchParams();

            if (query) {
                params.set('search', query);
            }

            if (brandValue) {
                const normalizedBrand = brandLabelMap[brandValue.toLowerCase()] || brandValue;
                params.set('brands', normalizedBrand);
            }

            if (typeValue) {
                params.set('types', typeValue.toLowerCase());
            }

            if (priceValue) {
                const range = priceRangeMap[priceValue];
                if (range) {
                    if (typeof range.min === 'number') {
                        params.set('minPrice', range.min);
                    }
                    if (typeof range.max === 'number') {
                        params.set('maxPrice', range.max);
                    }
                }
            }

            const targetUrl = '../buy-cars/buy%20cars/Buy_Cars.html';
            const destination = params.toString() ? `${targetUrl}?${params.toString()}` : targetUrl;

            if (filterGroup) {
                filterGroup.classList.remove('show', 'hide');
            }
            if (filterToggle) {
                filterToggle.classList.remove('active');
            }

            window.location.href = destination;
        };

        if (searchBtn) {
            on(searchBtn, 'click', performSearch);
        }

        if (searchInput) {
            on(searchInput, 'keypress', event => {
                if (event.key === 'Enter') {
                    performSearch();
                }
            });
        }

        [brandFilter, typeFilter, priceFilter].forEach(filter => {
            if (!filter) {
                return;
            }
            on(filter, 'change', function () {
                console.log('Filter changed:', this.value);
                const wrapper = this.closest('.filter-select-wrapper');
                if (!wrapper) {
                    return;
                }
                const trigger = wrapper.querySelector('.filter-select-trigger');
                if (!trigger) {
                    return;
                }
                trigger.classList.add('selection-feedback');
                setTimeout(() => trigger.classList.remove('selection-feedback'), 400);
            });
        });

        on(document, 'click', event => {
            if (!event.target.closest('.filter-select-wrapper')) {
                closeAllFilterPanels();
            }
        });

        on(document, 'keydown', event => {
            if (event.key === 'Escape') {
                closeAllFilterPanels();
            }
        });
    };

    // Boot sequence for the landing overlay, including observers and search enhancements.
    const initLanding = () => {
        resolveLandingNodes();

        if (heroSection) {
            heroSection.dataset.readyToReveal = 'false';
            addClass(heroSection, 'section-hidden');
        }

        global.luxAutoMarkHeroReady = markHeroReady;

        handleLandingScroll();
        global.addEventListener('scroll', handleLandingScroll, { passive: true });

        initLandingSearch();
    };

    LuxAuto.components.landing = {
        LANDING_HIDE_THRESHOLD,
        initLanding,
        ensureLandingDismissed,
        markHeroReady
    };
})(window);
