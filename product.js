// Get elements
const heartbox = document.getElementById('heart');
const heartIcon = document.getElementById('heart-outline');
const favText = document.getElementById('fav-button-text');
const addButton = document.getElementById("add-button-text");

// Popup elements
const back = document.getElementById("back");
const checkoutDiv = document.querySelector(".checkout");
const bagText = document.getElementById("bag-text");
const checkoutImg = document.getElementById("checkout-img");
const checkoutName = document.getElementById("checkout-name");
const checkoutType = document.getElementById("checkout-type");
const checkoutPrice = document.getElementById("checkout-price");
const checkoutSize = document.getElementById("checkout-size");
const goToCheckoutBtn = document.getElementById("checkout-button");
const closeCheckout = document.getElementById("x-button");
const bagButton = document.getElementById("bag-button");

// Get shoe ID from URL
const params = new URLSearchParams(window.location.search);
const shoeId = params.get("id");

// Find selected shoe
const shoe = shoesData.find(s => s.id === shoeId) || shoesData[0];

// ===============================
// Populate Main Shoe Details
// ===============================
document.querySelector(".left .shoe").src = shoe.img;
document.querySelector(".description .information:nth-child(1)").textContent = shoe.name;
document.querySelector(".description .information:nth-child(2)").textContent = shoe.type;
document.querySelector(".description .information:nth-child(3)").textContent = shoe.price;

// ===============================
// Generate Size Options Based on Gender
// ===============================
function generateSizeOptions() {
    const sizesBox = document.querySelector('.sizes-box');
    sizesBox.innerHTML = '';
    
    // Get the appropriate sizes based on shoe gender
    const sizes = getSizesForShoe(shoe);
    
    sizes.forEach((size, index) => {
        const sizeId = `size-${index + 1}`;
        
        const radioInput = document.createElement('input');
        radioInput.type = 'radio';
        radioInput.id = sizeId;
        radioInput.name = 'radio-size';
        radioInput.value = size;
        
        const sizeLabel = document.createElement('label');
        sizeLabel.className = 'sizes';
        sizeLabel.htmlFor = sizeId;
        sizeLabel.textContent = size;
        
        sizesBox.appendChild(radioInput);
        sizesBox.appendChild(sizeLabel);
    });
}

// Helper function to get sizes based on shoe object
function getSizesForShoe(shoe) {
    // Use gender property if available, otherwise fall back to category
    if (shoe.gender && sizeRanges[shoe.gender]) {
        return sizeRanges[shoe.gender];
    }
    return sizeRanges[shoe.category] || sizeRanges.men;
}

generateSizeOptions();

