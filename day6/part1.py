# -*- coding: utf-8 -*-

if __name__ == "__main__":
    with open("input") as f:
        lines = f.readlines()

    res = 1

    new_lines = []
    for line in lines:
        new_lines.append([int(x) for x in line.split(":")[1].strip().split(" ") if x != ""])
    lines = [[new_lines[0][i], new_lines[1][i]] for i in range(len(new_lines[0]))]
    
    for time, distance in lines:
        nbr_time_win = 0
        for i in range(1, time+1):
            if i * (time - i) > distance:
                nbr_time_win += 1
        res *= nbr_time_win

    print(f"Result of the puzzle: {res}")