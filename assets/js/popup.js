// Popup functionality
function showPopup() {
    const popup = document.getElementById('anniversary-popup');
    if (popup) {
        popup.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closePopup() {
    const popup = document.getElementById('anniversary-popup');
    if (popup) {
        popup.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// Show popup when page loads (with delay)
document.addEventListener('DOMContentLoaded', function() {
        // Show popup after 2 seconds
        setTimeout(showPopup, 2000);
});

// Close popup when clicking outside of it
document.addEventListener('click', function(event) {
    const popup = document.getElementById('anniversary-popup');
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