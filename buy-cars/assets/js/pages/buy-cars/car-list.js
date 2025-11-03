/* ===================================
   CAR LIST DISPLAY & SORTING
   =================================== */

// Current sort order
let currentSort = 'default';

/**
 * Create enhanced car card with badges and price tier
 * @param {Object} car - Car object with all details
 * @returns {string} HTML string for car card
 */
function createCarCard(car) {
    // Determine price tier for special effects
    let priceTier = '';
    if (car.price >= 10000000) priceTier = 'ultra'; // $10M+
    else if (car.price >= 5000000) priceTier = 'premium'; // $5M+
    else if (car.price >= 1000000) priceTier = 'luxury'; // $1M+
    
    // Determine badges
    const badges = [];
    
    // Check if new (2023+)
    const yearStart = parseInt(car.years.split('-')[0]);
    if (yearStart >= 2023) {
        badges.push('<span class="info-badge new">New</span>');
    }
    
    // Check if limited production
    const limitedKeywords = ['limited', 'units', 'rare', 'collector', 'bespoke', 'exclusive'];
    const productionText = car.production?.units?.toLowerCase() || '';
    const categoryText = car.category?.toLowerCase() || '';
    
    if (limitedKeywords.some(keyword => 
        productionText.includes(keyword) || categoryText.includes(keyword)
    )) {
        badges.push('<span class="info-badge limited">Limited</span>');
    }
    
    // Check if collector's item
    if (categoryText === 'collector' || car.price >= 5000000) {
        badges.push('<span class="info-badge collector">Collector</span>');
    }
    
    // Format price - remove "US" text if exists
    const formattedPrice = car.pricing.current.replace('US', '').replace('$', '').trim();
    
    return `
        <div class="col-md-6 col-lg-4 col-xl-3 mb-4">
            <a href="../cars details/car-details.html?id=${car.id}" class="car-card" data-price-tier="${priceTier}">
                <div class="car-card-image">
                    <img src="../${car.image}" alt="${car.name}">
                    ${car.sold ? '<span class="sold-badge">SOLD OUT</span>' : ''}
                </div>
                <div class="car-card-body">
                    <p class="car-brand">${car.brand.toUpperCase()}</p>
                    <h5 class="car-name">${car.name}</h5>
                    <p class="car-price">${formattedPrice}</p>
                    ${badges.length > 0 ? `<div class="car-info-badges">${badges.join('')}</div>` : ''}
                </div>
            </a>
        </div>
    `;
}

/**
 * Display cars in the listing grid
 * @param {Array} carsToDisplay - Array of car objects to display
 */
function displayCars(carsToDisplay) {
    const carListings = document.getElementById('carListings');
    const carCountDisplay = document.getElementById('carCount');
    
    // Hide loading skeleton
    hideLoadingState();
    
    // Update car count
    if (carCountDisplay) {
        carCountDisplay.textContent = carsToDisplay.length;
    }
    
    if (carsToDisplay.length === 0) {
        if (carListings) {
            carListings.innerHTML = `
                <div class="col-12 text-center py-5">
                    <i class="bi bi-search" style="font-size: 3rem; color: #6c757d;"></i>
                    <p class="mt-3 text-muted">No cars found matching your filters.</p>
                </div>
            `;
        }
    } else {
        if (carListings) {
            carListings.innerHTML = carsToDisplay.map(car => createCarCard(car)).join('');
            
            // Trigger staggered animation for cards
            animateCarCards();
        }
    }
}

/**
 * Show loading skeleton state
 */
function showLoadingState() {
    const loadingSkeleton = document.getElementById('loadingSkeleton');
    if (loadingSkeleton) {
        loadingSkeleton.classList.remove('hidden');
    }
}

/**
 * Hide loading skeleton state
 */
function hideLoadingState() {
    const loadingSkeleton = document.getElementById('loadingSkeleton');
    if (loadingSkeleton) {
        loadingSkeleton.classList.add('hidden');
    }
}

/**
 * Animate car cards with staggered timing
 */
function animateCarCards() {
    const cards = document.querySelectorAll('.car-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-in');
        }, index * 100);
    });
}

/**
 * Sort cars based on selected option
 * @param {string} sortBy - Sort criteria
 * @param {Array} carList - List of cars to sort
 * @returns {Array} - Sorted cars
 */
function sortCars(sortBy, carList) {
    const sorted = [...carList]; // Create copy to avoid mutating original
    
    switch(sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        
        case 'year-new':
            return sorted.sort((a, b) => {
                const yearA = parseInt(a.years.split('-')[0]);
                const yearB = parseInt(b.years.split('-')[0]);
                return yearB - yearA; // Newest first
            });
        
        case 'year-old':
            return sorted.sort((a, b) => {
                const yearA = parseInt(a.years.split('-')[0]);
                const yearB = parseInt(b.years.split('-')[0]);
                return yearA - yearB; // Oldest first
            });
        
        case 'name-az':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        
        case 'name-za':
            return sorted.sort((a, b) => b.name.localeCompare(a.name));
        
        case 'default':
        default:
            // Featured: Show newest expensive cars first, but keep sold at end
            return sorted.sort((a, b) => {
                if (a.sold === b.sold) {
                    return b.price - a.price; // Higher price first
                }
                return a.sold ? 1 : -1; // Available cars before sold
            });
    }
}

/**
 * Initialize sort dropdown functionality
 */
function initSortDropdown() {
    const sortDropdown = document.getElementById('sortDropdown');
    const sortSelected = document.getElementById('sortSelected');
    const sortMenu = document.getElementById('sortMenu');
    
    if (!sortDropdown || !sortSelected || !sortMenu) return;
    
    // Toggle dropdown on click
    sortSelected.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = sortMenu.classList.contains('show');
        
        if (isOpen) {
            sortMenu.classList.remove('show');
            sortSelected.classList.remove('active');
        } else {
            sortMenu.classList.add('show');
            sortSelected.classList.add('active');
        }
    });

    // Handle dropdown item selection
    const dropdownItems = sortMenu.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Remove active class from all items
            dropdownItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to selected item
            this.classList.add('active');
            
            // Update selected text
            const selectedText = this.textContent;
            sortSelected.querySelector('span').textContent = selectedText;
            
            // Update current sort value
            currentSort = this.getAttribute('data-value');
            
            // Close dropdown
            sortMenu.classList.remove('show');
            sortSelected.classList.remove('active');
            
            // Apply sort
            applyFilters();
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!sortDropdown.contains(e.target)) {
            sortMenu.classList.remove('show');
            sortSelected.classList.remove('active');
        }
    });
}

/**
 * Initialize car list on page load
 */
function initCarList(skipDefaultRender = false) {
    // Show loading state first
    showLoadingState();
    
    if (skipDefaultRender) {
        return;
    }

    // Display cars with animation delay
    setTimeout(() => {
        displayCars(sortCars(currentSort, cars));
    }, 800);
}
