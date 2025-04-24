document.addEventListener('DOMContentLoaded', function() {
    initTestimonialCarousel();
    handleScrollAnimation();
  });
  
  function initTestimonialCarousel() {
    const carousel = document.querySelector('.testimonial-carousel');
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicatorsContainer = document.querySelector('.testimonial-indicators');
    
    let currentSlide = 0;
    let isAnimating = false;
    let autoPlayInterval = null;
    const autoPlayDelay = 8000; // 8 seconds
    
    // Set up initial state
    function init() {
      // Position all slides initially - make sure they're all absolute except active
      slides.forEach((slide, index) => {
        slide.classList.remove('active');
        slide.style.position = 'absolute';
        slide.style.opacity = '0';
        slide.style.transform = 'translateX(100%)';
      });
      
      // Set first slide as active
      slides[0].classList.add('active');
      slides[0].style.position = 'relative';
      slides[0].style.opacity = '1';
      slides[0].style.transform = 'translateX(0)';
      
      // Create indicators
      createIndicators();
      
      // Set up event listeners
      prevBtn.addEventListener('click', () => {
        if (!isAnimating) showPrevSlide();
      });
      
      nextBtn.addEventListener('click', () => {
        if (!isAnimating) showNextSlide();
      });
      
      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (!isAnimating) {
          if (e.key === 'ArrowLeft') showPrevSlide();
          else if (e.key === 'ArrowRight') showNextSlide();
        }
      });
      
      // Pause on hover
      carousel.addEventListener('mouseenter', pauseAutoPlay);
      carousel.addEventListener('mouseleave', startAutoPlay);
      
      // Start autoplay
      startAutoPlay();
    }
    
    // Create indicator dots
    function createIndicators() {
      indicatorsContainer.innerHTML = '';
      
      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('indicator');
        if (i === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
          if (!isAnimating && i !== currentSlide) {
            goToSlide(i);
          }
        });
        
        indicatorsContainer.appendChild(dot);
      }
    }
    
    // Show previous slide
    function showPrevSlide() {
      const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
      goToSlide(prevIndex, 'prev');
    }
    
    // Show next slide
    function showNextSlide() {
      const nextIndex = (currentSlide + 1) % slides.length;
      goToSlide(nextIndex, 'next');
    }
    
    // Go to a specific slide
    function goToSlide(index, direction = 'next') {
      if (index === currentSlide || isAnimating) return;
      
      isAnimating = true;
      
      const currentElement = slides[currentSlide];
      const nextElement = slides[index];
      
      // Update indicators
      const indicators = indicatorsContainer.querySelectorAll('.indicator');
      indicators[currentSlide].classList.remove('active');
      indicators[index].classList.add('active');
      
      // Animation for direction
      if (direction === 'next') {
        // Current slide exits to left
        currentElement.style.transform = 'translateX(-100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('active');
        
        // Make sure current slide becomes absolute after animation starts
        setTimeout(() => {
          currentElement.style.position = 'absolute';
        }, 50);
        
        // Next slide enters from right - must start in absolute position
        nextElement.style.position = 'absolute';
        nextElement.style.transform = 'translateX(100%)';
        nextElement.style.opacity = '0';
        
        // Force a reflow to ensure the transform is applied before changing it
        void nextElement.offsetWidth;
        
        // Start animation for next element
        nextElement.classList.add('active');
        nextElement.style.transform = 'translateX(0)';
        nextElement.style.opacity = '1';
        
        // Make next slide relative position after animation completes
        setTimeout(() => {
          nextElement.style.position = 'relative';
        }, 50);
      } else {
        // Current slide exits to right
        currentElement.style.transform = 'translateX(100%)';
        currentElement.style.opacity = '0';
        currentElement.classList.remove('active');
        
        // Make sure current slide becomes absolute after animation starts
        setTimeout(() => {
          currentElement.style.position = 'absolute';
        }, 50);
        
        // Next slide enters from left - must start in absolute position
        nextElement.style.position = 'absolute';
        nextElement.style.transform = 'translateX(-100%)';
        nextElement.style.opacity = '0';
        
        // Force a reflow
        void nextElement.offsetWidth;
        
        // Start animation for next element
        nextElement.classList.add('active');
        nextElement.style.transform = 'translateX(0)';
        nextElement.style.opacity = '1';
        
        // Make next slide relative position after animation completes
        setTimeout(() => {
          nextElement.style.position = 'relative';
        }, 50);
      }
      
      // Update current slide index
      currentSlide = index;
      
      // Reset animation flag after transition
      setTimeout(() => {
        isAnimating = false;
      }, 650); // Slightly longer than transition time
      
      // Reset autoplay
      resetAutoPlay();
    }
    
    // Start autoplay
    function startAutoPlay() {
      if (autoPlayInterval) clearInterval(autoPlayInterval);
      autoPlayInterval = setInterval(() => {
        if (!isAnimating) showNextSlide();
      }, autoPlayDelay);
    }
    
    // Pause autoplay
    function pauseAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    }
    
    // Reset autoplay
    function resetAutoPlay() {
      pauseAutoPlay();
      startAutoPlay();
    }
    
    // Initialize
    init();
  }
  
  // Handle scroll animation
  function handleScrollAnimation() {
    const testimonialSection = document.querySelector('.testimonials-section');
    if (!testimonialSection) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            testimonialSection.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    observer.observe(testimonialSection);
  }