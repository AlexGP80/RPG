# Make sure 'dejavu10x10_gs_tc.png' is in the same directory as this script.
import tcod
import numpy as np
import random
from datetime import datetime
import math
import roller


random.seed(datetime.now().microsecond)

class Cell(object):
    pass

class Map(object):
    pass

class Character(object):
    rlr = roller.Roller()

    def __init__(self, name, pc_class, level, xp):
        self.name = name
        self.pc_class = pc_class
        self.level = level
        self.xp = xp
        self.STR = self.rlr.roll('3d6')
        self.STR_adj = self.get_adj(self.STR)
        self.INT = self.rlr.roll('3d6')
        self.INT_adj = self.get_adj(self.INT)
        self.WIS = self.rlr.roll('3d6')
        self.WIS_adj = self.get_adj(self.WIS)
        self.CON = self.rlr.roll('3d6')
        self.CON_adj = self.get_adj(self.CON)
        self.DEX = self.rlr.roll('3d6')
        self.DEX_adj = self.get_adj(self.DEX)
        self.CHA = self.rlr.roll('3d6')
        self.CHA_adj = self.get_adj(self.CHA, cha=True)

        self.HP = 8 + self.CON_adj
        self.AC = 9 + self.DEX_adj

        self.alignment = "Neutral"

    def xp_mult(self):
        # # TODO: When addind the rest of classes, modify this to reflect the correct attributes for each class
        if (self.STR <= 5):
            return 0.8
        if (self.STR <= 8):
            return 0.9
        if (self.STR >= 16):
            return 1.1
        if (self.STR >= 13):
            return 1.05

    def get_adj(self, attr, cha=False):
        if (attr <= 3):
            if (cha):
                return -2
            return -3
        if (attr <= 5):
            if (cha):
                return -1
            return -2
        if (attr <= 8):
            return -1
        if (attr <= 12):
            return 0
        if (attr <= 15):
            return 1
        if (attr <= 17):
            if (cha):
                return 1
            return 2
        if (cha):
            return 2
        return 3


