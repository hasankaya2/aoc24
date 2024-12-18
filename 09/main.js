const fs = require('fs');
const data = fs.readFileSync('./input.txt').toString().trim().split('')
let blocks = []
data.forEach((b, i) => {
    for (let j = 0; j < Number(b); j++) {
        blocks.push(i % 2 == 0 ? (i / 2).toString() : '.')
    }
})
let lidx = 0;
let ridx = blocks.length - 1;
while (true) {
    while (blocks[lidx] != '.' && lidx < ridx) {
        lidx++
    }
    while (blocks[ridx] == '.' && lidx < ridx) {
        ridx--
    }
    blocks[lidx] = blocks[ridx]
    blocks[ridx] = '.'
    lidx++
    ridx--
    if (lidx >= ridx) break
}
let part1 = 0
blocks.forEach((v, i) => {
    if (v != '.') part1 += Number(v) * i
})
console.log(`Part 1: ${part1}`)

let blocks2 = []
data.forEach((v, i) => {
    blocks2.push([Number(v), i % 2 == 0 ? (i / 2).toString() : '.'])
})
for (let i = blocks2.length - 1; i >= 0; i--) {
    let b = blocks2[i]
    if (b[1] != '.') {
        let f = blocks2.findIndex((v, j) => v[1] == '.' && v[0] >= b[0] && j < i)
        if (f != -1) {
            blocks2[i] = [b[0], '.']
            blocks2 = [...blocks2.slice(0, f), b, [blocks2[f][0] - b[0], '.'], ...blocks2.slice(f + 1)]
        }
    }
}
let part2 = 0
let t = 0
blocks2.forEach(v => {
    if (v[1] != '.') {
        for (let z = 0; z < v[0]; z++) part2 += Number(v[1]) * (z + t)
    }
    t += v[0]
})
console.log(`Part 2: ${part2}`)
