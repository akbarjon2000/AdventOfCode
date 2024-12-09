const fs = require("fs");

// reading the input data and preprocessing:
let input = fs.readFileSync("/Users/akbarjon/AdventOfCode/Day7/input.txt", "utf-8").trim();
input = input.split("\n");


// Function to evaluate an expression with operators +, *, || from left to right
function evaluateExpression(nums, operators) {
    let result = nums[0];
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
            result += nums[i + 1];
        } else if (operators[i] === '*') {
            result *= nums[i + 1];
        } else if (operators[i] === '||') {
            // Concatenation operator (||): concatenate the numbers as strings and convert back to a number
            result = parseInt(result.toString() + nums[i + 1].toString());
        }
    }
    return result;
}

// Function to generate all possible combinations of operators +, *, || for a given list of numbers
function generateOperatorCombinations(numOperators) {
    const operators = ['+', '*', '||'];
    const combinations = [];
    const totalCombinations = Math.pow(3, numOperators); // 3^(numOperators) possibilities
    
    for (let i = 0; i < totalCombinations; i++) {
        let operatorsList = [];
        let n = i;
        for (let j = 0; j < numOperators; j++) {
            operatorsList.push(operators[n % 3]); // Choose operator based on remainder (0, 1, or 2)
            n = Math.floor(n / 3); // Move to the next combination
        }
        combinations.push(operatorsList);
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

        // Generate all combinations of +, *, || operators
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
