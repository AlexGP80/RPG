import roller

class Character(object):
    rlr = roller.Roller()

    def __init__(self, name, pc_class, level, xp):
        self.name = name
        self.pc_class = pc_class
        self.level = level
        self.XP = xp
        self.XP_next = self.get_xp_for_next_level()
        self.STR = self.rlr.roll('3d6')
        self.STR_adj = self.get_adj(self.STR)
        self.open_doors = self.open_doors()
        self.INT = self.rlr.roll('3d6')
        self.INT_adj = self.get_adj(self.INT)
        self.literacy = self.get_literacy()
        self.WIS = self.rlr.roll('3d6')
        self.WIS_adj = self.get_adj(self.WIS)
        self.CON = self.rlr.roll('3d6')
        self.CON_adj = self.get_adj(self.CON)
        self.DEX = self.rlr.roll('3d6')
        self.DEX_adj = self.get_adj(self.DEX)
        self.CHA = self.rlr.roll('3d6')
        self.CHA_adj = self.get_adj(self.CHA, cha=True)
        self.max_retainers = self.get_max_retainers()
        self.loyalty = self.get_loyalty()

        self.HP = 8 + self.CON_adj
        self.HP_MAX = self.HP
        self.AC = 9 - self.DEX_adj
        self.THAC0 = 19 - self.STR_adj

        self.alignment = "Neutral"

        self.MV = 120

        self.turns_remaining_current_torch = 6
        self.additional_torches = 5
        self.turns_remaining_current_waterskin = 24
        self.additional_waterskins = 3
        self.food_remaining = 2

        self.cp = self.rlr.roll('3d6')
        self.sp = self.rlr.roll("3d6")
        self.ep = 0
        self.gp = self.rlr.roll("1d4")
        self.pp = 0
        self.gems_gp = 0






    def get_xp_for_next_level(self):
        if (self.pc_class == "Fighter"):
            if (self.level == 1):
                return 2000
        return 0

    def get_max_retainers(self):
        if (self.CHA == 3):
            return 1
        if (self.CHA <= 5):
            return 2
        if (self.CHA <= 8):
            return 3
        if (self.CHA <= 12):
            return 4
        if (self.CHA <= 15):
            return 5
        if (self.CHA <= 17):
            return 6
        return 7

    def get_loyalty(self):
        return self.get_max_retainers()+3

    def get_literacy(self):
        if (self.INT <= 5):
            return "Illiterate"
        if (self.INT <= 8):
            return "Basic"
        return "Literate"

    def open_doors(self):
        opend = 2 + self.STR_adj
        if (opend < 1):
            opend = 1
        return opend

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
