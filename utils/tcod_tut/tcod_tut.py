# Make sure 'dejavu10x10_gs_tc.png' is in the same directory as this script.
import tcod
import numpy as np

WIDTH, HEIGHT = 80, 60  # Console width and height in tiles.

def borrar(console, x, y):
    console.rgb[x,y] = ord('.'), tcod.black, tcod.grey


def main() -> None:
    """Script entry point."""
    # Load the font, a 32 by 8 tile font with libtcod's old character layout.
    tileset = tcod.tileset.load_tilesheet(
        "dejavu10x10_gs_tc.png", 32, 8, tcod.tileset.CHARMAP_TCOD,
    )
    buffer = np.zeros(
        shape = (WIDTH, HEIGHT),
        dtype = tcod.console.Console.DTYPE,
        order = "F"
    )

    buffer["ch"] = ord('.')
    buffer["ch"][:, 1] = ord('#')


    # Create the main console.
    console = tcod.Console(WIDTH, HEIGHT, order="F", buffer=buffer)


    # Create a window based on this console and tileset.
    with tcod.context.new(  # New window for a console of size columns×rows.
        columns=console.width, rows=console.height, tileset=tileset,
    ) as context:
        x = int(WIDTH / 2)
        y = int(HEIGHT / 2)
        while True:  # Main loop, runs until SystemExit is raised.
            #console.clear()
            #console = tcod.Console(WIDTH, HEIGHT, order="F", buffer=buffer)
            console.rgb[x, y] = ord("@"), tcod.yellow, tcod.black
            console.rgb["bg"] = tcod.grey
            context.present(console)  # Show the console.

            for event in tcod.event.wait():
                context.convert_event(event)  # Sets tile coordinates for mouse events.
                print(event)  # Print event information to stdout.
                    #<type='KEYDOWN', scancode=SCANCODE_DOWN, sym=K_DOWN, mod=KMOD_NUM, repeat=False>
                if event.type == "KEYDOWN":
                    if event.scancode == tcod.event.SCANCODE_DOWN:
                        borrar(console, x, y)
                        y += 1
                    elif event.scancode == tcod.event.SCANCODE_UP:
                        console.rgb[x,y] = ord('.'), tcod.black, tcod.grey
                        y -= 1
                    elif event.scancode == tcod.event.SCANCODE_LEFT:
                        console.rgb[x,y] = ord('.'), tcod.black, tcod.grey
                        x -= 1
                    elif event.scancode == tcod.event.SCANCODE_RIGHT:
                        console.rgb[x,y] = ord('.'), tcod.black, tcod.grey
                        x += 1
                elif event.type == "QUIT":
                    raise SystemExit()
        # The window will be closed after the above with-block exits.


if __name__ == "__main__":
    main()
