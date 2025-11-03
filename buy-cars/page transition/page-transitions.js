/**
 * Page Transition Effects - ONLY FOR BUY_CARS AND CAR-DETAILS
 * Adds smooth fade-out effect when navigating between Buy Cars and Car Details pages
 */

// Add smooth page transition on link clicks (only for Buy_Cars and car-details pages)
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on Buy_Cars or car-details page
    const isBuyPage = document.body.classList.contains('buy-page');
    const isDetailsPage = document.querySelector('.car-details-page');
    
    // Only apply transitions if we're on these specific pages
    if (!isBuyPage && !isDetailsPage) {
        return;
    }
    
    // Get all internal navigation links (exclude external, anchors, and special links)
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="http"]):not([target="_blank"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is empty, javascript:, or contains anchor
            if (!href || href === '#' || href.startsWith('javascript:') || href.includes('#')) {
                return;
            }
            
            // Prevent default navigation
            e.preventDefault();
            
            // Add fade-out class to body
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease-out';
            
            // Navigate after fade-out completes
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
    
    // Smooth scroll back to top on page load
    window.scrollTo({
        top: 0,
        behavior: 'instant'
    });
});

// Handle browser back/forward buttons
window.addEventListener('pageshow', function(event) {
    // If page is loaded from cache (back button), reset opacity
    if (event.persisted) {
        document.body.style.opacity = '1';
    }
});
