const fs = require("fs");

// reading the input data and preprocessing:
let input = fs.readFileSync("/Users/akbarjon/AdventOfCode/Day6/small.txt", "utf-8").trim();
input = input.split("\n");
for(let i = 0; i < input.length; i++){
    input[i] = input[i].split("");
}

// console.log(input.join('\n'));

//Finding the distinct visited positions:
const DistinctPositions = (input) => {
    let visitedArr = []
    let direction = 0; // Direction 0 is default(up), 1 is right, 2 is down, 3 is left;
    let rows = input.length;
    let cols = input[0].length;

    //set current position:
    let curRow;
    let curCol;
    for(let row of input){
        if(row.indexOf("^") != -1){
            curRow = input.indexOf(row)
            curCol = row.indexOf("^");
        }
    }
    visitedArr.push(JSON.stringify([curRow, curCol]));

    while((curRow != rows - 1 && curRow != 0) && (curCol != cols - 1 && curCol != 0)){
        
        if(direction == 0){
            if(input[curRow - 1][curCol] != "#"){
                // console.log(input[curRow][curCol])
                curRow -= 1;
                if(visitedArr.indexOf(JSON.stringify([curRow, curCol])) == -1){
                    visitedArr.push(JSON.stringify([curRow, curCol]));
                };
            }else{
                direction++;
            }
        }else if(direction == 1){
            if(input[curRow][curCol + 1] != "#"){
                // console.log(input[curRow][curCol])
                curCol += 1;
                if(visitedArr.indexOf(JSON.stringify([curRow, curCol])) == -1){
                    visitedArr.push(JSON.stringify([curRow, curCol]))
                };            
            }else{
                direction++;
            }
        }else if(direction == 2){
            if(input[curRow + 1][curCol] != "#"){
                // console.log(input[curRow][curCol])
                curRow += 1;
                if(visitedArr.indexOf(JSON.stringify([curRow, curCol])) == -1){
                    visitedArr.push(JSON.stringify([curRow, curCol]))
                };            
            }else{
                direction++;
            }
        }else if(direction == 3){
            if(input[curRow][curCol - 1] != "#"){
                // console.log(input[curRow][curCol])
                curCol -= 1;
                if(visitedArr.indexOf(JSON.stringify([curRow, curCol])) == -1){
                    visitedArr.push(JSON.stringify([curRow, curCol]))
                };            
            }else{
                direction = 0;
            }
        }
    }

    return visitedArr;

    
}

let unique = DistinctPositions(input);
console.log(unique.length)

//Loop detector:
const LoopDetected = (input) => {
    let obstacleArr = new Set(); // Use Set for faster lookup of visited positions
    let direction = 0; // 0 = up, 1 = right, 2 = down, 3 = left
    const rows = input.length;
    const cols = input[0].length;

    // Locate the starting position (where "^" is)
    let curRow, curCol;
    for (let row = 0; row < rows; row++) {
        if (input[row].indexOf("^") !== -1) {
            curRow = row;
            curCol = input[row].indexOf("^");
            break;
        }
    }

    // Loop until we exit the grid or detect a loop
    while (curRow >= 0 && curRow < rows && curCol >= 0 && curCol < cols) {
        const currentKey = `${curRow},${curCol},${direction}`;

        // If we've visited this position with the same direction, it's a loop
        if (obstacleArr.has(currentKey)) {
            return true;
        }

        // Mark the current position with direction as visited
        obstacleArr.add(currentKey);

        // Move based on the current direction
        if (direction === 0) {
            // Moving up
            if (curRow > 0 && input[curRow - 1][curCol] === ".") {
                curRow--;
            } else {
                direction = (direction + 1) % 4; // Turn right
            }
        } else if (direction === 1) {
            // Moving right
            if (curCol < cols - 1 && input[curRow][curCol + 1] === ".") {
                curCol++;
            } else {
                direction = (direction + 1) % 4; // Turn down
            }
        } else if (direction === 2) {
            // Moving down
            if (curRow < rows - 1 && input[curRow + 1][curCol] === ".") {
                curRow++;
            } else {
                direction = (direction + 1) % 4; // Turn left
            }
        } else if (direction === 3) {
            // Moving left
            if (curCol > 0 && input[curRow][curCol - 1] === ".") {
                curCol--;
            } else {
                direction = (direction + 1) % 4; // Turn up
            }
        }
    }

    // If we exit the grid, no loop was detected
    return false;
};

console.log(LoopDetected(input))
// console.log([ '[0,4,0]' ].indexOf('[0,4,1]'))
//Finding loop causing Obstacles:

const LoopCounter = (unique, input) => {
    let count = 0;
    let temp;
    let obstacle;
    let obstacles = [];
    // console.log(unique);
    // console.log(input);
    for(let i = 1; i < unique.length; i++){
        temp = input;
        obstacle = JSON.parse(unique[i]);
        // console.log(obstacle);
        temp[obstacle[0]][obstacle[1]] = "O";
        if(LoopDetected(temp, obstacle)){
            count++;
            obstacles.push(obstacle);
        }
        // console.log(cond);
        temp[obstacle[0]][obstacle[1]] = ".";

    }
    console.log(count);
    // console.log(obstacles);
}
// LoopCounter(unique, input);