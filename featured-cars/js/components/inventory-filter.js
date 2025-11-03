// ===================================
// Featured Inventory Filtering Logic
// ===================================
(function (global) {
    const LuxAuto = global.LuxAuto = global.LuxAuto || {};
    LuxAuto.components = LuxAuto.components || {};

    /**
     * Wires up the filter pill controls so clicks and keyboard activation
     * toggle card visibility and keep the live inventory count in sync.
     */
    const initInventoryFilter = () => {
        const { document } = global;
        const filterButtons = Array.from(document.querySelectorAll('.inventory-filter'));
        const inventoryCards = Array.from(document.querySelectorAll('#inventoryGrid .inventory-card'));
        const inventoryCountLabel = document.getElementById('inventoryCount');

        if (!filterButtons.length || !inventoryCards.length) {
            return;
        }

        /**
         * Rewrites the "Showing N" label with the current tally and pluralises
         * the noun so assistive tech receives a coherent announcement.
         */
        const updateCountLabel = visibleCount => {
            if (!inventoryCountLabel) {
                return;
            }
            const label = visibleCount === 1 ? 'vehicle' : 'vehicles';
            inventoryCountLabel.textContent = `Showing ${visibleCount} curated ${label}`;
        };

        /**
         * Normalises the space-delimited category string on each card into an
         * array for quick inclusion checks during filtering.
         */
        const parseCardCategories = card => {
            const raw = card.dataset.category || '';
            return raw
                .split(/\s+/)
                .map(label => label.trim().toLowerCase())
                .filter(Boolean);
        };

        /**
         * Iterates through every card, toggles its data-hidden state, and keeps
         * the first focusable child reachable only when the card is visible.
         */
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

        /**
         * Swaps the active button styling/ARIA state so only the selected pill
         * presents as pressed to screen reader users.
         */
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

        const initialFilter = filterButtons.find(button => button.classList.contains('active'));
        applyFilter(initialFilter ? initialFilter.dataset.filter || 'all' : 'all');
    };

    LuxAuto.components.inventoryFilter = {
        initInventoryFilter
    };
})(window);
