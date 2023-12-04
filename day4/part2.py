# -*- condig: utf-8 -*-

def rm_space(l):
    return [x for x in l if x != ""]

if __name__ == "__main__":
    with open("input") as f:
        lines = f.readlines()

    count = 0
    nb_cards = [1 for _ in range(len(lines))]
    for i, line in enumerate(lines):
        winning = set(map(int, (rm_space(line.split(":")[1].split("|")[0].split(" ")))))
        my_nbr = set(map(int, (rm_space(line.split(":")[1].split("|")[1].split(" ")))))

        for j in range(1, len(winning.intersection(my_nbr))+1):
            nb_cards[j+i] += nb_cards[i]

    res = sum(nb_cards)
    print(f"Result of the puzzle : {res}")