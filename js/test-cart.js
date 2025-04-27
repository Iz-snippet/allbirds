// Test script to verify cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Clear the cart first to start fresh
    localStorage.removeItem('cart');
    
    // Add a test item to the cart
    const testItem = {
        id: 'test-item-1',
        name: 'Test Sneaker',
        price: 99.99,
        image: 'https://via.placeholder.com/300x300?text=Test+Shoe',
        quantity: 1
    };
    
    // Get existing cart or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Add the test item to the cart
    cart.push(testItem);
    
    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update the cart count in the navigation
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = '1';
        cartCountElement.style.display = 'block';
    }
    
    // Show a notification that the test item was added
    alert('Test item added to cart! Click OK to continue to the cart page.');
    
    // Redirect to the cart page
    window.location.href = 'cart.html';
}); 