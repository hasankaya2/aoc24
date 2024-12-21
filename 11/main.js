const fs = require('fs')
const data = fs.readFileSync('./input.txt').toString().trim().split(' ').map(Number)
function engrave(count) {
    let nums = new Map()
    data.forEach(v => {
        if (!nums.has(v)) nums.set(v, 0)
        nums.set(v, nums.get(v) + 1)
    })
    for (let i = 0; i < count; i++) {
        let news = [...nums.entries()].flatMap(([v, c]) => {
            nums.delete(v)
            let k = v.toString()
            let m = Math.floor(k.length / 2)
            if (v == 0) return [[1, c]]
            if (k.length % 2 == 0) return [[Number(k.substring(0, m)), c], [Number(k.substring(m)), c]]
            return [[v * 2024, c]]
        })
        news.forEach(([t, c]) => {
            if (!nums.has(t)) nums.set(t, 0)
            nums.set(t, nums.get(t) + c)
        })
    }
    return [...nums.values()].reduce((p, c) => p + c, 0)
}
console.log(`Part 1: ${engrave(25)}`)
console.log(`Part 2: ${engrave(75)}`)
