import { state, settings } from "./state.js";

export function randomFood() {
    let pos;
    do {
        pos = {
            x: Math.floor(Math.random() * settings.gridSize),
            y: Math.floor(Math.random() * settings.gridSize),
        };
    } while (state.snake.some(seg => seg.x === pos.x && seg.y === pos.y));
    return pos;
}

export function isCollision(head) {
    const hitWall = head.x < 0 || head.x >= settings.gridSize || head.y < 0 || head.y >= settings.gridSize;
    const hitSelf = state.snake.some(seg => seg.x === head.x && seg.y === head.y);
    return hitWall || hitSelf;
}

export function moveSnake() {
    const newHead = {
        x: state.snake[0].x + state.direction.x,
        y: state.snake[0].y + state.direction.y,
    };

    if (isCollision(newHead)) {
        state.gameState = "gameover";
        clearInterval(state.intervalId);
        return;
    }

    state.snake.unshift(newHead);

    if (newHead.x === state.food.x && newHead.y === state.food.y) {
        state.score++;
        state.food = randomFood();
    } else {
        state.snake.pop();
    }
}
