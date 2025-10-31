// ===================================
// DOM Elements
// ===================================

const sellCarForm = document.getElementById('sellCarForm');
const loadingOverlay = document.getElementById('loadingOverlay');
const successOverlay = document.getElementById('successOverlay');

// Form inputs
const carTitleInput = document.getElementById('carTitle');
const brandInput = document.getElementById('brand');
const modelInput = document.getElementById('model');
const yearInput = document.getElementById('year');
const mileageInput = document.getElementById('mileage');
const conditionInput = document.getElementById('condition');
const transmissionInput = document.getElementById('transmission');
const fuelTypeInput = document.getElementById('fuelType');
const colorInput = document.getElementById('color');
const priceInput = document.getElementById('price');
const negotiableInput = document.getElementById('negotiable');
const descriptionInput = document.getElementById('description');
const carImagesInput = document.getElementById('carImages');
const sellerNameInput = document.getElementById('sellerName');
const sellerPhoneInput = document.getElementById('sellerPhone');
const sellerEmailInput = document.getElementById('sellerEmail');
const locationInput = document.getElementById('location');

// Buttons
const browseBtn = document.getElementById('browseBtn');
const saveDraftBtn = document.getElementById('saveDraftBtn');
const clearFormBtn = document.getElementById('clearFormBtn');
const aiSuggestionBtn = document.getElementById('aiSuggestionBtn');
const dragDropZone = document.getElementById('dragDropZone');

// Counters
const titleCounter = document.getElementById('titleCounter');
const descCounter = document.getElementById('descCounter');
const imageCounter = document.getElementById('imageCounter');
const formProgress = document.getElementById('formProgress');
const progressText = document.getElementById('progressText');

// Preview elements
const previewTitle = document.getElementById('previewTitle');
const previewPrice = document.getElementById('previewPrice');
const previewNegotiable = document.getElementById('previewNegotiable');
const previewYear = document.getElementById('previewYear');
const previewMileage = document.getElementById('previewMileage');
const previewTransmission = document.getElementById('previewTransmission');
const previewFuel = document.getElementById('previewFuel');
const previewDesc = document.getElementById('previewDesc');
const previewName = document.getElementById('previewName');
const previewPhone = document.getElementById('previewPhone');
const previewLocation = document.getElementById('previewLocation');
const imagePreviewContainer = document.getElementById('imagePreview');

// Stats
const viewsCount = document.getElementById('viewsCount');
const interestCount = document.getElementById('interestCount');
const priceRange = document.getElementById('priceRange');
const listingId = document.getElementById('listingId');
const potentialBuyers = document.getElementById('potentialBuyers');
const scrollProgress = document.getElementById('scrollProgress');
const floatingHelpBtn = document.getElementById('floatingHelpBtn');
const viewListingBtn = document.getElementById('viewListingBtn');
const priceComparison = document.getElementById('priceComparison');
const formProgressTop = document.getElementById('formProgressTop');

