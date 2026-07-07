// bag.js
document.addEventListener("DOMContentLoaded", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const cartContainer = document.getElementById("cart-items");
    const bagCount = document.getElementById("bag-count");
    const subtotalEl = document.getElementById("subtotal");
    const shippingEl = document.getElementById("shipping");
    const totalEl = document.getElementById("total");

    // Render cart items
    function renderCart() {
        cartContainer.innerHTML = "";
        let subtotal = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p class='empty-cart'>Your bag is empty</p>";
            updateSummary(0);
            return;
        }

        cart.forEach((item, index) => {
            const quantity = item.quantity || 1;
            const price = parseFloat(item.price.replace("$", ""));
            const itemTotal = price * quantity;
            subtotal += itemTotal;

            const isFavorite = favorites.some(fav => fav.id === item.id);

            const div = document.createElement("div");
            div.className = "cart-item";
            div.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="shoe">
                <div class="description">
                    <p id="item-name">${item.name}</p>
                    <p id="item-price">${item.price}</p>
                    <p id="item-type">${item.type}</p>
                    <p>Size: ${item.size}</p>
                </div>
                <div class="cart-controls">
                    <button class="delete-btn material-symbols-outlined">delete</button>
                    <button class="minus-btn material-symbols-outlined">remove</button>
                    <span class="quantity">${quantity}</span>
                    <button class="plus-btn material-symbols-outlined">add</button>
                </div>
                <label id="fav-button" class="buttons">
                    <input type="checkbox" class="heart" ${isFavorite ? 'checked' : ''}>
                    <span id="heart-outline" class="material-symbols-outlined">favorite</span>
                </label>
            `;
            
            cartContainer.appendChild(div);
            setupQuantityControls(div, item, index);
            setupFavoriteButton(div, item);
        });

        updateSummary(subtotal);
    }

    // Set up quantity controls for an item
    function setupQuantityControls(container, item, index) {
        const deleteBtn = container.querySelector('.delete-btn');
        const minusBtn = container.querySelector('.minus-btn');
        const plusBtn = container.querySelector('.plus-btn');
        const quantitySpan = container.querySelector('.quantity');
        
        let quantity = item.quantity || 1;
        
        minusBtn.style.display = quantity > 1 ? 'inline-block' : 'none';
        deleteBtn.style.display = quantity === 1 ? 'inline-block' : 'none';

        plusBtn.addEventListener('click', () => updateQuantity(1));
        minusBtn.addEventListener('click', () => updateQuantity(-1));
        deleteBtn.addEventListener('click', removeItem);

        function updateQuantity(change) {
            quantity += change;
            if (quantity < 1) return removeItem();
            
            quantitySpan.textContent = quantity;
            minusBtn.style.display = quantity > 1 ? 'inline-block' : 'none';
            deleteBtn.style.display = quantity === 1 ? 'inline-block' : 'none';
            
            item.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateBagCount();
            renderCart();
        }

        function removeItem() {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
            updateBagCount();
        }
    }

    // Set up favorite button for an item
    function setupFavoriteButton(container, item) {
        const heartCheckbox = container.querySelector('.heart');
        const heartOutline = container.querySelector('#heart-outline');
        
        // Update heart icon based on checked state
        function updateHeartIcon() {
            if (heartCheckbox.checked) {
                heartOutline.style.fontVariationSettings = "'FILL' 1";
            } else {
                heartOutline.style.fontVariationSettings = "'FILL' 0";
            }
        }
        
        // Initialize heart icon
        updateHeartIcon();
        
        // Add event listener to heart checkbox
        heartCheckbox.addEventListener('change', () => {
            heartOutline.classList.add(`animate-heart`);
            updateHeartIcon();
            
            let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
            
            if (heartCheckbox.checked) {
                // Add to favorites if not already there
                if (!favorites.some(fav => fav.id === item.id)) {
                    const { quantity, ...favoriteItem } = item;
                    favorites.push(favoriteItem);
                    localStorage.setItem('favorites', JSON.stringify(favorites));
                    showFavoriteNotification(`${item.name} added to favorites!`);
                }
            } else {
                // Remove from favorites
                favorites = favorites.filter(fav => fav.id !== item.id);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                showFavoriteNotification(`${item.name} removed from favorites!`);
            }

            setTimeout(() => {
                heartOutline.classList.remove(`animate-heart`);
            }, 300);
        });
    }

    // Show favorite notification
    function showFavoriteNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'favorite-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #000;
            color: #fff;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1000;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Animate out and remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Update bag count
    function updateBagCount() {
        if (!bagCount) return;
        const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        bagCount.textContent = totalItems;
        bagCount.style.display = totalItems > 0 ? "inline-block" : "none";
    }

    // Update summary section
    function updateSummary(subtotal) {
        if (subtotalEl) subtotalEl.textContent = "$" + subtotal.toFixed(2);
        
        const shippingCost = subtotal > 0 && subtotal < 50 ? 50 : 0;
        if (shippingEl) shippingEl.textContent = shippingCost === 0 ? "Free" : "$" + shippingCost.toFixed(2);
        
        if (totalEl) totalEl.textContent = "$" + (subtotal + shippingCost).toFixed(2);
    }

    // Initialize
    renderCart();
    updateBagCount();

    // ===============================
    // "You Might Also Like" 
    // ===============================
    const relatedContainer = document.querySelector(".photos-container");
    if (relatedContainer) {
        relatedContainer.innerHTML = "";

        // Get cart items
        const cartItemIds = cart.map(item => item.id);

        let recommendedShoes = [];

        if (cart.length === 0) {
            // If bag is empty: 8 random shoes from any category
            recommendedShoes = shoesData
                .sort(() => 0.5 - Math.random())
                .slice(0, 8);
        } else {
            // If bag has items: recommendations based on cart
            // Get categories from cart items
            const cartCategories = [...new Set(cart.map(item => item.category))];
            
            // Get 2 shoes from 4 different cart categories (8 total)
            cartCategories.slice(0, 4).forEach(category => {
                const categoryShoes = shoesData
                    .filter(s => s.category === category && !cartItemIds.includes(s.id))
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 2);
                
                recommendedShoes.push(...categoryShoes);
            });

            // If not enough recommendations, fill with random shoes
            if (recommendedShoes.length < 8) {
                const extraShoes = shoesData
                    .filter(s => !recommendedShoes.includes(s) && !cartItemIds.includes(s.id))
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 8 - recommendedShoes.length);
                
                recommendedShoes.push(...extraShoes);
            }
        }

        // Display the recommendations
        recommendedShoes.forEach(s => {
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
    }
});