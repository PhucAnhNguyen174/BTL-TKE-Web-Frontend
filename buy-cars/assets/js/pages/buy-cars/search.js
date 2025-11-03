/* ===================================
   SEARCH FUNCTIONALITY
   =================================== */

// Search state
let searchDebounceTimer = null;
let currentSearchTerm = '';

/**
 * Handle search input with debouncing
 * @param {Event} e - Input event
 */
function handleSearchInput(e) {
    const searchTerm = e.target.value.trim();
    currentSearchTerm = searchTerm;
    
    const clearSearchBtn = document.getElementById('clearSearch');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    // Show/hide clear button
    if (clearSearchBtn) {
        clearSearchBtn.style.display = searchTerm ? 'block' : 'none';
    }
    
    // Clear previous debounce timer
    if (searchDebounceTimer) {
        clearTimeout(searchDebounceTimer);
    }
    
    // If search is empty, hide suggestions and show all cars
    if (!searchTerm) {
        if (searchSuggestions) {
            searchSuggestions.style.display = 'none';
        }
        applyFilters(); // Show all cars with current filters
        return;
    }
    
    // Debounce search (wait 300ms after user stops typing)
    searchDebounceTimer = setTimeout(() => {
        performSearch(searchTerm);
    }, 300);
}

/**
 * Perform search and show suggestions
 * @param {string} searchTerm - Search query
 */
function performSearch(searchTerm) {
    const results = searchCars(searchTerm);
    
    // Show top 5 results in dropdown
    displaySearchSuggestions(results.slice(0, 5));
    
    // Also filter main car display
    displayCars(results);
}

/**
 * Search cars by brand, model, type, or price
 * @param {string} query - Search query
 * @param {Array} carList - Optional: list of cars to search from (default: all cars)
 * @returns {Array} - Filtered cars sorted by relevance
 */
function searchCars(query, carList = cars) {
    const lowerQuery = query.toLowerCase();
    
    // Calculate relevance score for each car
    const results = carList.map(car => {
        let score = 0;
        const brandLower = car.brand.toLowerCase();
        const nameLower = car.name.toLowerCase();
        const typeLower = car.type.toLowerCase();
        const categoryLower = car.category.toLowerCase();
        const vehicleTypeLower = car.vehicleType.toLowerCase();
        const priceString = car.pricing.current.toLowerCase();
        const taglineLower = car.tagline.toLowerCase();
        
        // Exact match (highest priority)
        if (brandLower === lowerQuery) score += 100;
        if (nameLower === lowerQuery) score += 100;
        if (typeLower === lowerQuery) score += 80;
        
        // Starts with query (high priority)
        if (brandLower.startsWith(lowerQuery)) score += 50;
        if (nameLower.startsWith(lowerQuery)) score += 50;
        if (typeLower.startsWith(lowerQuery)) score += 40;
        
        // Contains query (medium priority)
        if (brandLower.includes(lowerQuery)) score += 30;
        if (nameLower.includes(lowerQuery)) score += 30;
        if (typeLower.includes(lowerQuery)) score += 20;
        if (categoryLower.includes(lowerQuery)) score += 15;
        if (vehicleTypeLower.includes(lowerQuery)) score += 15;
        
        // Contains in other fields (low priority)
        if (priceString.includes(lowerQuery)) score += 10;
        if (taglineLower.includes(lowerQuery)) score += 5;
        
        return { car, score };
    })
    .filter(result => result.score > 0) // Only keep matches
    .sort((a, b) => {
        // Sort by score (highest first)
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        // If same score, sort alphabetically by brand then name
        const brandCompare = a.car.brand.localeCompare(b.car.brand);
        if (brandCompare !== 0) return brandCompare;
        return a.car.name.localeCompare(b.car.name);
    })
    .map(result => result.car); // Extract just the car objects
    
    return results;
}

/**
 * Display search suggestions dropdown
 * @param {Array} results - Search results
 */
function displaySearchSuggestions(results) {
    const searchSuggestions = document.getElementById('searchSuggestions');
    if (!searchSuggestions) return;
    
    if (results.length === 0) {
        searchSuggestions.innerHTML = `
            <div class="no-results">
                <i class="bi bi-search"></i>
                <p>No cars found matching "${currentSearchTerm}"</p>
                <small>Try searching for brands like "Ferrari", "Bugatti", or types like "hypercar"</small>
            </div>
        `;
        searchSuggestions.style.display = 'block';
        return;
    }
    
    searchSuggestions.innerHTML = results.map(car => `
        <a href="../cars details/car-details.html?id=${car.id}" class="suggestion-item">
            <img src="../${car.image}" alt="${car.name}" class="suggestion-image" 
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2260%22%3E%3Crect fill=%22%231a1a1a%22 width=%2280%22 height=%2260%22/%3E%3Ctext fill=%22%23fff%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-family=%22Arial%22 font-size=%2212%22%3E${car.brand}%3C/text%3E%3C/svg%3E'">
            <div class="suggestion-info">
                <div class="suggestion-name">${car.name}</div>
                <div class="suggestion-details">
                    ${car.brand} • ${car.type.charAt(0).toUpperCase() + car.type.slice(1)} • ${car.years}
                    ${car.sold ? ' • <span style="color: #dc3545;">SOLD OUT</span>' : ''}
                </div>
            </div>
            <div class="suggestion-price">${car.pricing.current}</div>
        </a>
    `).join('');
    
    searchSuggestions.style.display = 'block';
}

/**
 * Clear search input and reset
 */
function clearSearch() {
    const searchInput = document.getElementById('carSearchInput');
    const clearSearchBtn = document.getElementById('clearSearch');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    if (searchInput) searchInput.value = '';
    currentSearchTerm = '';
    if (clearSearchBtn) clearSearchBtn.style.display = 'none';
    if (searchSuggestions) searchSuggestions.style.display = 'none';
    applyFilters(); // Show all cars with current filters
}

/**
 * Initialize search event listeners
 */
function initSearchListeners() {
    const searchInput = document.getElementById('carSearchInput');
    const clearSearchBtn = document.getElementById('clearSearch');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearchInput);
        
        // Keep suggestions open when clicking inside search container
        searchInput.addEventListener('focus', function() {
            if (currentSearchTerm && searchSuggestions && searchSuggestions.innerHTML) {
                searchSuggestions.style.display = 'block';
            }
        });
    }
    
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', clearSearch);
    }
    
    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (searchSuggestions && !e.target.closest('.search-container')) {
            searchSuggestions.style.display = 'none';
        }
    });
}
