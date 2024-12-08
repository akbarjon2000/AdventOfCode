const fs = require("fs");

// reading the input data and preprocessing:
let input = fs.readFileSync("/Users/akbarjon/AdventOfCode/Day6/small.txt", "utf-8").trim();
input = input.split("\n");
for(let i = 0; i < input.length; i++){
    input[i] = input[i].split("");
}


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
                console.log(input[curRow - 1][curCol]);
                input[curRow - 1][curCol] = 'X'
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
                input[curRow][curCol + 1] = 'X'
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
                input[curRow + 1][curCol] = 'X'
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
                input[curRow][curCol - 1] = 'X'
                curCol -= 1;
                if(visitedArr.indexOf(JSON.stringify([curRow, curCol])) == -1){
                    visitedArr.push(JSON.stringify([curRow, curCol]))
                };            
            }else{
                direction = 0;
            }
        }
    }

    console.log(visitedArr.length);
    console.log(visitedArr);
    console.log(input.join("\n"));

    
}

DistinctPositions(input);