// ===================================
// Toast Notification Helper (Contact-style)
// ===================================
(function ensureToastContainer() {
    if (!document.querySelector('.toast-container')) {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
})();

function showToast(type = 'info', title = '', message = '', duration = 5000) {
    const container = document.querySelector('.toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;

    const icons = {
        success: 'fa-circle-check',
        error: 'fa-circle-xmark',
        warning: 'fa-triangle-exclamation',
        info: 'fa-circle-info'
    };

    toast.innerHTML = `
        <i class="fa-solid ${icons[type] || icons.info} toast-icon"></i>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" aria-label="Close">&times;</button>
        <div class="toast-progress"></div>
    `;

    const progress = toast.querySelector('.toast-progress');
    if (progress) progress.style.animationDuration = `${duration}ms`;

    // Close handler
    toast.querySelector('.toast-close').addEventListener('click', () => hideToast(toast));

    container.appendChild(toast);

    // Auto-hide
    const timer = setTimeout(() => hideToast(toast), duration);

    function hideToast(el) {
        el.classList.add('toast-hiding');
        el.addEventListener('animationend', () => {
            clearTimeout(timer);
            el.remove();
        }, { once: true });
    }
}

// ===================================
// Progress Steps Management
// ===================================

const stepItems = document.querySelectorAll('.step-item');
const overallProgress = document.getElementById('overallProgress');
let currentStep = 1;

function updateProgressSteps(step) {
    currentStep = step;
    
    // Update progress bar
    const progressPercentage = (step / 4) * 100;
    if (overallProgress) {
        overallProgress.style.width = progressPercentage + '%';
    }
    
    // Update step items
    stepItems.forEach((stepEl, index) => {
        const stepNumber = index + 1;
        
        if (stepNumber < step) {
            stepEl.classList.add('completed');
            stepEl.classList.remove('active');
        } else if (stepNumber === step) {
            stepEl.classList.add('active');
            stepEl.classList.remove('completed');
        } else {
            stepEl.classList.remove('active', 'completed');
        }
    });
}

// Auto-advance steps based on form completion
function checkStepCompletion() {
    // Step 1: Vehicle Info
    const step1Complete = carTitleInput.value && brandInput.value && modelInput.value && 
                          yearInput.value && mileageInput.value && conditionInput.value;
    
    // Step 2: Photos
    const step2Complete = uploadedImages.length > 0;
    
    // Step 3: Contact
    const step3Complete = sellerNameInput.value && sellerPhoneInput.value && 
                          sellerEmailInput.value && locationInput.value;
    
    if (!step1Complete) {
        updateProgressSteps(1);
    } else if (!step2Complete) {
        updateProgressSteps(2);
    } else if (!step3Complete) {
        updateProgressSteps(3);
    } else {
        updateProgressSteps(4);
    }
}

// ===================================
// Initialize Year Dropdown
// ===================================

function populateYearDropdown() {
    const currentYear = new Date().getFullYear();
    const startYear = 1990;
    
    for (let year = currentYear; year >= startYear; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearInput.appendChild(option);
    }
}

// ===================================
// Format Price Display
// ===================================

function formatPrice(price) {
    if (!price) return 'Price not set';
    
    // Format number with commas and add USD currency
    const formattedPrice = parseInt(price).toLocaleString('en-US');
    return `$${formattedPrice}`;
}

// ===================================
// Real-time Preview Updates
// ===================================

// Update title preview with character counter
carTitleInput.addEventListener('input', () => {
    const value = carTitleInput.value.trim();
    const length = value.length;
    previewTitle.textContent = value || 'Your Car Title';
    titleCounter.textContent = `${length}/100`;
    updateFormProgress();
    checkStepCompletion();
});

// Update price preview
priceInput.addEventListener('input', () => {
    const value = priceInput.value.trim();
    previewPrice.textContent = formatPrice(value);
    updatePriceSuggestion();
    updateStatistics();
    updateFormProgress();
    checkPriceComparison();
});

// Update negotiable badge
negotiableInput.addEventListener('change', () => {
    if (negotiableInput.checked) {
        previewNegotiable.style.display = 'inline-block';
    } else {
        previewNegotiable.style.display = 'none';
    }
    updateFormProgress();
});

// Update year preview
yearInput.addEventListener('change', () => {
    const value = yearInput.value;
    previewYear.textContent = value || '-';
    updatePriceSuggestion();
    updateStatistics();
    updateFormProgress();
    checkStepCompletion();
});

// Update mileage preview
mileageInput.addEventListener('input', () => {
    const value = mileageInput.value.trim();
    previewMileage.textContent = value ? `${parseInt(value).toLocaleString('vi-VN')} km` : '-';
    updatePriceSuggestion();
    updateFormProgress();
    checkStepCompletion();
});

// Update transmission preview
transmissionInput.addEventListener('change', () => {
    const value = transmissionInput.value;
    previewTransmission.textContent = value || '-';
    updateFormProgress();
});

// Update fuel type preview
fuelTypeInput.addEventListener('change', () => {
    const value = fuelTypeInput.value;
    previewFuel.textContent = value || '-';
    updateFormProgress();
});

// Update description preview with character counter
descriptionInput.addEventListener('input', () => {
    const value = descriptionInput.value.trim();
    const length = value.length;
    previewDesc.textContent = value || 'Description will appear here...';
    descCounter.textContent = `${length}/1000`;
    updateFormProgress();
});

// Update seller name preview
sellerNameInput.addEventListener('input', () => {
    const value = sellerNameInput.value.trim();
    previewName.textContent = value || 'Seller Name';
    updateFormProgress();
    checkStepCompletion();
});

// Update seller phone preview
sellerPhoneInput.addEventListener('input', () => {
    const value = sellerPhoneInput.value.trim();
    previewPhone.textContent = value || 'Phone';
    updateFormProgress();
    checkStepCompletion();
});

// Update location preview
locationInput.addEventListener('input', () => {
    const value = locationInput.value.trim();
    previewLocation.textContent = value || 'Location';
    updateFormProgress();
    checkStepCompletion();
});

// Update brand preview
brandInput.addEventListener('change', () => {
    updatePriceSuggestion();
    updateStatistics();
    updateFormProgress();
    checkStepCompletion();
});

// Update model preview
modelInput.addEventListener('input', () => {
    updateFormProgress();
    checkStepCompletion();
});

// Update condition preview
conditionInput.addEventListener('change', () => {
    updatePriceSuggestion();
    updateFormProgress();
    checkStepCompletion();
});

// Update color preview
colorInput.addEventListener('input', () => {
    updateFormProgress();
});

// Update email preview
sellerEmailInput.addEventListener('input', () => {
    updateFormProgress();
    checkStepCompletion();
});

// Update location preview
locationInput.addEventListener('input', () => {
    updateFormProgress();
});

// Update seller phone preview  
sellerPhoneInput.addEventListener('input', () => {
    updateFormProgress();
});

// ===================================
// Image Upload and Preview
// ===================================

let uploadedImages = [];

// Browse button click handler
browseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    carImagesInput.click();
});

// Drag and drop handlers
dragDropZone.addEventListener('click', (e) => {
    e.preventDefault();
    carImagesInput.click();
});

dragDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dragDropZone.classList.add('drag-over');
});

dragDropZone.addEventListener('dragleave', () => {
    dragDropZone.classList.remove('drag-over');
});

dragDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dragDropZone.classList.remove('drag-over');
    
    const files = Array.from(e.dataTransfer.files);
    handleImageFiles(files);
});

carImagesInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    handleImageFiles(files);
    e.target.value = '';
});

