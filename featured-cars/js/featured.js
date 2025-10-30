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

    const applyFilter = category => {
        let visibleCount = 0;

        inventoryCards.forEach(card => {
            const cardCategory = card.dataset.category || 'all';
            const matches = category === 'all' || category === cardCategory;
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
