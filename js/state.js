export const settings = {
    speed:       150,
    gridSize:    15,
    colorScheme: "classic",
};

export const state = {
    snake: [],
    direction:      { x: 1, y: 0 },
    directionQueue: [],
    food:       { x: 0, y: 0 },
    score:      0,
    highScore:  parseInt(localStorage.getItem("snakeHighScore") || "0"),
    gameState:  "title",
    intervalId: null,
};
