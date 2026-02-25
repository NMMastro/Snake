const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [
    {x: 10, y:10},
    {x: 9, y:10},
    {x: 8, y:10},
];

let direction = { x: 1, y: 0 };

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

const CELL_SIZE = 20;
const COLS = canvas.width / CELL_SIZE;   // 20 columns
const ROWS = canvas.height / CELL_SIZE;  // 20 rows

let food = randomFood();

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
        ctx.fillRect(
            segment.x * CELL_SIZE,
            segment.y * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
        );
    });
}

function drawFood() {
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function moveSnake() {
    const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y,
    };

    snake.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
        food = randomFood();  // spawn new food
    } else {
        snake.pop();          // only remove tail if no food eaten
    }
}

function gameLoop() {
    moveSnake();
    drawGrid();
    drawFood();
    drawSnake();
}

document.addEventListener("keydown", (event) => {
    switch (event.key) {                                                                                                                                                                                
        case "ArrowUp":    if (direction.y === 0) direction = { x: 0, y: -1 }; break;                                                                                                                   
        case "ArrowDown":  if (direction.y === 0) direction = { x: 0, y: 1 };  break;                                                                                                                   
        case "ArrowLeft":  if (direction.x === 0) direction = { x: -1, y: 0 }; break;                                                                                                                   
        case "ArrowRight": if (direction.x === 0) direction = { x: 1, y: 0 };  break;                                                                                                                   
    }                                                                                                                                                                                                   
});

setInterval(gameLoop, 150);