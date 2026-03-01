import { COLOR_SCHEMES } from "./config.js";
import { settings } from "./state.js";

const bgCanvas = document.getElementById("bgCanvas");
const bgCtx    = bgCanvas.getContext("2d");

const CELL          = 30;
const GHOST_LENGTH  = 20;
const MOVE_INTERVAL = 180; // ms between steps
const TURN_CHANCE   = 0.25;
const NUM_SNAKES    = 15;

const DIRS = [
    { x: 1, y: 0 }, { x: -1, y: 0 },
    { x: 0, y: 1 }, { x: 0, y: -1 },
];

let cols, rows;
let ghosts = []; // array of { body, dir }
let lastMoveTime = 0;

function resize() {
    bgCanvas.width  = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    cols = Math.ceil(bgCanvas.width  / CELL);
    rows = Math.ceil(bgCanvas.height / CELL);
}

function initGhost() {
    const dir = DIRS[Math.floor(Math.random() * DIRS.length)];
    const sx  = Math.floor(Math.random() * cols);
    const sy  = Math.floor(Math.random() * rows);
    const body = [];
    for (let i = 0; i < GHOST_LENGTH; i++) {
        body.push({
            x: ((sx - dir.x * i) + cols) % cols,
            y: ((sy - dir.y * i) + rows) % rows,
        });
    }
    return { body, dir: { ...dir } };
}

function initAllGhosts() {
    ghosts = [];
    for (let i = 0; i < NUM_SNAKES; i++) {
        ghosts.push(initGhost());
    }
}

function moveGhost(ghost) {
    if (Math.random() < TURN_CHANCE) {
        if (Math.random() < 0.5) {
            ghost.dir = { x: ghost.dir.y,  y: -ghost.dir.x }; // turn left
        } else {
            ghost.dir = { x: -ghost.dir.y, y:  ghost.dir.x }; // turn right
        }
    }

    const newHead = {
        x: ((ghost.body[0].x + ghost.dir.x) + cols) % cols,
        y: ((ghost.body[0].y + ghost.dir.y) + rows) % rows,
    };

    ghost.body.unshift(newHead);
    ghost.body.pop();
}

function drawGhosts() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

    const colors = COLOR_SCHEMES[settings.colorScheme];

    ghosts.forEach(ghost => {
        ghost.body.forEach((seg, i) => {
            bgCtx.globalAlpha = (1 - i / GHOST_LENGTH) * 0.25;
            bgCtx.fillStyle   = i === 0 ? colors.snakeHead : colors.snakeBody;
            bgCtx.fillRect(seg.x * CELL, seg.y * CELL, CELL - 2, CELL - 2);
        });
    });

    bgCtx.globalAlpha = 1;
}

function tick(timestamp) {
    if (timestamp - lastMoveTime >= MOVE_INTERVAL) {
        ghosts.forEach(moveGhost);
        lastMoveTime = timestamp;
    }
    drawGhosts();
    requestAnimationFrame(tick);
}

export function startBackground() {
    resize();
    window.addEventListener("resize", () => {
        resize();
        initAllGhosts();
    });
    initAllGhosts();
    requestAnimationFrame(tick);
}
