# -*- coding: utf-8 -*-

def is_part_number(matrix, i, j, length):
    for k in range(i-1, i+2):
        for l in range(j-1, j+length+1):
            if k >= 0 and k < len(matrix) and l >= 0 and l < len(matrix[0]):
                if matrix[k][l] != "." and not matrix[k][l].isdigit() and not matrix[k][l] == "\n":
                    return True
    return False

if __name__ == "__main__":
    with open("input", "r") as f:
        lines = f.readlines()

    matrix = [[c for c in line] for line in lines]
    res = 0
    nbr = []
    
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            if matrix[i][j].isdigit():
                nbr.append(matrix[i][j])
            else:
                if nbr != []:
                    length = len(nbr)
                    nbr = int("".join(nbr))
                    if is_part_number(matrix, i, j-length, length):
                        res += nbr
                    nbr = []

    print(f"Result of the puzzle : {res}")