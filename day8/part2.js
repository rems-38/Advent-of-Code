//////////////// [INFINITE LOOP ?] ////////////////
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
var currents = [];
Object.keys(map).filter(key => key.endsWith('A')).forEach(key => { currents.push(key); });
console.log(currents);
var finished = false;
while (!finished) {
    var possible = true;
    currents = currents.map(c => map[c][path[res%path.length]]);
    res++;
    
    currents.forEach(c => {
        if (c.endsWith('Z')) {finished = possible ? true : false; }
        else { finished = false; possible = false; }
    }); 
}

console.log("Result of the puzzle: " + res);