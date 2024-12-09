const fs = require("fs");

// reading the input data and preprocessing:
let input = fs.readFileSync("/Users/akbarjon/AdventOfCode/Day7/input.txt", "utf-8").trim();
input = input.split("\n");


// Function to evaluate an expression with operators + and * from left to right
function evaluateExpression(nums, operators) {
    let result = nums[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            result += nums[i + 1];
        } else if (operators[i] === '*') {
            result *= nums[i + 1];
        }
    }
    return result;
}

// Function to generate all possible combinations of operators for a given list of numbers
function generateOperatorCombinations(numOperators) {
    const combinations = [];
    const totalCombinations = Math.pow(2, numOperators); // 2^(numOperators) possibilities
    
    for (let i = 0; i < totalCombinations; i++) { // 4 [0, 1, 2, 3]
        let operators = [];
        for (let j = 0; j < numOperators; j++) {// 2 [0, 1]
            operators.push((i >> j) & 1 ? '*' : '+'); // Use binary to decide * or +
        }
        combinations.push(operators);
    }
    
    return combinations;
}

// Main function to solve the puzzle
function solvePuzzle(input) {
    let totalCalibrationResult = 0;

    input.forEach(line => {
        const [testValue, numsStr] = line.split(':');
        const target = parseInt(testValue);
        const nums = numsStr.trim().split(' ').map(Number);
        const numOperators = nums.length - 1;

        // Generate all combinations of + and *
        const operatorCombinations = generateOperatorCombinations(numOperators);

        let valid = false;

        // Check each operator combination
        operatorCombinations.forEach(operators => {
            if (evaluateExpression(nums, operators) === target) {
                valid = true;
            }
        });

        // If any valid combination exists, add the test value to the total
        if (valid) {
            totalCalibrationResult += target;
        }
    });

    return totalCalibrationResult;
}


// Solve the puzzle and print the result
const result = solvePuzzle(input);
console.log(result); // Output the sum of valid test values