function handleImageFiles(files) {
    // Limit to 10 images
    if (uploadedImages.length + files.length > 10) {
        showToast('warning', 'Limit Reached', 'You can upload a maximum of 10 images', 3500);
        return;
    }
    
    files.forEach(file => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            showToast('error', 'Invalid File', 'Please upload only image files', 3500);
            return;
        }
        
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            showToast('warning', 'File Too Large', `${file.name} is too large. Each image must be less than 5MB`, 4500);
            return;
        }
        
        // Create file reader
        const reader = new FileReader();
        
        reader.onload = (event) => {
            const imageData = {
                src: event.target.result,
                file: file,
                id: Date.now() + Math.random()
            };
            
            uploadedImages.push(imageData);
            renderImagePreviews();
            updateImageCounter();
            updateFormProgress();
            updateStatistics();
            checkStepCompletion();
        };
        
        reader.readAsDataURL(file);
    });
}

// Render image previews with drag-to-reorder
function renderImagePreviews() {
    imagePreviewContainer.innerHTML = '';
    
    uploadedImages.forEach((image, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'preview-image-wrapper';
        wrapper.draggable = true;
        wrapper.dataset.index = index;
        
        // Mark first image as main
        if (index === 0) {
            wrapper.classList.add('main-image');
        }
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = `Preview ${index + 1}`;
        
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'remove-image';
        removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        removeBtn.onclick = () => removeImage(index);
        
        // Drag and drop for reordering
        wrapper.addEventListener('dragstart', handleDragStart);
        wrapper.addEventListener('dragover', handleDragOver);
        wrapper.addEventListener('drop', handleDrop);
        wrapper.addEventListener('dragend', handleDragEnd);
        
        wrapper.appendChild(img);
        wrapper.appendChild(removeBtn);
        imagePreviewContainer.appendChild(wrapper);
    });
    
    // Update main preview image
    updateMainPreviewImage();
    updateMobilePreview();
}

let draggedIndex = null;

function handleDragStart(e) {
    draggedIndex = parseInt(e.target.dataset.index);
    e.target.style.opacity = '0.5';
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const dropIndex = parseInt(e.target.closest('.preview-image-wrapper').dataset.index);
    
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
        // Swap images
        const temp = uploadedImages[draggedIndex];
        uploadedImages[draggedIndex] = uploadedImages[dropIndex];
        uploadedImages[dropIndex] = temp;
        renderImagePreviews();
    }
}

function handleDragEnd(e) {
    e.target.style.opacity = '1';
    draggedIndex = null;
}

// Remove image from preview
function removeImage(index) {
    uploadedImages.splice(index, 1);
    renderImagePreviews();
    updateImageCounter();
    updateFormProgress();
    updateStatistics();
    checkStepCompletion();
}

// Update image counter
function updateImageCounter() {
    imageCounter.textContent = `${uploadedImages.length}/10 images`;
}

// Update main preview image (first image)
function updateMainPreviewImage() {
    const previewImageDiv = document.querySelector('.preview-image');
    
    if (uploadedImages.length > 0) {
        previewImageDiv.innerHTML = `<img src="${uploadedImages[0].src}" alt="Car Preview">`;
    } else {
        previewImageDiv.innerHTML = `
            <i class="fa-solid fa-image"></i>
            <p>Upload images to see preview</p>
        `;
    }
}

// ===================================
// Form Validation
// ===================================

