// cart.js
document.addEventListener("DOMContentLoaded", () => {
  // --- Helpers for Local Storage ---
  function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // --- Bag Count ---
  function updateBagCount() {
    const bagCount = document.getElementById("bag-count");
    if (!bagCount) return;
    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    if (cart.length > 0) {
      bagCount.textContent = totalQty;
      bagCount.style.display = "inline-block";
    } else {
      bagCount.style.display = "none";
    }
  }

  // --- Summary (subtotal, shipping, total) ---
  function updateSummary({ subtotalEl, shippingEl, totalEl }, cart = null) {
    cart = cart || getCart();

    let subtotal = cart.reduce(
      (sum, item) =>
        sum + parseFloat(item.price.replace("$", "")) * (item.quantity || 1),
      0
    );

    let shippingCost = (subtotal > 0 && subtotal < 50) ? 50 : "Free";
    let total = (shippingCost === "Free") ? subtotal : subtotal + shippingCost;

    if (subtotalEl) subtotalEl.textContent = "$" + subtotal.toFixed(2);
    if (shippingEl) shippingEl.textContent = (shippingCost === "Free") ? "Free" : "$" + shippingCost.toFixed(2);
    if (totalEl) totalEl.textContent = "$" + total.toFixed(2);
  }

  // Expose globally
  window.cartUtils = { getCart, saveCart, updateBagCount, updateSummary };

  // Run bag count everywhere
  updateBagCount();
});
