const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8').split('\n');
input.pop();

const path = input[0].split('').map(c => c === 'L' ? 0 : 1);
const map = {};
input.slice(2).forEach(line => {
    const [key, value] = line.split(' = ');
    const lr_combo = value.slice(1, -1).split(', ');
    map[key] = lr_combo;
});

var res = 0;
var current = 'AAA';

while (current !== 'ZZZ') { 
    current = map[current][path[res%path.length]];
    res++;
}

console.log("Result of the puzzle: " + res);