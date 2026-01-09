class ClickEffects {
    constructor(options = {}) {
        this.cookieSrc = options.cookieSrc || "images/transparent cookie.png";
        this.spawnRate = options.spawnRate || 10;
        this.effectDuration = options.effectDuration || 10000;
        this.cookieFallDuration = options.cookieFallDuration || 2000;
        this.fallDistance = options.fallDistance || 250;
        this.layer = null;
    }

    trigger() {
        this.ensureLayer();
        if (!this.layer) return;
        
        this.spawnCookieAt();
        
    }

    ensureLayer() {
        if (this.layer) return;
        const layer = document.createElement("div");
        layer.className = "effect-layer";
        document.body.appendChild(layer);
        this.layer = layer;
    }


    spawnCookieAt(x, y) {
        this.ensureLayer();
        if (!this.layer) return;

        const img = document.createElement("img");
        const useGold = (typeof frenzyActive !== "undefined" && frenzyActive);
        img.src = useGold ? "images/gold cookie.png" : this.cookieSrc;
        img.alt = "Cookie";
        img.className = "click-cookie";
        img.style.left = x + "px";
        img.style.top = y + "px";
        img.style.animationDuration = this.cookieFallDuration + "ms";
        img.style.setProperty("--fall-distance", this.fallDistance + "px");

        this.layer.appendChild(img);

        setTimeout(() => {
            if (img.parentNode) {
                img.parentNode.removeChild(img);
            }
        }, this.cookieFallDuration + 100);
    }
}


window.clickEffects = window.clickEffects || new ClickEffects();
document.addEventListener("click", (e) => {
    
    const nav = document.querySelector(".nav-bar");
    if (nav && nav.contains(e.target)) return;
    window.clickEffects.spawnCookieAt(e.clientX, e.clientY);
});
