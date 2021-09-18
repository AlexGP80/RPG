# Make sure 'dejavu10x10_gs_tc.png' is in the same directory as this script.
import tcod
import numpy as np
import random
from datetime import datetime


random.seed(datetime.now().microsecond)




class Motor(object):

    WIDTH = 30
    HEIGHT = 30  # Console width and height in tiles.
    WINDOW_MAP_WIDTH = 5
    WINDOW_MAP_HEIGHT = 5
    MAP_WIDTH = 11
    MAP_HEIGHT = 11
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
        #self.console = tcod.Console(self.WIDTH, self.HEIGHT, buffer=buffer)



        self.map = np.array([[0,0,0,0,0,0,0,0,0,0,0],
                             [0,0,0,0,0,0,0,0,0,0,0],
                             [0,0,0,0,0,0,0,0,0,0,0],
                             [0,0,0,0,0,0,0,0,0,0,0],
                             [0,0,0,0,0,1,0,0,0,0,0],
                             [0,0,0,0,0,0,0,0,0,0,0],
                             [0,0,0,0,0,0,0,0,0,0,0],
                             [0,0,0,0,0,0,0,0,0,0,0],
                             [0,0,0,0,0,0,0,0,0,0,0],
                             [0,0,0,0,0,0,0,0,0,0,0],
                             [0,0,0,0,0,0,0,0,0,0,0]]).T
        self.x = 0
        self.y = 0
        # self.map_north = self.map
        # self.map_west = self.turn_map_left()
        # self.map_east = self.turn_map_right()
        # self.map = self.map_east
        # self.map_south = self.turn_map_right()
        # self.map = self.map_north
        # self.orientation = self.NORTH



    def map_refresh(self,px,py):
        cx = 0
        for ix in range(px-2,px+3,1):
            cy = 0
            for iy in range(py-2,py+3,1):
                if (self.map[ix, iy]==1):
                    self.console.rgb[cx+1, cy+1] = ord("#")
                else:
                    self.console.rgb[cx+1, cy+1] = ord(".")
                cy += 1
            cx += 1
        self.console.print(1,10,f'({px},{py})')

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
            self.x = 5
            self.y = 5
            pos_x = 2 + 1 #(del borde)
            pos_y = 2 + 1 #(del borde)

            self.map_refresh(self.x,self.y)

            while True:  # Main loop, runs until SystemExit is raised.
                #console = tcod.Console(WIDTH, HEIGHT, order="F", buffer=buffer)
                self.console.rgb[pos_x, pos_y] = ord("@"), tcod.yellow, tcod.black
                self.console.rgb["bg"] = tcod.grey
                #console.clear()
                context.present(self.console)  # Show the console.

                for event in tcod.event.wait():
                    context.convert_event(event)  # Sets tile coordinates for mouse events.
                    # Print event information to stdout.
                    print(event)
                    if event.type == "KEYDOWN":
                        if event.scancode == tcod.event.SCANCODE_S:
                            self.erase(pos_x, pos_y)
                            if (self.y < self.MAP_HEIGHT):
                                self.y += 1
                                self.map_refresh(self.x,self.y)
                        elif event.scancode == tcod.event.SCANCODE_W:
                            self.erase(pos_x, pos_y)
                            if (self.y > 1):
                                self.y -= 1
                                self.map_refresh(self.x,self.y)
                        elif event.scancode == tcod.event.SCANCODE_Q:
                            self.map = self.turn_map_left()
                            print(self.map.T)
                            self.x, self.y = self.MAP_HEIGHT-self.y-1, self.x
                            self.map_refresh(self.x, self.y)
                        elif event.scancode == tcod.event.SCANCODE_E:
                            self.map = self.turn_map_right()
                            print(self.map.T)
                            self.x, self.y = self.y, self.MAP_WIDTH-1-self.x
                            self.map_refresh(self.x, self.y)
                        elif event.scancode == tcod.event.SCANCODE_A:
                            self.erase(pos_x, pos_y)
                            if (self.x > 1):
                                self.x -= 1
                                self.map_refresh(self.x, self.y)
                        elif event.scancode == tcod.event.SCANCODE_D:
                            self.erase(pos_x, pos_y)
                            if (self.x < self.MAP_WIDTH):
                                self.x += 1
                                self.map_refresh(self.x, self.y)
                        elif event.scancode == tcod.event.SCANCODE_ESCAPE:
                            raise SystemExit()
                    elif event.type == "QUIT":
                        raise SystemExit()
            # The window will be closed after the above with-block exits.


if __name__ == "__main__":
    Motor().start()
