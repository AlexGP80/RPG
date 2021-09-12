import math

class Cell(object):
    def __init__(self, x, y, blocked=False):
        self.x = x
        self.y = y
        self.blocked = blocked

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

class Wall(object):
    def __init__(self, x, y, horizontal):
        self.x = x
        self.y = y
        self.horizontal = horizontal

    def __str__(self):
        output = f'({self.x}.{self.y}.'
        if (self.horizontal):
            output += "H)"
        else:
            output += "V)"
        return output

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


class Node(object):
    def __init__(self, cell, distance, cell_path):
        self.cell = cell
        self.distance = distance
        self.cell_path = cell_path
        self.processed = False

class Board(object):
    HORIZONTAL = True
    VERTICAL = False

    def __init__(self, width, height):
        self.width = width
        self.height = height
        self.cells = list()
        self.walls = list()
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

    def add_wall(self, start_x, start_y, horizontal, length):
        for i in range(length):
            if (horizontal):
                self.walls.append(Wall(start_x + i, start_y, self.HORIZONTAL))
            else:
                self.walls.append(Wall(start_x, start_y + i, self.VERTICAL))

    def check_wall(self, another_wall):
        for wall in self.walls:
            if (wall.x == another_wall.x and wall.y == another_wall.y and wall.horizontal == another_wall.horizontal):
                return True
        return False

    def get_cells_reachable(self, cell, range, dist_acum, nodes, cell_path):
        if (dist_acum > range):
            print(f"get_cells_reachable: For cell {cell} dist_acum({dist_acum}) > range({range}) - return")
            return

        if (str(cell) in nodes):
            print(f'get_cells_reachable: Cell {str(cell)} already in nodes')
            node = nodes[str(cell)]
            if (node.distance > dist_acum):
                print(f'get_cells_reachable: Better path for cell {str(cell)}')
                node.distance = dist_acum
                node.cell_path = cell_path
                node.processed = False
        else:
            node = Node(cell, dist_acum, cell_path)
            nodes[str(cell)] = node
            print(f'get_cells_reachable: Cell {str(cell)} not in nodes. Adding it.')

        if (not node.processed):
            print(f'get_cells_reachable: Prospecting cells adjacent to cell {cell}')
            interval = [-1, 0, 1]
            for dx in interval:
                for dy in interval:
                    x = cell.x + dx
                    y = cell.y + dy
                    if (x >= 0 and y >= 0 and x < len(self.cells) and y < len(self.cells[0])):
                        # TO-DO: comprobar muros
                        # si dx es 0, no hace falta comprobar muro a izquierda o derecha
                        # si dy es 0, no hace falta comprobar muro arriba o abajo
                        if (dx == 0):
                            if (dy == -1):
                                if (self.check_wall(Wall(cell.x, cell.y, self.HORIZONTAL))):
                                    continue
                            elif (dy == 1):
                                if (self.check_wall(Wall(cell.x, cell.y+dy, self.HORIZONTAL))):
                                    continue
                        elif (dy == 0):
                            if (dx == -1):
                                if (self.check_wall(Wall(cell.x, cell.y, self.VERTICAL))):
                                    continue
                            elif (dx == 1):
                                if (self.check_wall(Wall(cell.x+dx, cell.y, self.VERTICAL))):
                                    continue
                        else:
                            if (dx == -1):
                                if (dy == -1):
                                    if (self.check_wall(Wall(cell.x, cell.y, self.VERTICAL)) or self.check_wall(Wall(cell.x, cell.y, self.HORIZONTAL))):
                                        continue
                                    if (self.check_wall(Wall(cell.x, cell.y+dy, self.VERTICAL)) or self.check_wall(Wall(cell.x+dx, cell.y, self.HORIZONTAL))):
                                        continue
                                if (dy == 1):
                                    if (self.check_wall(Wall(cell.x, cell.y, self.VERTICAL)) or self.check_wall(Wall(cell.x, cell.y+dy, self.HORIZONTAL))):
                                        continue
                                    if (self.check_wall(Wall(cell.x+dx, cell.y+dy, self.HORIZONTAL)) or self.check_wall(Wall(cell.x, cell.y+dy, self.VERTICAL))):
                                        continue
                            if (dx == 1):
                                if (dy == -1):
                                    if (self.check_wall(Wall(cell.x, cell.y, self.HORIZONTAL)) or self.check_wall(Wall(cell.x+dx, cell.y, self.VERTICAL))):
                                        continue
                                    if (self.check_wall(Wall(cell.x+dx, cell.y+dy, self.VERTICAL)) or self.check_wall(Wall(cell.x+dx, cell.y, self.HORIZONTAL))):
                                        continue
                                if (dy == 1):
                                    if (self.check_wall(Wall(cell.x+dx, cell.y+dy, self.VERTICAL)) or self.check_wall(Wall(cell.x+dx, cell.y+dy, self.HORIZONTAL))):
                                        continue
                                    if (self.check_wall(Wall(cell.x, cell.y+dy, self.HORIZONTAL)) or self.check_wall(Wall(cell.x+dx, cell.y, self.VERTICAL))):
                                        continue

                        c = self.cells[x][y]
                        if (not c in cell_path and not c.blocked):
                            dist = cell.distance(c)
                            if (dist > 0):
                                cp = cell_path + [c]
                                print(f'Prospecting cell {c}')
                                self.get_cells_reachable(c, range, dist_acum + dist, nodes, cp)
            node.processed = True
        # añadir muros, ver a qué celdas se puede llegar con esa cantidad de movimiento


b = Board(10, 10)
b.cells[6][2].blocked = True
b.cells[7][2].blocked = True
b.add_wall(2, 2, b.HORIZONTAL, 4)
b.add_wall(2, 2, b.VERTICAL, 4)
b.add_wall(6, 2, b.VERTICAL, 2)
b.add_wall(2, 6, b.HORIZONTAL, 4)
b.add_wall(6, 5, b.VERTICAL, 1)
b.add_wall(8, 0, b.VERTICAL, 8)
b.add_wall(0, 8, b.HORIZONTAL, 8)

for w in b.walls:
    print(w)

cell = b.cells[2][2]
range = 400
dist_acum = 0
nodes = {}
cell_path = [cell]
b.get_cells_reachable(cell, range, dist_acum, nodes, cell_path)

print(f"cells in range {range} from cell {str(cell)}:")
for key, n in nodes.items():
    cp = ""
    for c in n.cell_path:
        cp += f'{str(c)} '
    print(f'    Cell:{str(n.cell)} Dist:{n.distance:.2f} Path:{cp}')
