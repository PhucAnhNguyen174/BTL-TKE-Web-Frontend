/* ===================================
   BUY CARS PAGE - INITIALIZATION
   =================================== */

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const hasQueryFilters = hydrateFiltersFromQuery();

    // Initialize filter listeners
    initFilterListeners();
    
    // Initialize search listeners
    initSearchListeners();
    
    // Initialize sort dropdown
    initSortDropdown();
    
    // Initialize car list display
    initCarList(hasQueryFilters);
    
    // Auto-highlight current page in navbar
    highlightCurrentPage();
    
    // Initialize back to top button
    initBackToTop();

    if (hasQueryFilters) {
        applyFilters();
    }
});

/**
 * Auto-highlight current page in navbar
 */
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        
        if (linkHref) {
            const linkPage = linkHref.split('/').pop().split('#')[0];
            
            if ((currentPage === '' || currentPage === 'index.html') && 
                (linkPage === 'index.html' || linkHref === '../index.html')) {
                link.classList.add('active');
            }
            else if (currentPage === 'Buy_Cars.html' && linkPage === 'Buy_Cars.html') {
                link.classList.add('active');
            }
            else if (currentPage === 'Sell_Cars.html' && linkPage === 'Sell_Cars.html') {
                link.classList.add('active');
            }
            else if (currentPage === 'featured.html' && linkPage === 'featured.html') {
                link.classList.add('active');
            }
            else if (currentPage === 'car-details.html' && linkPage === 'car-details.html') {
                link.classList.add('active');
            }
        }
    });
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Hydrate filters from query parameters so landing page selections carry over.
 * @returns {boolean} returns true when at least one preset filter exists
 */
function hydrateFiltersFromQuery() {
    const params = new URLSearchParams(window.location.search);
    if (!params || !Array.from(params.keys()).length) {
        return false;
    }

    let hasFilters = false;

    const typeCheckboxMap = {
        'supercar': 'supercarCheck',
        'hypercar': 'hypercarCheck',
        'sedan': 'sedanCheck',
        'suv': 'suvCheck',
        'convertible': 'convertibleCheck',
        'grand-tourer': 'grandTourerCheck',
        'coupe': 'coupeCheck'
    };

    const brandCheckboxMap = {
        'ferrari': 'brandFerrariCheck',
        'bugatti': 'brandBugattiCheck',
        'rolls-royce': 'brandRollsRoyceCheck',
        'porsche': 'brandPorscheCheck',
        'lamborghini': 'brandLamborghiniCheck'
    };

    const setCheckboxes = (values, map) => {
        values.forEach(value => {
            const normalized = value.trim().toLowerCase();
            const checkboxId = map[normalized];
            if (!checkboxId) {
                return;
            }
            const checkbox = document.getElementById(checkboxId);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    };

    const typeParam = params.get('types');
    if (typeParam) {
        setCheckboxes(typeParam.split(','), typeCheckboxMap);
        hasFilters = true;
    }

    const brandParam = params.get('brands');
    if (brandParam) {
        setCheckboxes(brandParam.split(','), brandCheckboxMap);
        hasFilters = true;
    }

    const minPriceParam = params.get('minPrice');
    const maxPriceParam = params.get('maxPrice');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');

    if (minPriceParam && minPriceInput) {
        minPriceInput.value = Number(minPriceParam);
        hasFilters = true;
    }

    if (maxPriceParam && maxPriceInput) {
        maxPriceInput.value = Number(maxPriceParam);
        hasFilters = true;
    }

    const searchParam = params.get('search');
    if (searchParam) {
        const searchInput = document.getElementById('carSearchInput');
        const clearSearchBtn = document.getElementById('clearSearch');
        if (searchInput) {
            searchInput.value = searchParam;
        }
        currentSearchTerm = searchParam;
        if (clearSearchBtn) {
            clearSearchBtn.style.display = 'block';
        }
        hasFilters = true;
    }

    return hasFilters;
}
