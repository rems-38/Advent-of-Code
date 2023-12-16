# -*- coding: utf-8 -*-

if __name__ == "__main__":

    with open("input") as f:
        data = f.read().split(",")

    res = 0
    for part in data:
        curr = 0
        for c in part:
            if c == "\n": break
            curr += ord(c)
            curr *= 17
            curr %= 256
        res += curr

    print(f"Result of the puzzle: {res}")