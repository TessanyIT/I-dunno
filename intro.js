const startButton = document.getElementById("start-button");
const nameInput = document.getElementById("name-input");

function goToGame() {
    if (!nameInput) {
        window.location.href = "game.html";
        return;
    }

    const name = nameInput.value.trim();
    if (name.length > 0) {
        const encodedName = encodeURIComponent(name);
        window.location.href = `game.html?name=${encodedName}`;
    } else {
        alert("You need to enter your name sweetheart! ❤️");
        nameInput.focus();
    }
}

if (startButton) {
    startButton.addEventListener("click", goToGame);
}

if (nameInput) {
    nameInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            goToGame();
        }
    });
}
