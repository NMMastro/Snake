import { CELL_SIZE, COLS, ROWS } from "./config.js";
import { state } from "./state.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

export function drawGrid() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            ctx.fillStyle = (row + col) % 2 === 0 ? "#2d4a1e" : "#263d19";
            ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
}

export function drawSnake() {
    state.snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "#a8e063" : "#5cb85c";
        ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });
}

export function drawFood() {
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(state.food.x * CELL_SIZE, state.food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

export function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "16px monospace";
    ctx.fillText("Score: " + state.score, 8, 20);
}

export function drawGameOver() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "bold 32px monospace";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 16);

    ctx.font = "18px monospace";
    ctx.fillText("Score: " + state.score, canvas.width / 2, canvas.height / 2 + 16);
    ctx.fillText("Press R to restart", canvas.width / 2, canvas.height / 2 + 44);

    ctx.textAlign = "left";
}

export function drawTitleScreen() {
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";

    ctx.fillStyle = "#a8e063";
    ctx.font = "bold 64px monospace";
    ctx.fillText("SNAKE", canvas.width / 2, canvas.height / 2 - 20);

    ctx.fillStyle = "white";
    ctx.font = "16px monospace";
    ctx.fillText("Press SPACE to start", canvas.width / 2, canvas.height / 2 + 30);

    ctx.textAlign = "left";
}
