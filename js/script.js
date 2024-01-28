// Define a string of uppercase letters for the animation
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Select the first h1 element in the document
const header = document.querySelector("h1");

// Check if the h1 element exists
if (header) {
    // Store the original HTML content of the header in a data attribute
    header.dataset.originalHtml = header.innerHTML;
    // Add a mouseover event listener to the header
    header.addEventListener("mouseover", function handleMouseOver() {
        // Initialize the iteration counter
        let iteration = 0;
        // Retrieve the original text from the data attribute
        const originalText = header.dataset.value;
        // Cancel any ongoing animation frame to avoid overlaps
        cancelAnimationFrame(header.animationFrame);
        // Start the animation
        animate(header, originalText, iteration);
    });
}

// Animation function
function animate(header, originalText, iteration) {
    // Update the text of the header with a mix of original and random letters
    header.innerText = originalText.split("").map((letter, index) => {
        return index < iteration ? originalText[index] : letters[Math.floor(Math.random() * letters.length)];
    }).join("");

    // Continue the animation if the iteration is not complete
    if (iteration < originalText.length) {
        iteration += 1 / 3;
        header.animationFrame = requestAnimationFrame(() => animate(header, originalText, iteration));
    } else {
        // Reset to the original HTML content when the animation is complete
        header.innerHTML = header.dataset.originalHtml;
    }
}

// Select the element with the ID 'blob'
const blob = document.getElementById("blob");
// Check if the blob element exists
if (blob) {
    // Add a pointermove event listener to the window
    window.addEventListener("pointermove", event => {
        // Get the clientX and clientY from the event (pointer's position)
        const { clientX, clientY } = event;
        // Update the position of the blob element to follow the pointer
        blob.style.left = `${clientX}px`;
        blob.style.top = `${clientY}px`;
    });
}

// Rotate the h2 tag with the mouse
document.addEventListener('mousemove', (event) => {
    const { clientX } = event;
    const screenWidth = window.innerWidth;
    const rotationDegree = 8;

    // Calculate rotation based on mouse position
    const rotation = ((clientX / screenWidth) - 0.5) * 2 * rotationDegree;

    // Apply rotation to all h2 elements
    const h2Elements = document.querySelectorAll('h2');
    h2Elements.forEach(h2 => {
        h2.style.transform = `rotateZ(${rotation}deg)`;
    });
});

// Cache the articles
const articles = document.querySelectorAll('main > article');
const menuItems = document.querySelectorAll('.menu-item');

// Current index of the displayed article
let currentIndex = 0;

// Function to show a specific article
function showArticle(index) {
    articles.forEach((article, idx) => {
        article.classList.remove('article-active');
        if (idx === index) {
            article.classList.add('article-active');
        }
    });
}

// Initialize the first article as active
showArticle(0); //

// Menu navigation
menuItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        showArticle(index); // Show the article corresponding to the clicked menu item
    });
});

// Update menu background pattern on hover
const menu = document.getElementById("menu");
menuItems.forEach((item, index) => {
    item.onmouseover = () => {
        menu.dataset.activeIndex = index; // Update the active index for the background pattern
    };
});

// Email obfuscation
function sendMail() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const body = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    window.location.href = `mailto:yvan@umbrellight.com?subject=Contact Form&body=${encodeURIComponent(body)}`;
}
