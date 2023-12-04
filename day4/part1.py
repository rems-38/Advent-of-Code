# -*- condig: utf-8 -*-

def rm_space(l):
    return [x for x in l if x != ""]

if __name__ == "__main__":
    with open("input") as f:
        lines = f.readlines()

    res = 0
    for line in lines:
        winning = set(map(int, (rm_space(line.split(":")[1].split("|")[0].split(" ")))))
        my_nbr = set(map(int, (rm_space(line.split(":")[1].split("|")[1].split(" ")))))
        
        res += int(2**(len(winning.intersection(my_nbr)) - 1))

    print(f"Result of the puzzle : {res}")