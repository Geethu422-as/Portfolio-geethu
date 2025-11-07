// Portfolio JavaScript functionality
// This file handles all the interactive features of the portfolio

// Global variables
let activeSection = 'home';

// Function to smoothly scroll to a specific section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        // Calculate offset to account for fixed navigation
        const navHeight = 80;
        const elementPosition = element.offsetTop - navHeight;
        
        // Smooth scroll to the target section
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
        
        // Update active section
        activeSection = sectionId;
        updateActiveLink(sectionId);
    }
}

// Function to update the active navigation link
function updateActiveLink(activeId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        // Check if this link corresponds to the active section
        const href = link.getAttribute('href');
        if (href === `#${activeId}`) {
            link.classList.add('active');
        }
    });
}

// Function to handle scroll-based navigation highlighting
function handleScrollNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100; // Offset for fixed nav
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    // Update active link if section changed
    if (current && current !== activeSection) {
        activeSection = current;
        updateActiveLink(current);
    }
}

// Function to animate elements when they come into view
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Function to handle contact form interactions
function handleContactInteractions() {
    const contactLinks = document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"]');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add a small animation when contact links are clicked
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Function to add hover effects to project cards
function enhanceProjectCards() {
    const projectCards = document.querySelectorAll('.group');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('project-card');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('project-card');
        });
    });
}

// Function to handle mobile menu (if needed for future enhancement)
function handleMobileMenu() {
    // This function can be expanded later for mobile hamburger menu
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Close mobile menu if open (future implementation)
            // For now, just ensure smooth scrolling works on mobile
        });
    });
}

// Function to optimize scroll performance
function throttle(func, wait) {
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

// Function to initialize all functionality
function initializePortfolio() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Set up scroll event listener with throttling for better performance
    const throttledScrollHandler = throttle(() => {
        handleScrollNavigation();
        animateOnScroll();
    }, 16); // ~60fps
    
    window.addEventListener('scroll', throttledScrollHandler);
    
    // Handle contact interactions
    handleContactInteractions();
    
    // Enhance project cards
    enhanceProjectCards();
    
    // Handle mobile menu
    handleMobileMenu();
    
    // Set initial active link
    handleScrollNavigation();
    
    // Add fade-in class to elements that should animate
    const animatedElements = document.querySelectorAll('section > div');
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Initial animation check
    animateOnScroll();
}

// Function to handle page load
function onPageLoad() {
    // Add any page load specific functionality here
    console.log('Portfolio loaded successfully!');
    
    // Smooth scroll to section if URL has hash
    if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        setTimeout(() => {
            scrollToSection(sectionId);
        }, 100);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
    onPageLoad();
});

// Handle window resize
window.addEventListener('resize', throttle(function() {
    // Recalculate positions if needed
    handleScrollNavigation();
}, 250));

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Page became visible, refresh icons if needed
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
});

// Export functions for potential external use
window.portfolioFunctions = {
    scrollToSection,
    updateActiveLink,
    handleScrollNavigation
};
