// Shopify Integration for Kasama Tastings
(function() {
    'use strict';

    // Configuration
    const SHOPIFY_CONFIG = {
        domain: 'prving-bv.myshopify.com',
        storefrontAccessToken: '00f0acfd01c200823682d45c63cf7e78',
        products: {
            decanter: '9914250559800',
            // Add more product IDs as needed
            wine1: 'WINE_PRODUCT_ID_1',
            wine2: 'WINE_PRODUCT_ID_2',
            wine3: 'WINE_PRODUCT_ID_3'
        }
    };

    // Common styles for all products
    const COMMON_STYLES = {
        product: {
            contents: {
                img: false,  // Hide Shopify product images
                title: false,
                price: true,
                button: true
            },
            styles: {
                product: {
                    "@media (min-width: 601px)": {
                        "max-width": "100%",
                        "margin-left": "0px",
                        "margin-bottom": "20px"
                    }
                },
                title: {
                    "font-family": "Montserrat, sans-serif",
                    "font-size": "1.5rem",
                    "color": "#333"
                },
                button: {
                    "font-family": "Montserrat, sans-serif",
                    "background-color": "transparent",
                    "color": "#333",
                    "border": "2px solid #333",
                    "border-radius": "30px",
                    "padding": "1rem 2.5rem",
                    "font-weight": "600",
                    "font-size": "0.9rem",
                    "text-transform": "uppercase",
                    "letter-spacing": "1px",
                    ":hover": {
                        "background-color": "#6e996d",
                        "color": "white",
                        "border-color": "#6e996d"
                    },
                    ":focus": {
                        "background-color": "#6e996d",
                        "color": "white",
                        "border-color": "#6e996d"
                    }
                },
                price: {
                    "font-family": "Montserrat, sans-serif",
                    "font-size": "1.2rem",
                    "color": "#333"
                }
            },
            text: {
                button: "Add to cart"
            },
            googleFonts: ["Montserrat"]
        }
    };

    // Initialize Shopify
    function initializeShopify() {
        const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
        
        if (window.ShopifyBuy) {
            if (window.ShopifyBuy.UI) {
                setupShopifyProducts();
            } else {
                loadShopifyScript();
            }
        } else {
            loadShopifyScript();
        }

        function loadShopifyScript() {
            const script = document.createElement('script');
            script.async = true;
            script.src = scriptURL;
            script.onload = setupShopifyProducts;
            document.head.appendChild(script);
        }
    }

    // Setup Shopify products
    function setupShopifyProducts() {
        const client = ShopifyBuy.buildClient({
            domain: SHOPIFY_CONFIG.domain,
            storefrontAccessToken: SHOPIFY_CONFIG.storefrontAccessToken,
        });

        ShopifyBuy.UI.onReady(client).then(function(ui) {
            // Create decanter product
            createDecanterProduct(ui);
            
            // Setup wine collection toggle
            setupWineCollectionToggle(ui);
        });
    }

    // Create decanter product
    function createDecanterProduct(ui) {
        const decanterContainer = document.getElementById('product-component-decanter');
        if (!decanterContainer) return;

        ui.createComponent('product', {
            id: SHOPIFY_CONFIG.products.decanter,
            node: decanterContainer,
            moneyFormat: '%24%7B%7Bamount%7D%7D',
            options: COMMON_STYLES
        });
    }

    // Setup wine collection functionality
    function setupWineCollectionToggle(ui) {
        const browseWinesBtn = document.getElementById('browse-wines-btn');
        const wineCollectionSection = document.getElementById('wine-collection');
        
        if (!browseWinesBtn || !wineCollectionSection) return;

        browseWinesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show loading state
            const originalText = browseWinesBtn.textContent;
            browseWinesBtn.innerHTML = originalText + '<span class="shopify-loading"></span>';
            browseWinesBtn.classList.add('loading');

            // Show wine collection section
            wineCollectionSection.style.display = 'block';
            wineCollectionSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Load wine products (if you have specific wine product IDs)
            loadWineProducts(ui);

            // Reset button after delay
            setTimeout(() => {
                browseWinesBtn.textContent = 'VIEW COLLECTION';
                browseWinesBtn.classList.remove('loading');
            }, 1500);
        });
    }

    // Load wine products (customize with your actual wine product IDs)
    function loadWineProducts(ui) {
        // Example wine products - replace with actual product IDs
        const wineProducts = [
            { id: SHOPIFY_CONFIG.products.wine1, container: 'product-component-wine-1' },
            { id: SHOPIFY_CONFIG.products.wine2, container: 'product-component-wine-2' },
            { id: SHOPIFY_CONFIG.products.wine3, container: 'product-component-wine-3' }
        ];

        wineProducts.forEach(product => {
            const container = document.getElementById(product.container);
            if (container && product.id !== 'WINE_PRODUCT_ID_1') { // Only load if you have actual IDs
                ui.createComponent('product', {
                    id: product.id,
                    node: container,
                    moneyFormat: '%24%7B%7Bamount%7D%7D',
                    options: {
                        ...COMMON_STYLES,
                        product: {
                            ...COMMON_STYLES.product,
                            styles: {
                                ...COMMON_STYLES.product.styles,
                                product: {
                                    "@media (min-width: 601px)": {
                                        "max-width": "100%",
                                        "margin-bottom": "20px"
                                    }
                                }
                            }
                        }
                    }
                });
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeShopify);
    } else {
        initializeShopify();
    }

})();