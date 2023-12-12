const fs = require('fs');


function valideArrangement(row, pos) {
    var res = true;
    row = row.split('.').filter(e => e !== '');
    if (row.length !== pos.length) { return false; }
    for (let i = 0; i < pos.length; i++) {
        if (row[i] === undefined || row[i].length !== pos[i]) { res = false; }
    }
    return res;
}

function generateArrangements(n) {
    if (n === 0) {
        return [[]];
    }
    else {
        const prev = generateArrangements(n - 1);
        const res = [];
        for (let arrangement of prev) {
            res.push([...arrangement, 0]);
            res.push([...arrangement, 1]);
        }
        return res;
    }
}

function arrangements(springs, pos) {
    var n = 0
    var res = 0;
    springs.forEach(e => {if (e === '?') { n++; }});
    
    const arr = generateArrangements(n);
    for (let arrangement of arr) {
        var row = '';
        var i = 0;
        springs.forEach(e => {
            if (e === '?') {
                if (arrangement[i] === 0) {
                    row += '.';
                }
                else { row += '#'; }
                i++;
            }
            else { row += e; }
        });
        if (valideArrangement(row, pos)) {
            console.log(row);
            res++;
        }
    }
    return res;
}

const input = fs.readFileSync('./input').split('\n');
input.pop();

var res = 0;
input.forEach(line => {
    var [springs, pos] = line.split(' ');
    springs = springs.split('');
    pos = pos.split(',').map(Number);

    res += arrangements(springs, pos);
});

console.log("Result of the puzzle: " + res);