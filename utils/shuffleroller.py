import random
from datetime import datetime
from roller import Roller

random.seed(datetime.now().microsecond)

class ShuffleRoller(object):
    rlr = Roller()


    def __init__(self):
        self.matrix = list()

    def __init__(self, dice_expr):
        self.dice_expr = dice_expr

    def get_roller(self):
        result = ""
        min_num = self.rlr.lowest(self.dice_expr)
        max_num = self.rlr.highest(self.dice_expr)+1
        l = list()
        for num in range(min_num, max_num):
            l.append(num)
        random.shuffle(l)
        for i in range(min_num, max_num):
            result += f"{i-min_num+1:2}.{l[i-min_num]}\t\t"
        return result



# while True:
#     print("Tirada: ")
#     tirada = input()
#     if (tirada == "exit"):
#         break
#     print("Posición: ")
#     pos = int(input())
#     print(f"{MatrixRoller(tirada).getResult(pos)}\n\n")

while True:
    print(datetime.now())
    print("Tirada: ", end="")
    tirada = input()
    if (tirada == "exit"):
        break
    print(ShuffleRoller(tirada).get_roller())
    print("\n\n")
