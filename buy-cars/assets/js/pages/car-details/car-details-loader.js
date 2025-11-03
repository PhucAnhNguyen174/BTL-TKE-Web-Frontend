/* ===================================
   CAR DETAILS PAGE LOADER
   =================================== */

// Current car data
let currentCar = null;

/**
 * Load and display car details based on URL parameter
 */
function loadCarDetails() {
    // Get car ID from URL
    const carId = parseInt(getURLParameter('id'));
    
    // Show loading state
    document.getElementById('loadingState').style.display = 'block';
    document.getElementById('carNotFound').style.display = 'none';
    document.getElementById('carDetailsContainer').style.display = 'none';
    
    // Check if carId is valid
    if (!carId || isNaN(carId)) {
        showCarNotFound();
        return;
    }
    
    // Check if cars array exists
    if (typeof cars === 'undefined') {
        console.error('Cars data not loaded. Make sure config.js is loaded before car-details-loader.js');
        showCarNotFound();
        return;
    }
    
    // Find car in cars array
    const car = cars.find(c => c.id === carId);
    
    // If car not found, show error
    if (!car) {
        showCarNotFound();
        return;
    }
    
    // Store current car globally
    currentCar = car;
    
    // Car found - populate the page
    populateCarDetails(car);
    
    // Hide loading, show content
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('carDetailsContainer').style.display = 'block';
    
    // Trigger staggered animations after a short delay
    setTimeout(() => {
        document.getElementById('carDetailsContainer').classList.add('loaded');
    }, 100);
}

/**
 * Show car not found error state
 */
function showCarNotFound() {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('carNotFound').style.display = 'block';
}

/**
 * Populate all car details into the page
 * @param {Object} car - Car object from data array
 */
function populateCarDetails(car) {
    // Header information
    document.getElementById('carName').textContent = car.name;
    document.getElementById('carYears').textContent = car.years;
    document.getElementById('carTagline').textContent = car.tagline;
    
    // Main image
    const carImage = document.getElementById('carImage');
    carImage.src = `../${car.image}`;
    carImage.alt = car.name;
    
    // Pricing information
    document.getElementById('originalPrice').textContent = formatPrice(car.pricing.original);
    document.getElementById('currentPrice').textContent = formatPrice(car.pricing.current);
    
    // Vehicle type badge
    const typeText = car.type.charAt(0).toUpperCase() + car.type.slice(1);
    document.getElementById('vehicleType').textContent = typeText;
    
    // Performance specifications
    document.getElementById('performanceList').innerHTML = renderDetailList(car.performance);
    
    // Efficiency specifications
    document.getElementById('efficiencyList').innerHTML = renderDetailList(car.efficiency);
    
    // Technical specifications
    document.getElementById('technicalList').innerHTML = renderDetailList(car.technical);
    
    // Key features
    document.getElementById('featuresList').innerHTML = renderFeatureList(car.features);
    
    // Render category badges
    renderCategoryBadges(car);
    
    // Update page title
    document.title = `${car.name} - Car Details`;
}

/**
 * Render category badges below the car image
 * @param {Object} car - Car object from data array
 */
function renderCategoryBadges(car) {
    const badgeContainer = document.getElementById('categoryBadgeContainer');
    
    if (!badgeContainer) {
        console.warn('Category badge container not found in HTML');
        return;
    }
    
    const badges = [];
    const categoryText = car.category?.toLowerCase() || '';
    const productionText = car.production?.units?.toString().toLowerCase() || '';
    
    // Check if new (2023+)
    const yearStart = parseInt(car.years.split('-')[0]);
    if (yearStart >= 2023) {
        badges.push('<span class="info-badge new">New</span>');
    }
    
    // Check if limited production
    const limitedKeywords = ['limited', 'units', 'rare', 'collector', 'bespoke', 'exclusive'];
    if (limitedKeywords.some(keyword => 
        productionText.includes(keyword) || categoryText.includes(keyword)
    )) {
        badges.push('<span class="info-badge limited">Limited</span>');
    }
    
    // Check if collector's item
    if (categoryText === 'collector' || car.price >= 5000000) {
        badges.push('<span class="info-badge collector">Collector</span>');
    }
    
    // Display badges if any exist
    if (badges.length > 0) {
        badgeContainer.innerHTML = badges.join('');
        badgeContainer.style.display = 'flex';
    }
}

// Load car details when page loads
document.addEventListener('DOMContentLoaded', loadCarDetails);
