document.addEventListener('DOMContentLoaded', function() {
    const testimonialsSwiper = new Swiper('.testimonials-swiper', {
        // Basic settings
        slidesPerView: 2,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        
        // Autoplay
        autoplay: {
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        
        // Effects
        effect: 'slide',
        speed: 800,
        
        // Pagination dots
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        
        // Responsive breakpoints
        breakpoints: {
            768: {
                slidesPerView: 1,
                spaceBetween: 40,
            },
            1024: {
                slidesPerView: 1,
                spaceBetween: 50,
            }
        }
    });
});