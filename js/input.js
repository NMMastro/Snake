import { state } from "./state.js";

export function setupInput(startGame, openSettings) {
    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp":    if (state.direction.y === 0) state.direction = { x: 0, y: -1 }; break;
            case "ArrowDown":  if (state.direction.y === 0) state.direction = { x: 0, y: 1 };  break;
            case "ArrowLeft":  if (state.direction.x === 0) state.direction = { x: -1, y: 0 }; break;
            case "ArrowRight": if (state.direction.x === 0) state.direction = { x: 1, y: 0 };  break;
            case " ":          if (state.gameState === "title") startGame(); break;
            case "s":
            case "S":          if (state.gameState === "title") openSettings(); break;
            case "r":
            case "R":          if (state.gameState === "gameover") startGame(); break;
        }
    });
}
