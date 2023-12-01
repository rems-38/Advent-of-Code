# -*- coding: utf-8 -*-

def parse_line(line):
    for i, number in enumerate(["one", "two", "three", "four", "five", "six", "seven", "eigth", "nine"]):
        is_in = line.find(number)
        if is_in != -1:
            print(line, number, len(line) - len(number) + 1)
            new_line = ""
            modified = 0
            for j in range(len(line) - len(number) + 1):
                if j == is_in: 
                    new_line[j] = str(i+1)
                    modified = 1
                else:
                    if not modified:
                        new_line[j] = line[j]
                    else:
                        new_line[j] = line[j + len(number)]
            print(new_line)
                
        
        i += 1


if __name__ == "__main__":

    res = 0
    lines  = open("./input", 'r').readlines()

    lines = ["two1nine", "eightwothree"]

    for line in lines:
        line = parse_line(line)
        print(line)
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