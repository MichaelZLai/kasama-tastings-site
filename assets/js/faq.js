document.addEventListener('DOMContentLoaded', function() {
    // Get all FAQ question buttons
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    // Add click event listener to each question
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const faqAnswer = faqItem.querySelector('.faq-answer');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQ items
            faqQuestions.forEach(otherQuestion => {
                const otherItem = otherQuestion.parentElement;
                const otherAnswer = otherItem.querySelector('.faq-answer');
                
                if (otherQuestion !== this) {
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherAnswer.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            if (isExpanded) {
                this.setAttribute('aria-expanded', 'false');
                faqAnswer.classList.remove('active');
            } else {
                this.setAttribute('aria-expanded', 'true');
                faqAnswer.classList.add('active');
            }
        });
    });
    
    // Optional: Close FAQ when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.faq-item')) {
            faqQuestions.forEach(question => {
                const faqAnswer = question.parentElement.querySelector('.faq-answer');
                question.setAttribute('aria-expanded', 'false');
                faqAnswer.classList.remove('active');
            });
        }
    });
});