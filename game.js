const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const CELL_SIZE = 20;
const COLS = canvas.width / CELL_SIZE;   // 20 columns
const ROWS = canvas.height / CELL_SIZE;  // 20 rows

function drawGrid() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            ctx.fillStyle = (row + col) % 2 === 0 ? "#2d4a1e" : "#263d19";
            ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
}

drawGrid();
