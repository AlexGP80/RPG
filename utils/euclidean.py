import math

class Cell(object):
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def distance(self, other_cell):
        if (self.x == other_cell.x and self.y == other_cell.y):
            return 0
        if (self.x == other_cell.x):
            return 5 * abs(other_cell.y - self.y)
        if (self.y == other_cell.y):
            return 5 * abs(other_cell.x - self.x)
        return 5 * math.sqrt((other_cell.x - self.x)**2 + (other_cell.y - self.y)**2)

    def __str__(self):
        return f'({self.x}.{self.y})'

    def __descr__(self):
        return str(self)

class CellList(object):
    def __init__(self, cl):
        self.cells = cl

    def __str__(self):
        output = ""
        first_cell = True
        for cell in self.cells:
            if (first_cell):
                output += str(cell)
                first_cell = False
            else:
                output += ", " + str(cell)
        return output

    def __descr__(self):
        return str(self)


class Board(object):
    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.cells = list()
        for x in range(width):
            row = list()
            for y in range(height):
                row.append(Cell(x, y))
            self.cells.append(row)

    def get_cells_in_range(self, cell, range):
        cells_in_range = list()
        for row in self.cells:
            for c in row:
                if (c.distance(cell) <= range):
                    cells_in_range.append(c)
        return CellList(cells_in_range)



b = Board(30, 30)
print(b.cells[5][5].distance(b.cells[6][6]))
print(b.get_cells_in_range(b.cells[0][0], 20))
