// Add 'scrolled' class when page is scrolled
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  });