// ===============================
// Favorite Button Functionality
// ===============================
heartbox.addEventListener('change', () => {
  if (heartbox.checked) {
    favText.textContent = 'Favorited';
    heartIcon.textContent = 'favorite';
    
    // Add to favorites
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    // Check if already in favorites
    const alreadyInFavorites = favorites.some(fav => fav.id === shoe.id);
    
    if (!alreadyInFavorites) {
      favorites.push({
        id: shoe.id,
        name: shoe.name,
        type: shoe.type,
        price: shoe.price,
        img: shoe.img,
        category: shoe.category,
        url: `product.html?id=${shoe.id}`
      });
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
    
    // Show popup for favorites regardless of whether it was already there
    showPopup('favorite');
    
  } else {
    favText.textContent = 'Favorite';
    heartIcon.textContent = 'favorite';
    
    // Remove from favorites
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter(fav => fav.id !== shoe.id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
});

// ===============================
// Add to Bag Functionality
// ===============================
addButton.onclick = function () {
  const selectedSize = document.querySelector('input[name="radio-size"]:checked');
  const sizeBox = document.querySelector('.sizes-box');
  const sizeText = document.getElementById('size');
  const errorMessage = document.getElementById('size-error');
  
   // Reset any previous error states
  sizeBox.classList.remove('error');
  sizeText.classList.remove('error');
  errorMessage.style.display = 'none';
  
  if (!selectedSize) {
    // Show error instead of alert
    sizeBox.classList.add('error');
    sizeText.classList.add('error');
    errorMessage.textContent = 'Please select a size';
    errorMessage.style.display = 'block';
    
    // AUTO-SCROLL TO SIZES BOX
    const sizesSection = document.querySelector('.options-box');
    sizesSection.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'center' 
    });
    
    // Focus on the first size option for better accessibility
    document.getElementById('size-1').focus();
    return;
  }

  const cartItem = {
    id: shoe.id,
    name: shoe.name,
    type: shoe.type,
    price: shoe.price,
    size: selectedSize.value,
    img: shoe.img,
    category: shoe.category,
    url: `product.html?id=${shoe.id}`
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // check if same shoe + size already exists
  const existing = cart.find(item => item.id === shoe.id && item.size === selectedSize.value);

  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({
      ...cartItem,
      quantity: 1
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  // Show popup for bag
  showPopup('bag', selectedSize.value);
  updateBagCount();
};

// Clear error when a size is selected
document.querySelectorAll('input[name="radio-size"]').forEach(radio => {
  radio.addEventListener('change', function() {
    const sizeBox = document.querySelector('.sizes-box');
    const sizeText = document.getElementById('size');
    const errorMessage = document.getElementById('size-error');
    
    sizeBox.classList.remove('error');
    sizeText.classList.remove('error');
    errorMessage.style.display = 'none';
  });
});

// Function to scroll to popup
function scrollToPopup() {
    const popup = document.querySelector('.checkout');
    if (popup) {
        // First make sure the popup is visible
        popup.style.display = 'block';
        back.style.display = 'block';
        
        // Wait a brief moment for the DOM to update
        setTimeout(() => {
            popup.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center',
                inline: 'nearest'
            });
        }, 100);
    }
}

// ===============================
// Reusable Popup Function (UPDATED)
// ===============================
function showPopup(type, size = null) {
  if (type === 'bag') {
    bagText.innerHTML = '<span id="tick" class="fa-solid fa-circle-check"></span>Added to Bag <button id="x-button" class="material-symbols-outlined">close</button>';
    checkoutSize.textContent = "Size: " + size;
    checkoutSize.style.display = "block";
    
    // SHOW View Bag button for bag popup with item count
    bagButton.style.display = "block";
    
    // Get current cart count
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    
    // Update button text with item count
    bagButton.textContent = `View Bag (${totalItems})`;
    bagButton.onclick = function() {
        window.location.href = "bag.html";
    };
    
    // Reset button styling
    bagButton.style.backgroundColor = "";
    bagButton.style.color = "";
    
    // Show checkout button
    goToCheckoutBtn.style.display = "block";
    goToCheckoutBtn.textContent = "Checkout";
    goToCheckoutBtn.onclick = function() {
        window.location.href = "checkout.html";
    };
  } else if (type === 'favorite') {
    bagText.innerHTML = '<span id="tick" class="fa-solid fa-circle-check"></span>Added to Favorites <button id="x-button" class="material-symbols-outlined">close</button>';
    // Check if a size is selected and show it
    const selectedSize = document.querySelector('input[name="radio-size"]:checked');
    if (selectedSize) {
        checkoutSize.textContent = "Size: " + selectedSize.value;
        checkoutSize.style.display = "block";
    } else {
        checkoutSize.style.display = "none";
    } 
    bagButton.style.display = "none";
    // Update button text and action
    goToCheckoutBtn.style.display = "block";
    goToCheckoutBtn.textContent = "View Favorites";
    goToCheckoutBtn.onclick = function() {
      window.location.href = "favorites.html";
    };
    
    // Style the button with black background and white text
    goToCheckoutBtn.style.backgroundColor = "#000";
    goToCheckoutBtn.style.color = "#fff";
  }
  // Set common content
  checkoutImg.src = shoe.img;
  checkoutName.textContent = shoe.name;
  checkoutType.textContent = shoe.type;
  checkoutPrice.textContent = shoe.price;
  
  // Reattach the close button event listener
  const newCloseButton = document.getElementById("x-button");
  newCloseButton.onclick = function(e) {
    e.stopPropagation(); // Prevent event from bubbling to parent elements
    back.style.display = "none";
    checkoutDiv.style.display = "none";
  };
  
  // Show the popup
  back.style.display = "block";
  checkoutDiv.style.display = "block";
  
  // NEW: Auto-scroll to the popup
  scrollToPopup();
}

// ===============================
// Popup Controls
// ===============================
closeCheckout.onclick = function (e) {
  e.stopPropagation(); // Prevent event from bubbling to parent elements
  back.style.display = "none";
};

goToCheckoutBtn.onclick = function () {
  window.location.href = "checkout.html";
};

bagButton.onclick = function () {
  window.location.href = "bag.html";
};

back.onclick = function (e) {
  if (e.target === back) {
    back.style.display = "none";
    checkoutDiv.style.display = "none";
  }
};

// 🔥 Update bag count
function updateBagCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const bagCount = document.getElementById("bag-count");
    const bagButton = document.getElementById("bag-button");

    // Calculate total items including quantities
    const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    
    if (totalItems > 0) {
        bagCount.textContent = totalItems;
        bagCount.style.display = "inline-block";
        
        // Also update View Bag button text if it's visible
        if (bagButton && bagButton.style.display !== "none") {
            bagButton.textContent = `View Bag (${totalItems})`;
        }
    } else {
        bagCount.style.display = "none";
        if (bagButton && bagButton.style.display !== "none") {
            bagButton.textContent = "View Bag (0)";
        }
    }
}

// Update bag count when page loads
updateBagCount();

// ===============================
// "You Might Also Like"
// ===============================
const relatedContainer = document.querySelector(".photos-container");
relatedContainer.innerHTML = "";

// Pick shoes from same category (exclude current shoe)
const relatedShoes = shoesData
  .filter(s => s.category === shoe.category && s.id !== shoe.id)
  .sort(() => 0.5 - Math.random()) // shuffle
  .slice(0, 6);

relatedShoes.forEach(s => {
  const div = document.createElement("div");
  div.className = "photo-frame";
  div.innerHTML = `
    <a href="product.html?id=${s.id}">
      <img class="photo" src="${s.img}" alt="${s.name}">
    </a>    
    <p class="photo-info">${s.name}</p>
    <p class="photo-info" id="type">${s.type}</p>
    <p class="photo-info">${s.price}</p>
  `;
  relatedContainer.appendChild(div);
});

// Find selected shoe
const shoeTitle = shoesData.find(s => s.id === shoeId) || shoesData[0];

// 🔥 Update page title dynamically
document.title = `${shoeTitle.name}`;

// ===============================
// Sticky Add to Bag - Fixed Border Radius Transition
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-button-text");
  const addBtnContainer = document.querySelector(".add-btn-container");
  
  if (window.matchMedia("(max-width: 960px)").matches && addButton && addBtnContainer) {
    let isAtBottom = false;
    
    function checkButtonPosition() {
      const containerRect = addBtnContainer.getBoundingClientRect();
      const buttonRect = addButton.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate distances
      const containerBottom = containerRect.bottom;
      const buttonBottom = buttonRect.bottom;
      
      // Check if button is at the bottom of the viewport within the container
      const isButtonAtViewportBottom = buttonBottom >= viewportHeight - 10;
      const isContainerInView = containerRect.top < viewportHeight && containerBottom > 0;
      
      // If container is in view AND button is at viewport bottom
      if (isContainerInView && isButtonAtViewportBottom) {
        if (!isAtBottom) {
          // Button reached bottom - apply rounded styles
          addButton.style.borderRadius = "0px";
          addButton.style.width = "100%";
          addButton.style.left = "0";
          addButton.style.right = "0";
          isAtBottom = true;
        }
      } else {
        if (isAtBottom) {
          // Button not at bottom - apply flat styles
          addButton.style.borderRadius = "50px";
          addButton.style.width = "92%";
          addButton.style.left = "4%";
          addButton.style.right = "4%";
          isAtBottom = false;
        }
      }
    }
    
    // Throttle the scroll event
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(checkButtonPosition, 10);
    });
    
    // Initial check
    checkButtonPosition();
    
    // Re-check on resize
    window.addEventListener('resize', checkButtonPosition);
  }
});