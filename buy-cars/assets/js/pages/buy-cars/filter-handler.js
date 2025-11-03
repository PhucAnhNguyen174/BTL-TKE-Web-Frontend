/* ===================================
   FILTER HANDLER
   =================================== */

// Active filters state
let activeFilters = {
    types: [],
    brands: [],
    minPrice: null,
    maxPrice: null,
    search: ''
};

/**
 * Apply filters to car list
 */
function applyFilters() {
    // Show loading state
    showLoadingState();
    
    // Simulate async operation with setTimeout (minimum 600ms for smooth UX)
    setTimeout(() => {
        const minPriceInput = document.getElementById('minPrice');
        const maxPriceInput = document.getElementById('maxPrice');
        
        // Get selected car types
        const selectedTypes = [];
        const checkboxes = {
            'supercarCheck': 'supercar',
            'hypercarCheck': 'hypercar',
            'sedanCheck': 'sedan',
            'suvCheck': 'suv',
            'convertibleCheck': 'convertible',
            'grandTourerCheck': 'grand-tourer',
            'coupeCheck': 'coupe'
        };

        Object.keys(checkboxes).forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox && checkbox.checked) {
                selectedTypes.push(checkboxes[id]);
            }
        });

        // Get selected car brands
        const selectedBrands = [];
        const brandCheckboxes = {
            'brandFerrariCheck': 'Ferrari',
            'brandBugattiCheck': 'Bugatti',
            'brandRollsRoyceCheck': 'Rolls-Royce',
            'brandPorscheCheck': 'Porsche',
            'brandLamborghiniCheck': 'Lamborghini'
        };

        Object.keys(brandCheckboxes).forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox && checkbox.checked) {
                selectedBrands.push(brandCheckboxes[id]);
            }
        });

        // Get price range
        const minPrice = Number(minPriceInput?.value) || 0;
        const maxPrice = Number(maxPriceInput?.value) || Infinity;

        // Update active filters state
        activeFilters.types = selectedTypes;
        activeFilters.brands = selectedBrands;
        activeFilters.minPrice = minPriceInput?.value ? minPrice : null;
        activeFilters.maxPrice = maxPriceInput?.value ? maxPrice : null;
        activeFilters.search = currentSearchTerm;

        // Filter cars
        let filteredCars = cars.filter(car => {
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(car.type);
            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(car.brand);
            const matchesPrice = car.price >= minPrice && car.price <= maxPrice;
            return matchesType && matchesBrand && matchesPrice;
        });
        
        // Apply search if exists
        if (currentSearchTerm) {
            filteredCars = searchCars(currentSearchTerm, filteredCars);
        }
        
        // Apply sorting
        filteredCars = sortCars(currentSort, filteredCars);

        // Render active filter chips
        renderActiveFilterChips();

        // Display filtered cars
        displayCars(filteredCars);
    }, 600);
}

/**
 * Render active filter chips
 */
function renderActiveFilterChips() {
    const activeFiltersContainer = document.getElementById('activeFiltersContainer');
    const activeFiltersDiv = document.getElementById('activeFilters');
    if (!activeFiltersDiv) return;
    
    const chips = [];
    
    // Add type chips
    activeFilters.types.forEach(type => {
        const icon = getTypeIcon(type);
        chips.push(`
            <span class="filter-chip">
                <i class="${icon}"></i>
                ${type.charAt(0).toUpperCase() + type.slice(1)}
                <button class="filter-chip-remove" data-filter-type="type" data-filter-value="${type}">
                    <i class="bi bi-x-circle-fill"></i>
                </button>
            </span>
        `);
    });

    // Add brand chips
    activeFilters.brands.forEach(brand => {
        chips.push(`
            <span class="filter-chip">
                <i class="bi bi-flag-fill"></i>
                ${brand}
                <button class="filter-chip-remove" data-filter-type="brand" data-filter-value="${brand}">
                    <i class="bi bi-x-circle-fill"></i>
                </button>
            </span>
        `);
    });
    
    // Add price range chip
    if (activeFilters.minPrice !== null || activeFilters.maxPrice !== null) {
        const minDisplay = activeFilters.minPrice ? `$${activeFilters.minPrice.toLocaleString()}` : '$0';
        const maxDisplay = activeFilters.maxPrice ? `$${activeFilters.maxPrice.toLocaleString()}` : '∞';
        chips.push(`
            <span class="filter-chip">
                <i class="bi bi-cash-stack"></i>
                ${minDisplay} - ${maxDisplay}
                <button class="filter-chip-remove" data-filter-type="price" data-filter-value="">
                    <i class="bi bi-x-circle-fill"></i>
                </button>
            </span>
        `);
    }
    
    // Add search chip
    if (activeFilters.search) {
        chips.push(`
            <span class="filter-chip">
                <i class="bi bi-search"></i>
                "${activeFilters.search}"
                <button class="filter-chip-remove" data-filter-type="search" data-filter-value="">
                    <i class="bi bi-x-circle-fill"></i>
                </button>
            </span>
        `);
    }
    
    // Show/hide chips container
    if (chips.length > 0) {
        activeFiltersDiv.innerHTML = chips.join('');
        if (activeFiltersContainer) {
            activeFiltersContainer.style.display = 'flex';
        }
    } else {
        activeFiltersDiv.innerHTML = '';
        if (activeFiltersContainer) {
            requestAnimationFrame(() => {
                setTimeout(() => {
                    activeFiltersContainer.style.display = 'none';
                }, 50);
            });
        }
    }
}

