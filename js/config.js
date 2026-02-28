export const CANVAS_SIZE = 315; // logical render size - CSS handles display scaling

export const SPEED_OPTIONS = {
    slow:   200,
    normal: 150,
    fast:   75,
};

export const SIZE_OPTIONS = {
    small:  9,
    medium: 15,
    large:  21,
};

export const COLOR_SCHEMES = {
    classic: {
        gridEven:  "#2d4a1e",
        gridOdd:   "#263d19",
        snakeHead: "#a8e063",
        snakeBody: "#5cb85c",
        food:      "#e74c3c",
    },
    ocean: {
        gridEven:  "#1a3a4a",
        gridOdd:   "#152f3d",
        snakeHead: "#63d4e0",
        snakeBody: "#3a9ba5",
        food:      "#e7c53c",
    },
    sunset: {
        gridEven:  "#3a1a1a",
        gridOdd:   "#2d1515",
        snakeHead: "#f0a070",
        snakeBody: "#c05030",
        food:      "#f0e040",
    },
    mono: {
        gridEven:  "#2a2a2a",
        gridOdd:   "#222222",
        snakeHead: "#ffffff",
        snakeBody: "#aaaaaa",
        food:      "#555555",
    },
};
