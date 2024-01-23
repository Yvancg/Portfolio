// Define a string of uppercase letters for the animation
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Add an event listener for when the DOM content is fully loaded
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

// Define the mouseover event handler function
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
    const rotationDegree = 8; // Maximum rotation degree

    // Calculate rotation based on mouse position
    const rotation = ((clientX / screenWidth) - 0.5) * 2 * rotationDegree;

    // Apply rotation to all h2 elements
    const h2Elements = document.querySelectorAll('h2');
    h2Elements.forEach(h2 => {
        h2.style.transform = `rotateZ(${rotation}deg)`;
    });
});

// Reload the page when the window is resized
window.addEventListener('resize', () => {
    window.location.reload();
});

// Remove the effects that do not work on mobiles
/*
document.addEventListener("DOMContentLoaded", () => {
    const userAgent = navigator.userAgent || window.opera;

    // Check for iOS and Android
    if (/iPad|iPhone|iPod/.test(userAgent) || /android/i.test(userAgent)) {
        // Mobile detected (iOS or Android)
        const blob = document.getElementById("blob");
        const blur = document.getElementById("blur");

        if (blob) {
            blob.style.display = "none"; // Hide the blob
        }

        if (blur) {
            blur.style.display = "none"; // Hide the blur
        }
    }
});
*/