const fs = require('fs')
const data = fs.readFileSync('./input.txt').toString().split('\n').map(v => v.split(': ')).map(v => [Number(v[0]), v[1].split(' ').map(Number)])
function cme(nums, acc, op, target, p2){
    const num = nums.shift()
    switch (op) {
        case 0:
            acc += num
            break
        case 1:
            acc *= num
            break
        case 2:
            acc = Number(`${acc}${num}`)
            break
    }
    if (nums.length == 0) return acc == target ? 1 : 0
    return cme(nums.slice(), acc, 0, target, p2) + cme(nums.slice(), acc, 1, target, p2) + (p2 ? cme(nums.slice(), acc, 2, target, p2) : 0)
}
let sum = data.map(v => cme(v[1].slice(), 0, 0, v[0], false) > 0 ? v[0] : 0).reduce((a, b) => a + b, 0)
console.log(`Part 1: ${sum}`)
let sum2 = data.map(v => cme(v[1].slice(), 0, 0, v[0], true) > 0 ? v[0] : 0).reduce((a, b) => a + b, 0)
console.log(`Part 2: ${sum2}`)