/**
 * Remove individual filter
 * @param {string} filterType - Type of filter (type, price, search)
 * @param {string} value - Filter value to remove
 */
function removeFilter(filterType, value) {
    if (filterType === 'type') {
        // Uncheck the checkbox
        const checkboxMap = {
            'supercar': 'supercarCheck',
            'hypercar': 'hypercarCheck',
            'sedan': 'sedanCheck',
            'suv': 'suvCheck',
            'convertible': 'convertibleCheck',
            'grand-tourer': 'grandTourerCheck',
            'coupe': 'coupeCheck'
        };
        const checkboxId = checkboxMap[value];
        if (checkboxId) {
            const checkbox = document.getElementById(checkboxId);
            if (checkbox) checkbox.checked = false;
        }
    } else if (filterType === 'brand') {
        const brandCheckboxMap = {
            'Ferrari': 'brandFerrariCheck',
            'Bugatti': 'brandBugattiCheck',
            'Rolls-Royce': 'brandRollsRoyceCheck',
            'Porsche': 'brandPorscheCheck',
            'Lamborghini': 'brandLamborghiniCheck'
        };
        const checkboxId = brandCheckboxMap[value];
        if (checkboxId) {
            const checkbox = document.getElementById(checkboxId);
            if (checkbox) checkbox.checked = false;
        }
    } else if (filterType === 'price') {
        // Clear price inputs
        const minPriceInput = document.getElementById('minPrice');
        const maxPriceInput = document.getElementById('maxPrice');
        if (minPriceInput) minPriceInput.value = '';
        if (maxPriceInput) maxPriceInput.value = '';
    } else if (filterType === 'search') {
        // Clear search
        clearSearch();
        return; // clearSearch already calls applyFilters
    }
    
    // Reapply filters
    applyFilters();
}

/**
 * Clear all active filters
 */
function clearAllFilters() {
    // Uncheck all type checkboxes
    const checkboxIds = [
        'supercarCheck', 'hypercarCheck', 'sedanCheck', 'suvCheck',
        'convertibleCheck', 'grandTourerCheck', 'coupeCheck',
        'brandFerrariCheck', 'brandBugattiCheck', 'brandRollsRoyceCheck',
        'brandPorscheCheck', 'brandLamborghiniCheck'
    ];
    
    checkboxIds.forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) checkbox.checked = false;
    });
    
    // Clear price inputs
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    if (minPriceInput) minPriceInput.value = '';
    if (maxPriceInput) maxPriceInput.value = '';
    
    // Clear search
    const searchInput = document.getElementById('carSearchInput');
    const clearSearchBtn = document.getElementById('clearSearch');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    if (searchInput) searchInput.value = '';
    currentSearchTerm = '';
    if (clearSearchBtn) clearSearchBtn.style.display = 'none';
    if (searchSuggestions) searchSuggestions.style.display = 'none';
    
    // Reset sorting to default (Featured)
    const sortSelected = document.getElementById('sortSelected');
    const sortMenu = document.getElementById('sortMenu');
    if (sortSelected) {
        sortSelected.querySelector('span').textContent = 'Featured';
        currentSort = 'default';
        // Remove active from all dropdown items and set first as active
        if (sortMenu) {
            const dropdownItems = sortMenu.querySelectorAll('.dropdown-item');
            dropdownItems.forEach((item, index) => {
                item.classList.remove('active');
                if (index === 0) item.classList.add('active');
            });
        }
    }
    
    // Reset active filters
    activeFilters = {
        types: [],
        brands: [],
        minPrice: null,
        maxPrice: null,
        search: ''
    };
    
    // Reapply (show all cars)
    applyFilters();
}

/**
 * Initialize filter event listeners
 */
function initFilterListeners() {
    const applyFiltersBtn = document.getElementById('applyFilters');
    const clearAllFiltersBtn = document.getElementById('clearAllFilters');
    const activeFiltersDiv = document.getElementById('activeFilters');
    
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', applyFilters);
    }
    
    if (clearAllFiltersBtn) {
        clearAllFiltersBtn.addEventListener('click', clearAllFilters);
    }
    
    // Event delegation for filter chip remove buttons
    if (activeFiltersDiv) {
        activeFiltersDiv.addEventListener('click', function(e) {
            const removeBtn = e.target.closest('.filter-chip-remove');
            if (removeBtn) {
                e.preventDefault();
                e.stopPropagation();
                const filterType = removeBtn.getAttribute('data-filter-type');
                const filterValue = removeBtn.getAttribute('data-filter-value');
                removeFilter(filterType, filterValue || null);
            }
        });
    }
}
