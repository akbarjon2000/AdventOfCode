const fs = require("fs");



const readInput = () => {
    // Read the input file
    const input = fs.readFileSync("/Users/akbarjon/AdventOfCode/Day2/input.txt", "utf-8").trim();
    let lines = input.split("\n");
    let temp = [];
    for(let i = 0; i < lines.length;i++){
        temp = lines[i].split(" ");
        for(let j = 0; j < temp.length; j++){
            temp[j] = parseInt(temp[j]);
        }
        lines[i] = temp;
    }
    return lines;

}

const safeReport = () => {
    let input = readInput();
    // console.log(input);
    let res = 0;
    let safe = 0;
    let sign = 0;
    let tempSign = 0
    for (let i = 0; i < input.length; i++){
        //checking sign
        if(input[i][1] - input[i][0] > 0){
            sign = 1;
        }else{
            sign = -1;
        }
        console.log(input[i][1] - input[i][0]);
        for(let j = 0; j < input[i].length - 1; j++){
            //checking tempsign
            if(input[i][j+1] - input[i][j] > 0){
                tempSign = 1;
            }else{
                tempSign = -1;
            }
            //checking safety:
            if(sign == tempSign){
                if(sign==1){
                    if(input[i][j+1] - input[i][j] > 0 && input[i][j+1] - input[i][j] < 4){
                        safe = 1;
                    }else{
                        safe = 0;
                        break;
                    }
                }else if(sign == -1){
                    if(input[i][j] - input[i][j+1] > 0 && input[i][j] - input[i][j+1] < 4){
                        safe = 1;
                    }else{
                        safe = 0;
                        break;
                    }
                }
            }else{
                safe = 0;
                break;
            }
        }
        console.log(" safe:", safe);
        if(safe){res+=1;}
        safe = 0;
    }
    return res;
}

const tolerate = () => {
    let input = readInput();
    // console.log(input);
    let res = 0;
    let safe = 0;
    let sign = 0;
    let tempSign = 0
    let chance = 1;
    for (let i = 0; i < input.length; i++){
        //checking sign
        if(input[i][1] - input[i][0] > 0){
            sign = 1;
        }else{
            sign = -1;
        }
        console.log(input[i])
        // console.log(input[i][1] - input[i][0]);
        for(let j = 0; j < input[i].length - 1; j++){
            //checking tempsign
            if(input[i][j+1] - input[i][j] > 0){
                tempSign = 1;
            }else{
                tempSign = -1;
            }
            //checking safety:
            if(sign == tempSign){
                if(sign==1){
                    if(input[i][j+1] - input[i][j] > 0 && input[i][j+1] - input[i][j] < 4){
                        safe = 1;
                    }else{
                        if(chance){
                            chance = 0;
                            input[i].splice(j+1, 1);
                            continue;
                        }
                        safe = 0;
                        break;
                    }
                }else if(sign == -1){
                    if(input[i][j] - input[i][j+1] > 0 && input[i][j] - input[i][j+1] < 4){
                        safe = 1;
                    }else{
                        if(chance){
                            chance = 0;
                            input[i].splice(j+1, 1);
                            continue;
                        }
                        safe = 0;
                        break;
                    }
                }
            }else{
                if(chance){
                    input[i].splice(j+1, 1);
                    chance = 0;
                    continue;
                }
                safe = 0;
                break;
            }
            chance = 1;
        }
        console.log(input[i])
        console.log(" safe:", safe);
        if(safe){res+=1;}
        safe = 0;
    }
    return res;
}
// console.log(tolerate());




function isStrictlyIncreasing(arr) {
    for (let i = 1; i < arr.length; i++) {
        let diff = arr[i] - arr[i - 1];
        if (diff < 1 || diff > 3) {
            return false;
        }
    }
    return true;
}

function isStrictlyDecreasing(arr) {
    for (let i = 1; i < arr.length; i++) {
        let diff = arr[i - 1] - arr[i];
        if (diff < 1 || diff > 3) {
            return false;
        }
    }
    return true;
}

function countSafeReports(reports) {
    let safeCount = 0;

    for (let report of reports) {
        if (isStrictlyIncreasing(report) || isStrictlyDecreasing(report)) {
            safeCount++;
            continue;
        }

        // Check if removing one level makes it safe
        let dampenedSafe = false;
        for (let i = 0; i < report.length; i++) {
            let modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
            if (isStrictlyIncreasing(modifiedReport) || isStrictlyDecreasing(modifiedReport)) {
                dampenedSafe = true;
                break;
            }
        }

        if (dampenedSafe) {
            safeCount++;
        }
    }

    return safeCount;
}

// Example Input
let reports = readInput();

// Output
console.log("Number of safe reports:", countSafeReports(reports));
