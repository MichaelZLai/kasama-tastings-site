document.addEventListener('DOMContentLoaded', function() {
    // Get tab buttons and event sections
    const tabButtons = document.querySelectorAll('.tab-btn');
    const eventSections = document.querySelectorAll('.events-grid');
    
    // Function to switch tabs
    function switchTab(targetTab) {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Hide all event sections
        eventSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Add active class to clicked button
        const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        // Show target section
        const targetSection = document.getElementById(`${targetTab}-events`);
        if (targetSection) {
            setTimeout(() => {
                targetSection.classList.add('active');
            }, 150); // Small delay for smooth transition
        }
    }
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
    
    // Initialize with 'upcoming' tab active (this should already be set in HTML)
    // But ensure it's properly initialized
    const defaultTab = 'upcoming';
    const upcomingSection = document.getElementById('upcoming-events');
    if (upcomingSection && !upcomingSection.classList.contains('active')) {
        switchTab(defaultTab);
    }
    
    // Optional: Handle newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Replace this with your actual newsletter signup logic
            alert(`Thank you for subscribing with email: ${email}`);
            this.reset();
        });
    }
    
    // Optional: Add smooth scrolling for tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(() => {
                const eventsSection = document.querySelector('.events-grid.active');
                if (eventsSection) {
                    eventsSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 200);
        });
    });
});

// ===== FLODESK Initialization =====
    
    // Initialize Flodesk form
    function initializeFlodeskForm() {
        // Wait for Flodesk to be available
        if (typeof window.fd === 'function') {
            fd('form', {
                formId: '683a43a108dbbb76560b1774',
                containerEl: '#fd-form-683a43a108dbbb76560b1774'
            });
            console.log('Flodesk form initialized');
        } else {
            // Retry if Flodesk isn't loaded yet
            setTimeout(initializeFlodeskForm, 500);
        }
    }
    
    // Initialize Flodesk form
    initializeFlodeskForm();
    
    
// ===== IMAGE LIGHTBOX FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {

    // Image Lightbox functionality
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    // Function to open lightbox
    function openLightbox(imageSrc, caption, altText) {
        lightboxImage.src = imageSrc;
        lightboxImage.alt = altText || caption || 'Event image';
        lightboxCaption.textContent = caption || '';
        
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Track lightbox open for analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'lightbox_opened', {
                'event_category': 'Image Interaction',
                'event_label': caption || 'Event Image'
            });
        }
    }

    // Function to close lightbox
    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scrolling
        
        // Clear image after animation completes
        setTimeout(() => {
            lightboxImage.src = '';
            lightboxCaption.textContent = '';
        }, 300);
    }

    // Add click event to all event images
    document.querySelectorAll('.event-image').forEach(eventImage => {
        eventImage.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event card click
            
            const img = this.querySelector('img');
            const eventCard = this.closest('.event-card');
            const eventTitle = eventCard.querySelector('h3')?.textContent || 'Event Image';
            
            if (img) {
                openLightbox(img.src, eventTitle, img.alt);
            }
        });
    });

    // Close lightbox events
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close when clicking overlay (but not the image)
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    });

    // Optional: Add keyboard navigation (left/right arrows for multiple images)
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('show')) return;
        
        if (e.key === 'ArrowLeft') {
            // Navigate to previous image (if you have multiple)
            navigateImage('prev');
        } else if (e.key === 'ArrowRight') {
            // Navigate to next image (if you have multiple)  
            navigateImage('next');
        }
    });

    // Function to navigate between images (optional enhancement)
    function navigateImage(direction) {
        const currentEventCard = document.querySelector('.event-card.lightbox-active');
        if (!currentEventCard) return;

        const allEventCards = Array.from(document.querySelectorAll('.event-card'));
        const currentIndex = allEventCards.indexOf(currentEventCard);
        
        let nextIndex;
        if (direction === 'next') {
            nextIndex = currentIndex + 1 >= allEventCards.length ? 0 : currentIndex + 1;
        } else {
            nextIndex = currentIndex - 1 < 0 ? allEventCards.length - 1 : currentIndex - 1;
        }
        
        const nextEventCard = allEventCards[nextIndex];
        const nextImg = nextEventCard.querySelector('.event-image img');
        const nextTitle = nextEventCard.querySelector('h3')?.textContent || 'Event Image';
        
        if (nextImg) {
            // Remove active class from current card
            currentEventCard.classList.remove('lightbox-active');
            // Add active class to next card
            nextEventCard.classList.add('lightbox-active');
            // Update lightbox
            openLightbox(nextImg.src, nextTitle, nextImg.alt);
        }
    }

    // Mark active event card when lightbox opens
    document.querySelectorAll('.event-image').forEach(eventImage => {
        eventImage.addEventListener('click', function() {
            // Remove active class from all cards
            document.querySelectorAll('.event-card').forEach(card => {
                card.classList.remove('lightbox-active');
            });
            // Add active class to current card
            this.closest('.event-card').classList.add('lightbox-active');
        });
    });
});