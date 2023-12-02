# -*- coding: utf-8 -*-

if __name__ == "__main__":
    with open("input", "r") as f:
        lines = f.readlines()

    res = 0
    for i, line in enumerate(lines):
        line = line.strip().split(":")[1].split(";")
        few_cubes = {"red": 0, "green": 0, "blue": 0}

        for subset in line:
            subset = subset.split(",")
            
            for color in subset:
                color = color.split(" ")
                if int(color[1]) > few_cubes[color[2]]:
                    few_cubes[color[2]] = int(color[1])

        res += few_cubes["red"] * few_cubes["green"] * few_cubes["blue"]

    print(f"Result of the puzzle : {res}")