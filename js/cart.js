// js/cart.js
document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cartItems');
  const subtotalElement = document.getElementById('subtotal');
  const taxElement = document.getElementById('tax');
  const totalElement = document.getElementById('total');
  
  // Initialize cart
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Render cart items
  function renderCart() {
    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
    
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart">
          <i class="fas fa-shopping-bag"></i>
          <h3>Your cart is empty</h3>
          <a href="products.html" class="btn">Continue Shopping</a>
        </div>
      `;
      updateSummary(0);
      return;
    }
    
    cartItems.forEach((item, index) => {
      const itemTotal = parseInt(item.price) * parseInt(item.quantity);
      subtotal += itemTotal;
      
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <div class="item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="item-details">
          <h3>${item.name}</h3>
          <p class="price">₹${parseInt(item.price).toLocaleString()}</p>
          <div class="quantity-controls">
            <button class="quantity-btn" data-index="${index}" data-change="-1">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn" data-index="${index}" data-change="1">+</button>
          </div>
        </div>
        <div class="item-actions">
          <p class="item-total">₹${itemTotal.toLocaleString()}</p>
          <button class="remove-btn" data-index="${index}">
            <i class="fas fa-trash"></i> Remove
          </button>
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
    
    updateSummary(subtotal);
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        const change = parseInt(e.target.dataset.change);
        updateQuantity(index, change);
      });
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        removeItem(index);
      });
    });
  }
  
  // Update cart summary
  function updateSummary(subtotal) {
    const tax = subtotal * 0;
    const total = subtotal + tax;
    
    subtotalElement.textContent = `₹${subtotal.toLocaleString()}`;
    taxElement.textContent = `₹${tax.toLocaleString()}`;
    totalElement.textContent = `₹${total.toLocaleString()}`;
    
    // Update cart count
    const cartCount = document.querySelectorAll('.cart-count');
    cartCount.forEach(el => {
      el.textContent = cartItems.length;
    });
  }
  
  // Update quantity
  function updateQuantity(index, change) {
    cartItems[index].quantity = Math.max(1, cartItems[index].quantity + change);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    renderCart();
  }
  
  // Remove item
  function removeItem(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    renderCart();
  }
  
  // Initialize cart
  renderCart();
  
  // Add to cart functionality for related products
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const product = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: button.dataset.price,
        image: button.dataset.image,
        quantity: 1
      };
      
      // Check if product already exists in cart
      const existingItem = cartItems.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cartItems.push(product);
      }
      
      localStorage.setItem('cart', JSON.stringify(cartItems));
      renderCart();
      
      // Show notification
      showAddedToCart(product.name);
    });
  });
  
  // Show added to cart notification
  function showAddedToCart(productName) {
    const toast = document.createElement('div');
    toast.className = 'cart-toast';
    toast.innerHTML = `
      <div class="toast-content">
        <i class="fas fa-check-circle"></i>
        <div class="toast-message">
          <h4>Added to Cart!</h4>
          <p>${productName}</p>
        </div>
      </div>
      <div class="toast-progress"></div>
    `;
    document.body.appendChild(toast);
    
    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });
    
    // Progress bar animation
    const progress = toast.querySelector('.toast-progress');
    progress.style.width = '100%';
    progress.style.transition = 'width 2.5s linear';
    setTimeout(() => progress.style.width = '0%', 50);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
});