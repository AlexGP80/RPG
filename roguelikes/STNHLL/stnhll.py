# Make sure 'dejavu10x10_gs_tc.png' is in the same directory as this script.
import tcod
import numpy as np
import random
from datetime import datetime


random.seed(datetime.now().microsecond)




class Motor(object):

    WIDTH = 150
    HEIGHT = int((WIDTH*9) / 16)  # Console width and height in tiles.
    WINDOW_MAP_WIDTH = 60
    WINDOW_MAP_HEIGHT = 60
    MAP_WIDTH = 120
    MAP_HEIGHT = 120

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
                if (random.random() < 0.1667):
                    self.map[x,y] = 1




    def map_refresh(self,px,py):
        cx = 0
        for x in range(px-30,px+29,1):
            cy = 0
            cx += 1
            for y in range(py-30,py+29,1):
                cy += 1
                if (self.map[x, y]==1):
                    self.console.rgb[cx+1, cy+1] = ord("#")
                else:
                    self.console.rgb[cx+1, cy+1] = ord(".")



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
            pos_y = int(self.WINDOW_MAP_HEIGHT / 2) + 1

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
                            self.erase(x, y)
                            if (y < self.MAP_HEIGHT):
                                y += 1
                                self.map_refresh(x,y)
                        elif event.scancode == tcod.event.SCANCODE_UP:
                            self.erase(x, y)
                            if (y > 1):
                                y -= 1
                                self.map_refresh(x,y)
                        elif event.scancode == tcod.event.SCANCODE_LEFT:
                            self.erase(x, y)
                            if (x > 1):
                                x -= 1
                                self.map_refresh(x,y)
                        elif event.scancode == tcod.event.SCANCODE_RIGHT:
                            self.erase(x, y)
                            if (x < self.MAP_WIDTH):
                                x += 1
                                self.map_refresh(x,y)
                        elif event.scancode == tcod.event.SCANCODE_ESCAPE:
                            #self.console.buffer["ch"] = ord('.')
                            raise SystemExit()
                    elif event.type == "QUIT":
                        raise SystemExit()
            # The window will be closed after the above with-block exits.


if __name__ == "__main__":
    Motor().start()
