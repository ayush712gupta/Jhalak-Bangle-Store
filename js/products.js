// js/products.js
document.addEventListener('DOMContentLoaded', () => {
  // Wishlist functionality
  document.querySelectorAll('.wishlist-button').forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('active');
      const icon = button.querySelector('i');
      icon.classList.toggle('far');
      icon.classList.toggle('fas');
      
      // Add heart animation
      if (button.classList.contains('active')) {
        button.innerHTML = '<i class="fas fa-heart"></i>';
        button.style.color = '#ff4d4d';
        
        // Create heart burst effect
        const burst = document.createElement('div');
        burst.className = 'heart-burst';
        button.appendChild(burst);
        
        setTimeout(() => {
          burst.remove();
        }, 1000);
      } else {
        button.innerHTML = '<i class="far fa-heart"></i>';
        button.style.color = '';
      }
    });
  });

  // Product filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filter = button.dataset.filter;
      
      // Filter products
      productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Add to cart functionality
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const product = {
        id: button.dataset.id,
        name: button.dataset.name,
        price: button.dataset.price,
        image: button.dataset.image,
        quantity: 1
      };
      
      // Add button animation
      button.classList.add('clicked');
      setTimeout(() => button.classList.remove('clicked'), 300);
      
      // Get existing cart items from localStorage
      let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      
      // Check if product already exists in cart
      const existingItem = cartItems.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cartItems.push(product);
      }
      
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(cartItems));
      
      // Update cart count
      const cartCount = document.querySelectorAll('.cart-count');
      cartCount.forEach(el => {
        el.textContent = cartItems.length;
        el.classList.add('animate');
        setTimeout(() => el.classList.remove('animate'), 300);
      });
      
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
  
  // Share functionality
  document.querySelectorAll('.share-button').forEach(button => {
    button.addEventListener('click', async () => {
      const productUrl = button.dataset.url;
      try {
        if (navigator.share) {
          await navigator.share({
            title: 'Check this product from Jhalak Bangles',
            text: 'I found this amazing product at Jhalak Bangles!',
            url: productUrl
          });
        } else {
          // Fallback for browsers that don't support Web Share API
          const shareDialog = document.createElement('div');
          shareDialog.className = 'share-dialog';
          shareDialog.innerHTML = `
            <div class="share-dialog-content">
              <h3>Share this product</h3>
              <div class="share-options">
                <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(productUrl)}" target="_blank" class="share-option">
                  <i class="fab fa-twitter"></i>
                  <span>Twitter</span>
                </a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}" target="_blank" class="share-option">
                  <i class="fab fa-facebook"></i>
                  <span>Facebook</span>
                </a>
                <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(productUrl)}" target="_blank" class="share-option">
                  <i class="fab fa-whatsapp"></i>
                  <span>WhatsApp</span>
                </a>
              </div>
              <button class="close-dialog">Close</button>
            </div>
          `;
          document.body.appendChild(shareDialog);
          
          // Animation
          requestAnimationFrame(() => shareDialog.classList.add('show'));
          
          shareDialog.querySelector('.close-dialog').onclick = () => {
            shareDialog.classList.remove('show');
            setTimeout(() => shareDialog.remove(), 300);
          };
        }
      } catch (err) {
        console.error('Error sharing:', err);
      }
    });
  });
  
  // Initialize cart count
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = cartItems.length;
  });
});