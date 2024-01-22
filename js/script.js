const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";

let interval = null;

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("h1");

    if (header) {
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
        }

        iteration += 1 / 3;
    }, 30);
}
