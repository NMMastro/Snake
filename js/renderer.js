import { CANVAS_SIZE, COLOR_SCHEMES } from "./config.js";
import { state, settings } from "./state.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width  = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

export function drawGrid() {
    const cellSize = CANVAS_SIZE / settings.gridSize;
    const colors   = COLOR_SCHEMES[settings.colorScheme];
    for (let row = 0; row < settings.gridSize; row++) {
        for (let col = 0; col < settings.gridSize; col++) {
            ctx.fillStyle = (row + col) % 2 === 0 ? colors.gridEven : colors.gridOdd;
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
}

export function drawSnake() {
    const cellSize = CANVAS_SIZE / settings.gridSize;
    const colors   = COLOR_SCHEMES[settings.colorScheme];
    const gap = 2;
    state.snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? colors.snakeHead : colors.snakeBody;
        ctx.fillRect(
            segment.x * cellSize + gap / 2,
            segment.y * cellSize + gap / 2,
            cellSize - gap,
            cellSize - gap
        );
    });
}

export function drawFood() {
    const cellSize = CANVAS_SIZE / settings.gridSize;
    const colors   = COLOR_SCHEMES[settings.colorScheme];
    const gap = 2;
    ctx.fillStyle = colors.food;
    ctx.fillRect(
        state.food.x * cellSize + gap / 2,
        state.food.y * cellSize + gap / 2,
        cellSize - gap,
        cellSize - gap
    );
}

export function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "16px monospace";
    ctx.fillText("Score: " + state.score, 8, 20);
    ctx.textAlign = "right";
    ctx.fillText("Best: " + state.highScore, CANVAS_SIZE - 8, 20);
    ctx.textAlign = "left";
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
    if (state.score >= state.highScore && state.score > 0) {
        ctx.fillStyle = "#f0e040";
        ctx.fillText("New Best!", canvas.width / 2, canvas.height / 2 + 44);
        ctx.fillStyle = "white";
        ctx.fillText("Press R to restart", canvas.width / 2, canvas.height / 2 + 70);
    } else {
        ctx.fillText("Best: " + state.highScore, canvas.width / 2, canvas.height / 2 + 44);
        ctx.fillText("Press R to restart", canvas.width / 2, canvas.height / 2 + 70);
    }

    ctx.textAlign = "left";
}

export function drawPause() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "bold 32px monospace";
    ctx.textAlign = "center";
    ctx.fillText("PAUSED", canvas.width / 2, canvas.height / 2 - 16);

    ctx.font = "16px monospace";
    ctx.fillText("Press SPACE to resume", canvas.width / 2, canvas.height / 2 + 16);

    ctx.textAlign = "left";
}

export function drawTitleScreen() {
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";

    ctx.fillStyle = COLOR_SCHEMES[settings.colorScheme].snakeHead;
    ctx.font = "bold 64px monospace";
    ctx.fillText("SNAKE", canvas.width / 2, canvas.height / 2 - 20);

    ctx.fillStyle = "white";
    ctx.font = "16px monospace";
    ctx.fillText("Press SPACE to start", canvas.width / 2, canvas.height / 2 + 30);

    if (state.highScore > 0) {
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fillText("Best: " + state.highScore, canvas.width / 2, canvas.height / 2 + 58);
    }

    ctx.textAlign = "left";
}
