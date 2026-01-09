class SaveGame {
    constructor(storageKey = "mouseClickerSave") {
        this.storageKey = storageKey;
        this.storage = this.getAvailableStorage();
    }

    getAvailableStorage() {
        try {
            localStorage.setItem("test", "test");
            localStorage.removeItem("test");
            return localStorage;
        } catch (e) {
            // Fallback to sessionStorage if localStorage is unavailable
            try {
                sessionStorage.setItem("test", "test");
                sessionStorage.removeItem("test");
                return sessionStorage;
            } catch (e2) {
                console.warn("No storage available. Saves will not persist.");
                return null;
            }
        }
    }

    save(gameState) {
        if (!this.storage) return;
        try {
            const data = JSON.stringify(gameState);
            this.storage.setItem(this.storageKey, data);
        } catch (e) {
            console.error("Failed to save game:", e);
        }
    }

    load() {
        if (!this.storage) return null;
        try {
            const data = this.storage.getItem(this.storageKey);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error("Failed to load game:", e);
            return null;
        }
    }

    clear() {
        if (!this.storage) return;
        try {
            this.storage.removeItem(this.storageKey);
        } catch (e) {
            console.error("Failed to clear game save:", e);
        }
    }

    getGameState() {
        return {
            cookies,
            experience,
            level,
            nextLevelCost,
            previousLevelCost,
            autoUpgradeCost,
            multiUpgradeCost,
            farmUpgradeCost,
            frenzyUpgradeCost,
            frenzyLevel,
            autoClickerLevel,
            multiClickerLevel,
            farmLevel,
            farms,
            multiplier,
            frenzyActive,
            autoClickers,
            mice: mice.map(m => ({ angle: m.angle }))
        };
    }

    restoreGameState(state) {
        if (!state) return;

        cookies = state.cookies ?? 0;
        experience = state.experience ?? 0;
        level = state.level ?? 1;
        nextLevelCost = state.nextLevelCost ?? 50;
        previousLevelCost = state.previousLevelCost ?? 0;
        autoUpgradeCost = state.autoUpgradeCost ?? 10;
        multiUpgradeCost = state.multiUpgradeCost ?? 50;
        farmUpgradeCost = state.farmUpgradeCost ?? 100;
        frenzyUpgradeCost = state.frenzyUpgradeCost ?? 150;
        frenzyLevel = state.frenzyLevel ?? 0;
        autoClickerLevel = state.autoClickerLevel ?? 0;
        multiClickerLevel = state.multiClickerLevel ?? 0;
        farmLevel = state.farmLevel ?? 0;
        farms = state.farms ?? 0;
        multiplier = state.multiplier ?? 1;
        frenzyActive = state.frenzyActive ?? false;
        autoClickers = state.autoClickers ?? 0;

        // Restore mice if saved
        if (state.mice && state.mice.length > 0) {
            this.restoreMice(state.mice);
        }
    }

    restoreMice(savedMice) {
        // Clear existing mice
        mice = [];
        const container = document.getElementById("mouse-container");
        if (container) {
            container.innerHTML = "";
        }

        // Recreate mice with saved angles
        savedMice.forEach(savedMouse => {
            const mouse = document.createElement("img");
            mouse.src = "images/auto upgrade.png";
            mouse.classList.add("auto-mouse");

            if (container) {
                container.appendChild(mouse);
            }

            mice.push({
                element: mouse,
                angle: savedMouse.angle
            });
        });

        // Start animation if mice were restored
        if (mice.length > 0) {
            startAutoClick();
            animateAllMice();
        }
    }
}

const saveGame = new SaveGame();
