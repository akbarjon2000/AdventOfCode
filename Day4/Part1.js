const fs = require("fs");

let input = fs.readFileSync("/Users/akbarjon/AdventOfCode/Day4/input.txt", "utf-8").trim();
input = input.split("\n");


function countWordOccurrences(grid, word) {
    const rows = grid.length;
    const cols = grid[0].length;
    const wordLength = word.length;
    let count = 0;

    // Directions: [row_increment, col_increment]
    const directions = [
        [0, 1],   // Horizontal right
        [0, -1],  // Horizontal left
        [1, 0],   // Vertical down
        [-1, 0],  // Vertical up
        [1, 1],   // Diagonal bottom-right
        [-1, -1], // Diagonal top-left
        [1, -1],  // Diagonal bottom-left
        [-1, 1],  // Diagonal top-right
    ];

    function isValid(x, y) {
        return x >= 0 && x < rows && y >= 0 && y < cols;
    }

    function checkDirection(x, y, dx, dy) {
        for (let i = 0; i < wordLength; i++) {
            const nx = x + i * dx;
            const ny = y + i * dy;
            if (!isValid(nx, ny) || grid[nx][ny] !== word[i]) {
                return false;
            }
        }
        return true;
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Check all directions from the current cell
            for (const [dx, dy] of directions) {
                if (checkDirection(row, col, dx, dy)) {
                    count++;
                }
            }
        }
    }

    return count;
}

// Example input
const grid = input;

// Convert grid to a 2D array of characters
const charGrid = grid.map(row => row.split(""));

console.log(countWordOccurrences(charGrid, "XMAS")); // Output: 18
