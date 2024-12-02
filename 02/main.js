const fs = require('fs');
const data = fs.readFileSync('./input.txt').toString().trim();
const d1 = data.split(`\n`);
const mainArray = [];
d1.forEach((item) => {
    mainArray.push(item.split(` `).map(Number));
})

const checkSafety = (item) => {
    let increase = null;
    let status = true;
    for (let i = 1; i < item.length; i++) {
        let diff = Math.abs(item[i - 1] - item[i])
        if (0 < diff && diff <= 3) {
            if (increase != null && (item[i - 1] < item[i]) != increase) {
                status = false;
                break;
            } else {
                increase = (item[i - 1] < item[i]);
            }
        } else {
            status = false;
            break;
        }

    }
    return status;
};

let safe1 = 0;
mainArray.forEach((arr) => {
    safe1 += checkSafety(arr) ? 1 : 0;
})
console.log("Part 1: " + safe1);

let safe2 = 0;
mainArray.forEach((arr) => {
    let ei = checkSafety(arr);
    if (!ei) {
        arr.forEach((e, i)=> {
            let t = Array.from(arr);
            t.splice(i, 1);
            if (checkSafety(t)) {
                ei = true;
            }
        });
    }
    safe2 += ei == true ? 1 : 0;
})
console.log("Part 2: " + safe2);
