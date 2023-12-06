# -*- coding: utf-8 -*-

if __name__ == "__main__":
    with open("input") as f:
        lines = f.readlines()

    res = 0
    
    time = int("".join([x for x in lines[0].split(":")[1].strip().split(" ") if x != ""]))
    distance = int("".join([x for x in lines[1].split(":")[1].strip().split(" ") if x != ""]))

    for i in range(1, time):
        if i * (time - i) > distance:
            res += 1

    print(f"Result of the puzzle: {res}")