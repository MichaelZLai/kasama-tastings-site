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