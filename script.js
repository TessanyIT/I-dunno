let button1PaddingVertical = 50;
let button1PaddingHorizontal = 140;


let button2PaddingVertical = 50;
let button2PaddingHorizontal = 140;

let imageCounter = 1;
let textCounter = 1;
let buttonPhraseCounter = 1;

let counter = 1;
function getNameFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    return name ? name.trim() : "";
}

function setTitleWithName() {
    const title = document.querySelector("h1");
    if (!title) return;
    const name = getNameFromQuery();
    if (name) {
        title.textContent = `Will you be my Valentine, ${name}?`;
    } else {
        title.textContent = "Will you be my Valentine?";
    }
}


let phrases = [
    "Pretty pleaseee",
    "You really hate me don't you?",
    "Why won't you click me?",
    "Please click meee",
    "I just want to be clicked",
    "Don't you want to click me?",
    "I promise I won't do anything bad",
    "Click me, I dare you!",
    "Are you sure you don't want to click me?",
    "I can be your best friend if you click me!",
];

let images = [
    "images.png",
    "images2.png",
    "images3.png",
    "images4.png",
    "images5.png",
    "images6.png",
    "images7.png",
    "images8.png",
    "images9.png",
    "images10.png",
    "images11.png",
];

let buttonPhrases = [
    "No",
    "Still no",
    "Absolutely not",
    "Not gonna happen",
    "No way",
    "Negative",
    "I don't think so",
    "Nope",
    "Not interested",
    "No thanks"
];

function phraseChange() {
    const messageElement = document.getElementById("message");
    messageElement.textContent = phrases[textCounter];
    textCounter = (textCounter + 1) % phrases.length;
}

function imageChange() {
    const imgElement = document.querySelector("img");
    imgElement.src = images[imageCounter];
    imageCounter = (imageCounter + 1) % images.length;
}

function buttonPhraseChange() {
    const button2Element = document.getElementById("button2");
    button2Element.textContent = buttonPhrases[buttonPhraseCounter];
    buttonPhraseCounter = (buttonPhraseCounter + 1) % buttonPhrases.length;
}

function applyButton1Padding() {
    document.querySelector("button#button1").style.padding =
        `${button1PaddingVertical}px ${button1PaddingHorizontal}px`;
}

function applyButton2Padding() {
    document.querySelector("button#button2").style.padding =
        `${button2PaddingVertical}px ${button2PaddingHorizontal}px`;
}

function getSafeTop() {
    const title = document.querySelector("h1");
    const message = document.getElementById("message");
    const titleBottom = title ? title.getBoundingClientRect().bottom : 0;
    const messageBottom = message ? message.getBoundingClientRect().bottom : 0;
    return Math.ceil(Math.max(titleBottom, messageBottom) + 20);
}

function isOverlapping(rectA, rectB) {
    return !(
        rectA.right <= rectB.left ||
        rectA.left >= rectB.right ||
        rectA.bottom <= rectB.top ||
        rectA.top >= rectB.bottom
    );
}

function moveButtonsRandomly() {
    const button1 = document.getElementById("button1");
    const button2 = document.getElementById("button2");
    const safeTop = getSafeTop();

    [button1, button2].forEach((button) => {
        if (!button || button.style.display === "none") return;
        button.style.position = "absolute";
        button.style.margin = "0";
    });

    const placeButton = (button, otherButton) => {
        if (!button || button.style.display === "none") return;
        const rect = button.getBoundingClientRect();
        const maxLeft = Math.max(0, window.innerWidth - rect.width);
        const maxTop = Math.max(safeTop, window.innerHeight - rect.height);
        let attempt = 0;
        let left = 0;
        let top = safeTop;

        while (attempt < 50) {
            left = Math.floor(Math.random() * (maxLeft + 1));
            top = Math.floor(
                safeTop + Math.random() * Math.max(0, maxTop - safeTop)
            );

            button.style.left = `${left}px`;
            button.style.top = `${top}px`;

            if (!otherButton || otherButton.style.display === "none") break;
            const rectA = button.getBoundingClientRect();
            const rectB = otherButton.getBoundingClientRect();
            if (!isOverlapping(rectA, rectB)) break;
            attempt += 1;
        }
    };

    placeButton(button1, button2);
    placeButton(button2, button1);
}

