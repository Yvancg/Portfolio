const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("h1");

    if (header) {
        // Store the original HTML in a data attribute
        header.dataset.originalHtml = header.innerHTML;

        header.addEventListener("mouseover", handleMouseOver);
    }
});

function handleMouseOver(event) {
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
        const originalText = event.target.dataset.value;
        event.target.innerText = originalText.split("").map((letter, index) => {
            if (index < iteration) {
                return originalText[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
        }).join("");

        if (iteration >= originalText.length) {
            clearInterval(interval);
            // Reset to the original HTML with the highlighted letter
            event.target.innerHTML = event.target.dataset.originalHtml;
        }

        iteration += 1 / 3;
    }, 30);
}
