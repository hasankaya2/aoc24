const fs = require('fs')
const grid = fs.readFileSync('./input.txt').toString().trim().split('\n').map(l => l.split(''))
let rid = 0
let regions = new Map()
let closed = new Map()
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
        if (closed.has(`${y},${x}`)) continue
        let v = grid[y][x]
        let perimeter = 0
        let visited = new Map()
        let open = [[y, x]]
        while (open.length > 0) {
            let [cy, cx] = open.pop()
            let hash = `${cy},${cx}`
            if (!closed.has(hash)) {
                closed.set(hash, true)
                visited.set(hash, [cy, cx])
                for (const [ny, nx] of [[-1, 0], [1, 0], [0, 1], [0, -1]]) {
                    let v2 = (grid[cy + ny] ?? "")[cx + nx] ?? ""
                    if (v2 != v) {
                        perimeter++
                    } else if (v2 != '' && !closed.has(`${cy + ny},${cx + nx}`)) {
                        open.push([cy + ny, cx + nx])
                    }
                }
            }
        }
        let is_solid = (i, j) => visited.has(`${i},${j}`)
        let corners = 0
        for (const [cy, cx] of visited.values()) {
            let up = is_solid(cy - 1, cx)
            let down = is_solid(cy + 1, cx)
            let right = is_solid(cy, cx + 1)
            let left = is_solid(cy, cx - 1)
            let up_r = is_solid(cy - 1, cx + 1)
            let down_r = is_solid(cy + 1, cx + 1)
            let up_l = is_solid(cy - 1, cx - 1)
            let down_l = is_solid(cy + 1, cx - 1)

            corners += (up && right && !up_r) + (up && left && !up_l) + (down && right && !down_r) + (down && left && !down_l)
            if ((!up && !left) || (!up && !right) || (!down && !left) || (!down && !right)) {
                corners += Math.max(1, 4 - 2 * (up + down + left + right))
            }
        }
        regions.set(v + (rid++).toString(), [visited.size, perimeter, corners])
    }
}
console.log(`Part 1: ${[...regions.values()].map(v => v[0] * v[1]).reduce((p, c) => p + c, 0)}`)
console.log(`Part 2: ${[...regions.values()].map(v => v[0] * v[2]).reduce((p, c) => p + c, 0)}`)
