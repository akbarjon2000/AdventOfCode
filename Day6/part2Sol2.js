const fs = require("fs");

// reading the input data and preprocessing:
let input = fs.readFileSync("/Users/akbarjon/AdventOfCode/Day6/input.txt", "utf-8").trim();
input = input.split("\n");
// for(let i = 0; i < input.length; i++){
//     input[i] = input[i].split("");
// }

function findObstructionPositions(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Up, Right, Down, Left
    let startingPos = null;
    let startingDir = 0; // Facing up

    // Locate the guard's starting position
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === "^") {
                startingPos = [r, c];
                break;
            }
        }
        if (startingPos) break;
    }

    function simulate(grid, start, direction) {
        // Simulate the guard's movement and check if it enters a loop
        const visited = new Set();
        let [r, c] = start;
        let d = direction;

        while (r >= 0 && r < rows && c >= 0 && c < cols) {
            const state = `${r},${c},${d}`;
            if (visited.has(state)) {
                return true; // Loop detected
            }
            visited.add(state);

            // Determine the next move
            const [dr, dc] = directions[d];
            if (r + dr >= 0 && r + dr < rows && c + dc >= 0 && c + dc < cols && grid[r + dr][c + dc] === ".") {
                r += dr;
                c += dc;
            } else {
                d = (d + 1) % 4; // Turn right
            }
        }

        return false; // No loop
    }

    let validPositions = 0;

    // Try placing an obstruction at every valid position
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === "." && !(r === startingPos[0] && c === startingPos[1])) {
                // Temporarily place obstruction
                grid[r] = grid[r].slice(0, c) + "#" + grid[r].slice(c + 1);
                if (simulate(grid, startingPos, startingDir)) {
                    validPositions++;
                }
                // Remove obstruction
                grid[r] = grid[r].slice(0, c) + "." + grid[r].slice(c + 1);
            }
        }
    }

    return validPositions;
}

// Run the function
console.log(findObstructionPositions(input)); // Output: 6
