// Men's page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all product cards
    const productCards = document.querySelectorAll('.product-card');
    
    // Add event listeners to all "Add to Cart" buttons
    productCards.forEach(card => {
        const addToCartBtn = card.querySelector('.add-cart');
        const buyNowBtn = card.querySelector('.buy-now');
        
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                const productName = card.querySelector('h2').textContent;
                const productPrice = parseFloat(card.querySelector('p').textContent.replace('$', ''));
                const productImage = card.querySelector('img').src;
                
                addToCart({
                    id: generateProductId(productName),
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
                
                showNotification(`${productName} added to cart!`);
            });
        }
        
        if (buyNowBtn) {
            buyNowBtn.addEventListener('click', function() {
                const productName = card.querySelector('h2').textContent;
                const productPrice = parseFloat(card.querySelector('p').textContent.replace('$', ''));
                const productImage = card.querySelector('img').src;
                
                // Add to cart first
                addToCart({
                    id: generateProductId(productName),
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
                
                // Then redirect to cart page
                window.location.href = 'cart.html';
            });
        }
    });
    
    // Function to add item to cart
    function addToCart(product) {
        // Get existing cart or initialize empty array
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already exists in cart
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingProductIndex !== -1) {
            // If product exists, increase quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // If product doesn't exist, add it to cart
            cart.push(product);
        }
        
        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart count in navigation
        updateCartCount();
    }
    
    // Function to update cart count in navigation
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        // Update cart count in navigation if it exists
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
            cartCountElement.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }
    
    // Function to generate a unique ID for a product
    function generateProductId(productName) {
        return productName.toLowerCase().replace(/\s+/g, '-');
    }
    
    // Function to show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Add styles
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = '#333';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '4px';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        
        // Add to document
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Initialize cart count on page load
    updateCartCount();
});
