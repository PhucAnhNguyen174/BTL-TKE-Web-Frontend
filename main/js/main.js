// ===================================
// Smooth Scrolling for Navigation Links
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links that start with #
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only handle internal anchor links
            if (targetId && targetId !== '#') {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Calculate offset for fixed navbar
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });
});

// ===================================
// Active Navigation Link Highlighting
// ===================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    // Find which section is currently in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Update active class on navigation links
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Call function on scroll
window.addEventListener('scroll', updateActiveNavLink);

// ===================================
// Navbar Background Change on Scroll
// ===================================

function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'rgba(33, 37, 41, 1)';
        navbar.style.backdropFilter = 'none';
    }
}

window.addEventListener('scroll', handleNavbarScroll);

// ===================================
// Back to Top Button Functionality
// ===================================

const backToTopButton = document.getElementById('backToTop');

function toggleBackToTopButton() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
}

// Show/hide button on scroll
window.addEventListener('scroll', toggleBackToTopButton);

// Scroll to top when button is clicked
backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// Contact Form Submission Handler
// ===================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Log form data (in a real application, this would be sent to a server)
        console.log('Contact Form Submitted:', formData);
        
        // Show success message
        alert('Thank you for contacting us! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// ===================================
// Newsletter Form Submission Handler
// ===================================

const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Log email (in a real application, this would be sent to a server)
        console.log('Newsletter Subscription:', email);
        
        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        
        // Reset form
        newsletterForm.reset();
    });
}

// ===================================
// Card Hover Effect Enhancement
// ===================================

const carCards = document.querySelectorAll('.car-card');

carCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===================================
// Scroll Reveal Animation
// ===================================

function revealOnScroll() {
    const reveals = document.querySelectorAll('.card, .step-card, .service-card, .testimonial-card');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.card, .step-card, .service-card, .testimonial-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
});

// Trigger animation on scroll
window.addEventListener('scroll', revealOnScroll);

// Trigger animation on page load
window.addEventListener('load', revealOnScroll);

// ===================================
// Loading Indicator for External Links
// ===================================

const externalLinks = document.querySelectorAll('a[href^="pages/"]');

externalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Add a small loading indicator (optional)
        const icon = this.querySelector('i');
        if (icon) {
            icon.classList.add('bi-arrow-clockwise');
            icon.style.animation = 'spin 1s linear infinite';
        }
    });
});

// ===================================
// Dynamic Year in Footer
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('.footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.innerHTML = `&copy; ${currentYear} AutoTrade. All rights reserved.`;
    }
});

// ===================================
// Keyboard Navigation Support
// ===================================

document.addEventListener('keydown', function(e) {
    // Press 'H' to go to home/hero section
    if (e.key === 'h' || e.key === 'H') {
        if (!e.target.matches('input, textarea')) {
            document.querySelector('#hero').scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Press 'T' to scroll to top
    if (e.key === 't' || e.key === 'T') {
        if (!e.target.matches('input, textarea')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
});

// ===================================
// Console Welcome Message
// ===================================

console.log('%c Welcome to AutoTrade! ', 'background: #0d6efd; color: white; font-size: 20px; padding: 10px;');
console.log('%c Your trusted platform for buying and selling vehicles ', 'font-size: 14px; color: #6c757d;');
