//////////////// [INCORRECT ANSWER] ////////////////
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

    const nbr_j = occs['J'] ? occs['J'] : 0;
    delete occs['J'];

    const values = Object.values(occs);
    var value = 0;
    if (nbr_j == 1) { value = 1; }
    else if (nbr_j == 2) { value = 3; }
    else if (nbr_j == 3) { value = 5; }
    else if (nbr_j == 4) { value = 6; }
    else if (nbr_j == 5) { value = 6; }
    var already = false;
    var isfull = false;
    values.forEach(val => {
        if (val == 5) {value = 6;}
        else if (val == 4) {value = nbr_j ? 6 : 5;}
        else if (val == 3) {
            if (nbr_j != undefined) {value = nbr_j > 1 ? 6 : 5;}
            if (!isfull) {
                isfull = true;
                value = value < 3 ? 3 : value;
            }
            else if (isfull) {value = value < 4 ? 4 : value;}
        }
        else if (val == 2) {
            if (nbr_j == 3) {value = 6;}
            else {
                if (!isfull) {
                    isfull = true;
                    value = value < 1 ? 1 : value;
                    if (nbr_j == 1) {value = 3;}
                }
                else if (isfull) {value = value < 4 ? 4 : value;}
    
                if (!already) {
                    already = true;
                    value = value < 1 ? 1 : value;
                    if (nbr_j == 1) {value = 3;}
                    else if (nbr_j == 2) {value = 5;}
                }
                else {
                    if (nbr_j == 1) {value = 4;}
                    value = value < 2 ? 2 : value;}
            }
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

// console.log(sorted);

const cards_value = {'J': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7' : 7, '8': 8, '9': 9, 'T': 10, 'Q':11, 'K': 12, 'A': 13};
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

// console.log(sorted);

var res = 0;
var k = 0;
for (var i = 0; i < Object.keys(sorted).length; i++) {
    for (var j = 0; j < sorted[Object.keys(sorted)[i]].length; j++) {
        console.log(k+1 + "*" + bids[sorted[Object.keys(sorted)[i]][j]]);
        res += bids[sorted[Object.keys(sorted)[i]][j]] * (k+1);
        k++;
    }
}

console.log("[INCORRECT] Result of the puzzle: " + res);