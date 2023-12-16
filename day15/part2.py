# -*- coding: utf-8 -*-

if __name__ == "__main__":

    with open("input") as f:
        data = f.read().split(",")

    boxes = [[] for _ in range(256)]

    for part in data:
        index = 0
        mode = ""
        for c in part:
            if c == "\n": break
            if c == "=":
                mode = "assign"
                break
            elif c == "-": mode = "remove"
            else:
                index += ord(c)
                index *= 17
                index %= 256

        if mode == "assign":
            if not boxes[index]:
                splitter = part.split("=")
                boxes[index].append([splitter[0] , int(splitter[1])])
            else:
                modified = False
                for slot in boxes[index]:
                    splitter = part.split("=")
                    if slot[0] == splitter[0]:
                        slot[1] = int(splitter[1])
                        modified = True
                if not modified:
                    splitter = part.split("=")
                    boxes[index].append([splitter[0] , int(splitter[1])])
        elif mode == "remove":
            if boxes[index]:
                for slot in boxes[index]:
                    if slot[0] == part.split("-")[0]:
                        boxes[index].remove(slot)
                        break
            
    res = 0
    for i, box in enumerate(boxes):
        if box:
            for j, slot in enumerate(box):
                res += (i+1) * (j+1) * slot[1]
        

    print(f"Result of the puzzle: {res}")