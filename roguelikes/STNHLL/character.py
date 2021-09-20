import roller

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
        self.AC = 9 - self.DEX_adj
        self.THAC0 = 19

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
