const fs = require('fs');

function calc_occs(cards) {
    var occs = {};
    cards.forEach(card => {occs[card] = 1});
    for (var i = 0; i < cards.length; i++) {
        for (var j = i+1; j < cards.length; j++) {
            if (cards[i] == cards[j]) {
                occs[cards[i]] += 1;
                cards.splice(j, 1);
                j--;
            }
        }
    }
    return occs;
}

function calc_value(set) {
    const cards = set.split('');
    const occs = calc_occs(cards);
    
    const values = Object.values(occs);
    var value = 0;
    var already = false;
    var isfull = false;
    values.forEach(val => {
        if (val == 5) {value = 6;}
        else if (val == 4) {value = 5;}
        else if (val == 3) {
            if (!isfull) {
                isfull = true;
                value = value < 3 ? 3 : value;
            }
            else if (isfull) {value = 4;}
        }
        else if (val == 2) {
            if (!isfull) {
                isfull = true;
                value = value < 1 ? 1 : value;
            }
            else if (isfull) {value = 4;}

            if (!already) {
                already = true;
                value = value < 1 ? 1 : value;
            }
            else {value = 2;}
        }
    });
    return value;
}

const input = fs.readFileSync('./input', 'utf8').split('\n');
input.pop(); // find end with '\n' (empty line)


// const input = "32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483".split('\n');
const sets = [];
input.forEach(line => sets.push(line.split(' ')[0]));

var index = [];
for (var i = 0; i < input.length; i++) { index.push(i); }
var bids = [];
input.forEach(line => { bids.push(line.split(' ')[1]); })

var rank = [];
sets.forEach(set => { rank.push(calc_value(set)); })

var sorted = {6: [], 5: [], 4: [], 3: [], 2: [], 1: [], 0: []};
for (var i = 0; i < rank.length; i++) {
    sorted[rank[i]].push(index[i]);
}

const cards_value = {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7' : 7, '8': 8, '9': 9, 'T': 10, 'J': 11, 'Q':12, 'K': 13, 'A': 14};
const sortMyMapped = (map, comp) => (a, b) => comp(map(a), map(b));
const byValue = (a, b) => a - b;
const cardValuable = index => {
    value = 0;
    for (var i = 0; i < sets[index].length; i++) {
        value += cards_value[sets[index][i]] * Math.pow(100, sets[index].length - i - 1);
    }
    return value;
}
const mappedSort = sortMyMapped(cardValuable, byValue);

for (var i = 0; i < Object.keys(sorted).length; i++) {
    sorted[Object.keys(sorted)[i]].sort(mappedSort);
}

var res = 0;
var k = 0;
for (var i = 0; i < Object.keys(sorted).length; i++) {
    for (var j = 0; j < sorted[Object.keys(sorted)[i]].length; j++) {
        res += bids[sorted[Object.keys(sorted)[i]][j]] * (k+1);
        k++;
    }
}

console.log("Result of the puzzle: " + res);