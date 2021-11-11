class GEItem(object):
    def __init__(self, descr, price, weight=0):
        self.descr = descr
        self.price = price
        self.weight = weight

    def __str__(self):
        return self.descr

    def __descr__(self):
        return str(self)

BACKPACK = GEItem("Backpack (300 coin capacity)", 5, 20)
BEDROLL = GEItem("Bedroll", 0.2, 50)
BELL = GEItem("Bell", 1, 5)
CANDLE = GEItem("Candle", 0.01, 1)
CASE = GEItem("Case (map or scroll)", 1, 2)
CHALK = GEItem("Chalk (1 piece)", 0.05, 1)
CROWBAR = GEItem("Crowbar", 0.2, 100)
FLINT_STEEL = GEItem("Flint & Steel", 1, 10)
GRAPPLING_HOOK = GEItem("Grappling hook", 1, 40)
HAMMER = GEItem("Hammer", 0.5, 20)
W_HOLY_SYMBOL = GEItem("Holy Symbol, wooden", 1, 1)
INK = GEItem("Ink (1-ounce bottle)", 1, 5)
LAMP_HOODED = GEItem("Lantern, hooded", 7, 20)
OIL = GEItem("Oil, lamp (1 pint)", 0.1, 10)
PARCHMENT = GEItem("Parchment (sheet)", 0.2, 0)
POLE = GEItem("Pole (10 foot)", 0.2, 100)
RATIONS_DRY = GEItem("Rations, dried (per day)", 1, 20)
ROPE = GEItem("Rope, hemp (50 feet)", 1, 50)
SHOVEL = GEItem("Shovel", 2, 50)
WHISTLE = GEItem("Signal whistle", 0.5, 1)
SPELLBOOK = GEItem("Spellbook", 25, 30)
SPIKE = GEItem("Spike, iron", 0.05, 3)
TORCH = GEItem("Torch", 0.01, 10)
WATERSKIN = GEItem("Waterskin", 1, 20)
ARROWS = GEItem("Arrows", 0.1, 2)
STONES = GEItem("Stones, sling", 0, 3)

class Armor(GEItem):
    def __init__(self, descr, price, weight, ac_mod):
        super().__init__(descr, price)
        self.weight = weight
        self.ac_mod = ac_mod
    def __str__(self):
        return f'{self.descr} [{self.weight} cns]'


NO_ARMOR = Armor("None", 0, 0, 0)
NO_SHIELD = NO_ARMOR
SHIELD = Armor("Shield", 15, 100, 1)
SHIELD_WOODEN = Armor("Shield, wooden", 10, 100, 1)
LEATHER_ARMOR = Armor("Leather Armor", 15, 250, 2)
RING_ARMOR = Armor("Ring Armor", 30, 400, 3)
CHAIN_ARMOR = Armor("Chain Armor", 75, 500, 4)
PLATE_ARMOR = Armor("Plate Armor", 175, 750, 6)

class Damage(object):
    def __init__(self, dmg):
        if ('+' in dmg):
            self.roll, self.modif = dmg.split('+')
        elif ('-' in dmg):
            self.roll, self.modif = dmg.split('-')
        elif ('d' in dmg):
            self.roll = dmg
            self.modif = 0
        else:
            self.roll = ""
            self.modif = int(dmg)

        if (not self.modif):
            self.modif = 0
        self.modif = int(self.modif)

    def __add__(self, modif):
        new_modif = self.modif + modif
        if (new_modif == 0):
            return Damage(self.roll)
        if (new_modif < 0):
            return Damage(self.roll + str(new_modif))
        return Damage(self.roll + '+' + str(new_modif))

    def __str__(self):
        if (not self.modif):
            return self.roll
        if (self.modif < 0):
            return self.roll + str(self.modif)
        return self.roll + '+' + str(self.modif)

    def __descr(self):
        return str(self)



class Weapon(GEItem):
    def __init__(self, descr, price, weight, damage, rof=0, w_range=0, vers=False, melee_and_missile=False):
        super().__init__(descr, price)
        self.weight = weight
        self.damage = Damage(damage)
        self.rof = rof
        self.w_range = w_range
        self.vers = vers
        self.melee_and_missile = melee_and_missile

