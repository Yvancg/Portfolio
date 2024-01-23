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

// Move the profile pic with the mouse
document.addEventListener('mousemove', (event) => {
    const { clientX } = event;
    const screenWidth = window.innerWidth;
    const midScreen = screenWidth / 2;
    const rotationDegree = 80; // Maximum rotation degree

    // Calculate rotation based on mouse position
    const rotation = ((clientX - midScreen) / midScreen) * rotationDegree;

    // Apply rotation to the .screen element
    const screenElement = document.querySelector('.screen');
    if (screenElement) {
        screenElement.style.transform = `translate(-50%, -50%) rotateY(${rotation}deg)`;
    }
});
