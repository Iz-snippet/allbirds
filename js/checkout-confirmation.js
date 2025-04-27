document.addEventListener('DOMContentLoaded', () => {
    try {
        // Generate random order number
        const orderNumber = generateOrderNumber();
        document.querySelector('#order-number').textContent = orderNumber;

        // Generate random shipping address
        const shippingAddress = generateRandomAddress();
        document.querySelector('.shipping-address').innerHTML = `
            <p>${shippingAddress.name}</p>
            <p>${shippingAddress.street}</p>
            <p>${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip}</p>
            <p>${shippingAddress.country}</p>
        `;

        // Generate random delivery date (3-5 days from now)
        const deliveryDate = generateDeliveryDate();
        document.querySelector('.delivery-info').innerHTML = `
            <p>Estimated Delivery: ${deliveryDate}</p>
            <p>Standard Shipping (3-5 business days)</p>
        `;

        // Generate confetti effect
        createConfettiEffect();

        // Load cart items from localStorage
        loadCartItems();
    } catch (error) {
        console.error('Error initializing checkout confirmation:', error);
        // Show user-friendly error message
        const container = document.querySelector('.confirmation-container');
        if (container) {
            container.innerHTML = `
                <div class="error-message">
                    <h2>Something went wrong</h2>
                    <p>We're having trouble processing your order. Please try again later.</p>
                    <a href="index.html" class="btn-primary">Return to Home</a>
                </div>
            `;
        }
    }
});

function generateOrderNumber() {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${timestamp}${random}`;
}

function generateRandomAddress() {
    const names = ['John Smith', 'Sarah Johnson', 'Michael Brown', 'Emily Davis', 'David Wilson'];
    const streets = ['123 Main St', '456 Oak Ave', '789 Pine Rd', '321 Elm St', '654 Maple Dr'];
    const cities = ['San Francisco', 'New York', 'Los Angeles', 'Chicago', 'Boston'];
    const states = ['CA', 'NY', 'CA', 'IL', 'MA'];
    const zips = ['94105', '10001', '90001', '60601', '02108'];
    const countries = ['United States'];

    const randomIndex = Math.floor(Math.random() * names.length);
    return {
        name: names[randomIndex],
        street: streets[randomIndex],
        city: cities[randomIndex],
        state: states[randomIndex],
        zip: zips[randomIndex],
        country: countries[0]
    };
}

function generateDeliveryDate() {
    const deliveryDays = Math.floor(Math.random() * 3) + 3; // 3-5 days
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
    return deliveryDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
    });
}

function createConfettiEffect() {
    const confettiContainer = document.querySelector('.confetti-container');
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 3}s`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confettiContainer.appendChild(confetti);
    }
}

function loadCartItems() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const orderItems = document.querySelector('.order-items');
        const subtotalElement = document.querySelector('#subtotal');
        const totalElement = document.querySelector('#total');
        
        if (!orderItems || !subtotalElement || !totalElement) {
            throw new Error('Required elements not found');
        }
        
        let subtotal = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `
                <div class="order-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="order-item-details">
                    <div class="order-item-name">${item.name}</div>
                    <div class="order-item-price">$${item.price.toFixed(2)}</div>
                    <div class="order-item-quantity">Quantity: ${item.quantity}</div>
                </div>
            `;
            orderItems.appendChild(orderItem);
        });
        
        const shipping = 5.00;
        const total = subtotal + shipping;
        
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
        
        // Clear the cart after successful order
        localStorage.removeItem('cart');
        updateCartCount();
    } catch (error) {
        console.error('Error loading cart items:', error);
        throw error; // Re-throw to be caught by the main try-catch
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = '0';
    }
} 