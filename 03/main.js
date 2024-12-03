const fs = require('fs')
const data = fs.readFileSync('./input.txt').toString().trim()
const matches = data.matchAll(/mul\(([0-9]+),([0-9]+)\)/g)
let part1 = 0;
for (const value of matches) {
    part1 += Number(value[1]) * Number(value[2])
}
console.log("Part 1: " + part1)
const matches2 = data.matchAll(/don't\(\)|do\(\)|mul\(([0-9]+),([0-9]+)\)/g)
let part2 = 0;
let valid = true;
for (const value of matches2) {
    if (value[0] == "do()") {
        valid = true;
    } else if (value[0] == "don't()") {
        valid = false;
    } else if (valid) {
        part2 += Number(value[1]) * Number(value[2])
    }
}
console.log("Part 2: " + part2)