function validatePhone(phone) {
    // Vietnamese phone number format
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    return phoneRegex.test(phone);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add real-time validation for phone
sellerPhoneInput.addEventListener('blur', () => {
    const phone = sellerPhoneInput.value.trim();
    
    if (phone && !validatePhone(phone)) {
        sellerPhoneInput.classList.add('is-invalid');
        
        // Add error message if doesn't exist
        if (!sellerPhoneInput.nextElementSibling?.classList.contains('invalid-feedback')) {
            const errorMsg = document.createElement('div');
            errorMsg.className = 'invalid-feedback';
            errorMsg.textContent = 'Please enter a valid Vietnamese phone number';
            sellerPhoneInput.parentElement.appendChild(errorMsg);
        }
    } else {
        sellerPhoneInput.classList.remove('is-invalid');
        const errorMsg = sellerPhoneInput.nextElementSibling;
        if (errorMsg?.classList.contains('invalid-feedback')) {
            errorMsg.remove();
        }
    }
});

// Add real-time validation for email
sellerEmailInput.addEventListener('blur', () => {
    const email = sellerEmailInput.value.trim();
    
    if (email && !validateEmail(email)) {
        sellerEmailInput.classList.add('is-invalid');
        
        if (!sellerEmailInput.nextElementSibling?.classList.contains('invalid-feedback')) {
            const errorMsg = document.createElement('div');
            errorMsg.className = 'invalid-feedback';
            errorMsg.textContent = 'Please enter a valid email address';
            sellerEmailInput.parentElement.appendChild(errorMsg);
        }
    } else {
        sellerEmailInput.classList.remove('is-invalid');
        const errorMsg = sellerEmailInput.nextElementSibling;
        if (errorMsg?.classList.contains('invalid-feedback')) {
            errorMsg.remove();
        }
    }
});

// ===================================
// Form Progress Calculation
// ===================================

function updateFormProgress() {
    const requiredFields = [
        carTitleInput,
        brandInput,
        modelInput,
        yearInput,
        mileageInput,
        conditionInput,
        transmissionInput,
        fuelTypeInput,
        colorInput,
        priceInput,
        descriptionInput,
        sellerNameInput,
        sellerPhoneInput,
        sellerEmailInput,
        locationInput
    ];
    
    let filledFields = 0;
    
    requiredFields.forEach(field => {
        if (field.value.trim() !== '') {
            filledFields++;
        }
    });
    
    // Add images to progress
    const totalFields = requiredFields.length + 1; // +1 for images
    if (uploadedImages.length > 0) {
        filledFields++;
    }
    
    const progress = Math.round((filledFields / totalFields) * 100);
    formProgress.style.width = `${progress}%`;
    formProgressTop.style.width = `${progress}%`;
    progressText.textContent = `${progress}%`;
    
    // Change color based on progress
    if (progress < 33) {
        formProgress.style.background = '#dc3545';
        formProgressTop.style.background = '#dc3545';
    } else if (progress < 66) {
        formProgress.style.background = '#ffc107';
        formProgressTop.style.background = '#ffc107';
    } else {
        formProgress.style.background = 'linear-gradient(90deg, #198754 0%, #0d6efd 100%)';
        formProgressTop.style.background = 'linear-gradient(90deg, #198754 0%, #0d6efd 100%)';
    }
    
    // Update estimated time
    updateEstimatedTime(progress);
}

// ===================================
// Price Suggestion System
// ===================================

function updatePriceSuggestion() {
    const brand = brandInput.value;
    const model = modelInput.value;
    const year = parseInt(yearInput.value);
    const mileage = parseInt(mileageInput.value);
    const condition = conditionInput.value;
    const price = parseInt(priceInput.value);
    
    if (!year || !mileage) {
        priceRange.innerHTML = '<span class="text-muted">Enter year and mileage for price suggestion</span>';
        return;
    }
    
    // Enhanced price calculation based on brand, year, and condition
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    
    // Base prices by brand category (in USD)
    const brandBasePrices = {
        // Luxury brands
        'Mercedes-Benz': 80000, 'BMW': 75000, 'Audi': 70000, 
        'Lexus': 65000, 'Porsche': 120000, 'Jaguar': 70000,
        'Land Rover': 75000, 'Cadillac': 65000, 'Infiniti': 55000,
        'Acura': 50000, 'Volvo': 55000, 'Genesis': 50000,
        // Premium brands
        'Toyota': 35000, 'Honda': 32000, 'Mazda': 30000,
        'Subaru': 33000, 'Nissan': 30000, 'Hyundai': 28000,
        'Kia': 27000, 'Ford': 35000, 'Chevrolet': 33000,
        'Volkswagen': 32000, 'Jeep': 38000, 'Ram': 40000,
        // Economy brands
        'Mitsubishi': 25000, 'Suzuki': 22000, 'Daihatsu': 18000,
        'Perodua': 15000, 'Proton': 17000
    };
    
    // Get base price or use default
    let basePrice = brandBasePrices[brand] || 30000;
    
    // Apply depreciation (luxury cars retain value better)
    const isLuxury = basePrice > 60000;
    const depreciationRate = isLuxury ? 0.88 : 0.85; // Luxury: 12%/year, Others: 15%/year
    let estimatedPrice = basePrice * Math.pow(depreciationRate, Math.min(age, 15));
    
    // Mileage factor: -2% for every 10,000 km (more realistic)
    const mileageImpact = Math.max(0, 1 - (mileage / 10000) * 0.02);
    estimatedPrice *= Math.max(mileageImpact, 0.3); // Minimum 30% value
    
    // Condition adjustment
    const conditionMultipliers = {
        'Excellent': 1.15,
        'Good': 1.0,
        'Fair': 0.82,
        'Poor': 0.65
    };
    
    estimatedPrice *= conditionMultipliers[condition] || 1.0;
    
    // Calculate range (±18% for more realistic market variation)
    const minPrice = Math.round(estimatedPrice * 0.82);
    const maxPrice = Math.round(estimatedPrice * 1.18);
    const avgPrice = Math.round(estimatedPrice);
    
    priceRange.innerHTML = `
        <span class="min-price">${formatPrice(minPrice)}</span>
        <span class="separator">to</span>
        <span class="max-price">${formatPrice(maxPrice)}</span>
    `;
    
    // Store for price comparison
    window.marketPriceRange = { min: minPrice, max: maxPrice, avg: avgPrice };
}

// Check price comparison with corrected logic
function checkPriceComparison() {
    const price = parseInt(priceInput.value);
    
    if (!price || !window.marketPriceRange) {
        priceComparison.style.display = 'none';
        return;
    }
    
    const { min, max, avg } = window.marketPriceRange;
    
    priceComparison.style.display = 'block';
    
    if (price > max) {
        // Calculate percentage ABOVE the max price
        const percentAbove = Math.round(((price - max) / max) * 100);
        priceComparison.innerHTML = `
            <div class="comparison-badge above-market">
                <i class="fa-solid fa-arrow-up"></i> ${percentAbove}% above market range
            </div>
        `;
    } else if (price < min) {
        // Calculate percentage BELOW the min price
        const percentBelow = Math.round(((min - price) / min) * 100);
        priceComparison.innerHTML = `
            <div class="comparison-badge below-market">
                <i class="fa-solid fa-arrow-down"></i> ${percentBelow}% below market range
            </div>
        `;
    } else {
        // Calculate position within range
        const positionPercent = Math.round(((price - min) / (max - min)) * 100);
        let pricePosition = 'fair';
        if (positionPercent < 35) pricePosition = 'competitive';
        else if (positionPercent > 65) pricePosition = 'premium';
        
        priceComparison.innerHTML = `
            <div class="comparison-badge fair-price">
                <i class="fa-solid fa-check-circle"></i> Within market range (${positionPercent}th percentile)
            </div>
        `;
    }
}

// ===================================
// Statistics Calculator
// ===================================

function updateStatistics() {
    const year = parseInt(yearInput.value);
    const price = parseInt(priceInput.value);
    const imagesCount = uploadedImages.length;
    
    // Calculate expected views based on various factors
    let baseViews = 50;
    
    // More recent cars get more views
    if (year) {
        const currentYear = new Date().getFullYear();
        const age = currentYear - year;
        if (age <= 3) baseViews += 30;
        else if (age <= 5) baseViews += 20;
        else if (age <= 10) baseViews += 10;
    }
    
    // Good images increase views
    if (imagesCount >= 5) baseViews += 25;
    else if (imagesCount >= 3) baseViews += 15;
    else if (imagesCount >= 1) baseViews += 5;
    
    // Reasonable pricing increases interest
    if (price > 0 && price < 1000000000) baseViews += 15;
    
    // Animate counter
    animateCounter(viewsCount, baseViews);
    animateCounter(interestCount, Math.round(baseViews * 0.3));
}

function animateCounter(element, targetValue) {
    const currentValue = parseInt(element.textContent) || 0;
    const increment = Math.ceil((targetValue - currentValue) / 20);
    
    if (currentValue < targetValue) {
        element.textContent = currentValue + increment;
        setTimeout(() => animateCounter(element, targetValue), 50);
    } else {
        element.textContent = targetValue;
    }
}

// ===================================
// AI Description Suggestion
// ===================================

aiSuggestionBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const brand = brandInput.value;
    const model = modelInput.value;
    const year = yearInput.value;
    const condition = conditionInput.value;
    
    if (!brand || !model || !year) {
        showToast('warning', 'Action Needed', 'Please fill in Brand, Model, and Year first to get AI suggestions', 3500);
        return;
    }
    
    // Simulate AI suggestion with template
    const suggestions = [
        `This well-maintained ${year} ${brand} ${model} is in ${condition.toLowerCase()} condition. The vehicle has been regularly serviced and comes with complete documentation. Perfect for daily commuting or family trips. All features are fully functional.`,
        `Excellent ${year} ${brand} ${model} available for sale. This ${condition.toLowerCase()} condition vehicle offers great performance and reliability. Never been in accidents. Ideal for buyers looking for quality and value.`,
        `Looking for a reliable car? This ${year} ${brand} ${model} in ${condition.toLowerCase()} condition is perfect for you. Smooth drive, efficient fuel consumption, and low maintenance. Don't miss this opportunity!`
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    
    // Show loading effect
    aiSuggestionBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generating...';
    aiSuggestionBtn.disabled = true;
    
    setTimeout(() => {
        descriptionInput.value = randomSuggestion;
        descriptionInput.dispatchEvent(new Event('input'));
        
        aiSuggestionBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Get AI Description Suggestions';
        aiSuggestionBtn.disabled = false;
        
        // Add success animation
        aiSuggestionBtn.classList.add('btn-success');
        setTimeout(() => {
            aiSuggestionBtn.classList.remove('btn-success');
            aiSuggestionBtn.classList.add('btn-outline-primary');
        }, 1000);
    }, 1500);
});

