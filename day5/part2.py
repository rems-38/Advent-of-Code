# -*- coding: utf-8 -*-

################ [INFINITE LOOP] ################

if __name__ == "__main__":
    with open("input") as f:
        lines = f.readlines()
    
    res = 0
    seeds = lines[0].split(":")[1].split(" ")
    seeds.pop(0)
    seeds = [int(x) for x in seeds]
    lines.pop(0)

    start = 0
    for init_seed in seeds:
        if not start: start = init_seed
        else:
            for i in range(init_seed):
                seed = start + i
                print(f"compute {seed}")
                converted = False
                for line in lines:
                    if "map" in line or line == "\n":
                        converted = False
                    elif not converted:
                        if int(line.split(" ")[1]) <= seed <= int(line.split(" ")[1]) + int(line.split(" ")[2]):
                            seed = (seed - int(line.split(" ")[1])) + int(line.split(" ")[0])
                            converted = True
                
                if seed < res or res == 0:
                    res = seed
                print(res)
            start = 0
    
    print(f"Result of the puzzle: {res}")