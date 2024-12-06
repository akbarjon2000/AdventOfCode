const fs = require("fs");

let input = fs.readFileSync("/Users/akbarjon/AdventOfCode/Day4/input.txt", "utf-8").trim();
input = input.split("\n");

function countXMasPatterns(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    // Check if a diagonal sequence matches "MAS" or "SAM"
    function isMASorSAM(x, y, dx, dy) {
        const mas = ["M", "A", "S"];
        const sam = ["S", "A", "M"];
        let diagonal = [];
        for (let i = 0; i < 3; i++) {
            const nx = x + i * dx;
            const ny = y + i * dy;
            if (nx < 0 || nx >= rows || ny < 0 || ny >= cols) return false;
            diagonal.push(grid[nx][ny]);
        }
        return diagonal.join('') === mas.join('') || diagonal.join('') === sam.join('');
    }

    // Traverse the grid to find all X-MAS patterns
    for (let x = 1; x < rows - 1; x++) {
        for (let y = 1; y < cols - 1; y++) {
            if (grid[x][y] === "A") {
                const topLeftBottomRight = isMASorSAM(x - 1, y - 1, 1, 1);
                const topRightBottomLeft = isMASorSAM(x - 1, y + 1, 1, -1);
                if (topLeftBottomRight && topRightBottomLeft) {
                    count++;
                }
            }
        }
    }

    return count;
}

// Example grid
const grid = input;

// Convert grid to a 2D array of characters
const charGrid = grid.map(row => row.split(""));

console.log(countXMasPatterns(charGrid)); // Output: 9

