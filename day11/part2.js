//////////////// [MEMORY FAILURE] ////////////////
const fs = require('fs');

function expandGalaxy(galaxy, larger) {
    var preNewGalaxy = [];
    var row = 0;
    var duplicate = true;
    for (var i = 0; i < galaxy.length; i++) {
        preNewGalaxy.push([]);
        for (var j = 0; j < galaxy[i].length; j++) {
            preNewGalaxy[row][j] = galaxy[i][j];
            if (galaxy[i][j] === '#') { duplicate = false; }
        }
        if (duplicate) {
            for (var x = 0; x < larger-1; x++) {
                preNewGalaxy.push([]);
                row++;
                for (var j = 0; j < galaxy[i].length; j++) {
                    preNewGalaxy[row][j] = galaxy[i][j];
                }
            }
        }
        row++;
        duplicate = true;
    }

    var newGalaxy = [];
    for (var i = 0; i < preNewGalaxy.length; i++) { newGalaxy.push([]); }
    var col = 0;
    for (var j = 0; j < preNewGalaxy[0].length; j++) {
        for (var i = 0; i < preNewGalaxy.length; i++) {
            newGalaxy[i][col] = preNewGalaxy[i][j];
            if (preNewGalaxy[i][j] === '#') { duplicate = false; }
        }
        if (duplicate) {
            for (var x = 0; x < larger-1; x++) {
                col++;
                for (var i = 0; i < preNewGalaxy.length; i++) {
                    newGalaxy[i][col] = preNewGalaxy[i][j];
                }
            }
        }
        col++;
        duplicate = true;
    }

    return newGalaxy;
}

function countHashtags(galaxy) {
    var hashPos = [];
    for (var i = 0; i < galaxy.length; i++) {
        for (var j = 0; j < galaxy[i].length; j++) {
            if (galaxy[i][j] === '#') { hashPos.push([i, j]); }
        }
    }
    return hashPos;
}

function distance(pos1, pos2) {
    return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1]);
}


const input = fs.readFileSync('./input', 'utf8').split('\n');
// const input = "...#......\n.......#..\n#.........\n..........\n......#...\n.#........\n.........#\n..........\n.......#..\n#...#.....\n".split('\n');
input.pop();

galaxy = [];
input.forEach(line => {
    galaxy.push(line.split(''));
});
galaxy = expandGalaxy(galaxy, 1000000);
hashPos = countHashtags(galaxy);

var res = 0;
for(var i = 0; i < hashPos.length; i++) {
    for(var j = i + 1; j < hashPos.length; j++) {
        res += distance(hashPos[i], hashPos[j]);
    }
}

console.log("Result of the puzzle: " + res);