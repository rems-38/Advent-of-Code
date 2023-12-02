# -*- coding: utf-8 -*-

if __name__ == "__main__":
    with open("input", "r") as f:
        lines = f.readlines()

    bag = {"red": 12, "green": 13, "blue": 14}

    id_sum = 0
    for i, line in enumerate(lines):
        line = line.strip().split(":")[1].split(";")
        possible = 1

        for subset in line:
            subset = subset.split(",")
            
            for color in subset:
                color = color.split(" ")
                if bag[color[2]] < int(color[1]):
                    possible = 0
                    break

        if possible:
            id_sum += i + 1

    print(f"Result of the puzzle : {id_sum}")
