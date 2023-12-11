//////////////// [NOT FINISHED] ////////////////
const fs = require('fs');


function alreadyVisited(pos, x, y) {
    for (var i = 0; i < pos.length; i++) {
        for (var j = 0; j < pos[i].length; j++) {
            if (pos[i][j] === x && pos[i][j] === y) {
                return true;
            }
        }
    }
    return false;
}


// const input = fs.readFileSync('./input', 'utf8').split('\n');

const input = ".....\n.S-7.\n.|.|.\n.L-J.\n.....\n".split('\n');
// const input = "..F7.\n.FJ|.\nSJ.L7\n|F--J\nLJ...\n".split('\n');
input.pop();

var dir = {"S": [[0, 1], [0, -1], [1, 0], [-1, 0]], "|": [[0, -1], [0, 1]], "-": [[-1, 0], [1, 0]], "L": [[0, 1], [[-1, 0]]], "J": [[-1, 0], [0, -1]], "7": [[0, 1], [-1, 0]], "F": [[0, 1], [1, 0]]};

var pos = [[[0, 0]]];
input.forEach((line, y) => {
    input[y] = line.split('');
    line.split('').forEach((char, x) => {
        if (char === 'S') {
        pos = [[[x, y]]];
        }
    });
});

var res = 0;
var finished = false;
while (!finished) {
    pos[res+1] = [];
    pos[res].forEach(p => {
        var char = input[p[1]][p[0]];
        if (char === "S") {
            var dirs = dir[char];
            dirs.forEach(dir => {
                if (input[p[1] + dir[1]][p[0] + dir[0]] !== '.') {
                    pos[res+1].push([p[0] + dir[0], p[1] + dir[1]]);
                }
            });
        }
        else if (char !== '.') {
            // var [x, y] = dir[char];
            // dirs.forEach(dir => {
            //     if (alreadyVisited(pos, p[0] + dir[0], p[1] + dir[1])) {
            //         finished = true;
            //     }
            //     else if (input[p[1] + dir[1]][p[0] + dir[0]] !== '.') {
            //         pos[res+1].push([p[0] + dir[0], p[1] + dir[1]]);
            //     }
            //     console.log(pos)
            // });
        }
    });
    res++;
}


// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
// . is ground; there is no pipe in this tile.
// S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has

// .....      ..F7.
// .S-7.      .FJ|.
// .|.|.      SJ.L7
// .L-J.      |F--J
// .....      LJ...

