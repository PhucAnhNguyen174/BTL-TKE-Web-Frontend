// car-details.js - Dynamic Car Details Page Loader

// Current car data
let currentCar = null;
let currentColorIndex = 0;

/**
 * Get URL parameter by name
 * @param {string} name - Parameter name to retrieve
 * @returns {string|null} - Parameter value or null
 */
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/**
 * Format price with currency symbol and thousand separators
 * @param {number} price - Raw price number or string
 * @returns {string} - Formatted price string
 */
function formatPrice(price) {
    // If price is already a string with $, return as-is
    if (typeof price === 'string') {
        return price;
    }
    // Otherwise, format number with $ prefix
    return '$' + price.toLocaleString('en-US');
}

/**
 * Render detail list items (for performance, efficiency, technical specs)
 * @param {Array} items - Array of objects with label and value properties
 * @returns {string} - HTML string for list items
 */
function renderDetailList(items) {
    return items.map(item => `
        <li class="mb-2">
            <div class="row">
                <div class="col-6"><strong>${item.label}:</strong></div>
                <div class="col-6">${item.value}</div>
            </div>
        </li>
    `).join('');
}

/**
 * Render feature list items (for key features section)
 * @param {Array} features - Array of feature strings
 * @returns {string} - HTML string for feature list
 */
function renderFeatureList(features) {
    return features.map(feature => `
        <li><i class="bi bi-check-circle-fill text-success me-2"></i>${feature}</li>
    `).join('');
}

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
    
    // Find car in cars array (from buy_cars.js)
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
    document.getElementById('carBrand').textContent = car.brand;
    document.getElementById('carName').textContent = car.name;
    document.getElementById('carYears').textContent = car.years;
    document.getElementById('carTagline').textContent = car.tagline;
    
    // Main image
    const carImage = document.getElementById('carImage');
    carImage.src = car.image;
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
    
    // Production information
    document.getElementById('productionPeriod').textContent = car.production.period;
    document.getElementById('productionUnits').textContent = car.production.units.toLocaleString('en-US');
    
    // Render color selector if car has colors
    if (car.colors && car.colors.length > 0) {
        renderColorSelector(car);
    }
    
    // Update page title
    document.title = `${car.name} - Car Details`;
}

// ===================================
// COLOR SELECTOR FUNCTIONALITY
// ===================================

/**
 * Render color selector swatches
 * @param {Object} car - Car object with colors array
 */
function renderColorSelector(car) {
    const colorSection = document.getElementById('colorSelectorSection');
    const swatchesContainer = document.getElementById('colorSwatches');
    const selectedColorDisplay = document.getElementById('selectedColorName');
    const colorNameText = document.getElementById('colorNameText');
    
    if (!colorSection || !swatchesContainer) {
        console.warn('Color selector elements not found in HTML');
        return;
    }
    
    // Show color selector section
    colorSection.style.display = 'block';
    if (selectedColorDisplay) selectedColorDisplay.style.display = 'block';
    
    // Set initial color name
    if (colorNameText) colorNameText.textContent = car.colors[0].name;
    
    // Generate color swatches
    swatchesContainer.innerHTML = car.colors.map((color, index) => `
        <div class="color-swatch ${index === 0 ? 'active' : ''}" data-color-index="${index}">
            <button 
                class="color-swatch-button" 
                style="background: ${color.colorCode}; ${color.colorCode === '#f9fafb' || color.colorCode === '#ffffff' ? 'border: 2px solid #444;' : ''}"
                onclick="changeCarColor(${index})"
                aria-label="Select ${color.name}"
                type="button"
            ></button>
            <span class="color-swatch-label">${color.name}</span>
        </div>
    `).join('');
}

/**
 * Change car color when user clicks a swatch
 * @param {number} colorIndex - Index of selected color
 */
function changeCarColor(colorIndex) {
    if (!currentCar || !currentCar.colors || colorIndex >= currentCar.colors.length) {
        console.warn('Invalid color index or no colors available');
        return;
    }
    
    const colors = currentCar.colors;
    
    // Update current color index
    currentColorIndex = colorIndex;
    
    // Update main image with smooth transition
    const mainImage = document.getElementById('carImage');
    if (mainImage) {
        mainImage.style.opacity = '0';
        
        setTimeout(() => {
            mainImage.src = colors[colorIndex].image;
            mainImage.alt = `${currentCar.name} - ${colors[colorIndex].name}`;
            mainImage.style.opacity = '1';
        }, 200);
    }
    
    // Update active swatch
    document.querySelectorAll('.color-swatch').forEach((swatch, index) => {
        if (index === colorIndex) {
            swatch.classList.add('active');
        } else {
            swatch.classList.remove('active');
        }
    });
    
    // Update selected color name
    const colorNameText = document.getElementById('colorNameText');
    if (colorNameText) {
        colorNameText.textContent = colors[colorIndex].name;
        
        // Add animation to color name
        colorNameText.style.transform = 'scale(1.1)';
        setTimeout(() => {
            colorNameText.style.transform = 'scale(1)';
        }, 200);
    }
}

// Load car details when page loads
document.addEventListener('DOMContentLoaded', loadCarDetails);