function expandButton1ToCoverPage() {
    const button1 = document.getElementById("button1");
    const safeTop = getSafeTop();
    const availableHeight = Math.max(0, window.innerHeight - safeTop - 20);
    const horizontalPadding = Math.max(20, Math.floor(window.innerWidth / 2) - 60);
    const verticalPadding = Math.max(20, Math.floor(availableHeight / 2) - 60);

    button1.style.position = "absolute";
    button1.style.left = "10px";
    button1.style.top = `${safeTop}px`;
    button1.style.margin = "0";

    button1PaddingHorizontal = horizontalPadding;
    button1PaddingVertical = verticalPadding;
    applyButton1Padding();
}

document.getElementById("button1").addEventListener("click", function() {
    if (counter === 1) {
        const name = getNameFromQuery();
        document.getElementById("message").textContent = `Wow, I wasnt expecting it to be that easy! I love you ${name}! ❤️`;
        document.querySelector("img").src = "happy2.png";
        document.querySelector("button#button1").style.display = "none";
        document.querySelector("button#button2").style.display = "none";
        document.querySelector("img").style.display = "block";
        document.querySelector("button#button2").style.marginLeft = "320px";
    } else {
        const name = getNameFromQuery();
        document.getElementById("message").textContent = `YAAAY! I KNEW YOU WERE GOING TO DO IT! LOVE YOU TOO ${name}! ❤️`;
        document.querySelector("img").src = "happy.png";
        document.querySelector("button#button1").style.display = "none";
        document.querySelector("button#button2").style.display = "none";
        document.querySelector("img").style.display = "block";
        document.querySelector("button#button2").style.marginLeft = "320px";
    }
    applyButton2Padding();
});

document.getElementById("button2").addEventListener("click", function() {
    if (counter === 5) {
        const result = confirm("Are you sure you want to keep rejecting me?");
        if (result) {
            const result2 = confirm("Are you REALLY sure?");
            if (result2) {
                counter++;
            } else {
                const name = getNameFromQuery();
                document.getElementById("message").textContent = `YAAAY! I KNEW YOU WERE GOING TO DO IT! LOVE YOU TOO ${name}! ❤️`;
                document.querySelector("img").src = "happy.png";
                document.querySelector("button#button1").style.display = "none";
                document.querySelector("button#button2").style.display = "none";
                document.querySelector("img").style.display = "block";
                document.querySelector("button#button2").style.marginLeft = "320px";
            }
        } else {
            const name = getNameFromQuery();
            document.getElementById("message").textContent = `YAAAY! I KNEW YOU WERE GOING TO DO IT! LOVE YOU TOO ${name}! ❤️`;
            document.querySelector("img").src = "happy.png";
            document.querySelector("button#button1").style.display = "none";
            document.querySelector("button#button2").style.display = "none";
            document.querySelector("img").style.display = "block";
            document.querySelector("button#button2").style.marginLeft = "320px";
        }
    } else {
        imageChange();
        button1PaddingVertical += 10;
        button1PaddingHorizontal += 16;
        button2PaddingVertical -= 5;
        button2PaddingHorizontal -= 14;
        if (button2PaddingVertical <= 0) {
        document.getElementById("button2").style.display = "none";
        expandButton1ToCoverPage();
        }
        console.log(button1PaddingVertical, button1PaddingHorizontal);
        console.log(button2PaddingVertical, button2PaddingHorizontal);
        counter++;
        applyButton1Padding();
        applyButton2Padding();
        moveButtonsRandomly();
        phraseChange();
        buttonPhraseChange();
    }
    
});
setTitleWithName();