// ===================================
// Mobile Preview Sync
// ===================================

function updateMobilePreview() {
    const desktopPreview = document.getElementById('carPreview');
    const mobilePreview = document.getElementById('mobilePreview');
    
    if (desktopPreview && mobilePreview) {
        mobilePreview.innerHTML = desktopPreview.innerHTML;
    }
}

// Sync mobile preview when desktop tab changes
document.getElementById('desktop-tab').addEventListener('shown.bs.tab', updateMobilePreview);
document.getElementById('mobile-tab').addEventListener('shown.bs.tab', updateMobilePreview);

// ===================================
// Save Draft Functionality
// ===================================

let isDraftMode = false;

saveDraftBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // If in draft mode, load the draft
    if (isDraftMode) {
        const draft = localStorage.getItem('carListingDraft');
        if (draft) {
            const data = JSON.parse(draft);
            
            carTitleInput.value = data.title || '';
            brandInput.value = data.brand || '';
            modelInput.value = data.model || '';
            yearInput.value = data.year || '';
            mileageInput.value = data.mileage || '';
            conditionInput.value = data.condition || '';
            transmissionInput.value = data.transmission || '';
            fuelTypeInput.value = data.fuelType || '';
            colorInput.value = data.color || '';
            priceInput.value = data.price || '';
            negotiableInput.checked = data.negotiable || false;
            descriptionInput.value = data.description || '';
            sellerNameInput.value = data.sellerName || '';
            sellerPhoneInput.value = data.sellerPhone || '';
            sellerEmailInput.value = data.sellerEmail || '';
            locationInput.value = data.location || '';
            
            // Trigger input events to update previews
            carTitleInput.dispatchEvent(new Event('input'));
            priceInput.dispatchEvent(new Event('input'));
            descriptionInput.dispatchEvent(new Event('input'));
            sellerNameInput.dispatchEvent(new Event('input'));
            sellerPhoneInput.dispatchEvent(new Event('input'));
            locationInput.dispatchEvent(new Event('input'));
            yearInput.dispatchEvent(new Event('change'));
            mileageInput.dispatchEvent(new Event('input'));
            transmissionInput.dispatchEvent(new Event('change'));
            fuelTypeInput.dispatchEvent(new Event('change'));
            
            showToast('success', 'Draft Restored', 'Your previous draft has been loaded successfully', 3000);
            
            // Reset button to save mode
            saveDraftBtn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Save Draft';
            saveDraftBtn.classList.remove('btn-info');
            saveDraftBtn.classList.add('btn-outline-secondary');
            isDraftMode = false;
        }
        return;
    }
    
    // Otherwise, save the draft
    const draftData = {
        title: carTitleInput.value,
        brand: brandInput.value,
        model: modelInput.value,
        year: yearInput.value,
        mileage: mileageInput.value,
        condition: conditionInput.value,
        transmission: transmissionInput.value,
        fuelType: fuelTypeInput.value,
        color: colorInput.value,
        price: priceInput.value,
        negotiable: negotiableInput.checked,
        description: descriptionInput.value,
        sellerName: sellerNameInput.value,
        sellerPhone: sellerPhoneInput.value,
        sellerEmail: sellerEmailInput.value,
        location: locationInput.value,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('carListingDraft', JSON.stringify(draftData));
    showToast('success', 'Draft Saved', 'Your listing draft has been saved', 3000);
    
    // Show success feedback
    const originalText = saveDraftBtn.innerHTML;
    saveDraftBtn.innerHTML = '<i class="fa-solid fa-check"></i> Draft Saved!';
    saveDraftBtn.classList.add('btn-success');
    saveDraftBtn.classList.remove('btn-outline-secondary');
    
    setTimeout(() => {
        saveDraftBtn.innerHTML = originalText;
        saveDraftBtn.classList.remove('btn-success');
        saveDraftBtn.classList.add('btn-outline-secondary');
    }, 2000);
});

