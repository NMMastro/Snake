import { state, settings } from "./state.js";
import { drawTitleScreen, drawGameOver } from "./renderer.js";

const overlay = document.getElementById("settingsOverlay");

export function openSettings() {
    overlay.classList.remove("hidden");
    syncButtons();
}

export function closeSettings() {
    overlay.classList.add("hidden");
    if (state.gameState === "gameover") {
        drawGameOver();
    } else {
        drawTitleScreen();
    }
}

function syncButtons() {
    document.querySelectorAll(".option-btn").forEach(btn => {
        const setting = btn.dataset.setting;
        const value   = btn.dataset.value;
        btn.classList.toggle("active", String(settings[setting]) === value);
    });
}

document.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const setting = btn.dataset.setting;
        const raw     = btn.dataset.value;
        settings[setting] = isNaN(raw) ? raw : Number(raw);
        syncButtons();
    });
});

document.getElementById("closeSettings").addEventListener("click", closeSettings);
