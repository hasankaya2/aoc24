const fs = require('fs')
const grid = fs.readFileSync('./input.txt').toString().trim().split('\n').map(l => l.split('').map(x => Number(x)))
const ths = grid.flatMap((l, i) => l.map((v, j) => [i, j, v])).filter(v => v[2] == 0)
function traverse(p1) {
    let score = 0
    for (const th of ths) {
        let open = [th]
        let closed = {}
        while (open.length > 0) {
            let curr = open.pop()
            if (curr[2] == 9) {
                score++
                continue
            }
            for (const [ny, nx] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
                let dia = [curr[0] + ny, curr[1] + nx, curr[2] + 1]
                if (dia[0] >= 0 && dia[0] < grid.length && dia[1] >= 0 && dia[1] < grid[0].length && grid[dia[0]][dia[1]] == curr[2] + 1 && (!p1 || !closed.hasOwnProperty(dia))) {
                    open.push([dia[0], dia[1], curr[2] + 1])
                    if (p1) closed[dia] = true
                }
            }
        }
    }
    return score
}
console.log(`Part 1: ${traverse(true)}`)
console.log(`Part 2: ${traverse(false)}`)
