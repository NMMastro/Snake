import { SPEED } from "./config.js";
import { state } from "./state.js";
import { randomFood, moveSnake } from "./logic.js";
import { drawGrid, drawSnake, drawFood, drawScore, drawGameOver, drawTitleScreen } from "./renderer.js";
import { setupInput } from "./input.js";

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
    state.snake = [
        { x: 10, y: 10 },
        { x: 9,  y: 10 },
        { x: 8,  y: 10 },
    ];
    state.direction = { x: 1, y: 0 };
    state.food = randomFood();
    state.score = 0;
    state.gameState = "playing";
    clearInterval(state.intervalId);
    state.intervalId = setInterval(gameLoop, SPEED);
}

setupInput(startGame);
drawTitleScreen();
