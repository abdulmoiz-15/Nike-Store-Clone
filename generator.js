const fs = require("fs");
const { JSDOM } = require("jsdom");

// Load the men.html file
const html = fs.readFileSync("men.html", "utf-8");
const dom = new JSDOM(html);
const document = dom.window.document;

// Select all shoe containers
const shoes = [...document.querySelectorAll(".photo")];

// Make output folder if not exists
if (!fs.existsSync("shoes")) {
  fs.mkdirSync("shoes");
}

// Slugify names into filenames
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "_");
}

// Pick consistent recommendations
function getConsistentRecommendations(allShoes, currentIndex, count = 3) {
  const recommendations = [];
  for (let i = 1; i <= count; i++) {
    const idx = (currentIndex + i) % allShoes.length;
    recommendations.push(allShoes[idx]);
  }
  return recommendations;
}

// Loop through shoes
shoes.forEach((shoe, index) => {
  const name = shoe.querySelector(".photo-info:nth-of-type(1)")?.textContent.trim() || `Shoe ${index}`;
  const type = shoe.querySelector("#type")?.textContent.trim() || "Unknown";
  const price = shoe.querySelector(".photo-info:nth-of-type(3)")?.textContent.trim() || "N/A";
  const img = shoe.querySelector("img")?.getAttribute("src") || "";

  const filename = slugify(name) + ".html";

  // Recommendations
  const recommendations = getConsistentRecommendations(shoes, index, 6)
    .map(rec => {
      const rName = rec.querySelector(".photo-info:nth-of-type(1)")?.textContent.trim() || "Unknown";
      const rType = rec.querySelector("#type")?.textContent.trim() || "Unknown";
      const rPrice = rec.querySelector(".photo-info:nth-of-type(3)")?.textContent.trim() || "N/A";
      const rImg = rec.querySelector("img")?.getAttribute("src") || "";
      const rFile = slugify(rName) + ".html";

      return `
        <div class="photo-frame">
          <a href="${rFile}"><img class="photo" src="../${rImg}"></a>
          <p class="photo-info">${rName}</p>
          <p class="photo-info" id="type">${rType}</p>
          <p class="photo-info">${rPrice}</p>
        </div>
      `;
    })
    .join("");

  // Full HTML for each shoe page
  const shoeHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}</title>
    <link rel="stylesheet" href="../shoe.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=favorite" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=stat_minus_1" />
    <script src="https://kit.fontawesome.com/2875ca2ccc.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,300,0,0&icon_names=page_info" />
</head>
<body>
    <header>
        <label for="barsbox" id="bars-label" class="fa-solid fa-bars"></label>
        <input type="checkbox" id="barsbox">
        <label for="barsbox" id="overlay"></label>
        <div id="dropdown">
            <label for="barsbox" id="xbutton" class="fa-solid fa-xmark"></label>
            <br><br>
            <a class="drop-elements" href="../men.html">Men</a>
            <a class="drop-elements" href="../women.html">Women</a>
            <a class="drop-elements" href="../kids.html">Kids</a>
            <a class="drop-elements" href="../jordan.html">Jordan</a>
            <a class="drop-elements" href="../sports.html">Sport</a>
        </div>

        <a href="../store.html"><i class="fa-regular fa-house" ></i></a>
        <a href="../login.html"><i class="fa-regular fa-user" ></i></a>
        <a href="../amogus.html"><img src="../NIKE.png" id="logo" width="45"></a>
        <div id="catagories-box">
            <a class="catagories" href="../men.html">Men</a>
            <a class="catagories" href="../women.html">Women</a>
            <a class="catagories" href="../kids.html">Kids</a>
            <a class="catagories" href="../jordan.html">Jordan</a>
            <a class="catagories" href="../sports.html">Sport</a>
        </div>
    </header>
<main>
<div class="container">
    <div class="left">
        <img src="../${img}" class="shoe">
    </div>
    <div class="right">
        <div class="description">
            <ul>
                <li class="information">${name}</li>
                <li class="information">${type}</li>
                <li class="information">${price}</li>
            </ul>
        </div>    
        <div class="options-box">
            <p id="size" style="font-size: large;">Select Size</p>
            <div class="sizes-box">
                ${[...Array(10).keys()].map(i => {
                  const size = i + 1;
                  return `<input type="radio" id="${size}" name="radio-size">
                          <label class="sizes" for="${size}">${size}</label>`;
                }).join("")}
            </div>
            <br><br><br>
            <div class="buttons-box">
                <div class="buttons" id="add-button">
                    <div class="button-text">Add to Bag</div>
                </div>
                <label for="heart"> 
                    <div class="buttons" id="fav-button">     
                        <div class="button-text">
                            <input type="checkbox" id="heart">
                            <div id="heart-icon-text" class="fa-regular fa-heart">
                                <div id="heart-icon" class="fa-regular fa-heart"></div>
                            </div>                       
                        </div>
                    </div> 
                </label>
            </div>
            <br>
            <div class="text-after-buttons">
                <p style="font-size: large;"><b>Shipping</b><br>You'll see our shipping options at checkout.</p>    
                <br>
                <details style="font-size: large;">
                    <summary class="shipping">Shipping & Returns
                        <span id="arrow-down" class="material-symbols-outlined">stat_minus_1</span>
                    </summary><br>
                    Free standard shipping on orders $50+ and free 60-day returns for Nike Members. <u>Learn more. Return policy exclusions apply.</u>
                </details>             
            </div>
        </div>
    </div>
</div>    
</main>
<br><br>
<footer>
    <div id="text">You Might Also Like</div>
    <div class="photos-container">         
        ${recommendations}
    </div>
    <br><br><br>
    <hr>
    <br>
    <div id="footer-text">
        <p>© 2025 Nike, Inc. All Rights Reserved</p>
        <p>Terms of Sale</p> 
        <p>Terms of Use</p> 
        <p>Nike Privacy Policy</p> 
        <p>Your Privacy Choices</p> 
        <p>CA Supply Chains Act</p>
    </div>
</footer>
</body>
</html>
  `;

  fs.writeFileSync(`shoes/${filename}`, shoeHTML, "utf-8");
  console.log(`✅ Generated: shoes/${filename}`);
});

console.log("🎉 All shoe pages generated with full HTML layout!");
