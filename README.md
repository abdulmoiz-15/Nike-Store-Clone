# Nike Store Clone
A responsive e-commerce website clone inspired by Nike's online store, built with 
**HTML5, CSS3, JavaScript, and IndexedDB**. This project focuses on client-side 
product browsing, cart management, and persistent local data storage — no backend required.

**Live Demo:** https://nikestoreclone.site.je

## Features
- Responsive layout that adapts across devices
- Dynamic product rendering
- Shopping cart with add/remove/update functionality
- Persistent client-side data storage using IndexedDB (cart data survives page reloads)
- Real-world e-commerce UI/UX practices

## Tech Stack
- **HTML5** – structure
- **CSS3** – styling and responsive layouts
- **JavaScript** – dynamic rendering and cart logic
- **IndexedDB** – client-side persistent storage

## Why This Project
Built to strengthen understanding of responsive web design, vanilla JavaScript, 
and browser storage APIs by replicating real-world e-commerce functionality.

## Setup Instructions

1. **Clone the repository**
```bash
   git clone https://github.com/your-username/nike-store-clone.git
```

2. **Add HTML files and additional images**
   - Download all files from the `html+additional-imgs` branch of this repository.
   - Place them directly in the **main project directory** (not in a separate folder).

3. **Add CSS files**
   - Download all CSS files from the `css` branch of this repository.
   - Place them directly in the **main project directory** (do NOT create a separate `css` folder).
   - If you'd prefer to put them in a `css` folder instead, you can — just make sure to update the CSS file paths in each HTML file accordingly (e.g. `<link rel="stylesheet" href="css/style.css">` instead of `href="style.css"`).

4. **Add JS files**
   - Download all JavaScript files from the `js` branch of this repository.
   - Place them directly in the **main project directory** (do NOT create a separate `js` folder).
   - If you'd prefer to put them in a `js` folder instead, you can — just make sure to update the script paths in each HTML file accordingly (e.g. `<script src="js/script.js"></script>` instead of `src="script.js"`).

5. **Organize product images into folders**
   - Create 6 folders in the project directory, named exactly:
     - `kids`
     - `men`
     - `women`
     - `jordan`
     - `sports`
     - `posters`
   - Place each product image into its matching category folder.
   - **Do not** put the images that are in the **main branch** of this repository into any of these folders — those are separate from the category images.
   - If you move images into these folders, update the image paths in the HTML code accordingly (e.g. `src="kids/shoe1.jpg"` instead of the original path).

6. **Open the project**
   - Simply open `index.html` in your browser.
   - No server or build step required — it's a pure front-end project.

## Requirements
- A modern web browser (Chrome, Firefox, Edge) with IndexedDB support
