/**
 * Main Application
 * Handles navigation and page initialization
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    initNavigation();

    // Initialize gallery
    Gallery.init();

    // Apply config to page elements
    applyConfig();

    // Add scroll-based animations
    initScrollAnimations();
});

/**
 * Initialize navigation
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const ctaLinks = document.querySelectorAll('[data-section]');

    // Handle nav link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.dataset.section;
            showSection(sectionId);
            updateActiveNav(link);
        });
    });

    // Handle CTA links with data-section
    ctaLinks.forEach(link => {
        if (!link.classList.contains('nav-link')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.dataset.section;
                showSection(sectionId);

                // Update nav active state
                const correspondingNav = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
                if (correspondingNav) {
                    updateActiveNav(correspondingNav);
                }
            });
        }
    });
}

/**
 * Show a section
 */
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');

    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.add('active');
            // Trigger animations
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            requestAnimationFrame(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            });
        } else {
            section.classList.remove('active');
        }
    });

    // Reset album view when leaving work section
    if (sectionId !== 'work') {
        const albumView = document.getElementById('album-view');
        const albumsGrid = document.getElementById('albums-grid');
        if (albumView) albumView.classList.remove('active');
        if (albumsGrid) albumsGrid.style.display = 'grid';
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Update active navigation state
 */
function updateActiveNav(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

/**
 * Apply configuration to page elements
 */
function applyConfig() {
    if (typeof CONFIG === 'undefined') return;

    // Update title
    document.title = CONFIG.site.title || document.title;

    // Update name in hero
    const titleLines = document.querySelectorAll('.title-line');
    if (titleLines.length >= 2 && CONFIG.photographerName) {
        const nameParts = CONFIG.photographerName.split(' ');
        if (nameParts.length >= 2) {
            titleLines[0].textContent = nameParts[0];
            titleLines[1].textContent = nameParts.slice(1).join(' ');
        }
    }

    // Update about section
    const aboutLead = document.querySelector('.about-lead');
    const aboutTextContainer = document.querySelector('.about-text');

    if (aboutLead && CONFIG.site.aboutLead) {
        aboutLead.textContent = CONFIG.site.aboutLead;
    }

    if (aboutTextContainer && CONFIG.site.aboutText) {
        // Keep the lead paragraph, update the rest
        const existingParagraphs = aboutTextContainer.querySelectorAll('p:not(.about-lead)');
        existingParagraphs.forEach((p, i) => {
            if (CONFIG.site.aboutText[i]) {
                p.textContent = CONFIG.site.aboutText[i];
            }
        });
    }

    // Update email
    const emailLink = document.querySelector('.email-link');
    if (emailLink && CONFIG.site.email) {
        emailLink.href = `mailto:${CONFIG.site.email}`;
        const linkValue = emailLink.querySelector('.link-value');
        if (linkValue) linkValue.textContent = CONFIG.site.email;
    }

    // Update Flickr social link
    const flickrLink = document.querySelector('.social-link[aria-label="Flickr"]');
    if (flickrLink && CONFIG.flickr.username && CONFIG.flickr.username !== 'YOUR_FLICKR_USERNAME') {
        flickrLink.href = `https://www.flickr.com/photos/${CONFIG.flickr.username}`;
    }
}

/**
 * Initialize scroll-based animations
 */
function initScrollAnimations() {
    // Add entrance animations to elements as they scroll into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe album cards and photo items
    document.querySelectorAll('.album-card, .photo-item').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Utility: Debounce function
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
