const fs = require('fs')
const [rules, updates] = fs.readFileSync('./input.txt').toString().trim().split('\n\n').map(x => x.split('\n').map(v => v.split(/\||,/g).map(Number)))
let part1 = 0;
let part2 = 0;
for (const update of updates) {
    let valid = true;
    for (const rule of rules) {
        let i1 = update.indexOf(rule[0])
        let i2 = update.indexOf(rule[1])
        if (i1 != -1 && i2 != -1 && i1 > i2) {
            valid = false
            break
        }
    }
    if (valid) { part1 += update[parseInt(update.length / 2)] } else {
        update.sort((a, b) => {
            if (a == b) return 0;
            for (const rule of rules) {
                if (a == rule[0] && b == rule[1]) {
                    return -1;
                }
                if (a == rule[1] && b == rule[0]) {
                    return 1;
                }
            }
            return 0;
        })
        part2 += update[parseInt(update.length / 2)];
    }
}
console.log("Part 1: " + part1)
console.log("Part 2: " + part2)

