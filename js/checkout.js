// checkout.js

document.addEventListener("DOMContentLoaded", () => {
  const orderItemsContainer = document.getElementById("orderItems");
  const orderTotal = document.getElementById("orderTotal");
  const checkoutForm = document.getElementById("checkoutForm");

  // Sample function to fetch cart from localStorage
  function getCartItems() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart;
  }

  // Render cart items to order summary
  function renderOrderSummary() {
    const cartItems = getCartItems();
    orderItemsContainer.innerHTML = "";
    let total = 0;

    if (cartItems.length === 0) {
      orderItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
      cartItems.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("order-item");
        itemDiv.innerHTML = `
          <p><strong>${item.name}</strong> x ${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}</p>
        `;
        orderItemsContainer.appendChild(itemDiv);
        total += item.price * item.quantity;
      });
    }

    orderTotal.textContent = `₹${total.toFixed(2)}`;
    localStorage.setItem("orderTotal", total.toFixed(2));
  }

  // Handle form submission
  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const payment = document.getElementById("payment").value;

    if (!name || !email || !address || !phone || !payment) {
      alert("Please fill all required fields.");
      return;
    }

    const orderDetails = {
      name,
      email,
      address,
      phone,
      payment,
      total: localStorage.getItem("orderTotal") || "0.00"
    };

    localStorage.setItem("orderConfirmation", JSON.stringify(orderDetails));
    localStorage.removeItem("cart");

    window.location.href = "order-success.html";
  });

  renderOrderSummary();
});