// Load draft on page load
function loadDraft() {
    const draft = localStorage.getItem('carListingDraft');
    
    if (draft) {
        // Show single toast notification
        showToast('info', 'Draft Available', 'You have a saved draft. Click "Load Draft" button to restore it.', 5000);
        
        // Change button to load draft mode
        saveDraftBtn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> Load Draft';
        saveDraftBtn.classList.add('btn-info');
        saveDraftBtn.classList.remove('btn-outline-secondary');
        isDraftMode = true;
    }
}

// Clear form button
clearFormBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Show confirmation toast first
    showToast('warning', 'Confirm Clear', 'Click again to confirm clearing all form data', 3000);
    
    // Change button to confirm mode
    clearFormBtn.innerHTML = '<i class="fa-solid fa-exclamation-triangle"></i> Click Again to Confirm';
    clearFormBtn.style.background = 'rgba(255, 193, 7, 0.2)';
    
    // Set one-time confirm handler
    const confirmClear = () => {
        resetForm();
        showToast('success', 'Form Cleared', 'All fields have been reset successfully', 3000);
        localStorage.removeItem('carListingDraft');
        
        // Show feedback
        clearFormBtn.innerHTML = '<i class="fa-solid fa-check"></i> Cleared!';
        clearFormBtn.style.background = 'rgba(40, 167, 69, 0.2)';
        
        setTimeout(() => {
            clearFormBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Clear Form';
            clearFormBtn.style.background = 'rgba(220, 53, 69, 0.1)';
        }, 2000);
        
        clearFormBtn.removeEventListener('click', confirmClear);
    };
    
    // Add confirm handler (one-time)
    clearFormBtn.addEventListener('click', confirmClear, { once: true });
    
    // Auto-reset after 5 seconds if not confirmed
    setTimeout(() => {
        if (clearFormBtn.innerHTML.includes('Confirm')) {
            clearFormBtn.innerHTML = '<i class="fa-solid fa-trash"></i> Clear Form';
            clearFormBtn.style.background = 'rgba(220, 53, 69, 0.1)';
            clearFormBtn.removeEventListener('click', confirmClear);
        }
    }, 5000);
});

// ===================================
// Form Submission Handler
// ===================================

sellCarForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate phone
    const phone = sellerPhoneInput.value.trim();
    if (!validatePhone(phone)) {
        showToast('error', 'Invalid Phone', 'Please enter a valid Vietnamese phone number', 3500);
        sellerPhoneInput.focus();
        return;
    }
    
    // Validate email
    const email = sellerEmailInput.value.trim();
    if (!validateEmail(email)) {
        showToast('error', 'Invalid Email', 'Please enter a valid email address', 3500);
        sellerEmailInput.focus();
        return;
    }
    
    // Check if images are uploaded
    if (uploadedImages.length === 0) {
        showToast('warning', 'Missing Images', 'Please upload at least one image of your car', 3500);
        carImagesInput.focus();
        return;
    }
    
    // Collect form data
    const formData = {
        title: carTitleInput.value.trim(),
        brand: brandInput.value,
        model: modelInput.value.trim(),
        year: yearInput.value,
        mileage: mileageInput.value.trim(),
        condition: conditionInput.value,
        transmission: transmissionInput.value,
        fuelType: fuelTypeInput.value,
        color: colorInput.value.trim(),
        price: priceInput.value.trim(),
        negotiable: negotiableInput.checked,
        description: descriptionInput.value.trim(),
        sellerName: sellerNameInput.value.trim(),
        sellerPhone: phone,
        sellerEmail: email,
        location: locationInput.value.trim(),
        images: uploadedImages.length,
        timestamp: new Date().toISOString()
    };
    
    // Generate listing ID
    const generatedListingId = Math.floor(100000 + Math.random() * 900000);
    listingId.textContent = generatedListingId;
    
    // Calculate potential buyers
    const buyers = Math.floor(500 + Math.random() * 1500);
    potentialBuyers.textContent = buyers.toLocaleString('vi-VN');
    
    // Log form data (in a real application, this would be sent to a server)
    console.log('Car Listing Data:', formData);
    console.log('Uploaded Images:', uploadedImages);
    
    // Show submitting toast
    showToast('info', 'Submitting Listing', 'Please wait while we process your car listing...', 2000);
    
    // Show loading overlay
    loadingOverlay.classList.remove('hidden');
    
    // Simulate server processing (2 seconds)
    setTimeout(() => {
        // Hide loading overlay
        loadingOverlay.classList.add('hidden');
        
        // Show success overlay
        successOverlay.classList.remove('hidden');
        
        // Show success toast with listing ID
        showToast('success', 'Listing Published! 🎉', `Your car has been listed successfully! Listing ID: #${generatedListingId}`, 5000);
        
        // Clear draft from localStorage
        localStorage.removeItem('carListingDraft');
        
        // After 3 seconds, redirect or reset form
        setTimeout(() => {
            successOverlay.classList.add('hidden');
            
            // Option 1: Reset form and preview
            resetForm();
            
            // Option 2: Redirect to listings page
            // window.location.href = '../index/index.html';
        }, 3000);
    }, 2000);
});

// ===================================
// Reset Form Function
// ===================================

function resetForm() {
    // Reset form
    sellCarForm.reset();
    
    // Reset uploaded images
    uploadedImages = [];
    imagePreviewContainer.innerHTML = '';
    
    // Reset preview
    previewTitle.textContent = 'Your Car Title';
    previewPrice.textContent = 'Price not set';
    previewNegotiable.style.display = 'none';
    previewYear.textContent = '-';
    previewMileage.textContent = '-';
    previewTransmission.textContent = '-';
    previewFuel.textContent = '-';
    previewDesc.textContent = 'Description will appear here...';
    previewName.textContent = 'Seller Name';
    previewPhone.textContent = 'Phone';
    previewLocation.textContent = 'Location';
    
    // Reset counters
    titleCounter.textContent = '0/100';
    descCounter.textContent = '0/1000';
    imageCounter.textContent = '0/10 images';
    formProgress.style.width = '0%';
    formProgressTop.style.width = '0%';
    progressText.textContent = '0%';
    
    // Reset stats
    viewsCount.textContent = '0';
    interestCount.textContent = '0';
    priceRange.innerHTML = '<span class="text-muted">Enter year and mileage for price suggestion</span>';
    priceComparison.style.display = 'none';
    
    // Reset progress steps
    updateProgressSteps(1);
    
    updateMainPreviewImage();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===================================
// Initialize Page
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Populate year dropdown
    populateYearDropdown();
    
    // Load draft if exists
    loadDraft();
    
    // Initialize form progress
    updateFormProgress();
    
    // Initialize statistics
    updateStatistics();
    
    // Initialize progress steps
    updateProgressSteps(1);

    // Car reservation checker
    const checkReservationBtn = document.getElementById('checkReservationBtn');
    const reservationCheckInput = document.getElementById('reservationCheck');
    const reservationResultDiv = document.getElementById('reservationResult');

    if (checkReservationBtn && reservationCheckInput && reservationResultDiv) {
        checkReservationBtn.addEventListener('click', () => {
            const query = reservationCheckInput.value.trim().toUpperCase();
            if (!query) {
                reservationResultDiv.innerHTML = '<div class="alert alert-warning mt-2">Vui lòng nhập VIN hoặc biển số</div>';
                return;
            }

            // Get reservations from localStorage
            const reservations = JSON.parse(localStorage.getItem('carReservations') || '[]');
            const match = reservations.find(r => r.vin.toUpperCase() === query || r.plate.toUpperCase() === query);

            if (match) {
                reservationResultDiv.innerHTML = `
                    <div class="alert alert-danger mt-2">
                        <i class="fa-solid fa-exclamation-circle"></i> <strong>Xe đã được đặt mua!</strong><br>
                        <span class="small">Người đặt: ${match.buyer || 'Unknown'} • Ngày đặt: ${new Date(match.date).toLocaleDateString('vi-VN')}</span>
                    </div>
                `;
            } else {
                reservationResultDiv.innerHTML = `
                    <div class="alert alert-success mt-2">
                        <i class="fa-solid fa-check-circle"></i> <strong>Xe chưa được đặt mua.</strong> Bạn có thể tiếp tục list xe này.
                    </div>
                `;
            }
        });
    }
    
    // Smooth scroll for navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
    
    // Add fade-in animation to form sections
    const formSections = document.querySelectorAll('.form-section');
    formSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Add hover effect to form inputs
    const formInputs = document.querySelectorAll('.form-control, .form-select');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.01)';
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Initialize mobile preview
    updateMobilePreview();
    
    // Add visibility change handler to save draft
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Auto-save draft when user leaves the page
            const hasContent = carTitleInput.value || descriptionInput.value || priceInput.value;
            if (hasContent) {
                saveDraftBtn.click();
            }
        }
    });
    
    // Initialize tooltips
    initializeTooltips();
    
    // Initialize scroll progress
    initializeScrollProgress();
    
    // Floating help button
    floatingHelpBtn.addEventListener('click', () => {
        const helpModal = new bootstrap.Modal(document.getElementById('helpModal'));
        helpModal.show();
    });
    
    // View listing button
    viewListingBtn.addEventListener('click', () => {
        window.location.href = '../index/index.html';
    });
});

