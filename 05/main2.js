const fs = require('fs')
const data = fs.readFileSync('./input2.txt').toString().trim().split('\n\n').map(val => val.split('\n'));
console.log(data);
