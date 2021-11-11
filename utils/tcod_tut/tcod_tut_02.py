import tcod

WIDTH, HEIGHT = 720, 480  # Window pixel resolution (when not maximized.)
FLAGS = tcod.context.SDL_WINDOW_RESIZABLE | tcod.context.SDL_WINDOW_MAXIMIZED


def main() -> None:
    """Script entry point."""
        # Load the font, a 32 by 8 tile font with libtcod's old character layout.
    tileset = tcod.tileset.load_tilesheet(
        "Gamo_14x14.png", 16, 16, tcod.tileset.CHARMAP_CP437,
    )
    with tcod.context.new(  # New window with pixel resolution of width×height.
        width=WIDTH, height=HEIGHT, sdl_window_flags=FLAGS, tileset=tileset
    ) as context:
        while True:
            console = context.new_console(order="F")
            half_width = int(console.width / 2)
            rest = console.width - (2 * half_width)
            console.draw_frame(x=0, y=0, width=half_width+rest, height=console.height, decoration="╔═╗║ ║╚═╝", fg=tcod.light_grey)
            console.draw_frame(x=half_width+rest, y=0, width=half_width, height=console.height, decoration="╔═╗║ ║╚═╝", fg=tcod.light_grey)
            context.present(console, integer_scaling=True)

            for event in tcod.event.wait():
                context.convert_event(event)  # Sets tile coordinates for mouse events.
                print(event)
                if event.type == "QUIT":
                    raise SystemExit()
                if event.type == "WINDOWRESIZED":
                    pass  # The next call to context.new_console may return a different size.


if __name__ == "__main__":
    main()