BATTLE_AXE = Weapon("Battle Axe", 5, 150, '1d8', vers=True)
HAND_AXE = Weapon("Hand Axe", 1, 50, '1d6', 1, 10, melee_and_missile=True)
CLUB = Weapon("Club", 0, 100, '1d4')
DAGGER = Weapon("Dagger", 2, 20, '1d4', 1, 10, melee_and_missile=True)
FLAIL = Weapon("Flail (two-handed)", 8, 100, '1d8')
WARHAMMER = Weapon("Warhammer", 1, 100, '1d4+1')
LANCE = Weapon("Lance", 6, 150, '2d4+1')
HV_MACE = Weapon("Heavy Mace", 10, 100, '1d6')
POLEARM = Weapon("Polearm (two-handed)", 10, 150, '1d8+1')
SPEAR = Weapon("Spear", 1, 100, '1d6', 1, 20, vers=True, melee_and_missile=True)
STAFF = Weapon("Staff (two-handed)", 0, 100, '1d6')
BASTARD_SWORD = Weapon("Bastard sword", 20, 100, '1d8', vers=True)
LONGSWORD = Weapon("Longsword", 15, 100, '1d8')
SHORTSWORD = Weapon("Shortsword", 8, 50, '1d6')
SICKLE_SWORD = Weapon("Sickle-shaped sword", 8, 50, '1d6')
TWO_H_SWORD = Weapon("Two-handed Sword", 30, 150, '1d10')
LONGBOW = Weapon("Longbow", 60, 50, '1d6', 2, 70)
SHORTBOW = Weapon("Shortbow", 15, 50, '1d6', 2, 50)
SLING = Weapon("Sling", 0.2, 10, '1d4', 1, 40)
JAVELIN = Weapon("Javelin", 0.5, 50, '1d6', 1, 20)
DART = Weapon("Dart", 0.2, 10, '1d3', 3, 15)
CROSSBOW_LIGHT = Weapon("Light Crossbow", 12, 50, '1d4+1', 1, 60)
CROSSBOW_HEAVY = Weapon("Heavy Crossbow", 20, 50, '1d6+1', 0.5, 80)

class EquipEntry(object):
    def __init__(self, item, quantity):
        self.quantity = quantity
        self.item = item

    def __str__(self):
        return f'{self.quantity} {self.item} [{self.quantity * self.item.weight} cns]'

    def __descr__(self):
        return str(self)

class EquipList(object):
    def __init__(self, name):
        self.eq_list = list()
        self.name = name

    def add(self, eq_item, quant):
        self.eq_list.append(EquipEntry(eq_item, quant))

    def __str__(self):
        output = "Equipment List:\n"
        for it in self.eq_list:
            output += "  " + str(it) + "\n"
        return output

    def __descr__(self):
        return str(self)

    def to_str(self, character):
        output = f"{self.name}:\n"
        for it in self.eq_list:
            output += "  " + str(it)
            if (type(it.item).__name__ == 'Weapon'):
                w = it.item
                if (w.rof == 0):
                    output += f": THAC0 {character.melee_to_hit}, {w.damage + character.dmg_mod} damage.\n"
                elif (w.melee_and_missile):
                    output += f": THAC0 {character.melee_to_hit}, {w.damage + character.dmg_mod} damage.\n"
                    output += f"    (thrown): THAC0 {character.missile_to_hit}, RoF:{w.rof}, Range: {w.w_range}, {w.damage + character.dmg_mod} damage.\n"
                else:
                    # missile
                    output += f": THAC0 {character.missile_to_hit}, RoF:{w.rof}, Range: {w.w_range}, {w.damage + character.dmg_mod} damage.\n"
                if (w.vers):
                    output += f'    (two-handed): THAC0 {character.melee_to_hit:+}, {w.damage + character.dmg_mod + 1} damage.\n'
            else:
                output += '\n'
        return output
