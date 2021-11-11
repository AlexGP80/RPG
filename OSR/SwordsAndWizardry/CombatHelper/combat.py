import tcod
import character
import monsters
from monsters import monsters as monster_list

WIDTH, HEIGHT = 720, 480  # Window pixel resolution (when not maximized.)
FLAGS = tcod.context.SDL_WINDOW_RESIZABLE | tcod.context.SDL_WINDOW_MAXIMIZED


class Controller(object):

    STATE_TEAMS_MAIN = 0
    STATE_TEAMS_SELECT_MONSTER = 1


    def __init__(self):
        self.pcs = []
        self.monsters = []
        self.context = None
        self.console = None
        self.tileset = tcod.tileset.load_tilesheet(
            "Gamo_14x14.png", 16, 16, tcod.tileset.CHARMAP_CP437,
        )
        self.state = self.STATE_TEAMS_MAIN


    def start(self) -> None:
        """Script entry point."""

        # Load the font, a 32 by 8 tile font with libtcod's old character layout.
        with tcod.context.new(  # New window with pixel resolution of width×height.
            width=WIDTH, height=HEIGHT, sdl_window_flags=FLAGS, tileset=self.tileset
        ) as self.context:
            while True:
                self.console = self.context.new_console(order="F")
                half_width = int(self.console.width / 2)
                rest = self.console.width - (2 * half_width)
                self.console.draw_frame(x=0, y=0, width=half_width+rest, height=self.console.height, decoration="╔═╗║ ║╚═╝", fg=tcod.light_grey)
                self.console.draw_frame(x=half_width+rest, y=0, width=half_width, height=self.console.height, decoration="╔═╗║ ║╚═╝", fg=tcod.light_grey)

                if (self.state == self.STATE_TEAMS_MAIN):
                    self.console.print_box(x=0, y=0, width=half_width+rest, height=1, string=" Player Characters ", alignment=tcod.CENTER)
                    for i, pc in enumerate(self.pcs):
                        self.console.print_box(x=2, y=i+2, width=half_width+rest, height=1, string=f'{str(i+1):2} {pc.short_str()}', alignment=tcod.LEFT)
                    for i, monster in enumerate(self.monsters):
                        self.console.print_box(x=half_width+rest+2, y=i+2, width=half_width+rest, height=1, string=f'{str(i+1):2} {monster.name}', alignment=tcod.LEFT)
                    self.console.print_box(x=1, y=self.console.height - 3, width=half_width+rest, height=1, string=" a - Add Player Character ", alignment=tcod.LEFT)
                    self.console.print_box(x=half_width+rest+1, y=self.console.height - 3, width=half_width, height=1, string=" m - Add Monster ", alignment=tcod.LEFT)
                    self.console.print_box(x=half_width+rest, y=0, width=half_width, height=1, string=" Monsters ", alignment=tcod.CENTER)
                elif (self.state == self.STATE_TEAMS_SELECT_MONSTER):
                    self.console.print_box(x=half_width+rest, y=0, width=half_width, height=1, string=" Select monster to add ", alignment=tcod.CENTER)
                    for i,monster in enumerate(monster_list):
                        self.console.print_box(x=half_width + rest + 2, y=i+2, width=half_width, height=1, string=f'{str(i+1):2} {monster.name}', alignment=tcod.LEFT)
                        self.console.print_box(x=half_width+rest+1, y=self.console.height - 3, width=half_width, height=1, string=" 0-9 Add monster listed by number ", alignment=tcod.LEFT)





                self.context.present(self.console, integer_scaling=True)

                for event in tcod.event.wait():
                    self.context.convert_event(event)  # Sets tile coordinates for mouse events.
                    print(event)
                    if event.type == "QUIT":
                        raise SystemExit()
                    if event.type == "WINDOWRESIZED":
                        pass  # The next call to context.new_console may return a different size.
                    if event.type == "KEYDOWN":
                        if event.scancode == tcod.event.SCANCODE_ESCAPE:
                            raise SystemExit()
                        if (self.state == self.STATE_TEAMS_MAIN):
                            if event.scancode == tcod.event.SCANCODE_A:
                                self.pcs.append(character.Character())
                            elif event.scancode == tcod.event.SCANCODE_M:
                                self.state = self.STATE_TEAMS_SELECT_MONSTER
                        elif self.state == self.STATE_TEAMS_SELECT_MONSTER:
                            if (event.scancode == tcod.event.SCANCODE_1):
                                self.monsters.append(monster_list[0])
                                self.state = self.STATE_TEAMS_MAIN

if __name__ == "__main__":
    Controller().start()
