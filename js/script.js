// Define a string of uppercase letters for the animation
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

document.addEventListener("DOMContentLoaded", () => {
    // Select the first h1 element in the document
    const header = document.querySelector("h1");

    // Check if the h1 element exists
    if (header) {
        // Store the original HTML content of the header in a data attribute
        header.dataset.originalHtml = header.innerHTML;
        // Add a mouseover event listener to the header
        header.addEventListener("mouseover", handleMouseOver);
    }
});

function handleMouseOver() {
    // Initialize the iteration counter
    let iteration = 0;
    // Reference to the header element (the context of the event)
    const header = this;
    // Retrieve the original text from the data attribute
    const originalText = header.dataset.value;
    // Cancel any ongoing animation frame to avoid overlaps
    cancelAnimationFrame(header.animationFrame);

    // Define the animation function
    function animate() {
        // Update the text of the header with a mix of original and random letters
        header.innerText = originalText.split("").map((letter, index) => {
            return index < iteration ? originalText[index] : letters[Math.floor(Math.random() * letters.length)];
        }).join("");

        // Continue the animation if the iteration is not complete
        if (iteration < originalText.length) {
            iteration += 1 / 3;
            header.animationFrame = requestAnimationFrame(animate);
        } else {
            // Reset to the original HTML content when the animation is complete
            header.innerHTML = header.dataset.originalHtml;
        }
    }

    // Start the animation
    header.animationFrame = requestAnimationFrame(animate);
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

// Reload the page when the window is resized
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        window.location.reload();
    }, 250);
});

//////////////////////////////
//////////////////////////////
// Cache the articles
const articles = document.querySelectorAll('main > article');
const totalArticles = articles.length;

// Current index of the displayed article
let currentIndex = 0;

// Function to show a specific article
function showArticle(index) {
    articles.forEach((article, idx) => {
        article.style.display = idx === index ? 'block' : 'none'; // Show only the selected article
    });
    currentIndex = index; // Update the current index
}

// Initialize the first article as active
showArticle(currentIndex);

// Menu navigation
const menuItems = document.querySelectorAll('.menu-item');
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
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    var body = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    window.location.href = `mailto:yvan@umbrellight.com?subject=Contact Form&body=${encodeURIComponent(body)}`;
}


/*
// Cache the articles and total number of articles
const articles = document.querySelectorAll('main > article');
const totalArticles = articles.length;

// Function to show a specific article with sliding effect
function showArticle(index, direction) {
    articles.forEach((article, idx) => {
        article.classList.remove('active', 'slide-in-left', 'slide-in-right');
        if (idx === index) {
            article.classList.add('active');
            article.setAttribute('data-status', 'active');
        } else {
            article.setAttribute('data-status', 'inactive');
            if (direction === 'left') {
                article.classList.add('slide-in-left');
            } else {
                article.classList.add('slide-in-right');
            }
        }
    });
}

// Navigation by Arrows: Logic between articles
let currentIndex = 0;

function navigateArticles(direction) {
    const nextIndex = (currentIndex + direction + totalArticles) % totalArticles;
    const slideDirection = direction === -1 ? 'left' : 'right';
    showArticle(nextIndex, slideDirection);
    currentIndex = nextIndex;
}

// Event listeners for navigation arrows
document.getElementById('left-arrow').addEventListener('click', () => navigateArticles(-1));
document.getElementById('right-arrow').addEventListener('click', () => navigateArticles(1));

// Initialize the first article as active
showArticle(currentIndex, 'right');

// Navigation by Menu: Mouseover and click event listener for menu items
const menu = document.getElementById("menu");
const menuItems = document.querySelectorAll('.menu-item');
Array.from(menuItems).forEach((item, index) => {
    item.addEventListener('click', () => {
        const direction = index > currentIndex ? 'right' : 'left';
        navigateArticles(index - currentIndex);
        currentIndex = index;
    });
});


// Navigation by Menu: Menu navigation
document.addEventListener("DOMContentLoaded", () => {
    // Add click event listeners to each menu item
    menuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const direction = index > currentIndex ? 'right' : 'left';
            showArticle(index, direction);
        });
    });
});



////////////////////////
////////////////////////
*/