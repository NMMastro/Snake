import { state } from "./state.js";
import { playButtonSound } from "./audio.js";

function enqueueDirection(newDir) {
    const last = state.directionQueue.length > 0
        ? state.directionQueue[state.directionQueue.length - 1]
        : state.direction;

    if (newDir.x === last.x  && newDir.y === last.y)  return;
    if (newDir.x === -last.x && newDir.y === -last.y) return;

    if (state.directionQueue.length < 2) {
        state.directionQueue.push(newDir);
    }
}

export function setupInput(startGame, togglePause) {
    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp":    enqueueDirection({ x: 0, y: -1 }); break;
            case "ArrowDown":  enqueueDirection({ x: 0, y: 1 });  break;
            case "ArrowLeft":  enqueueDirection({ x: -1, y: 0 }); break;
            case "ArrowRight": enqueueDirection({ x: 1, y: 0 });  break;
            case " ":
                if (state.gameState === "title")                                        { playButtonSound(); startGame();    }
                else if (state.gameState === "playing" || state.gameState === "paused") { playButtonSound(); togglePause();  }
                break;
            case "Escape":
                if (state.gameState === "playing" || state.gameState === "paused")      { playButtonSound(); togglePause();  }
                break;
            case "r":
            case "R":
                if (state.gameState === "gameover")                                     { playButtonSound(); startGame();    }
                break;
        }
    });
}
