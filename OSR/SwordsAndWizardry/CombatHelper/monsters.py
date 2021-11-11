
class Monster(object):
    def __init__(self, name, AC, HD, HP, Att, THAC0, MV, MVE, SVD, SVW, SVP, SVB, SVS, ML, AL, XP, NA, NAL, TT, TTL):
        self.name = name
        self.AC = AC
        self.HD = HD
        self.HP = HP
        self.THAC0 = THAC0
        self.att = Att #list of damages
        self.MV = MV
        self.MVE = MVE
        self.SVD = SVD
        self.SVW = SVW
        self.SVP = SVP
        self.SVB = SVB
        self.SVS = SVS
        self.ML = ML
        self.AL = AL
        self.XP = XP
        self.NA = NA
        self.NAL = NAL
        self.TT = TT
        self.TTL = TTL

GOBLIN_SHORT_SWORD = Monster(name="Goblin (short sword)", AC=6, HD="1d8-1", HP=3, Att=[["Short Sword", "1d6"]],
    THAC0=19, MV=60, MVE=20, SVD=14, SVW=15, SVP=16, SVB=17, SVS=18, ML=7,
    AL="Chaotic", XP=5, NA="2d4", NAL="6d10", TT="R", TTL="C")


monsters = []
monsters.append(GOBLIN_SHORT_SWORD)
