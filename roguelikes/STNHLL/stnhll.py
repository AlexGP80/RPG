# Make sure 'dejavu10x10_gs_tc.png' is in the same directory as this script.
import tcod
import numpy as np
import random
from datetime import datetime


random.seed(datetime.now().microsecond)




class Motor(object):

    WIDTH = 150
    HEIGHT = int((WIDTH*9) / 16)  # Console width and height in tiles.
    WINDOW_MAP_WIDTH = 120
    WINDOW_MAP_HEIGHT = 60
    MAP_WIDTH = 1200
    MAP_HEIGHT = 1200
    NORTH = 0
    EAST = 1
    SOUTH = 2
    WEST = 3

    def __init__(self):

        # Load the font, a 32 by 8 tile font with libtcod's old character layout.
        self.tileset = tcod.tileset.load_tilesheet(
            "dejavu10x10_gs_tc.png", 32, 8, tcod.tileset.CHARMAP_TCOD,
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

        self.map = np.zeros(
            shape = (self.MAP_WIDTH, self.MAP_HEIGHT),
            dtype = np.intc,
            order = "F"
        )
        for x in range(self.MAP_WIDTH):
            for y in range(self.MAP_HEIGHT):
                if (random.random() < 0.05):
                    self.map[x,y] = 1
        for x in range(595,605,1):
            self.map[x, 595] = 1

        self.map_north = self.map
        self.map_west = self.turn_map_left()
        self.map_east = self.turn_map_right()
        self.map = self.map_east
        self.map_south = self.turn_map_right()
        self.map = self.map_north
        self.orientation = self.NORTH



    def map_refresh(self,px,py):
        cx = 0
        for ix in range(px-59,px+59,1):
            cy = 0
            cx += 1
            for iy in range(py-54,py+4,1):
                cy += 1
                if (self.map[ix, iy]==1):
                    self.console.rgb[cx+1, cy+1] = ord("#")
                else:
                    self.console.rgb[cx+1, cy+1] = ord(".")
        self.console.print(3,70,f'({px},{py})')

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
            self.map = self.map_west
            self.orientation = self.WEST
        elif (self.orientation == self.WEST):
            self.map = self.map_south
            self.orientation = self.SOUTH
        elif (self.orientation == self.SOUTH):
            self.map = self.map_east
            self.orientation = self.EAST
        elif (self.orientation == self.EAST):
            self.map = self.map_north
            self.orientation = self.NORTH

    def turn_right(self):
        if (self.orientation == self.NORTH):
            self.map = self.map_east
            self.orientation = self.EAST
        elif (self.orientation == self.WEST):
            self.map = self.map_north
            self.orientation = self.NORTH
        elif (self.orientation == self.SOUTH):
            self.map = self.map_west
            self.orientation = self.WEST
        elif (self.orientation == self.EAST):
            self.map = self.map_south
            self.orientation = self.SOUTH

    def erase(self, x, y):
        self.console.rgb[x,y] = ord(' '), tcod.black, tcod.grey


    def start(self) -> None:
        """Script entry point."""

        self.console.draw_frame(x=0, y=0, width=self.WINDOW_MAP_WIDTH+2, height=self.WINDOW_MAP_HEIGHT+2, decoration="╔═╗║ ║╚═╝")

        # Create a window based on the console and tileset.
        with tcod.context.new(  # New window for a console of size columns×rows.
            columns=self.console.width, rows=self.console.height, tileset=self.tileset,
        ) as context:
            x = int(self.MAP_WIDTH / 2) + 1
            y = int(self.MAP_HEIGHT / 2) + 1
            pos_x = int(self.WINDOW_MAP_WIDTH / 2) + 1
            pos_y = int(self.WINDOW_MAP_HEIGHT - 4) + 1

            self.map_refresh(x,y)

            while True:  # Main loop, runs until SystemExit is raised.
                #console = tcod.Console(WIDTH, HEIGHT, order="F", buffer=buffer)
                self.console.rgb[pos_x, pos_y] = ord("@"), tcod.yellow, tcod.black
                self.console.rgb["bg"] = tcod.grey
                #console.clear()
                context.present(self.console)  # Show the console.

                for event in tcod.event.wait():
                    context.convert_event(event)  # Sets tile coordinates for mouse events.
                    print(event)  # Print event information to stdout.
                        #<type='KEYDOWN', scancode=SCANCODE_DOWN, sym=K_DOWN, mod=KMOD_NUM, repeat=False>
                    if event.type == "KEYDOWN":
                        if event.scancode == tcod.event.SCANCODE_DOWN:
                            self.erase(pos_x, pos_y)
                            if (y < self.MAP_HEIGHT):
                                y += 1
                                self.map_refresh(x,y)
                        elif event.scancode == tcod.event.SCANCODE_UP:
                            self.erase(pos_x, pos_y)
                            if (y > 1):
                                y -= 1
                                self.map_refresh(x,y)
                        elif event.scancode == tcod.event.SCANCODE_LEFT:
                            # self.erase(pos_x, pos_y)
                            # if (x > 1):
                            #     x -= 1
                            #    self.map_refresh(x,y)
                            self.map = self.turn_left()
                            print(self.map)
                            x, y = y, self.MAP_WIDTH-x
                            self.map_refresh(x, y)
                        elif event.scancode == tcod.event.SCANCODE_RIGHT:
                            #self.erase(pos_x, pos_y)
                            #if (x < self.MAP_WIDTH):
                            #    x += 1
                            #    self.map_refresh(x,y)
                            self.map = self.turn_right()
                            print(self.map)
                            x, y = self.MAP_HEIGHT-y, x
                            self.map_refresh(x, y)
                        elif event.scancode == tcod.event.SCANCODE_ESCAPE:
                            #self.console.buffer["ch"] = ord('.')
                            raise SystemExit()
                    elif event.type == "QUIT":
                        raise SystemExit()
            # The window will be closed after the above with-block exits.


if __name__ == "__main__":
    Motor().start()
