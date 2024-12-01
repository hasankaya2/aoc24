const fs = require('node:fs');
const text = fs.readFileSync("./input.txt").toString();
const linesArray = text.split(`\n`);
let result = 0;
const lrArray = {
    left : [],
    right : []
}
for(let i=0; i<linesArray.length; i++){
    let current = linesArray[i].split(`   `);
    lrArray.left.push(Number(current[0]));
    lrArray.right.push(Number(current[1]));
}
lrArray.left.sort();
lrArray.right.sort();
for(let i=0; i<linesArray.length; i++){
    result += Math.abs(lrArray.left[i]-lrArray.right[i]);    
}
console.log("Part 1: " + result);

let part2 = lrArray.left.reduce((p, c) => p + c * lrArray.right.filter(v => v == c).length, 0);
console.log("Part 2: " + part2);