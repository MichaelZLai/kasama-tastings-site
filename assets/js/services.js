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
            description: 'Explore the essentials of wine with this beginner-friendly experience. Learn how to taste wine like a pro, uncover key flavor profiles, and discover the art of pairing wine with food. NA wine offering available.*',
            image: 'images/services-fundamentals.jpg',
            details: {
                included: [
                    '5 carefully selected wines from different regions',
                    'Professional sommelier guidance',
                    'Wine tasting notes and techniques',
                    'Cheese and charcuterie pairings',
                    'Take-home tasting journal'
                ],
                perfectFor: 'Wine newcomers, couples\' date night, small groups (2-6 people)',
                duration: '2.5 hours of immersive wine education',
                location: 'In the comfort of your own home (Austin area) or our private tasting room'
            }
        },
        'sparkling-wine': {
            title: 'Sparkling Wine Masterclass: Sip, Learn, Sparkle',
            price: '\$450 | 6 Guests\n2 - 2.5 hour\nexperience',
            description: 'Dive into the world of bubbles! Explore Champagne, Prosecco, Cava, and more. Learn production methods and perfect food pairings with this effervescent experience.',
            image: 'images/services-sparkling.jpg',
            details: {
                included: [
                    '6 premium sparkling wines from around the world',
                    'Champagne vs. Prosecco vs. Cava comparison',
                    'Traditional vs. modern production methods',
                    'Oyster and caviar pairings',
                    'Proper champagne service and storage tips'
                ],
                perfectFor: 'Celebrations, sophisticated gatherings, champagne enthusiasts',
                duration: '3 hours of effervescent education',
                specialFeatures: 'Includes vintage champagne and rare sparklings not available in stores'
            }
        },
        'sicily-uncorked': {
            title: 'Sicily Uncorked: A Journey Through Island Wines',
            price: '\$450 | 6 Guests\n2 - 2.5 hour\nexperience',
            description: 'Explore the unique terroir of Sicily through indigenous grape varieties. Discover volcanic soils and Mediterranean influences in every glass from this ancient wine region.',
            image: 'images/services-sicily.jpg',
            details: {
                included: [
                    '5 authentic Sicilian wines from Mount Etna region',
                    'Rare indigenous grape varieties (Nero d\'Avola, Grillo, Carricante)',
                    'Volcanic terroir explanation and tasting notes',
                    'Traditional Sicilian appetizers and olive oils',
                    'Cultural stories and wine region history'
                ],
                perfectFor: 'Adventure seekers, Italy lovers, unique wine experiences',
                duration: '2.5 hours of Mediterranean wine journey',
                specialFeatures: 'Exclusive wines sourced directly from family vineyards in Sicily'
            }
        },
        'texas-vintages': {
            title: 'Texas Vintages: Sip the Spirit of the Lone Star State',
            price: '$430 | 6 Guests\n2 - 2.5 hour\nexperience',
            description: 'Discover the hidden gems of Texas wine country! From Hill Country to High Plains, explore award-winning local vineyards and taste the terroir of the Lone Star State.',
            image: 'images/services-texas.jpg',
            details: {
                included: [
                    '6 premium Texas wines from different regions',
                    'Hill Country, High Plains, and Gulf Coast selections',
                    'Local vineyard stories and winemaker backgrounds',
                    'Texas-style BBQ and local cheese pairings',
                    'Map of Texas wine regions to plan your visits'
                ],
                perfectFor: 'Texas locals, newcomers to the state, supporting local businesses',
                duration: '2.5 hours of Texas pride in every glass',
                specialFeatures: 'Meet-the-winemaker virtual sessions and exclusive vineyard tour discounts'
            }
        },
        'non-alcoholic': {
            title: 'Elevated Sips: The Art of Non-Alcoholic Wines',
            price: '$450 | 6 Guests\n2 - 2.5 hour\nexperience',
            description: 'Experience the sophistication of wine culture without the alcohol! Discover premium non-alcoholic wines that deliver complex flavors and elegant experiences for everyone.',
            image: 'images/services-nonalcohol.jpg',
            details: {
                included: [
                    '7 premium non-alcoholic wines from around the world',
                    'Traditional dealcoholization method education',
                    'Sparkling, red, white, and rosé varieties',
                    'Sophisticated food pairings and appetizers',
                    'Guide to the best non-alcoholic wine brands'
                ],
                perfectFor: 'Pregnant women, designated drivers, sober curious, health-conscious individuals',
                duration: '2.5 hours of inclusive wine appreciation',
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
        const modalContent = `
            <div class="modal-left">
                <h2 class="modal-title">${service.title}</h2>
                <div class="modal-price-info">${service.price.replace(/\n/g, '<br>')}</div>
                <p class="modal-description">${service.description}</p>
                <button class="modal-book-btn">BOOK NOW</button>
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
    }

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
});