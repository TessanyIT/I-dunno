let cookies = 0;
let clickPower = 1;
let experience = 0;
let level = 1;
let nextLevelCost = 50;
let previousLevelCost = 0;

let autoUpgradeCost = 10;
let multiUpgradeCost = 50;
let farmUpgradeCost = 100;
let frenzyUpgradeCost = 150;

let frenzyLevel = 0;
let autoClickerLevel = 0;
let multiClickerLevel = 0;
let farmLevel = 0;

let farms = 0;
let multiplier = 1;
let frenzyMultiplier = 10;
let frenzyActive = false;
let autoClickers = 0;

const celebrationEffects = new CelebrationEffects();

let mice = [];
let photos = [
    "images/background1.jpg",
    "images/background2.jpg",
    "images/background3.jpg",
    "images/background4.jpg",
    "images/background5.jpg",
    "images/background0.jpg"
];

const cookie = document.getElementById("cookie");
// Cookie click
document.getElementById("cookie").addEventListener("click", function () {
    let gained = multiplier > 1 ? multiplier * clickPower : clickPower;

    if (frenzyActive) {
        gained += frenzyMultiplier;
    }

    cookies += gained;
    experience++;

    levelUp();
    updateUI();
});


//Level up
function levelUp() {
    while (experience >= nextLevelCost) {
        previousLevelCost = nextLevelCost;
        level++;

        celebrationEffects.trigger();
        
        // carry over any excess experience to the next level
        experience -= previousLevelCost;
        
        nextLevelCost = Math.floor(nextLevelCost * 1.2) + 20;

        updateUI();
    }
}


//Mouse upgrade
document.getElementById("upgrade-button").addEventListener("click", function () {
    if (cookies >= autoUpgradeCost) {
        cookies -= autoUpgradeCost;
        autoClickers++;

        autoUpgradeCost = Math.floor(autoUpgradeCost * 1.2);
        document.getElementById("auto-upgrade-count").textContent = "Cost: " + autoUpgradeCost;

        autoClickerLevel++;
        updateUI();
        spawnMouse();
    } else {
        alert("Not enough cookies!");
    }
});

//Multiplier upgrade
document.getElementById("upgrade-button2").addEventListener("click", function () {
    if (cookies >= multiUpgradeCost) {
        cookies -= multiUpgradeCost;

        multiUpgradeCost = Math.floor(multiUpgradeCost * 1.2);
        document.getElementById("multi-upgrade-count").textContent = "Cost: " + multiUpgradeCost;

        multiClickerLevel++;
        multiplier++;
        updateUI();
    } else {
        alert("Not enough cookies!");
    }
});

//Farm upgrade
document.getElementById("upgrade-button3").addEventListener("click", function () {
    if (cookies >= farmUpgradeCost) {
        cookies -= farmUpgradeCost;

        farmUpgradeCost = Math.floor(farmUpgradeCost * 1.2);
        document.getElementById("farm-upgrade-count").textContent = "Cost: " + farmUpgradeCost;

        farmLevel++;
        farms++;
        updateUI();
        startFarm();
    } else {
        alert("Not enough cookies!");
    }
});

//Frenzy upgrade
document.getElementById("upgrade-button4").addEventListener("click", function () {
    if (cookies >= frenzyUpgradeCost) {
        cookies -= frenzyUpgradeCost;

        document.getElementById("frenzy-upgrade-count").textContent = "Cost: " + frenzyUpgradeCost;
        document.getElementById("frenzy-ui").textContent = "Frenzy: WAITING";
        document.getElementById("upgrade-button4").disabled = true;
        document.getElementById("upgrade-button4").textContent = "Not for sale";

        updateUI();
        startFrenzy();

    } else{
        alert("Not enough cookies!");
    }

    
});

//Theme buttons
document.getElementById("choose-button1").addEventListener("click", function () {
    document.body.style.backgroundImage = "url('" + photos[0] + "')";
});

document.getElementById("choose-button2").addEventListener("click", function () {
    document.body.style.backgroundImage = "url('" + photos[1] + "')";
});


document.getElementById("choose-button3").addEventListener("click", function () {
    document.body.style.backgroundImage = "url('" + photos[2] + "')";
});

