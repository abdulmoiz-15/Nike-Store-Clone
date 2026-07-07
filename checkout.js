// checkout.js
document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const elements = {
    shipForm: document.getElementById("ship-form"),
    pickupForm: document.getElementById("pickup-form"),
    shippingInputs: document.querySelectorAll("input[name='shipping-method']"),
    heading: document.getElementById("checkout-heading"),
    form: document.getElementById("checkout-form"),
    submitBtn: document.getElementById("submit-btn"),
    pickupSelect: document.getElementById("pickup-store"),
    cartItemsDiv: document.getElementById("cart-items"),
    subtotalEl: document.getElementById("subtotal"),
    shippingEl: document.getElementById("shipping"),
    totalEl: document.getElementById("total"),
    bagCount: document.getElementById("bag-count")
    // Removed pickupHeading as it doesn't exist in HTML
  };

  // State
  const state = {
    touched: new Set(),
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    subtotal: 0
  };

  // Initialize
  init();

  function init() {
    renderCart();
    updateBagCount();
    updateSummary();
    attachEventListeners();
    updateSubmitState();
  }

  function renderCart() {
    elements.cartItemsDiv.innerHTML = "";
    state.subtotal = 0;

    if (state.cart.length === 0) {
      elements.cartItemsDiv.innerHTML = "<p class='empty-cart'>Your bag is empty.</p>";
      updateSummary();
      updateBagCount();
      return;
    }

    state.cart.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("cart-item");
      
      // Calculate item total price based on quantity
      const quantity = item.quantity || 1;
      const price = parseFloat(item.price.replace("$", ""));
      const itemTotal = price * quantity;
      state.subtotal += itemTotal;

      div.innerHTML = `
        <img src="${item.img}" alt="${item.name}" width="30%">
        <div>
          <p class="shoe-info">${item.price}</p>
          <p class="shoe-info">${item.name}</p>
          <p class="shoe-info">${item.type}</p> 
          <p class="shoe-info">
            Qty: ${item.quantity || 1} 
            <span class="divider">|</span> 
            Size: ${item.size}
          </p>
        </div>
      `;
      elements.cartItemsDiv.appendChild(div);
    });
  }

  function updateBagCount() {
    if (!elements.bagCount) return;
    
    // Calculate total items including quantities
    const totalItems = state.cart.reduce((total, item) => total + (item.quantity || 1), 0);
    
    if (totalItems > 0) {
      elements.bagCount.textContent = totalItems;
      elements.bagCount.style.display = "inline-block";
    } else {
      elements.bagCount.style.display = "none";
    }
  }

  function updateSummary() {
    const method = document.querySelector("input[name='shipping-method']:checked")?.value || "Ship";
    
    // Calculate shipping cost based on subtotal
    const shippingCost = method === "Ship" && state.subtotal < 50 ? 10 : 0;
    const total = state.subtotal + shippingCost;

    // Toggle forms
    if (elements.shipForm) elements.shipForm.style.display = method === "Ship" ? "block" : "none";
    if (elements.pickupForm) elements.pickupForm.style.display = method === "Pickup" ? "block" : "none";
    if (elements.heading) elements.heading.textContent = method === "Ship" ? "Delivery Options" : "Pickup";

    // Update amounts
    if (elements.subtotalEl) elements.subtotalEl.textContent = `$${state.subtotal.toFixed(2)}`;
    if (elements.shippingEl) elements.shippingEl.textContent = shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`;
    if (elements.totalEl) elements.totalEl.textContent = `$${total.toFixed(2)}`;

    updateSubmitState();
  }

  function getErrorDivFor(input) {
    const wrapper = input.closest(".input-wrapper") || input.parentElement;
    if (!wrapper) return null;
    
    let errorDiv = wrapper.querySelector(".error-message");
    if (!errorDiv) {
      errorDiv = document.createElement("div");
      errorDiv.className = "error-message";
      wrapper.appendChild(errorDiv);
    }
    return errorDiv;
  }

  function showError(input, message) {
    const errorDiv = getErrorDivFor(input);
    input.classList.add("error");
    if (errorDiv) {
      errorDiv.textContent = message;
      errorDiv.style.display = "block";
    }
  }

  function clearError(input) {
    const errorDiv = getErrorDivFor(input);
    input.classList.remove("error");
    if (errorDiv) {
      errorDiv.textContent = "";
      errorDiv.style.display = "none";
    }
  }

  function validateInput(input, showMsg = true) {
    if (!input) return true;
    
    const val = input.value.trim();
    let isValid = true;
    let message = "";

    if (input.validity.valueMissing) {
      isValid = false;
      const messages = {
        email: "Please enter your email address",
        firstname: "Please enter your first name",
        lastname: "Please enter your last name",
        address: "Please enter your address",
        phone: "Please enter your phone number"
      };
      message = messages[input.id] || "This field is required";
    } 
    else if (input.type === "email" && input.validity.typeMismatch) {
      isValid = false;
      message = "Please enter a valid email address";
    }
    else if (input.type === "tel" && !/^[0-9+\-\s]{7,15}$/.test(val)) {
      isValid = false;
      message = "Please enter a valid phone number";
    }
    else if (input.tagName === "SELECT" && !val) {
      isValid = false;
      message = "Please select an option";
    }

    if (showMsg) {
      if (!isValid) showError(input, message);
      else clearError(input);
    }

    return isValid;
  }

  function updateSubmitState() {
    const method = document.querySelector("input[name='shipping-method']:checked")?.value || "Ship";
    let isValid = true;

    if (method === "Ship" && elements.form) {
      const inputs = Array.from(elements.form.querySelectorAll("input[required]"));
      inputs.forEach(input => {
        if (!validateInput(input, state.touched.has(input))) isValid = false;
      });
    } 
    else if (method === "Pickup" && elements.pickupSelect) {
      if (!validateInput(elements.pickupSelect, state.touched.has(elements.pickupSelect))) isValid = false;
    }

    if (elements.submitBtn) elements.submitBtn.disabled = !isValid;
  }

  function handleInputBlur(e) {
    state.touched.add(e.target);
    validateInput(e.target, true);
    updateSubmitState();
  }

  function handleInputInput(e) {
    if (state.touched.has(e.target)) validateInput(e.target, true);
    updateSubmitState();
  }

  function attachEventListeners() {
    // Shipping method change
    elements.shippingInputs.forEach(radio => {
      radio.addEventListener("change", updateSummary);
    });

    // Form inputs
    if (elements.form) {
      const requiredInputs = elements.form.querySelectorAll("input[required]");
      requiredInputs.forEach(input => {
        input.addEventListener("blur", handleInputBlur);
        input.addEventListener("input", handleInputInput);
      });
    }

    // Pickup select
    if (elements.pickupSelect) {
      elements.pickupSelect.addEventListener("blur", handleInputBlur);
      elements.pickupSelect.addEventListener("change", handleInputInput);
    }

    // Submit button
    if (elements.submitBtn) {
      elements.submitBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Always prevent default first
        
        // Validate all fields
        const method = document.querySelector("input[name='shipping-method']:checked")?.value || "Ship";
        let allValid = true;
        
        if (method === "Ship") {
          const inputs = Array.from(elements.form.querySelectorAll("input[required]"));
          inputs.forEach(input => {
            state.touched.add(input);
            if (!validateInput(input, true)) allValid = false;
          });
        } else if (method === "Pickup") {
          state.touched.add(elements.pickupSelect);
          if (!validateInput(elements.pickupSelect, true)) allValid = false;
        }
        
        if (allValid && state.cart.length > 0) {
          // Clear cart on successful checkout
          localStorage.removeItem("cart");
          window.location.href = "store.html";
        }
      });
    }
  }
});