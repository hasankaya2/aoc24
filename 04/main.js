const fs = require('fs');
const grid = fs.readFileSync('./input.txt').toString().trim().split('\n').map(x => x.split(''))
let xmas = 0;
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        let v = grid[y][x];
        if (v == "X") {
            let r1 = grid[y][x + 1] ?? "";
            let r2 = grid[y][x + 2] ?? "";
            let r3 = grid[y][x + 3] ?? "";

            let l1 = grid[y][x - 1] ?? "";
            let l2 = grid[y][x - 2] ?? "";
            let l3 = grid[y][x - 3] ?? "";

            let u1 = grid[y + 1] ?? "";
            let u2 = grid[y + 2] ?? "";
            let u3 = grid[y + 3] ?? "";

            let d1 = grid[y - 1] ?? "";
            let d2 = grid[y - 2] ?? "";
            let d3 = grid[y - 3] ?? "";

            let ur1 = u1[x + 1] ?? "";
            let ur2 = u2[x + 2] ?? "";
            let ur3 = u3[x + 3] ?? "";

            let ul1 = u1[x - 1] ?? "";
            let ul2 = u2[x - 2] ?? "";
            let ul3 = u3[x - 3] ?? "";

            let dr1 = d1[x + 1] ?? "";
            let dr2 = d2[x + 2] ?? "";
            let dr3 = d3[x + 3] ?? "";

            let dl1 = d1[x - 1] ?? "";
            let dl2 = d2[x - 2] ?? "";
            let dl3 = d3[x - 3] ?? "";

            if (r1 + r2 + r3 == "MAS") xmas++;
            if (l1 + l2 + l3 == "MAS") xmas++;
            if (u1[x] + u2[x] + u3[x] == "MAS") xmas++;
            if (d1[x] + d2[x] + d3[x] == "MAS") xmas++;
            if (ur1 + ur2 + ur3 == "MAS") xmas++;
            if (ul1 + ul2 + ul3 == "MAS") xmas++;
            if (dr1 + dr2 + dr3 == "MAS") xmas++;
            if (dl1 + dl2 + dl3 == "MAS") xmas++;
        }
    }
}
console.log("Part 1: " + xmas)

let xmas2 = 0;
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
        let v = grid[y][x];
        if (v == "A") {
            let u1 = grid[y + 1] ?? "";
            let d1 = grid[y - 1] ?? "";

            let ur1 = u1[x + 1] ?? "";
            let ul1 = u1[x - 1] ?? "";
            let dr1 = d1[x + 1] ?? "";
            let dl1 = d1[x - 1] ?? "";

            if ((ul1 != dr1 && (ul1 == "M" || ul1 == "S") && (dr1 == "M" || dr1 == "S")) && (ur1 != dl1 && (ur1 == "M" || ur1 == "S") && (dl1 == "M" || dl1 == "S"))) {
                xmas2++;
            }
        }
    }
}
console.log("Part 2: " + xmas2)
