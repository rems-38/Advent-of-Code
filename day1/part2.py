# -*- coding: utf-8 -*-

def parse_line(line):
    i = 0
    finished = 0
    while not finished:
        if line[i:i+2] == '':
            finished = 1
        else:
            match line[i:i+2]:
                case "on":
                    line = modif(line, "one", "1")
                case "tw":
                    line = modif(line, "two", "2")
                case "th":
                    line = modif(line, "three", "3")
                case "fo":
                    line = modif(line, "four", "4")
                case "fi":
                    line = modif(line, "five", "5")
                case "si":
                    line = modif(line, "six", "6")
                case "se":
                    line = modif(line, "seven", "7")
                case "ei":
                    line = modif(line, "eight", "8")
                case "ni":
                    line = modif(line, "nine", "9")
            i += 1
    return line

def modif(line, value, dec):
    is_in = line.find(value)
    new_line = []
    modified = 0
    for j in range(len(line) - len(value) + 1):
        if j == is_in: 
            new_line.append(dec)
            modified = 1
        else:
            if not modified:
                new_line.append(line[j])
            else:
                new_line.append(line[j + len(value) - 1])
    line = "".join(new_line)
    return line


if __name__ == "__main__":

    res = 0
    lines  = open("./input", 'r').readlines()

    for line in lines:
        line = parse_line(line)
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