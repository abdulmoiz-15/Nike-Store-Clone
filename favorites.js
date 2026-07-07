// favorites.js
document.addEventListener("DOMContentLoaded", () => {
    // Ensure shoesData is available
    const shoesData = window.shoesData || [];

    // Function to check if a shoe is in the cart
    function isShoeInCart(shoeId) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        return cart.some(item => item.id === shoeId);
    }

    // Function to update all Add to Bag button states
    function updateAddToBagButtonStates() {
        const addToBagButtons = document.querySelectorAll(".add-to-bag-btn");
        
        addToBagButtons.forEach(button => {
            const shoeId = button.getAttribute("data-id");
            const isInCart = isShoeInCart(shoeId);
            
            if (isInCart) {
                button.innerHTML = `<span id="tick" class="fa-solid fa-circle-check"></span> Added`;
                button.disabled = true;
                button.style.cursor = "default";
                
                // Make sure the checkmark is visible
                const tickIcon = button.querySelector("#tick");
                if (tickIcon) {
                    tickIcon.style.display = "inline-block";
                }
            }
        });
    }

    // Dropdown menu functionality
    const menuButton = document.getElementById("menu-button");
    const closeButton = document.getElementById("close-button");
    const dropdown = document.getElementById("dropdown");
    const overlay = document.getElementById("overlay");

    function openDropdown() {
        if (dropdown && overlay) {
            dropdown.style.display = "block";
            overlay.style.display = "block";
            document.body.style.overflow = "hidden";
        }
    }

    function closeDropdown() {
        if (dropdown && overlay) {
            dropdown.style.display = "none";
            overlay.style.display = "none";
            document.body.style.overflow = "";
        }
    }

    if (menuButton && closeButton && dropdown && overlay) {
        menuButton.addEventListener("click", openDropdown);
        closeButton.addEventListener("click", closeDropdown);
        overlay.addEventListener("click", closeDropdown);

        // Close dropdown when clicking outside
        document.addEventListener("click", (e) => {
            if (dropdown.style.display === "block" && 
                !dropdown.contains(e.target) && 
                e.target !== menuButton) {
                closeDropdown();
            }
        });

        // Close dropdown on escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && dropdown.style.display === "block") {
                closeDropdown();
            }
        });
    }

    const container = document.querySelector(".container");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    // Update bag count
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const bagCount = document.getElementById("bag-count");
    if (bagCount) {
        const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        bagCount.textContent = totalItems;
        bagCount.style.display = totalItems > 0 ? "inline-block" : "none";
    }
    
    // Display favorites
    if (container) {
        if (favorites.length === 0) {
            container.innerHTML = `
                <div class="empty-favorites">
                    <p>You haven't added any favorites yet</p>
                    <a href="store.html" class="browse-button">Browse Shoes</a>
                </div>
            `;
        } else {
            favorites.forEach(shoe => {
                const isInCart = isShoeInCart(shoe.id);
                const buttonText = isInCart ? "Added" : "Add to Bag";
                const buttonDisabled = isInCart ? "disabled" : "";
                const tickDisplay = isInCart ? "inline-block" : "none";
                
                const shoeElement = document.createElement("div");
                shoeElement.className = "favorite-item";
                shoeElement.setAttribute("data-id", shoe.id);
                shoeElement.innerHTML = `
                    <div class="photo-box">
                        <a href="product.html?id=${shoe.id}" class="favorite-link">
                            <img src="${shoe.img}" alt="${shoe.name}" class="favorite-image">
                        </a>
                        <button class="remove-favorite" data-id="${shoe.id}">
                            <span class="material-symbols-outlined">favorite</span>
                        </button>
                    </div>
                    <div class="name-price-row">
                        <p class="favorite-name">${shoe.name}</p>
                        <p class="favorite-price">${shoe.price}</p>
                    </div>
                    <p class="favorite-type">${shoe.type}</p>
                    <button class="add-to-bag-btn" data-id="${shoe.id}" ${buttonDisabled}>
                        <span id="tick" class="fa-solid fa-circle-check" style="display: ${tickDisplay};"></span>
                        ${buttonText}
                    </button>
                `;
                container.appendChild(shoeElement);
            });
        }
    }
    
    // Get all Add to Bag buttons after they're created
    const addToBagButtons = document.querySelectorAll(".add-to-bag-btn");
    
    // Add remove functionality (heart button)
    let pendingRemovals = new Map();

    // Add event listeners for remove buttons (delegated event handling)
    document.addEventListener("click", (e) => {
        if (e.target.closest(".remove-favorite")) {
            const button = e.target.closest(".remove-favorite");
            e.preventDefault();
            const shoeId = button.getAttribute("data-id");
            const shoeElement = button.closest(".favorite-item");
            const shoe = favorites.find(s => s.id === shoeId);
            
            if (shoe) {
                pendingRemovals.set(shoeId, {
                    shoe: shoe,
                    element: shoeElement,
                    originalHTML: shoeElement.innerHTML,
                    originalIndex: Array.from(container.children).indexOf(shoeElement)
                });
                
                showRemovedNotification(shoe.name, shoeId);
                shoeElement.classList.add("removing");
            }
        }
    });
    
    // Size Selection Modal functionality
    const sizeModal = document.getElementById("sizeModal");
    const modalShoeImage = document.getElementById("modalShoeImage");
    const modalShoeName = document.getElementById("modalShoeName");
    const modalShoeType = document.getElementById("modalShoeType");
    const modalShoePrice = document.getElementById("modalShoePrice");
    const sizeOptions = document.getElementById("sizeOptions");
    const confirmButton = document.getElementById("confirmSize");
    const closeModal = document.querySelector(".close-modal");

    let selectedShoe = null;
    let selectedSize = null;

    // Add the confirm button event listener right here
    if (confirmButton) {
        confirmButton.addEventListener("click", () => {
            if (selectedShoe && selectedSize) {
                // Add to cart with selected size
                addToCartWithSize(selectedShoe, selectedSize);
                
                // Find the corresponding Add to Bag button and update it
                const shoeId = selectedShoe.id;
                const addButton = document.querySelector(`.add-to-bag-btn[data-id="${shoeId}"]`);
                
                if (addButton) {
                    // Update the button to show "Added" with checkmark
                    addButton.innerHTML = `<span id="tick" class="fa-solid fa-circle-check"></span> Added`;
                    addButton.disabled = true;
                    addButton.style.cursor = "default";
                    
                    // Make sure the checkmark is visible
                    const tickIcon = addButton.querySelector("#tick");
                    if (tickIcon) {
                        tickIcon.style.display = "inline-block";
                    }
                }
                
                closeSizeModal();
            }
        });
    }

    const viewProductLink = document.getElementById("viewProductLink");

    // Function to handle view product link click
    function setupViewProductLink(shoe) {
        if (viewProductLink) {
            viewProductLink.onclick = function(e) {
                e.preventDefault();
                closeSizeModal();
                window.location.href = `product.html?id=${shoe.id}`;
            };
        }
    }

   function openSizeModal(shoe) {
        selectedShoe = shoe;
        selectedSize = null;
        
        if (modalShoeImage && modalShoeName && modalShoeType && modalShoePrice) {
            modalShoeImage.src = shoe.img;
            modalShoeImage.alt = shoe.name;
            modalShoeName.textContent = shoe.name;
            modalShoeType.textContent = shoe.type;
            modalShoePrice.textContent = shoe.price;
        }
        
        setupViewProductLink(shoe);
        generateSizeOptions(shoe);
        
        if (confirmButton) confirmButton.disabled = true;
        if (sizeModal) sizeModal.classList.add("show");
        document.body.style.overflow = "hidden";
        
        // Show size error immediately when modal opens
        const errorMessage = document.getElementById("size-error");
        const sizeOptionsContainer = document.getElementById("sizeOptions");
        
        if (errorMessage && sizeOptionsContainer) {
            errorMessage.textContent = 'Please select a size';
            errorMessage.style.display = 'block';
            sizeOptionsContainer.classList.add('error'); // Add error class to size-options
            
            // Auto-scroll to size options
            const sizeSelection = document.querySelector('.size-selection');
            if (sizeSelection) {
                sizeSelection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
            
            // Focus on the first available size option
            const firstAvailableSize = document.querySelector('.size-option:not(.unavailable)');
            if (firstAvailableSize) {
                firstAvailableSize.focus();
            }
        }
        
        setTimeout(() => {
            const modalContent = document.querySelector('.modal-content');
            if (modalContent) modalContent.style.transform = "translateY(0)";
        }, 10);
    }

    // Function to generate size options based on shoe gender
    function generateSizeOptions(shoe) {
        if (!sizeOptions) return;
        
        sizeOptions.innerHTML = "";
        
        const sizes = getSizesForShoe(shoe);
        
        // Mark some sizes as unavailable randomly (for demo)
        sizes.forEach(size => {
            const isAvailable = Math.random() > 0.2; // 80% chance of being available
            
            const sizeOption = document.createElement("div");
            sizeOption.className = `size-option ${isAvailable ? "" : "unavailable"}`;
            sizeOption.textContent = size;
            sizeOption.setAttribute("data-size", size);
            
            if (isAvailable) {
                sizeOption.addEventListener("click", () => selectSize(size, sizeOption));
            }
            
            sizeOptions.appendChild(sizeOption);
        });
    }

   // Function to handle size selection
    function selectSize(size, element) {
        selectedSize = size;
        
        // Remove selected class from all options
        document.querySelectorAll(".size-option").forEach(option => {
            option.classList.remove("selected");
        });
        
        // Add selected class to clicked option
        element.classList.add("selected");
        
        // Enable confirm button
        if (confirmButton) confirmButton.disabled = false;
        
        // Clear error message and remove error class when a size is selected
        const errorMessage = document.getElementById("size-error");
        const sizeOptionsContainer = document.getElementById("sizeOptions");
        
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
        
        if (sizeOptionsContainer) {
            sizeOptionsContainer.classList.remove('error');
        }
    }

    // Function to close modal
    function closeSizeModal() {
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) modalContent.style.transform = "translateY(100%)";
        
        // Wait for the slide-down animation to complete before hiding
        setTimeout(() => {
            if (sizeModal) sizeModal.classList.remove("show");
            document.body.style.overflow = "";
            selectedShoe = null;
            selectedSize = null;
        }, 300);
    }

    // Event listeners for modal
    if (closeModal) {
        closeModal.addEventListener("click", closeSizeModal);
    }

    if (sizeModal) {
        sizeModal.addEventListener("click", (e) => {
            if (e.target === sizeModal) {
                closeSizeModal();
            }
        });
    }

    // Function to add to cart with size
    function addToCartWithSize(shoe, size) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingItemIndex = cart.findIndex(item => item.id === shoe.id && item.size === size);
        
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
        } else {
            cart.push({
                ...shoe,
                quantity: 1,
                size: size
            });
        }
        
        localStorage.setItem("cart", JSON.stringify(cart));
        updateBagCount();
        updateAddToBagButtonStates(); // Update button states after adding to cart
    }

    // Confirm button with button state update
    if (confirmButton) {
        confirmButton.addEventListener("click", () => {
            if (!selectedSize) {
                // Show size error
                const errorMessage = document.getElementById("size-error");
                if (errorMessage) {
                    errorMessage.textContent = 'Please select a size';
                    errorMessage.style.display = 'block';
                    
                    // Auto-scroll to size options
                    const sizeSelection = document.querySelector('.size-selection');
                    if (sizeSelection) {
                        sizeSelection.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }
                    
                    // Focus on the first available size option
                    const firstAvailableSize = document.querySelector('.size-option:not(.unavailable)');
                    if (firstAvailableSize) {
                        firstAvailableSize.focus();
                    }
                }
                return;
            }
            
            if (selectedShoe && selectedSize) {
                // Add to cart with selected size
                addToCartWithSize(selectedShoe, selectedSize);
                
                // Find the corresponding Add to Bag button and update it
                const shoeId = selectedShoe.id;
                const addButton = document.querySelector(`.add-to-bag-btn[data-id="${shoeId}"]`);
                
                if (addButton) {
                    // Update the button to show "Added" with checkmark
                    addButton.innerHTML = `<span id="tick" class="fa-solid fa-circle-check"></span> Added`;
                    addButton.disabled = true;
                    addButton.style.cursor = "default";
                    
                    // Make sure the checkmark is visible
                    const tickIcon = addButton.querySelector("#tick");
                    if (tickIcon) {
                        tickIcon.style.display = "inline-block";
                    }
                }
                
                closeSizeModal();
            }
        });
    }

    // Add to Bag button click handler - opens size modal instead of directly adding to cart
    addToBagButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const shoeId = button.getAttribute("data-id");
            const shoe = favorites.find(s => s.id === shoeId);
            
            if (shoe) {
                // Open size selection modal instead of directly adding to cart
                openSizeModal(shoe);
            }
        });
    });
    
    // You Might Also Like Section
    function displayRecommendedShoes(shoesData) {
        const relatedContainer = document.querySelector(".photos-container");
        if (!relatedContainer) return;
        
        relatedContainer.innerHTML = "";
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const favoriteItemIds = favorites.map(item => item.id);
        let recommendedShoes = [];

        // Make sure shoesData is available and is an array
        if (!shoesData || !Array.isArray(shoesData)) {
            console.error("shoesData is not available");
            return;
        }

        if (favorites.length === 0) {
            recommendedShoes = shoesData.sort(() => 0.5 - Math.random()).slice(0, 8);
        } else {
            const favoriteCategories = [...new Set(favorites.map(item => item.category))];
            
            favoriteCategories.slice(0, 4).forEach(category => {
                const categoryShoes = shoesData
                    .filter(s => s.category === category && !favoriteItemIds.includes(s.id))
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 2);
                recommendedShoes.push(...categoryShoes);
            });

            if (recommendedShoes.length < 8) {
                const extraShoes = shoesData
                    .filter(s => !recommendedShoes.includes(s) && !favoriteItemIds.includes(s.id))
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 8 - recommendedShoes.length);
                recommendedShoes.push(...extraShoes);
            }
        }

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

    // Display recommended shoes
    displayRecommendedShoes(shoesData);
   
    function showRemovedNotification(shoeName, shoeId) {
        const notification = document.createElement("div");
        notification.className = "removed-notification";
        notification.setAttribute("data-shoe-id", shoeId);
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-text">Removed from Favorites</span>
                <button class="undo-btn">Undo</button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-100px);
            background: white;
            color: #000;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            transition: transform 0.5s ease;
            min-width: 300px;
            text-align: center;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = "translateX(-50%) translateY(0)";
        }, 100);
        
        const autoRemove = setTimeout(() => {
            if (pendingRemovals.has(shoeId)) {
                const removalData = pendingRemovals.get(shoeId);
                completeRemoval(shoeId, removalData.element);
                pendingRemovals.delete(shoeId);
            }
            removeNotification(notification);
        }, 3000);
        
        const undoBtn = notification.querySelector(".undo-btn");
        undoBtn.addEventListener("click", () => {
            clearTimeout(autoRemove);
            if (pendingRemovals.has(shoeId)) {
                const removalData = pendingRemovals.get(shoeId);
                removalData.element.classList.remove("removing");
                removalData.element.style.transform = "";
                removalData.element.style.opacity = "";
                pendingRemovals.delete(shoeId);
            }
            removeNotification(notification);
        });
    }

    function removeNotification(notification) {
        notification.style.transform = "translateX(-50%) translateY(-100px)";
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }
    
    function completeRemoval(shoeId, shoeElement) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        
        shoeElement.style.transform = "translateX(-100%)";
        shoeElement.style.opacity = "0";
        shoeElement.style.transition = "transform 0.5s ease, opacity 0.5s ease";
        
        setTimeout(() => {
            favorites = favorites.filter(shoe => shoe.id !== shoeId);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            
            if (shoeElement.parentNode) {
                shoeElement.parentNode.removeChild(shoeElement);
            }
            
            if (favorites.length === 0 && container) {
                container.innerHTML = `
                    <div class="empty-favorites">
                        <p>You haven't added any favorites yet</p>
                        <a href="store.html" class="browse-button">Browse Shoes</a>
                    </div>
                `;
            }
        }, 500);
    }
    
    function updateBagCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const bagCount = document.getElementById("bag-count");
        if (bagCount) {
            const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
            bagCount.textContent = totalItems;
            bagCount.style.display = totalItems > 0 ? "inline-block" : "none";
        }
    }
    
    // Update button states on page load
    updateAddToBagButtonStates();
});