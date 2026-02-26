import { state } from "./state.js";

function enqueueDirection(newDir) {
    const last = state.directionQueue.length > 0
        ? state.directionQueue[state.directionQueue.length - 1]
        : state.direction;

    // reject if same direction or exact opposite
    if (newDir.x === last.x && newDir.y === last.y) return;
    if (newDir.x === -last.x && newDir.y === -last.y) return;

    // cap queue at 2 to prevent input buffering feeling sluggish
    if (state.directionQueue.length < 2) {
        state.directionQueue.push(newDir);
    }
}

export function setupInput(startGame, togglePause, openSettings) {
    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp":    enqueueDirection({ x: 0, y: -1 }); break;
            case "ArrowDown":  enqueueDirection({ x: 0, y: 1 });  break;
            case "ArrowLeft":  enqueueDirection({ x: -1, y: 0 }); break;
            case "ArrowRight": enqueueDirection({ x: 1, y: 0 });  break;
            case " ":          if (state.gameState === "title") startGame(); break;
            case "Escape":     if (state.gameState === "playing" || state.gameState === "paused") togglePause(); break;
            case "s":
            case "S":          if (state.gameState === "title" || state.gameState === "gameover") openSettings(); break;
            case "r":
            case "R":          if (state.gameState === "gameover") startGame(); break;
        }
    });
}
