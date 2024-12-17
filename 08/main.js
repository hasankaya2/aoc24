const fs = require('fs')
const grid = fs.readFileSync('./input.txt').toString().trim().split('\n').map(l => l.split('').map(v => [v]))
const antennas = grid.flatMap((v, i) => v.map((s, j) => [i, j, s[0]])).filter(v => v[2] != '.')
const antinodes = new Set()
for (const [y, x, f] of antennas) {
    for (const [yy, xx, f2] of antennas) {
        if ((x == xx && y == yy) || f != f2) continue
        let n = [2 * yy - y, 2 * xx - x]
        if (n[0] >= 0 && n[0] < grid.length && n[1] >= 0 && n[1] < grid[0].length) {
            antinodes.add(n[0] + " " + n[1])
        }
    }
}
console.log(`Part 1: ${antinodes.size}`)
const antinodes2 = new Set()
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
        let d = []
        for (const [yy, xx, f] of antennas) {
            d.push(((yy-y) / (xx-x)) + "|" + f)
        }
        let dd = [...new Set(d)]
        if (d.length != dd.length || grid[y][x] != '.') antinodes2.add([y, x])
    }
}
console.log(`Part 2: ${antinodes2.size}`)
