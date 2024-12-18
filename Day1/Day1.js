const fs = require("fs");

// Read the input file
const input = fs.readFileSync("./input.txt", "utf-8").trim();

// Example: Split into lines
let lines = input.split("\n");
lines = lines.join("   ");
lines = lines.split("   ");
// console.log(lines);
let left = [];
let right = [];
for(let i = 0; i < lines.length - 1; i+=2){
    left.push(parseInt(lines[i]));
    right.push(parseInt(lines[i+1]));
}
left = left.sort((a, b) => a-b);
right = right.sort((a, b) => a-b);

const totalDist = () => {

    let dist = 0;
    for(let i = 0; i < left.length; i++){
        dist += Math.abs(left[i] - right[i]);
    }
    return dist;
}

const similarityScore = () => {
    let index;
    let count = 0;
    let score = 0;
    for(let i = 0; i < left.length; i++){
        count = 0;
        index = right.indexOf(left[i]);
        if(index != -1){
            while(left[i] == right[index]){
                count++;
                index++;
            }
        }
        score += left[i] * count;
    }
    return score;
}

// console.log(totalDist());
console.log(similarityScore());
