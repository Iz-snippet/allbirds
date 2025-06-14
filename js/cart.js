// Cart page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get cart items from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const subtotalElement = document.querySelector('.subtotal');
    const totalElement = document.querySelector('.total-amount');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // Update cart count in navigation
    updateCartCount();
    
    // Render cart items
    renderCartItems();
    
    // Add event listener to checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            // Redirect to checkout confirmation page
            window.location.href = 'checkout-confirmation.html';
        });
    }
    
    // Function to render cart items
    function renderCartItems() {
        // Clear existing items
        cartItemsContainer.innerHTML = '';
        
        // Check if cart is empty
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'block';
            subtotalElement.textContent = '$0.00';
            totalElement.textContent = '$5.00';
            return;
        }
        
        // Hide empty cart message
        emptyCartMessage.style.display = 'none';
        
        // Calculate subtotal
        let subtotal = 0;
        
        // Add each item to the cart
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            
            // Create cart item element
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.dataset.id = item.id;
            
            cartItem.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Update subtotal and total
        const shipping = 5.00;
        const total = subtotal + shipping;
        
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
        
        // Add event listeners to quantity buttons and remove buttons
        addCartItemEventListeners();
    }
    
    // Function to add event listeners to cart items
    function addCartItemEventListeners() {
        // Quantity decrease buttons
        const decreaseButtons = document.querySelectorAll('.quantity-btn.decrease');
        decreaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = this.dataset.id;
                updateItemQuantity(id, -1);
            });
        });
        
        // Quantity increase buttons
        const increaseButtons = document.querySelectorAll('.quantity-btn.increase');
        increaseButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = this.dataset.id;
                updateItemQuantity(id, 1);
            });
        });
        
        // Remove item buttons
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const id = this.dataset.id;
                removeItem(id);
            });
        });
    }
    
    // Function to update item quantity
    function updateItemQuantity(id, change) {
        const itemIndex = cart.findIndex(item => item.id === id);
        
        if (itemIndex !== -1) {
            // Update quantity
            cart[itemIndex].quantity += change;
            
            // Remove item if quantity is 0 or less
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
            
            // Save updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart count in navigation
            updateCartCount();
            
            // Re-render cart items
            renderCartItems();
        }
    }
    
    // Function to remove item from cart
    function removeItem(id) {
        const itemIndex = cart.findIndex(item => item.id === id);
        
        if (itemIndex !== -1) {
            // Remove item from cart
            cart.splice(itemIndex, 1);
            
            // Save updated cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // Update cart count in navigation
            updateCartCount();
            
            // Re-render cart items
            renderCartItems();
        }
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
});
