# Make sure 'dejavu10x10_gs_tc.png' is in the same directory as this script.
import tcod
import numpy as np




class Motor(object):

    WIDTH, HEIGHT = 60, 60  # Console width and height in tiles.

    def __init__(self):

        self.tileset = tcod.tileset.load_tilesheet(
            "dejavu10x10_gs_tc.png", 32, 8, tcod.tileset.CHARMAP_TCOD,
        )

        buffer = np.zeros(
            shape = (self.WIDTH, self.HEIGHT),
            dtype = tcod.console.Console.DTYPE,
            order = "F"
        )

        buffer["ch"] = ord('.')
        buffer["ch"][:, 1] = ord('#')

        # Create the main console.
        self.console = tcod.Console(self.WIDTH, self.HEIGHT, order="F", buffer=buffer)

    def erase(self, x, y):
        self.console.rgb[x,y] = ord('.'), tcod.black, tcod.grey


    def start(self) -> None:
        """Script entry point."""
        # Load the font, a 32 by 8 tile font with libtcod's old character layout.


        # Create a window based on this console and tileset.
        with tcod.context.new(  # New window for a console of size columns×rows.
            columns=self.console.width, rows=self.console.height, tileset=self.tileset,
        ) as context:
            x = int(self.WIDTH / 2)
            y = int(self.HEIGHT / 2)
            while True:  # Main loop, runs until SystemExit is raised.
                #console = tcod.Console(WIDTH, HEIGHT, order="F", buffer=buffer)
                self.console.rgb[x, y] = ord("@"), tcod.yellow, tcod.black
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
                            if (y < self.HEIGHT-1):
                                y += 1
                        elif event.scancode == tcod.event.SCANCODE_UP:
                            self.console.rgb[x,y] = ord('.'), tcod.black, tcod.grey
                            if (y > 0):
                                y -= 1
                        elif event.scancode == tcod.event.SCANCODE_LEFT:
                            self.console.rgb[x,y] = ord('.'), tcod.black, tcod.grey
                            if (x > 0):
                                x -= 1
                        elif event.scancode == tcod.event.SCANCODE_RIGHT:
                            self.console.rgb[x,y] = ord('.'), tcod.black, tcod.grey
                            if (x < self.WIDTH-1):
                                x += 1
                    elif event.type == "QUIT":
                        raise SystemExit()
            # The window will be closed after the above with-block exits.


if __name__ == "__main__":
    Motor().start()
