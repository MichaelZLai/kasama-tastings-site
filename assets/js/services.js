document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('serviceModal');
    const modalBody = modal.querySelector('.modal-body');
    const closeBtn = modal.querySelector('.modal-close');
    const learnMoreButtons = document.querySelectorAll('.learn-btn');

    // Service data
    const serviceData = {
        'wine-fundamentals': {
            title: 'Wine Fundamentals: Discover your Palate',
            price: '\$400 | 6 Guests\n1 - 1.5 hour\nexperience',
            description: 'Explore the essentials of wine with this beginner-friendly experience. Learn how to taste wine like a pro, uncover key flavor profiles, and discover the art of pairing wine with food. <br><br>NA wine offering available.*',
            image: 'images/services-fundamentals.jpg',
            details: {
                included: [
                    '3 carefully selected wines from different regions',
                    'Professional sommelier guidance',
                    'Wine tasting notes and techniques',
                    'Cheese and charcuterie pairings',
                    'Take-home tasting journal'
                ],
                perfectFor: 'Wine newcomers, couples\' date night, small groups (2-6 people)',
                duration: '1.5 hours of immersive wine education',
                location: 'In the comfort of your own home (Austin area) or our private tasting room'
            }
        },
        'sparkling-wine': {
            title: 'Sparkling Wine Masterclass: Sip, Learn, Sparkle',
            price: '\$450 | 6 Guests\n1 - 1.5 hour\nexperience',
            description: 'Dive into the world of bubbles! Explore Champagne, Prosecco, Cava, and more. Learn production methods and perfect food pairings with this effervescent experience.',
            image: 'images/services-sparkling.jpg',
            details: {
                included: [
                    '3 premium sparkling wines from around the world',
                    'Champagne vs. Prosecco vs. Cava comparison',
                    'Traditional vs. modern production methods',
                ],
                perfectFor: 'Celebrations, sophisticated gatherings, sparkling wine enthusiasts',
                duration: '1.5 hours of effervescent education',
            }
        },
        'boisset-collection': {
            title: 'Napa to Sonoma: A Journey Through The Boisset Collection',
            price: '\$475 | 6 Guests\n1 - 1.5 hour\nexperience',
            description: 'Experience the exceptional Boisset Collection. Journey from Napa Valley\'s legendary vineyards to Sonoma\'s diverse terroirs, discovering how French winemaking traditions blend with California innovation.',
            image: 'images/services-boisset.jpg',
            details: {
                included: [
                    '3 - 4 wines from iconic destination wineries in Napa Valley and Sonoma County',
                    'Presentation about French winemaking techniques and California\'s terroir',
                    'Opportunity to purchase wines directly from the tasting',
                    'Learn about the Boisset Wine Society membership'
                ],
                perfectFor: 'California wine enthusiasts, luxury wine lovers, those interested in French-California winemaking fusion',
                duration: '1.5 hours of premium California wine exploration',
                specialFeatures: 'Exclusive wines from historic estates including Raymond Vineyards and DeLoach Vineyards'
            }
        },
        'texas-vintages': {
            title: 'Texas Vintages: Sip the Spirit of the Lone Star State',
            price: '$450 | 6 Guests\n1 - 1.5 hour\nexperience',
            description: 'Discover the hidden gems of Texas wine country! From Hill Country to High Plains, explore award-winning local vineyards and taste the terroir of the Lone Star State.',
            image: 'images/services-texas.jpg',
            details: {
                included: [
                    '3 premium Texas wines from different regions',
                    'Hill Country, High Plains, and Gulf Coast selections',
                    'Local vineyard stories and winemaker backgrounds',
                ],
                perfectFor: 'Texas locals, newcomers to the state, supporting local businesses',
                duration: '1.5 hours of Texas pride in every glass',
            }
        },
        'non-alcoholic': {
            title: 'Elevated Sips: The Art of Non-Alcoholic Wines',
            price: '$450 | 6 Guests\n1 - 1.5 hour\nexperience',
            description: 'Experience the sophistication of wine culture without the alcohol! Discover premium non-alcoholic wines that deliver complex flavors and elegant experiences for everyone.',
            image: 'images/services-nonalcohol.jpg',
            details: {
                included: [
                    '3 premium non-alcoholic wines from around the world',
                    'Traditional dealcoholization method education',
                    'Sparkling, red, white, and rosé varieties',
                    'Sophisticated food pairings and appetizers',
                    'Guide to the best non-alcoholic wine brands'
                ],
                perfectFor: 'Pregnant women, designated drivers, sober curious, health-conscious individuals',
                duration: '1.5 hours of inclusive wine appreciation',
                specialFeatures: 'Zero judgment, full sophistication - proving wine culture is for everyone'
            }
        },
        'custom-event': {
            title: 'Custom Event: Tailored Wine Experiences',
            price: 'Price Varies\nStarting at $300\nCustom quotes available',
            description: 'Create your perfect wine experience! From corporate events to milestone celebrations, we\'ll design a bespoke tasting that perfectly matches your vision and budget.',
            image: 'images/services-custom.jpg',
            details: {
                included: [
                    'Corporate team building events',
                    'Birthday and anniversary celebrations',
                    'Bridal showers and bachelorette parties',
                    'Holiday parties and seasonal events',
                    'Wine and paint nights',
                    'Large group accommodations (10+ people)'
                ],
                perfectFor: 'Corporate events, special celebrations, large groups, unique themes',
                duration: 'Flexible timing (1-4 hours available)',
                specialFeatures: 'Complimentary consultation to design your perfect event'
            }
        }
    };

    // Open modal
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceKey = this.getAttribute('data-service');
            const service = serviceData[serviceKey];
            
            if (service) {
                showModal(service);
            }
        });
    });

    // Close modal
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    function showModal(service) {
        // Determine the button text based on service type
        const buttonText = service.title.includes('Custom Event') ? 'GET QUOTE' : 'BOOK NOW';

        const modalContent = `
            <div class="modal-left">
                <h2 class="modal-title">${service.title}</h2>
                <div class="modal-price-info">${service.price.replace(/\n/g, '<br>')}</div>
                <p class="modal-description">${service.description}</p>
                <button class="modal-book-btn">${buttonText}</button>
            </div>
            <div class="modal-right">
                <img src="${service.image}" alt="${service.title}" class="modal-image">
                <div class="modal-details">
                    <h4>What's Included:</h4>
                    <ul>
                        ${service.details.included.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                    <h4>Perfect For:</h4>
                    <p>${service.details.perfectFor}</p>
                    <h4>Duration:</h4>
                    <p>${service.details.duration}</p>
                    ${service.details.specialFeatures ? `<h4>Special Features:</h4><p>${service.details.specialFeatures}</p>` : ''}
                </div>
            </div>
        `;
        
        modalBody.innerHTML = modalContent;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Add event listener to the modal book button
        const modalBookBtn = modal.querySelector('.modal-book-btn');
        if (modalBookBtn) {
            modalBookBtn.addEventListener('click', function() {
                // Check if it's a GET quote or book now button
                if (buttonText === 'GET QUOTE') {
                    window.location.href = 'mailto:info@kasamatastings.com?subject=Custom Event Quote Request&body=Hi! I\'d like to request a quote for a custom wine tasting event.';
                } else {
                    window.location.href = 'kt-booktasting.html';
                }
            });
        }
    }

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});