document.getElementById("choose-button4").addEventListener("click", function () {
    document.body.style.backgroundImage = "url('" + photos[3] + "')";
});

document.getElementById("choose-button5").addEventListener("click", function () {
    document.body.style.backgroundImage = "url('" + photos[4] + "')";
});

document.getElementById("choose-button0").addEventListener("click", function () {
    document.body.style.backgroundImage = "url('" + photos[5] + "')";
});

//Custom background upload
  const button = document.getElementById("changeBgBtn");
  const input = document.getElementById("bgUpload");


  button.addEventListener("click", () => {
    input.click();
  });

  
  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      document.body.style.backgroundImage = `url(${e.target.result})`;
    };
    reader.readAsDataURL(file);
  });

//Frenzy
function startFrenzy() {

    setInterval(() => {
        frenzyActive = true;
        cookie.src = "images/gold cookie.png";
        document.getElementById("frenzy-ui").textContent = "Frenzy: ACTIVE";
        setTimeout(() => {
            frenzyActive = false;
            cookie.src = "images/transparent cookie.png";
            document.getElementById("frenzy-ui").textContent = "Frenzy: WAITING";
            startFrenzy();
        }, 7000);
    }, 60000);
}


//Farm
function startFarm(){
    setInterval(() => {
        cookies += (100 * farms);
        updateUI();
    }, 30000);
}

//Mouse auto clicker
function startAutoClick() {
    setInterval(() => {
        cookies += autoClickers;

        
        cookie.classList.add("active");
        setTimeout(() => cookie.classList.remove("active"), 100);

        updateUI();
    }, 2000);
}

//Mouse spawner
function spawnMouse() {
    const container = document.getElementById("mouse-container");
    const mouse = document.createElement("img");

    mouse.src = "images/auto upgrade.png";
    mouse.classList.add("auto-mouse");

    container.appendChild(mouse);

    
    let startAngle = Math.random() * Math.PI * 2;

    mice.push({
        element: mouse,
        angle: startAngle
    });

    
    if (mice.length === 1) {
        startAutoClick();
        animateAllMice();
    }
}

//Mouse animation
function animateAllMice() {
    const cookieImg = document.getElementById("cookie");

    function update() {
        const rect = cookieImg.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const radius = 150; 

        mice.forEach(mouse => {
            
            mouse.angle += 0.03;

            const x = centerX + radius * Math.cos(mouse.angle);
            const y = centerY + radius * Math.sin(mouse.angle);

            mouse.element.style.left = (x - 25) + "px";
            mouse.element.style.top = (y - 25) + "px";

            
            const dx = centerX - x;
            const dy = centerY - y;

            const rad = Math.atan2(dy, dx);
            const deg = rad * (180 / Math.PI);

            
            mouse.element.style.transform = "rotate(" + (deg + 90) + "deg)";
        });

        requestAnimationFrame(update);
    }

    update();
}

//Update UI
function updateUI() {
    document.getElementById("experience").textContent =
        "Experience: " + experience + "/" + nextLevelCost;

    document.getElementById("cookies").textContent =
        "Cookies: " + cookies;

    document.getElementById("level").textContent =
        "Level: " + level;

    document.getElementById("auto-clicker-level").textContent =
        "Upgrade level: " + autoClickerLevel;

    document.getElementById("multi-clicker-level").textContent =
        "Upgrade level: " + multiClickerLevel;

    document.getElementById("farm-level").textContent =
        "Upgrade level: " + farmLevel;

    let progress = (experience / nextLevelCost) * 100;
    document.getElementById("counter-fill").style.width = progress + "%";

    
    saveGame.save(saveGame.getGameState());
}

//Navigation bar
document.querySelector(".nav-bar h3:nth-child(2)").addEventListener("click", function () {
    document.getElementById("shop-panel").classList.toggle("active");
});

document.querySelector(".nav-bar h3:nth-child(3)").addEventListener("click", function () {
    document.getElementById("themes-panel").classList.toggle("active");
});

if (typeof saveGame !== "undefined") {
    const savedState = saveGame.load();
    if (savedState) {
        saveGame.restoreGameState(savedState);
        updateUI();
    } else {
        updateUI();
    }
} else {
    console.error("saveGame not loaded!");
    updateUI();
}