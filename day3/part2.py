# -*- coding: utf-8 -*-

def search_numbers(matrix, i, j):
    nbr, nbr2 = [], []
    fst_ok = 0
    k = i-1
    while k < i+2:
        l = j-1
        while l < j+2:
            if k >= 0 and k < len(matrix) and l >= 0 and l < len(matrix[0]):
                if matrix[k][l].isdigit():
                    if not fst_ok:
                        nbr.append(matrix[k][l])
                        l_init = l
                        if matrix[k][l-1].isdigit():
                            while matrix[k][l-1].isdigit():
                                nbr = [matrix[k][l-1]] + nbr
                                l -= 1
                            l = l_init
                        if matrix[k][l+1].isdigit():
                            while matrix[k][l+1].isdigit():
                                nbr.append(matrix[k][l+1])
                                l += 1
                        l = l_init
                        while matrix[k][l].isdigit():
                            if l+1 < j+2:
                                l += 1
                            else:
                                k += 1
                                l = j-2
                                break
                    else:
                        nbr2.append(matrix[k][l])
                        l_init = l
                        if matrix[k][l-1].isdigit():
                            while matrix[k][l-1].isdigit():
                                nbr2 = [matrix[k][l-1]] + nbr2
                                l -= 1
                        l = l_init
                        if matrix[k][l+1].isdigit():
                            while matrix[k][l+1].isdigit():
                                nbr2.append(matrix[k][l+1])
                                l += 1
                        return nbr, nbr2
                    
                    fst_ok = 1
            l += 1
        k += 1
    return nbr, nbr2


if __name__ == "__main__":
    with open("input", "r") as f:
        lines = f.readlines()

    matrix = [[c for c in line] for line in lines]
    res = 0
    nbr, nbr2 = [], []
    
    for i in range(len(matrix)):
        for j in range(len(matrix[i])):
            if matrix[i][j] == "*":
                nbr, nbr2 = search_numbers(matrix, i, j)
                if nbr != [] and nbr2 != []:
                    res += int("".join(nbr)) * int("".join(nbr2))
                    nbr, nbr2 = [], []


    print(f"Result of the puzzle : {res}")