import { state, settings } from "./state.js";
import { randomFood, moveSnake } from "./logic.js";
import { drawGrid, drawSnake, drawFood, drawScore, drawGameOver, drawTitleScreen, drawPause } from "./renderer.js";
import { setupInput } from "./input.js";
import { openSettings } from "./settings.js";

function gameLoop() {
    moveSnake();

    if (state.gameState === "gameover") {
        drawGameOver();
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
}

export function togglePause() {
    if (state.gameState === "playing") {
        state.gameState = "paused";
        clearInterval(state.intervalId);
        drawPause();
    } else if (state.gameState === "paused") {
        state.gameState = "playing";
        state.intervalId = setInterval(gameLoop, settings.speed);
    }
}

setupInput(startGame, togglePause, openSettings);
drawTitleScreen();
