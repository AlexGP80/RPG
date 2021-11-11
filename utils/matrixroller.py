from datetime import datetime
import roller

class MatrixRoller(object):
    rlr = roller.Roller()
    cells = 1000
    visual_cells = 10

    def __init__(self):
        self.matrix = list()

    def __init__(self, dice_expr):
        self.matrix = self.getMatrix(dice_expr)

    def getMatrix(self, dice_expr):
        result = list()
        for i in range(self.cells):
            result.append(self.rlr.roll(dice_expr))
        return result

    def getResult(self, position):
        return self.matrix[position]

    def roll(self, dice_expr, position):
        self.getMatrix(dice_expr)
        return getResult(position)

    def get_matrix_for_printing(self, dice_expr):
        result = ""
        for i in range(self.visual_cells):
            for j in range(self.visual_cells):
                result += f"{self.rlr.roll(dice_expr):>3}  "
            result += "\n"
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
    print(MatrixRoller("1").get_matrix_for_printing(tirada))
    print("\n\n")
