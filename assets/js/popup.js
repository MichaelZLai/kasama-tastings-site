// Basic Tracking for Analytics
function trackPopupEvent(action) {
    console.log('Popup Event:', action); // For debugging
    
    // Google Analytics (if you use it)
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': 'Maternity Popup',
            'event_label': 'BIRTHDAY15 Promotion'
        });
    }
}

// Popup functionality
function showPopup() {
    const popup = document.getElementById('maternity-popup');
    if (popup) {
        popup.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        trackPopupEvent('popup_shown'); // Track when shown
    }
}

function closePopup() {
    const popup = document.getElementById('maternity-popup');
    if (popup) {
        popup.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scrolling
        trackPopupEvent('popup_closed'); // Track when closed
    }
}

// Show popup when page loads (with delay)
document.addEventListener('DOMContentLoaded', function() {
        // Show popup after 2 seconds
        setTimeout(showPopup, 2000);
});

// Close popup when clicking outside of it
document.addEventListener('click', function(event) {
    const popup = document.getElementById('maternity-popup');
    const popupContent = document.querySelector('.popup-content');
    
    if (event.target === popup && !popupContent.contains(event.target)) {
        closePopup();
    }
});

// Close popup with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePopup();
    }
});