const fs = require('fs')
const grid = fs.readFileSync('./input.txt').toString().trim().split('\n').map(v => v.split(''))
var path = new Map();
let start = grid.map((v, i) => [v.indexOf('^'), i]).filter(v => v[0] != -1)[0]
let dir = 0;
let pos = start

function move(pos, dir, obstacles) {
    switch (dir) {
        case 0: // up
            let d = Number.MAX_VALUE;
            let t = pos[1];
            for (const ob of obstacles.rows) {
                if (ob[1] < pos[1] && pos[1] - ob[1] < d) {
                    t = ob[1] - 1
                    d = pos[1] - ob[1]
                }
            }
            return t
        case 1: // right
            let d = Number.MAX_VALUE;
            let t = pos[0];
            for (const ob of obstacles.cols) {
                if (ob[0] < pos[0] && pos[0] - ob[1] < d) {
                    t = ob[1] - 1
                    d = pos[1] - ob[1]
                }
            }
            return t
    }
}

while (true) {
    let k = `${pos[0]},${pos[1]}`
    path.set(k, true)
    let move = (p, d) => {
        switch (d) {
            case 0: // up
                return [p[0], p[1] - 1]
            case 1: // right
                return [p[0] + 1, p[1]]
            case 2: // down
                return [p[0], p[1] + 1]
            case 3: // left
                return [p[0] - 1, p[1]]
        }
    }
    let next = move(pos, dir)
    let v = (grid[next[1]] ?? "")[next[0]] ?? ""
    if (v == "") break
    if (v == "#") {
        dir = (dir + 1) % 4
        next = move(pos, dir)
    }
    pos = next
}
console.log(`Part 1: ${path.size}`)

function check_loop(pos, obstacles) {

}

