/* ===================================
   HELPER FUNCTIONS
   =================================== */

/**
 * Format price with currency symbol and thousand separators
 * @param {number|string} price - Raw price number or string
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
 * Get icon for car type
 * @param {string} type - Car type
 * @returns {string} - Bootstrap icon class
 */
function getTypeIcon(type) {
    const icons = {
        'supercar': 'bi bi-lightning-fill',
        'hypercar': 'bi bi-rocket-takeoff-fill',
        'sedan': 'bi bi-car-front-fill',
        'suv': 'bi bi-truck-front-fill',
        'convertible': 'bi bi-brightness-high-fill',
        'grand-tourer': 'bi bi-speedometer2',
        'coupe': 'bi bi-gem'
    };
    return icons[type] || 'bi bi-car-front';
}

/**
 * Render detail list items (for performance, efficiency, technical specs)
 * @param {Array} items - Array of objects with label and value properties
 * @returns {string} - HTML string for list items
 */
function renderDetailList(items) {
    return items.map(item => `
        <li><strong>${item.label}:</strong> ${item.value}</li>
    `).join('');
}

/**
 * Render feature list items (for key features section)
 * @param {Array} features - Array of feature strings
 * @returns {string} - HTML string for feature list
 */
function renderFeatureList(features) {
    return features.map(feature => `
        <li>${feature}</li>
    `).join('');
}

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
 * Debounce function - delays execution until after wait time
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Animate elements with staggered timing
 * @param {string} selector - CSS selector for elements to animate
 * @param {number} delay - Delay between each element (ms)
 */
function animateStaggered(selector, delay = 100) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate-in');
        }, index * delay);
    });
}
