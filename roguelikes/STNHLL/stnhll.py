# Make sure 'dejavu10x10_gs_tc.png' is in the same directory as this script.
import tcod
import numpy as np
import random
from datetime import datetime
import math
import roller
import character
import monsters


random.seed(datetime.now().microsecond)


class Cell(object):
    pass

class Map(object):
    pass

class Motor(object):

    EDIT_MODE = False
    CHAR_WALL = ' '
    CHAR_DARK_SHADE = '▓'
    CHAR_MEDIUM_SHADE = '▒'
    CHAR_LIGHT_SHADE = '░'
    CHAR_OPEN = '█'
    CHAR_PC = '▲'
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
    NORTH = "▲"
    EAST = "►"
    SOUTH = "▼"
    WEST = "◄"
    rlr = roller.Roller()
    EXPLORATION_MODE_COLOR = tcod.light_orange
    COMBAT_MODE_COLOR = tcod.dark_red
    DEFAULT_FONT_FG_COLOR = tcod.lighter_gray


    def __init__(self):

        # Load the font, a 32 by 8 tile font with libtcod's old character layout.
        self.tileset = tcod.tileset.load_tilesheet(
            #"dejavu10x10_gs_tc.png", 32, 8, tcod.tileset.CHARMAP_TCOD,
            #"Cheepicus_14x14.png", 16, 16, tcod.tileset.CHARMAP_CP437,
            "Gamo_14x14.png", 16, 16, tcod.tileset.CHARMAP_CP437,
        )

        buffer = np.zeros(
            shape = (self.WIDTH, self.HEIGHT),
            dtype = tcod.console.Console.DTYPE,
            order = "F"
        )
        self.hours = 0
        self.turns = 0
        self.rounds = 0
        self.seconds = 0
        self.light = True



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
        # self.mode = "Combat"
        # self.mode_color = self.COMBAT_MODE_COLOR
        self.mode = "Exploration"
        self.mode_color = self.EXPLORATION_MODE_COLOR

        self.enemies = []






    def popup(self, msg, title="Note"):
        self.console.draw_frame(x=10, y=10, width=self.WIDTH-22, height=7, decoration="╔═╗║ ║╚═╝")
        self.console.print(x=15, y=12, string=msg)
        self.console.print(x=15, y=14, string="Press any key to continue...")
        self.console.print_box(x=10, y=10, width=self.WIDTH-22, height=1, string=title, alignment=tcod.CENTER)
        self.context.present(self.console)  # Show the console.
        repeat = True
        while repeat:
            for event in tcod.event.wait():
                self.context.convert_event(event)
                if event.type == "KEYDOWN":
                    repeat = False
                    #if (event.scancode == tcod.event.SCANCODE_Y):
                    break

    def add_time(self, hours=0, turns=0, rounds=0, seconds=0):

        turns_delta = 0

        # seconds
        self.seconds += seconds
        while(self.seconds >= 10):
            self.seconds -= 10
            self.rounds += 1

        # rounds
        self.rounds += rounds
        while (self.rounds >= 60):
            self.rounds -= 60
            self.turns += 1
            turns_delta += 1

        # turns
        self.turns += turns
        turns_delta += turns
        while (self.turns >= 6):
            self.turns -= 6
            self.hours += 1

        while (turns_delta > 0):
            if (self.light):
                self.pc.turns_remaining_current_torch -= 1
                if (self.pc.turns_remaining_current_torch == 0):
                    if (self.pc.additional_torches >= 1):
                        self.pc.turns_remaining_current_torch = 6
                        self.pc.additional_torches -= 1
                    self.light = False
            self.pc.turns_remaining_current_waterskin -= 1
            if (self.pc.turns_remaining_current_waterskin == 0):
                self.pc.turns_remaining_current_waterskin = 24
                self.pc.additional_waterskins -= 1
            turns_delta -= 1

        # hours
        self.hours += hours

        # # TODO: DAYS?




    def next_turn(self):
        self.rounds = 0
        self.add_time(turns=1)




    def get_straight_distance(self, other_x, other_y):
        return math.sqrt(abs(self.x - other_x)**2 + abs(self.y - other_y)**2)

    def char_info_refresh(self):
        self.console.print(x=self.WINDOW_MAP_WIDTH+4, y=2, string=self.pc.name, bg=tcod.black, fg=tcod.dark_green)
        self.console.print(x=self.WINDOW_MAP_WIDTH+4, y=4, string=f"Human {self.pc.pc_class} {str(self.pc.level)} XP:{self.pc.XP}/{self.pc.XP_next}", bg=tcod.black, fg=self.DEFAULT_FONT_FG_COLOR)
        self.console.print(x=self.WINDOW_MAP_WIDTH+4, y=6, string=f"STR:{self.pc.STR:2}  ±Melee:{self.pc.STR_adj:+}  Doors:{self.pc.open_doors}-in-6", bg=tcod.black, fg=self.DEFAULT_FONT_FG_COLOR)
        self.console.print(x=self.WINDOW_MAP_WIDTH+4, y=7, string=f"INT:{self.pc.INT:2}  Literacy:{self.pc.literacy}", bg=tcod.black, fg=self.DEFAULT_FONT_FG_COLOR)
        self.console.print(x=self.WINDOW_MAP_WIDTH+4, y=8, string=f"WIS:{self.pc.WIS:2}", bg=tcod.black, fg=self.DEFAULT_FONT_FG_COLOR)
        self.console.print(x=self.WINDOW_MAP_WIDTH+4, y=9, string=f"DEX:{self.pc.DEX:2}  ±AC:{self.pc.DEX_adj:+}  ±Missile:{self.pc.DEX_adj}", bg=tcod.black, fg=self.DEFAULT_FONT_FG_COLOR)
        self.console.print(x=self.WINDOW_MAP_WIDTH+4, y=10, string=f"CON:{self.pc.CON:2}  ±HP:{self.pc.CON_adj:+}", bg=tcod.black, fg=self.DEFAULT_FONT_FG_COLOR)
        self.console.print(x=self.WINDOW_MAP_WIDTH+4, y=11, string=f"CHA:{self.pc.CHA:2}  ±React:{self.pc.CHA_adj:+}  MaxRets:{self.pc.max_retainers}  Loyalty:{self.pc.loyalty}", bg=tcod.black, fg=self.DEFAULT_FONT_FG_COLOR)

        self.console.print(x=self.WINDOW_MAP_WIDTH+4, y=13, string=f"Combat", bg=tcod.black, fg=tcod.darker_orange)
        self.console.print(x=self.WINDOW_MAP_WIDTH+4, y=14, string=f"HP:{self.pc.HP}/{self.pc.HP_MAX}  AC:{self.pc.AC}({self.pc.armor})  THAC0:{self.pc.THAC0}", bg=tcod.black, fg=self.DEFAULT_FONT_FG_COLOR)
        self.console.print(x=self.WINDOW_MAP_WIDTH+4, y=15, string=f"{self.pc.weapon}, THAC0 {self.pc.weapon_THAC0}, DMG {self.pc.weapon_DMG}", bg=tcod.black, fg=self.DEFAULT_FONT_FG_COLOR)

        self.console.print(x=self.WINDOW_MAP_WIDTH+4, y=17, string=f"Resources", bg=tcod.black, fg=tcod.darker_orange)
        self.console.print(x=self.WINDOW_MAP_WIDTH+4, y=18, string=f"Light:{self.pc.turns_remaining_current_torch} turns, {self.pc.additional_torches} more torches", bg=tcod.black, fg=self.DEFAULT_FONT_FG_COLOR)
        self.console.print(x=self.WINDOW_MAP_WIDTH+4, y=19, string=f"Water:{self.pc.turns_remaining_current_waterskin} turns, {self.pc.additional_waterskins} more waterskins", bg=tcod.black, fg=self.DEFAULT_FONT_FG_COLOR)
        self.console.print(x=self.WINDOW_MAP_WIDTH+4, y=20, string=f"Food:{self.pc.food_remaining} days", bg=tcod.black, fg=self.DEFAULT_FONT_FG_COLOR)

        self.console.print(x=self.WINDOW_MAP_WIDTH+4, y=22, string=f"Treasure", bg=tcod.black, fg=tcod.darker_orange)
        self.console.print(x=self.WINDOW_MAP_WIDTH+4, y=23, string=f"{self.pc.cp}cp  {self.pc.sp}sp  {self.pc.ep}ep  {self.pc.gp}gp  {self.pc.pp}pp", bg=tcod.black, fg=self.DEFAULT_FONT_FG_COLOR)
        self.console.print(x=self.WINDOW_MAP_WIDTH+4, y=24, string=f"Gems worth {self.pc.gems_gp}gp", bg=tcod.black, fg=self.DEFAULT_FONT_FG_COLOR)

        # self.console.print(x=self.WINDOW_MAP_WIDTH+30, y=2, string=str(self.pc.level), bg=tcod.black, fg=tcod.white)
        # self.console.print(x=self.WINDOW_MAP_WIDTH+33, y=2, string=f"XP:{self.pc.XP}/200000", bg=tcod.black, fg=tcod.white)


    def map_refresh(self):
        px = self.x
        py = self.y
        cx = 0
        for ix in range(px-self.MAP_REACH_X,px+self.MAP_REACH_X+1,1):
            cy = 0
            for iy in range(py-self.MAP_REACH_Y,py+self.MAP_REACH_Y+1,1):
                distance = self.get_straight_distance(ix, iy)
                if (not self.light):
                    self.console.rgb[cx+1, cy+1] = ord(self.CHAR_WALL), tcod.grey, tcod.black
                elif (iy < 0 or ix < 0 or iy >= self.MAP_HEIGHT or ix >= self.MAP_WIDTH):
                    self.console.rgb[cx+1, cy+1] = ord(self.CHAR_WALL), tcod.grey, tcod.black
                elif ((not self.EDIT_MODE) and distance > self.TORCH_DISTANCE+3):
                    self.console.rgb[cx+1, cy+1] = ord(self.CHAR_WALL), tcod.grey, tcod.black
                elif ((not self.EDIT_MODE) and distance > self.TORCH_DISTANCE and distance <= self.TORCH_DISTANCE+3):
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
                            if (distance > self.TORCH_DISTANCE and distance <= self.TORCH_DISTANCE+1):
                                self.console.rgb[cx+1, cy+1] = ord(self.CHAR_LIGHT_SHADE), tcod.black, tcod.grey
                            elif (distance > self.TORCH_DISTANCE+1 and distance <= self.TORCH_DISTANCE+2):
                                self.console.rgb[cx+1, cy+1] = ord(self.CHAR_MEDIUM_SHADE), tcod.black, tcod.grey
                            elif (distance > self.TORCH_DISTANCE+2 and distance <= self.TORCH_DISTANCE+3):
                                self.console.rgb[cx+1, cy+1] = ord(self.CHAR_DARK_SHADE), tcod.black, tcod.grey
                        else:
                            self.console.rgb[cx+1, cy+1] = ord(self.CHAR_WALL), tcod.grey, tcod.black
                    else:
                        self.console.rgb[cx+1, cy+1] = ord(self.CHAR_WALL), tcod.grey, tcod.black
                elif (self.map[ix, iy]==1):
                    self.console.rgb[cx+1, cy+1] = ord(self.CHAR_WALL), tcod.grey, tcod.black
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
                        self.console.rgb[cx+1, cy+1] = ord(self.CHAR_OPEN), tcod.grey, tcod.black
                    else:
                        self.console.rgb[cx+1, cy+1] = ord(self.CHAR_WALL), tcod.grey, tcod.black
                cy += 1
            cx += 1
        self.console.print(1,29,f'({px},{py}){self.orientation}',bg=tcod.black,fg=tcod.white)
        self.console.print_box(1,29,string=f'{self.mode}',height=1,width=self.WINDOW_MAP_WIDTH,alignment=tcod.RIGHT, bg=tcod.black,fg=self.mode_color)
        self.console.print(1,1,f'{self.hours} hours, {self.turns} turns, {self.rounds} rounds',bg=tcod.black,fg=tcod.white)

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

    def turn_char_left(self):
        if (self.orientation == self.NORTH):
            self.orientation = self.WEST
        elif (self.orientation == self.WEST):
            self.orientation = self.SOUTH
        elif (self.orientation == self.SOUTH):
            self.orientation = self.EAST
        elif (self.orientation == self.EAST):
            self.orientation = self.NORTH
        self.CHAR_PC = self.orientation
        self.map_refresh()

    def turn_char_right(self):
        if (self.orientation == self.NORTH):
            self.orientation = self.EAST
        elif (self.orientation == self.WEST):
            self.orientation = self.NORTH
        elif (self.orientation == self.SOUTH):
            self.orientation = self.WEST
        elif (self.orientation == self.EAST):
            self.orientation = self.SOUTH
        self.CHAR_PC = self.orientation
        self.map_refresh()


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
        c = character.Character("Jerry Duller", "Fighter", 1, 0)
        repeat = True
        while repeat:
            # output =  f"  Name: {c.name}\n\n"
            # output += f"  Species: {c.species}\n"
            # output

            self.console.print(x=3, y=3, string=f"Name:{c.name}")
            self.console.print_box(x=3, y=4, width=50, height=1, string=f"Class:{c.pc_class}  Level:{c.level}  XP:{c.XP      }")
            self.console.print_box(x=3, y=6, width=50, height=1, string=f" STR:{c.STR}                                     ")
            self.console.print_box(x=3, y=7, width=50, height=1, string=f" INT:{c.INT}                                     ")
            self.console.print_box(x=3, y=8, width=50, height=1, string=f" WIS:{c.WIS}                                     ")
            self.console.print_box(x=3, y=9, width=50, height=1, string=f" CON:{c.CON}                                     ")
            self.console.print_box(x=3, y=10, width=50, height=1, string=f" DEX:{c.DEX}                                     ")
            self.console.print_box(x=3, y=11, width=50, height=1, string=f" CHA:{c.CHA}                                     ")
            self.console.print_box(x=3, y=13, width=70, height=1, string="Keep character? (Y/N):       ")

            self.context.present(self.console)  # Show the console.

            if (self.chooseYN() == "Yes"):
                repeat = False
            else:
                c = character.Character("Jerry Duller", "Fighter", 1, 0)
                continue

            self.console.print_box(x=3, y=13, width=70, height=1, string="Choose: (1)Leather armor (2)Chain mail          ")
            self.context.present(self.console)  # Show the console.
            c.armor = "None"
            opt = self.choose(2)
            if (opt == 1):
                c.armor = "Leather armor"
                c.AC = 7 - c.DEX_adj
            elif (opt == 2):
                c.armor = "Chain mail"
                c.AC = 5 - c.DEX_adj

            self.console.print_box(x=3, y=13, width=70, height=1, string="Choose: (1)Hand axe (2)Mace (3)Short sword (4)Spear      ")
            self.context.present(self.console)  # Show the console.
            c.weapon = "None"
            opt = self.choose(4)
            if (opt == 1):
                c.weapon = "Hand axe"
            elif (opt == 2):
                c.weapon = "Mace"
            elif (opt == 3):
                c.weapon = "Short sword"
            elif (opt == 4):
                c.weapon = "Spear"

            c.weapon_adj = 0
            c.weapon_THAC0 = 19 - c.STR_adj - c.weapon_adj
            wpn_dmg_adj_total = c.STR_adj + c.weapon_adj
            c.weapon_DMG = f"1d6{wpn_dmg_adj_total:+}"



            # self.console.print_box(x=3, y=13, width=70, height=1, string=f"HP:{c.HP}  AC:{c.AC}  THAC0:{c.THAC0}  DMG:{c.DMG}                         ")
            # self.console.print_box(x=3, y=15, width=70, height=1, string="Press (1) to continue...         ")
            # self.context.present(self.console)  # Show the console.
            # opt = self.choose(1)

            return c



    def choose(self, num_options):
        while True:
            for event in tcod.event.wait():
                self.context.convert_event(event)  # Sets tile coordinates for mouse events.
                if event.type == "KEYDOWN":
                    if (event.scancode == tcod.event.SCANCODE_1):
                        return 1
                    if (event.scancode == tcod.event.SCANCODE_2 and num_options >= 2):
                        return 2
                    if (event.scancode == tcod.event.SCANCODE_3 and num_options >= 3):
                        return 3
                    if (event.scancode == tcod.event.SCANCODE_4 and num_options >= 4):
                        return 4
                    if (event.scancode == tcod.event.SCANCODE_5 and num_options >= 5):
                        return 5
                    if (event.scancode == tcod.event.SCANCODE_6 and num_options >= 6):
                        return 6
                    if (event.scancode == tcod.event.SCANCODE_7 and num_options >= 7):
                        return 7
                    if (event.scancode == tcod.event.SCANCODE_8 and num_options >= 8):
                        return 8
                    if (event.scancode == tcod.event.SCANCODE_9 and num_options >= 9):
                        return 9
                    if (event.scancode == tcod.event.SCANCODE_0 and num_options == 10):
                        return 0

    def chooseYN(self):
        while True:
            for event in tcod.event.wait():
                self.context.convert_event(event)  # Sets tile coordinates for mouse events.
                if event.type == "KEYDOWN":
                    if (event.scancode == tcod.event.SCANCODE_Y):
                        return "Yes"
                    if (event.scancode == tcod.event.SCANCODE_N):
                        return "No"

    def move_north(self):
        self.erase(self.pos_x, self.pos_y)
        if (self.y > 0 and (self.map[self.x, self.y-1]==0 or self.EDIT_MODE)):
            self.y -= 1
            return True
        return False

    def move_south(self):
        self.erase(self.pos_x, self.pos_y)
        if (self.y < (self.MAP_HEIGHT - 1) and (self.map[self.x, self.y+1]==0 or self.EDIT_MODE)):
            self.y += 1
            return True
        return False


    def move_east(self):
        self.erase(self.pos_x, self.pos_y)
        if (self.x < (self.MAP_WIDTH - 1) and (self.map[self.x+1, self.y]==0 or self.EDIT_MODE)):
            self.x += 1
            return True
        return False


    def move_west(self):
        self.erase(self.pos_x, self.pos_y)
        if (self.x > 0 and (self.map[self.x-1, self.y]==0 or self.EDIT_MODE)):
            self.x -= 1
            return True
        return False


    def move_char(self, direction):
        moved = False
        if (self.orientation == self.NORTH):
            if (direction == "forward"):
                moved = self.move_north()
            elif (direction == "backward"):
                moved = self.move_south()
            elif (direction == "side_left"):
                moved = self.move_west()
            elif (direction == "side_right"):
                moved = self.move_east()
        elif (self.orientation == self.SOUTH):
            if (direction == "forward"):
                moved = self.move_south()
            elif (direction == "backward"):
                moved = self.move_north()
            elif (direction == "side_left"):
                moved = self.move_east()
            elif (direction == "side_right"):
                moved = self.move_west()
        elif (self.orientation == self.EAST):
            if (direction == "forward"):
                moved = self.move_east()
            elif (direction == "backward"):
                moved = self.move_west()
            elif (direction == "side_left"):
                moved = self.move_north()
            elif (direction == "side_right"):
                moved = self.move_south()
        elif (self.orientation == self.WEST):
            if (direction == "forward"):
                moved = self.move_west()
            elif (direction == "backward"):
                moved = self.move_east()
            elif (direction == "side_left"):
                moved = self.move_south()
            elif (direction == "side_right"):
                moved = self.move_north()
        if (moved):
            self.add_time(seconds=int(600*5/self.pc.MV))
            print(f'PC.MV:{self.pc.MV}  TURNS:{self.turns}  ROUNDS:{self.rounds}  SECONDS:{self.seconds}')
            self.map_refresh()



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
            self.console.draw_frame(x=0, y=0, width=self.MAP_FRAME_WIDTH, height=self.MAP_FRAME_HEIGHT, decoration="╔═╗║ ║╚═╝", fg=tcod.light_grey)
            self.console.draw_frame(x=31, y=0, width=self.WIDTH - self.MAP_FRAME_WIDTH, height=self.MAP_FRAME_HEIGHT, decoration="╔═╗║ ║╚═╝", fg=tcod.light_grey)

            self.x = 34
            self.y = 23
            self.pos_x = int(self.MAP_FRAME_WIDTH / 2)
            self.pos_y = int(self.MAP_FRAME_HEIGHT / 2)


            self.map_refresh()

            while True:  # Main loop, runs until SystemExit is raised.
                self.console.rgb[self.pos_x, self.pos_y] = ord(self.CHAR_PC), tcod.yellow, tcod.grey
                self.char_info_refresh()
                context.present(self.console)  # Show the console.

                for event in tcod.event.wait():
                    context.convert_event(event)  # Sets tile coordinates for mouse events.

                    # Print event information to stdout.
                    print(event)

                    if event.type == "KEYDOWN":
                        if event.scancode == tcod.event.SCANCODE_S:
                            self.move_char("backward")
                        elif event.scancode == tcod.event.SCANCODE_W:
                            self.move_char("forward")
                        elif event.scancode == tcod.event.SCANCODE_Q:
                            # self.map = self.turn_left()
                            # print(self.map.T)
                            # self.x, self.y = self.MAP_HEIGHT-self.y-1, self.x
                            self.turn_char_left()
                            #self.map_refresh(self.x, self.y)
                        elif event.scancode == tcod.event.SCANCODE_E:
                            # self.map = self.turn_right()
                            # print(self.map.T)
                            # self.x, self.y = self.y, self.MAP_WIDTH-1-self.x
                            self.turn_char_right()
                            #self.map_refresh(self.x, self.y)
                        elif event.scancode == tcod.event.SCANCODE_A:
                            self.move_char("side_left")
                        elif event.scancode == tcod.event.SCANCODE_D:
                            self.move_char("side_right")
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
