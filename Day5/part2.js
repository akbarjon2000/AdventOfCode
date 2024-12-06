const fs = require("fs");

// reading rules and data preprocessing
let rules = fs.readFileSync("/Users/akbarjon/AdventOfCode/Day5/rules.txt", "utf-8").trim();
rules = rules.split("\n");

for(let i = 0; i < rules.length; i++){
    rules[i] = rules[i].split("|");
}


//Sorting rules into object;
const ruleObjectification = (rules) => {
    let sortedRules = rules.sort((a, b) => a[0] - b[0]);
    let rulesObject = {};

    sortedRules.map(rule => {
        if(rulesObject.hasOwnProperty(rule[0])){
            rulesObject[rule[0]].push(rule[1]);
        }else{
            rulesObject[rule[0]] = [rule[1]];
        }
    })

    for(let rule in rulesObject){
        rulesObject[rule].sort((a, b) => a-b);
    }

    return rulesObject;
}

let rulesObj = ruleObjectification(rules);

//reading updates and data preprocessing
let updates = fs.readFileSync("/Users/akbarjon/AdventOfCode/Day5/updates.txt", "utf-8").trim();
updates = updates.split("\n");


for(let i = 0; i < updates.length; i++){
    updates[i] = updates[i].split(",");
}

// Finding incorrect updates:

const FindIncorrect = (rulesObj,updates) => {
    let incorrectUpdates = [];
    let correct = true;
    for(let update of updates){
        correct = true;
        for(let i = 1; i < update.length; i++){
            for(let j = 0; j < i; j++){
                if(rulesObj[update[i]].indexOf(update[j]) != -1){
                    correct = false;
                    incorrectUpdates.push(update);
                    break;
                }
            }
            if(!correct) break;
        }
    }
    return incorrectUpdates;
}

let incorrectUpdates = FindIncorrect(rulesObj, updates);

// Correcting Incorrect Updates:

const CorrectingUpdates = (rulesObj, incorrectUpdates) => {
    for(let update of incorrectUpdates){
        for(let i = 1; i < update.length; i++){
            for(let j = 0; j < i; j++){
                if(rulesObj[update[i]].indexOf(update[j]) != -1){
                    if(update.indexOf(update[i]) > update.indexOf(update[j])){
                        update.splice(update.indexOf(update[j]), 0, update.splice(update.indexOf(update[i]), 1)[0]);
                    }
                }
            }
        }
    }
    return incorrectUpdates;
}

let correctUpdates = CorrectingUpdates(rulesObj, incorrectUpdates);

// func to find the center of correct update.
const findCenter = (update) => {
    let len = update.length;
    let center = Math.floor(len / 2);
    return parseInt(update[center]);
}

// finding correct updates and return the sum of their centers;
const SumOfCorrectUpdate = (updates) => {
    let sum = 0;
    for(let update of updates){
        sum += findCenter(update);
    }
    return sum;
}

console.log(SumOfCorrectUpdate(correctUpdates));