// ===================================
// Estimated Time Calculator
// ===================================

function updateEstimatedTime(progress) {
    const estimatedTimeEl = document.getElementById('estimatedTime');
    if (!estimatedTimeEl) return;
    
    let timeText = '~5 min';
    
    if (progress < 25) {
        timeText = '~5 min';
    } else if (progress < 50) {
        timeText = '~4 min';
    } else if (progress < 75) {
        timeText = '~2 min';
    } else if (progress < 95) {
        timeText = '~1 min';
    } else {
        timeText = 'Almost done!';
    }
    
    estimatedTimeEl.querySelector('span').textContent = timeText;
}

// ===================================
// Tooltip System
// ===================================

function initializeTooltips() {
    const hints = document.querySelectorAll('.field-hint');
    const tooltip = document.getElementById('formTooltip');
    
    hints.forEach(hint => {
        hint.addEventListener('mouseenter', (e) => {
            const text = e.target.dataset.tooltip;
            if (text) {
                tooltip.querySelector('.tooltip-content').textContent = text;
                tooltip.classList.remove('hidden');
                
                const rect = e.target.getBoundingClientRect();
                tooltip.style.left = `${rect.left + rect.width / 2}px`;
                tooltip.style.top = `${rect.top - 10}px`;
                tooltip.style.transform = 'translate(-50%, -100%)';
            }
        });
        
        hint.addEventListener('mouseleave', () => {
            tooltip.classList.add('hidden');
        });
    });
}

// ===================================
// Scroll Progress Indicator
// ===================================

function initializeScrollProgress() {
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        scrollProgress.style.width = `${progress}%`;
    });
}

// ===================================
// Console Welcome Message
// ===================================

console.log('%c AutoTrade - Sell Your Car ', 'background: linear-gradient(135deg, #0d6efd 0%, #0b5ed7 100%); color: white; font-size: 18px; padding: 8px; font-weight: bold;');
console.log('%c List your vehicle and reach thousands of potential buyers! ', 'font-size: 12px; color: #6c757d;');
console.log('%c New Features: Progress Steps, Price Comparison, Tooltips, Scroll Progress, Confetti Animation ', 'font-size: 11px; color: #198754; font-weight: bold;');
console.log('%c Interactive UI: Drag & Drop, AI Suggestions, Real-time Preview, Mobile View ', 'font-size: 11px; color: #0dcaf0; font-weight: bold;');

// ===================================
// Enhanced Interactive Features
// ===================================

// Show navbar on scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-visible');
        navbar.classList.remove('navbar-hidden');
    }
});

// Show navbar immediately for sell page
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('mainNav');
    setTimeout(() => {
        navbar.classList.add('navbar-visible');
        navbar.classList.remove('navbar-hidden');
    }, 100);
});

// Add tooltip for form fields
function addTooltips() {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    
    tooltipTriggers.forEach(trigger => {
        trigger.style.position = 'relative';
        trigger.style.cursor = 'help';
        
        trigger.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.cssText = `
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%) translateY(-8px);
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 0.85rem;
                white-space: nowrap;
                z-index: 1000;
                pointer-events: none;
                animation: fadeIn 0.2s ease;
            `;
            
            this.appendChild(tooltip);
        });
        
        trigger.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.custom-tooltip');
            if (tooltip) tooltip.remove();
        });
    });
}

// Enhanced field validation with visual feedback
function enhanceFieldValidation() {
    const requiredFields = document.querySelectorAll('input[required], textarea[required], select[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#dc3545';
                this.classList.add('shake-animation');
                setTimeout(() => this.classList.remove('shake-animation'), 500);
            } else {
                this.style.borderColor = '#198754';
                this.classList.add('success-glow');
                setTimeout(() => this.classList.remove('success-glow'), 1000);
            }
        });
        
        field.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '';
            }
        });
    });
}

// Add shake animation CSS
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
    .shake-animation {
        animation: shake 0.3s ease;
    }
    .success-glow {
        box-shadow: 0 0 10px rgba(25, 135, 84, 0.5);
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: translateX(-50%) translateY(-12px); }
        to { opacity: 1; transform: translateX(-50%) translateY(-8px); }
    }
`;
document.head.appendChild(shakeStyle);

// Initialize enhanced features
addTooltips();
enhanceFieldValidation();

// Add smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add success animation to completed steps
stepItems.forEach(step => {
    step.addEventListener('click', function() {
        if (this.classList.contains('completed')) {
            this.classList.add('bounce-animation');
            setTimeout(() => this.classList.remove('bounce-animation'), 600);
        }
    });
});

// Add bounce animation
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    .bounce-animation {
        animation: bounce 0.6s ease;
    }
`;
document.head.appendChild(bounceStyle);

// Console success message
console.log('%c ✓ Interactive Features Loaded! ', 'background: #198754; color: white; font-size: 14px; padding: 6px; font-weight: bold; border-radius: 4px;');

