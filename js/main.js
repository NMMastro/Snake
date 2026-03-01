import { state, settings } from "./state.js";
import { startMusic, pauseMusic, resumeMusic, stopMusic, playGameOverSound, playButtonSound } from "./audio.js";
import { randomFood, moveSnake } from "./logic.js";
import { drawGrid, drawSnake, drawFood, drawScore, drawGameOver, drawTitleScreen, drawPause } from "./renderer.js";
import { setupInput } from "./input.js";
import { openSettings } from "./settings.js";
import { startBackground } from "./background.js";

function gameLoop() {
    moveSnake();

    if (state.gameState === "gameover") {
        drawGrid();
        drawFood();
        drawSnake();
        stopMusic();
        playGameOverSound();
        drawGameOver();
        updateIcons();
        return;
    }

    drawGrid();
    drawFood();
    drawSnake();
    drawScore();
}

export function startGame() {
    const center = Math.floor(settings.gridSize / 2);
    state.snake = [
        { x: center,     y: center },
        { x: center - 1, y: center },
        { x: center - 2, y: center },
    ];
    state.direction = { x: 1, y: 0 };
    state.directionQueue = [];
    state.food = randomFood();
    state.score = 0;
    state.gameState = "playing";
    clearInterval(state.intervalId);
    state.intervalId = setInterval(gameLoop, settings.speed);
    startMusic();
    updateIcons();
}

export function togglePause() {
    if (state.gameState === "playing") {
        state.gameState = "paused";
        clearInterval(state.intervalId);
        pauseMusic();
        drawPause();
    } else if (state.gameState === "paused") {
        state.gameState = "playing";
        state.intervalId = setInterval(gameLoop, settings.speed);
        resumeMusic();
    }
    updateIcons();
}

export function goHome() {
    clearInterval(state.intervalId);
    stopMusic();
    state.gameState = "title";
    drawTitleScreen();
    updateIcons();
}

function updateIcons() {
    const showSettings = state.gameState === "title" || state.gameState === "gameover";
    const showHome     = state.gameState === "paused" || state.gameState === "gameover";
    document.getElementById("settingsBtn").style.display = showSettings ? "flex" : "none";
    document.getElementById("homeBtn").style.display     = showHome     ? "flex" : "none";
}

document.getElementById("settingsBtn").addEventListener("click", () => { playButtonSound(); openSettings(); });
document.getElementById("homeBtn").addEventListener("click",     () => { playButtonSound(); goHome();       });

setupInput(startGame, togglePause);
startBackground();
drawTitleScreen();
updateIcons();
lucide.createIcons();
