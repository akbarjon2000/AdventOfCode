const fs = require("fs");

let input = fs.readFileSync("/Users/akbarjon/AdventOfCode/Day 3/input.txt", "utf-8").trim();
// console.log(input.length)
// input = input.slice(0, 567) + input.slice(571);
// console.log(input.length)

input = (input).split('do()').map(a => a.split('don\'t()'[0]));
text = ''
let exp = ''
for(let i = 0; i < input.length; i++){
    for(let j = 0; j < input[i].length; j++){
        exp =  input[i][j][0] + input[i][j][1] + input[i][j][2] + input[i][j][3]+ input[i][j][4] + input[i][j][5];
        if(exp != "on't()"){
            console.log(input[i][j]);
            text += input[i][j];
        }

    }
}

// console.log(text);
input = text;
const readInput = () => {
    // Read the input file
    input = input.split("mul");
    let str = '';
    let arr = []

    for(let i = 1; i < input.length; i++){
        for(let j = 0; j < input[i].length; j++){
            if(input[i][0] == '('){
                if(input[i][j] != ')' && j < 8){
                    str += input[i][j];
                }else{
                    str += input[i][j];
                    break;
                }
            }
        }
        arr.push(str);
        str = '';
    }
    let item;
    let arr2 = [];
    for (let i =0; i < arr.length; i++){
        item = arr[i]
        if(item[0] == '(' && item[item.length - 1] == ')'){
            for(let i = 1; i < item.length -1; i++){
                if(!isNaN(item[i]) || item[i] == ','){
                    str += item[i];
                }else{
                    str = '';
                    break;
                }
            }
            if(str.length) arr2.push(str.split(','));
            str = '';
        }
        
    }

    return arr2;

}

const multp = () => {
    let arr = readInput();
    let res = 0;
    for(let i = 0; i < arr.length; i++){
        res+= parseInt(arr[i][0]) * parseInt(arr[i][1]);
    }
    return res;
}

console.log(multp());

// console.log(isNaN("%"))
// console.log(',' === ',')
