const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const CELL_SIZE = 20;
const COLS = canvas.width / CELL_SIZE;   // 20 columns
const ROWS = canvas.height / CELL_SIZE;  // 20 rows

let snake = [
    { x: 10, y: 10 },
    { x: 9,  y: 10 },
    { x: 8,  y: 10 },
];

let direction = { x: 1, y: 0 };
let food = randomFood();
let score = 0;
let gameOver = false;
let intervalId = null;

function isCollision(head) {
    const hitWall = head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS;
    const hitSelf = snake.some(seg => seg.x === head.x && seg.y === head.y);
    return hitWall || hitSelf;
}

function randomFood() {
    let pos;
    do {
        pos = {
            x: Math.floor(Math.random() * COLS),
            y: Math.floor(Math.random() * ROWS),
        };
    } while (snake.some(seg => seg.x === pos.x && seg.y === pos.y));
    return pos;
}


function drawGrid() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            ctx.fillStyle = (row + col) % 2 === 0 ? "#2d4a1e" : "#263d19";
            ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
}

function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "#a8e063" : "#5cb85c";
        ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);                                                                                                               
    });
}

function drawFood() {
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "16px monospace";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawGameOver() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "bold 32px monospace";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 16);

    ctx.font = "18px monospace";
    ctx.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 16);
    ctx.fillText("Press R to restart", canvas.width / 2, canvas.height / 2 + 44);

    ctx.textAlign = "left";  // reset to default
}

function moveSnake() {
    const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y,
    };

    if (isCollision(newHead)) {
        gameOver = true;
        clearInterval(intervalId);
        drawGameOver();
        return;
    }

    snake.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        food = randomFood();
    } else {
        snake.pop();
    }
}

function gameLoop() {
    moveSnake();
    if (gameOver) return;
    drawGrid();
    drawFood();
    drawSnake();
    drawScore();
}

function restart() {
    snake = [
        { x: 10, y: 10 },
        { x: 9,  y: 10 },
        { x: 8,  y: 10 },
    ];
    direction = { x: 1, y: 0 };
    food = randomFood();
    score = 0;
    gameOver = false;
    clearInterval(intervalId);
    intervalId = setInterval(gameLoop, 150);
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":    if (direction.y === 0) direction = { x: 0, y: -1 }; break;
        case "ArrowDown":  if (direction.y === 0) direction = { x: 0, y: 1 };  break;
        case "ArrowLeft":  if (direction.x === 0) direction = { x: -1, y: 0 }; break;
        case "ArrowRight": if (direction.x === 0) direction = { x: 1, y: 0 };  break;
        case "r":
        case "R":          restart(); break;
    }
});

intervalId = setInterval(gameLoop, 150);