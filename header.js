// header.js
document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu-button");
    const close = document.getElementById("close-button");
    const dropdown = document.getElementById("dropdown");
    const overlay = document.getElementById("overlay");
    const overlay2 = document.getElementById("overlay2");
    const filtersDetails = document.querySelector("details");

    if (!menu || !dropdown || !overlay) return;

    function openDropdown() {
        dropdown.classList.remove('slide-out');
        dropdown.classList.add('slide-in');
        dropdown.style.display = "block";
        overlay.style.display = "block";
        document.body.classList.add('menu-open');
    }

    function closeDropdown() {
        dropdown.classList.remove('slide-in');
        dropdown.classList.add('slide-out');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            if (dropdown.classList.contains('slide-out')) {
                dropdown.style.display = "none";
                overlay.style.display = "none";
                document.body.classList.remove('menu-open');
            }
        }, 200); // Match this to your animation duration
    }

    if (filtersDetails) {
        filtersDetails.addEventListener("toggle", function() {
            if (this.open) {
                overlay2.style.display = "block";
            } else {
                overlay2.style.display = "none";
            }
        });
    }
    if (overlay2) {
        overlay2.addEventListener("click", function() {
            if (filtersDetails) {
                filtersDetails.open = false;
                overlay2.style.display = "none";
            }
        });
    }
    
    menu.addEventListener("click", openDropdown);
    close.addEventListener("click", closeDropdown);
    overlay.addEventListener("click", closeDropdown);

    document.addEventListener("click", (e) => {
        if (dropdown.style.display === "block" && 
            !dropdown.contains(e.target) && 
            e.target !== menu) {
            closeDropdown();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && dropdown.style.display === "block") {
            closeDropdown();
        }
    });

    // Update bag count
    const bagCount = document.getElementById("bag-count");
    if (bagCount) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        bagCount.textContent = totalItems;
        bagCount.style.display = totalItems > 0 ? "inline-block" : "none";
    }
    // Scroll detection for header behavior
    let lastScrollY = window.scrollY;
    const header = document.querySelector('header');
    let ticking = false;

    function updateHeader() {
        if (window.scrollY > lastScrollY) {
            // Scrolling down - hide header
            header.classList.add('hidden');
        } else {
            // Scrolling up - show header
            header.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);
});