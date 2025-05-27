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
        
        // Set a cookie so popup doesn't show again for 24 hours
        setCookie('popup_shown', 'true', 1);
    }
}

// Cookie functions
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Show popup when page loads (with delay)
document.addEventListener('DOMContentLoaded', function() {
    // Check if popup was already shown today
    if (!getCookie('popup_shown')) {
        // Show popup after 2 seconds
        setTimeout(showPopup, 2000);
    }
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