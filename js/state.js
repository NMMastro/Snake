export const state = {
    snake: [
        { x: 10, y: 10 },
        { x: 9,  y: 10 },
        { x: 8,  y: 10 },
    ],
    direction: { x: 1, y: 0 },
    food: { x: 0, y: 0 },
    score: 0,
    gameState: "title",  // "title" | "playing" | "gameover"
    intervalId: null,
};