class Motor(object):

    EDIT_MODE = False
    CHAR_WALL = '█'
    CHAR_DARK_SHADE = '▓'
    CHAR_MEDIUM_SHADE = '▒'
    CHAR_LIGHT_SHADE = '░'
    CHAR_OPEN = ' '
    CHAR_PC = '@'
    TORCH_DISTANCE = 6
    WIDTH = 80
    HEIGHT = 65  # Console width and height in tiles.
    WINDOW_MAP_WIDTH = 29
    WINDOW_MAP_HEIGHT = 29
    MAP_FRAME_WIDTH = WINDOW_MAP_WIDTH + 2
    MAP_FRAME_HEIGHT = WINDOW_MAP_HEIGHT + 2
    MAP_REACH_X = int(WINDOW_MAP_WIDTH / 2)
    MAP_REACH_Y = int(WINDOW_MAP_HEIGHT / 2)
    MAP_WIDTH = 61
    MAP_HEIGHT = 61
    NORTH = "N"
    EAST = "E"
    SOUTH = "S"
    WEST = "W"
    rlr = roller.Roller()

    def __init__(self):

        # Load the font, a 32 by 8 tile font with libtcod's old character layout.
        self.tileset = tcod.tileset.load_tilesheet(
            #"dejavu10x10_gs_tc.png", 32, 8, tcod.tileset.CHARMAP_TCOD,
            "Cheepicus_14x14.png", 16, 16, tcod.tileset.CHARMAP_CP437,
        )

        buffer = np.zeros(
            shape = (self.WIDTH, self.HEIGHT),
            dtype = tcod.console.Console.DTYPE,
            order = "F"
        )

        #buffer["ch"] = ord('.')
        #buffer["ch"][:, 1] = ord('#')

        # Create the main console.

        self.console = tcod.Console(self.WIDTH, self.HEIGHT, order="F", buffer=buffer)
        #self.console = tcod.Console(self.WIDTH, self.HEIGHT, buffer=buffer)


        self.map = np.loadtxt("map.txt", dtype='int', delimiter=',')
        self.x = 0
        self.y = 0

        self.map_north = self.map.copy()
        self.map_west = self.turn_map_left()
        self.map_east = self.turn_map_right()
        self.map = self.map_east
        self.map_south = self.turn_map_right()
        self.map = self.map_north
        self.orientation = self.NORTH
        print(self.map)
        print(self.map_north)
        print(self.map_east)
        print(self.map_south)
        print(self.map_west)
        print(self.orientation)
        self.pc = None

    def get_straight_distance(self, other_x, other_y):
        return math.sqrt(abs(self.x - other_x)**2 + abs(self.y - other_y)**2)

    def map_refresh(self,px,py):
        cx = 0
        for ix in range(px-self.MAP_REACH_X,px+self.MAP_REACH_X+1,1):
            cy = 0
            for iy in range(py-self.MAP_REACH_Y,py+self.MAP_REACH_Y+1,1):
                distance = self.get_straight_distance(ix, iy)
                if (iy < 0 or ix < 0 or iy >= self.MAP_HEIGHT or ix >= self.MAP_WIDTH):
                    self.console.rgb[cx+1, cy+1] = ord(self.CHAR_WALL), tcod.black, tcod.grey
                elif ((not self.EDIT_MODE) and distance > self.TORCH_DISTANCE+1):
                    self.console.rgb[cx+1, cy+1] = ord(self.CHAR_WALL), tcod.black, tcod.grey
                elif ((not self.EDIT_MODE) and distance > self.TORCH_DISTANCE-2 and distance <= self.TORCH_DISTANCE+1):
                    if (self.map[ix, iy] == 0):
                        visible = True
                        los = tcod.los.bresenham((self.x, self.y),(ix, iy)).tolist()
                        for cell in los:
                            cell_x = cell[0]
                            cell_y = cell[1]
                            if (self.map[cell_x, cell_y] == 1):
                                visible = False
                                break
                        if (visible):
                            if (distance > self.TORCH_DISTANCE-2 and distance <= self.TORCH_DISTANCE-1):
                                self.console.rgb[cx+1, cy+1] = ord(self.CHAR_LIGHT_SHADE), tcod.black, tcod.grey
                            elif (distance > self.TORCH_DISTANCE-1 and distance <= self.TORCH_DISTANCE):
                                self.console.rgb[cx+1, cy+1] = ord(self.CHAR_MEDIUM_SHADE), tcod.black, tcod.grey
                            elif (distance > self.TORCH_DISTANCE and distance <= self.TORCH_DISTANCE+1):
                                self.console.rgb[cx+1, cy+1] = ord(self.CHAR_DARK_SHADE), tcod.black, tcod.grey
                        else:
                            self.console.rgb[cx+1, cy+1] = ord(self.CHAR_WALL), tcod.black, tcod.grey
                    else:
                        self.console.rgb[cx+1, cy+1] = ord(self.CHAR_WALL), tcod.black, tcod.grey
                elif (self.map[ix, iy]==1):
                    self.console.rgb[cx+1, cy+1] = ord(self.CHAR_WALL), tcod.black, tcod.grey
                else:
                    visible = True
                    if (not self.EDIT_MODE):
                        los = tcod.los.bresenham((self.x, self.y),(ix, iy)).tolist()
                        for cell in los:
                            cell_x = cell[0]
                            cell_y = cell[1]
                            if (self.map[cell_x, cell_y] == 1):
                                visible = False
                                break
                    if (visible):
                        self.console.rgb[cx+1, cy+1] = ord(self.CHAR_OPEN), tcod.black, tcod.grey
                    else:
                        self.console.rgb[cx+1, cy+1] = ord(self.CHAR_WALL), tcod.black, tcod.grey
                cy += 1
            cx += 1
        self.console.print(1,35,f'({px},{py}){self.orientation}    ')

    def turn_map_right(self):
        map = np.zeros((self.MAP_HEIGHT, self.MAP_WIDTH))
        for itx in range(self.MAP_WIDTH):
            for ity in range(self.MAP_HEIGHT):
                map[itx,ity] = self.map[self.MAP_WIDTH-ity-1,itx]
        return map

    def turn_map_left(self):
        map = np.zeros((self.MAP_HEIGHT, self.MAP_WIDTH))
        for itx in range(self.MAP_WIDTH):
            for ity in range(self.MAP_HEIGHT):
                map[itx,ity] = self.map[ity,self.MAP_HEIGHT-itx-1]
        return map

    def turn_left(self):
        if (self.orientation == self.NORTH):
            self.orientation = self.WEST
            return self.map_west
        elif (self.orientation == self.WEST):
            self.orientation = self.SOUTH
            return self.map_south
        elif (self.orientation == self.SOUTH):
            self.orientation = self.EAST
            return self.map_east
        elif (self.orientation == self.EAST):
            self.orientation = self.NORTH
            return self.map_north

    def turn_right(self):
        if (self.orientation == self.NORTH):
            self.orientation = self.EAST
            return self.map_east
        elif (self.orientation == self.WEST):
            self.orientation = self.NORTH
            return self.map_north
        elif (self.orientation == self.SOUTH):
            self.orientation = self.WEST
            return self.map_west
        elif (self.orientation == self.EAST):
            self.orientation = self.SOUTH
            return self.map_south

    def erase(self, x, y):
        self.console.rgb[x,y] = ord(self.CHAR_OPEN), tcod.black, tcod.grey


    def create_character(self):
        self.console.clear()
        self.console.draw_frame(x=0, y=0, width=self.WIDTH-2, height=self.HEIGHT-2, decoration="╔═╗║ ║╚═╝")
        self.console.print_box(x=0, y=0, width=self.WIDTH-2, height=1, string=" Character creation ", alignment=tcod.CENTER)
        c = Character("Hero", "Human", "Fighter", 1, 0)
        while True:
            # output =  f"  Name: {c.name}\n\n"
            # output += f"  Species: {c.species}\n"
            # output

            self.console.print(x=3, y=3, string=f"Name:{c.name}")
            self.console.print_box(x=3, y=4, width=50, height=1, string=f"Class:{c.pc_class}  Level:{c.level}  XP:{c.xp      }")
            self.console.print_box(x=3, y=6, width=50, height=1, string=f" STR:{c.STR}                                     ")
            self.console.print_box(x=3, y=7, width=50, height=1, string=f" INT:{c.INT}                                     ")
            self.console.print_box(x=3, y=8, width=50, height=1, string=f" WIS:{c.WIS}                                     ")
            self.console.print_box(x=3, y=9, width=50, height=1, string=f" CON:{c.CON}                                     ")
            self.console.print_box(x=3, y=10, width=50, height=1, string=f" DEX:{c.DEX}                                     ")
            self.console.print_box(x=3, y=11, width=50, height=1, string=f" CHA:{c.CHA}                                     ")
            self.console.print_box(x=3, y=13, width=50, height=1, string="Keep character? (Y/N):       ")

            self.context.present(self.console)  # Show the console.
            for event in tcod.event.wait():
                self.context.convert_event(event)  # Sets tile coordinates for mouse events.
                if event.type == "KEYDOWN":
                    if (event.scancode == tcod.event.SCANCODE_Y):
                        break
                    if (event.scancode == tcod.event.SCANCODE_N):
                        c = Character("Hero", "Fighter", 1, 0)




    def start(self) -> None:
        """Script entry point."""
        # Create a window based on the console and tileset.
        with tcod.context.new(  # New window for a console of size columns×rows.
            columns=self.console.width, rows=self.console.height, tileset=self.tileset,
        ) as context:
            self.context = context
            self.console.rgb["bg"] = tcod.black
            if (not self.EDIT_MODE):
                self.pc = self.create_character()

            # map frame dimensions equals map dimensions plus borders
            self.console.clear()
            self.console.draw_frame(x=0, y=0, width=self.MAP_FRAME_WIDTH, height=self.MAP_FRAME_HEIGHT, decoration="╔═╗║ ║╚═╝")

            self.x = 34
            self.y = 23
            pos_x = int(self.MAP_FRAME_WIDTH / 2)
            pos_y = int(self.MAP_FRAME_HEIGHT / 2)


            self.map_refresh(self.x,self.y)

            while True:  # Main loop, runs until SystemExit is raised.
                self.console.rgb[pos_x, pos_y] = ord(self.CHAR_PC), tcod.yellow, tcod.grey
                context.present(self.console)  # Show the console.

                for event in tcod.event.wait():
                    context.convert_event(event)  # Sets tile coordinates for mouse events.

                    # Print event information to stdout.
                    print(event)

                    if event.type == "KEYDOWN":
                        if event.scancode == tcod.event.SCANCODE_S:
                            self.erase(pos_x, pos_y)
                            if (self.y < (self.MAP_HEIGHT - 1) and (self.map[self.x, self.y+1]==0 or self.EDIT_MODE)):
                                self.y += 1
                                self.map_refresh(self.x,self.y)
                        elif event.scancode == tcod.event.SCANCODE_W:
                            self.erase(pos_x, pos_y)
                            if (self.y > 0 and (self.map[self.x, self.y-1]==0 or self.EDIT_MODE)):
                                self.y -= 1
                                self.map_refresh(self.x,self.y)
                        elif event.scancode == tcod.event.SCANCODE_Q:
                            self.map = self.turn_left()
                            print(self.map.T)
                            self.x, self.y = self.MAP_HEIGHT-self.y-1, self.x
                            self.map_refresh(self.x, self.y)
                        elif event.scancode == tcod.event.SCANCODE_E:
                            self.map = self.turn_right()
                            print(self.map.T)
                            self.x, self.y = self.y, self.MAP_WIDTH-1-self.x
                            self.map_refresh(self.x, self.y)
                        elif event.scancode == tcod.event.SCANCODE_A:
                            self.erase(pos_x, pos_y)
                            if (self.x > 0 and (self.map[self.x-1, self.y]==0 or self.EDIT_MODE)):
                                self.x -= 1
                                self.map_refresh(self.x, self.y)
                        elif event.scancode == tcod.event.SCANCODE_D:
                            self.erase(pos_x, pos_y)
                            if (self.x < (self.MAP_WIDTH - 1) and (self.map[self.x+1, self.y]==0 or self.EDIT_MODE)):
                                self.x += 1
                                self.map_refresh(self.x, self.y)
                        elif self.EDIT_MODE and event.scancode == tcod.event.SCANCODE_KP_MINUS:
                            self.map[self.x, self.y] = 0
                        elif self.EDIT_MODE and event.scancode == tcod.event.SCANCODE_KP_PLUS:
                            self.map[self.x, self.y] = 1
                        elif self.EDIT_MODE and event.scancode == tcod.event.SCANCODE_F10:
                            np.savetxt('map.txt', self.map_north, fmt='%-1i', delimiter=',')
                        elif event.scancode == tcod.event.SCANCODE_ESCAPE:
                            if (self.EDIT_MODE):
                                np.savetxt('map.txt', self.map_north, fmt='%-1i', delimiter=',')
                            raise SystemExit()
                    elif event.type == "QUIT":
                        raise SystemExit()
            # The window will be closed after the above with-block exits.


if __name__ == "__main__":
    Motor().start()
