class CelebrationEffects {
    constructor(options = {}) {
        this.cookieSrc = options.cookieSrc || "images/transparent cookie.png";
        this.spawnRate = options.spawnRate || 10;
        this.celebrationDuration = options.celebrationDuration || 5000;
        this.cookieFallDuration = options.cookieFallDuration || 3200;
        this.layer = null;
    }

    trigger() {
        this.ensureLayer();
        if (!this.layer) return;

        const startTime = Date.now();
        const spawnInterval = setInterval(() => {
            if (Date.now() - startTime >= this.celebrationDuration) {
                clearInterval(spawnInterval);
                return;
            }
            this.spawnCookie();
        }, this.spawnRate);
    }

    ensureLayer() {
        if (this.layer) return;
        const layer = document.createElement("div");
        layer.className = "celebration-layer";
        document.body.appendChild(layer);
        this.layer = layer;
    }

    spawnCookie() {
        const drop = document.createElement("img");
        drop.src = this.cookieSrc;
        drop.alt = "Cookie";
        drop.className = "falling-cookie";

        const layerWidth = this.layer ? this.layer.clientWidth : window.innerWidth;
        const x = Math.random() * (layerWidth - 40) + 10;
        drop.style.left = x + "px";

        const delay = Math.random() * 400;
        drop.style.animationDelay = delay + "ms";

        this.layer.appendChild(drop);

        setTimeout(() => {
            if (drop.parentNode) {
                drop.parentNode.removeChild(drop);
            }
        }, this.cookieFallDuration);
    }
}
