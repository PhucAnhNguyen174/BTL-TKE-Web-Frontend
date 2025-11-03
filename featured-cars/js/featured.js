// ===================================
// Featured Cars Page Interactions
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Promote the "Featured Cars" nav item as the active page indicator
    const navLinks = document.querySelectorAll('#mainNav .nav-link');
    const featuredLink = document.querySelector('#mainNav .nav-link[data-page="featured-cars"]');

    if (featuredLink) {
        navLinks.forEach(link => {
            link.classList.remove('nav-current-page', 'active');
            link.removeAttribute('aria-current');
        });
        featuredLink.classList.add('nav-current-page', 'active');
        featuredLink.setAttribute('aria-current', 'page');
    }

    // Disable specific footer links while keeping the interactive styling intact
    const disableLinkInteractivity = link => {
        if (!link) {
            return;
        }
        link.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
        });
        link.setAttribute('aria-disabled', 'true');
    };

    const disabledFooterSelectors = [
        '.footer-social a[aria-label="Visit LuxAuto on Facebook"]',
        '.footer-social a[aria-label="Visit LuxAuto on Instagram"]',
        '.footer-social a[aria-label="Visit LuxAuto on Twitter"]',
        '.footer-social a[aria-label="Visit LuxAuto on LinkedIn"]',
        '.footer-nav a[href="../main/pages/browse.html"]',
        '.footer-nav a[href="../main/pages/privacy.html"]',
        '.footer-bottom-links a[href="../main/pages/privacy.html"]'
    ];

    disabledFooterSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(disableLinkInteractivity);
    });

    // Restore the custom footer blurb that the shared script overrides
    const footerDescription = document.querySelector('.footer .footer-description');
    if (footerDescription) {
        footerDescription.textContent = 'Our featured collection represents the rarest commissions, homologated specials, and bespoke electric grand tourers sourced for discerning owners.';
    }

    // Set up filtering controls for the featured inventory grid
    const filterButtons = Array.from(document.querySelectorAll('.inventory-filter'));
    const inventoryCards = Array.from(document.querySelectorAll('#inventoryGrid .inventory-card'));
    const inventoryCountLabel = document.getElementById('inventoryCount');

    if (!filterButtons.length || !inventoryCards.length) {
        return;
    }

    const updateCountLabel = visibleCount => {
        if (!inventoryCountLabel) {
            return;
        }
        const label = visibleCount === 1 ? 'vehicle' : 'vehicles';
        inventoryCountLabel.textContent = `Showing ${visibleCount} curated ${label}`;
    };

    const parseCardCategories = card => {
        const raw = card.dataset.category || '';
        const categories = raw.split(/\s+/).map(label => label.trim().toLowerCase()).filter(Boolean);
        return categories.length ? categories : ['all'];
    };

    const applyFilter = category => {
        let visibleCount = 0;

        inventoryCards.forEach(card => {
            const categories = parseCardCategories(card);
            const matches = category === 'all' || categories.includes(category);
            const focusable = card.querySelector('a, button');
            if (matches) {
                card.dataset.hidden = 'false';
                if (focusable) {
                    focusable.setAttribute('tabindex', '0');
                }
                visibleCount += 1;
            } else {
                card.dataset.hidden = 'true';
                if (focusable) {
                    focusable.setAttribute('tabindex', '-1');
                }
            }
        });

        updateCountLabel(visibleCount);
    };

    const setActiveButton = targetButton => {
        filterButtons.forEach(button => {
            button.classList.remove('active');
            button.setAttribute('aria-pressed', 'false');
        });
        targetButton.classList.add('active');
        targetButton.setAttribute('aria-pressed', 'true');
    };

    filterButtons.forEach(button => {
        button.setAttribute('aria-pressed', button.classList.contains('active') ? 'true' : 'false');

        button.addEventListener('click', () => {
            const category = button.dataset.filter || 'all';
            setActiveButton(button);
            applyFilter(category);
        });

        button.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                button.click();
            }
        });
    });

    // Initialize the grid with the default filter state
    const initialFilter = filterButtons.find(button => button.classList.contains('active'));
    applyFilter(initialFilter ? initialFilter.dataset.filter || 'all' : 'all');
});
