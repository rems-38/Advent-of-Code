# -*- coding: utf-8 -*-

if __name__ == "__main__":

    res = 0
    lines  = open("./input", 'r').readlines()

    for line in lines:
        digits = [0, 0]

        i = 0
        while not digits[0]:
            if '0' <= line[i] <= '9':
                digits[0] = int(line[i])
            i += 1

        j = 0
        finished = 0
        while not finished:
            try:
                if '0' <= line[j] <= '9':
                    digits[1] = int(line[j])
                j += 1
            except:
                finished = 1

        res += digits[0] * 10 + digits[1]

    print(f"Result of the puzzle : {res}")