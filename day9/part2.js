const fs = require('fs');

const input = fs.readFileSync('./input', 'utf8').split('\n');
input.pop();

var res = 0;

input.forEach(line => {
    var next = [[]];
    next[0] = line.split(' ').map(Number);
    var i = 0;
    var finished = false;
    while (!finished) {
        next[i+1] = [];
        for (var j = 0; j < next[i].length - 1; j++) {
            next[i+1][j] = next[i][j+1] - next[i][j];
        }
        finished = true;
        next[i+1].forEach(element => { if (element != 0) finished = false; });
        i++;

    }

    next[i] = [0, ...next[i]];
    finished = false;
    while (i !== 0) {
        next[i-1] = [next[i-1].slice(0)[0] - next[i].slice(0)[0], ...next[i-1]];
        i--;        
    }

    res += next[0].slice(0)[0];
});


console.log("Result of the puzzle: " + res);