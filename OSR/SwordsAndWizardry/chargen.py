import random
from datetime import datetime

random.seed(datetime.now())

class Roll(object):
    def __init__(self, descr, result_list, result_total):
        self.date_time = datetime.now()
        self.descr = descr
        self.result_list = result_list
        self.result_total = result_total

    def __descr__(self):
        return str(self)

    def __str__(self):
        output = f'{self.date_time}: {self.descr} = {self.result_total} ( '
        for i in range(len(self.result_list)):
            output += str(self.result_list[i]) + " "
        output += ')'
        return output

class Roller(object):
    def __init__(self):
        self.roll_log = list()

    def __str__(self):
        output = ''
        for i in range(len(self.roll_log)):
            output += str(self.roll_log[i]) + '\n'
        return output

    def __descr__(self):
        return str(self)

    def roll(self, roll_str):
        roll_str_curated = roll_str.lower().replace(" ","").replace("+"," ").replace("-"," -")
        roll_parts = list()
        roll_parts = roll_str_curated.split(" ")
        result_total = 0
        result_list = dict()
        num_part = 0

        for part in roll_parts:
            if (part == ""):
                continue
            part_r_list = list()
            if ('d' in part):
                num, dice = part.split('d')
                num = int(num)
                mult = 1
                if (num<0):
                    mult = -1
                    num = abs(num)
                dice = int(dice)
                for i in range(num):
                    die_result = mult * random.randint(1, dice)
                    part_r_list.append(die_result)
                    result_total += die_result
            else:
                result_total += int(part)
                part_r_list.append(int(part))
            result_list[str(part)] = part_r_list
            num_part += 1
        self.roll_log.append(Roll(roll_str, result_list, result_total))
        return result_total

    def vhalfmin(self, roll_str):
        roll_str = roll_str.lower()
        num_dice, sides = roll_str.split('d')
        num_dice = int(num_dice)
        sides = int(sides)
        vmin = int(sides / 2)
        result_list = list()
        result_total = 0
        for i in range(num_dice):
            die_result = random.randint(1, sides)
            if (die_result < vmin):
                die_result = vmin
            result_list.append(die_result)
            result_total += die_result
        self.roll_log.append(Roll(roll_str, result_list, result_total))
        return result_total

    def vmax(self, roll_str):
        roll_str = roll_str.lower()
        num_dice, sides = roll_str.split('d')
        return int(num_dice)*int(sides)


    def vmaxnroll(self, roll_str):
        roll_str = roll_str.lower()
        num_dice, sides = roll_str.split('d')
        num_dice = int(num_dice)
        sides = int(sides)
        result_list = list()
        result_total = 0
        if (num_dice > 1):
            result_total += sides
            num_dice -= 1
            result_list.append(sides)
        for i in range(num_dice):
            die_result = random.randint(1, sides)
            result_list.append(die_result)
            result_total += die_result
        self.roll_log.append(Roll(roll_str, result_list, result_total))
        return result_total




def class_distribution():
    iterations = 10000
    occurrences = dict()

    for i in range(iterations):

        ch = Character()
        if (ch.c_class in occurrences.keys()):
            occurrences[ch.c_class] += 1
        else:
            occurrences[ch.c_class] = 1

    occurrences = dict(sorted(occurrences.items(), key=lambda item: item[1]))
    for k,v in occurrences.items():
        print(f'{k}: {(100*v)/iterations:.2f}%')

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



class Character(object):
    def __init__(self):
        self.name = self.get_name()
        self.race = "Human"
        self.c_class = "Bullshit"

        while(self.c_class == "Bullshit"):
            self.attributes = self.get_attributes()
            self.c_class = self.get_class()

        self.STR = self.attributes["STR"]
        self.DEX = self.attributes["DEX"]
        self.CON = self.attributes["CON"]
        self.INT = self.attributes["INT"]
        self.WIS = self.attributes["WIS"]
        self.CHA = self.attributes["CHA"]

        self.eq_list = EquipList("Equipment")
        self.weapons = EquipList("Weapons")
        self.armor = None
        self.shield = None
        self.hit_dice = self.get_hit_dice()
        self.weight = 0
        self.prime_attrs = self.get_prime_attrs()
        self.prime_attr_exp_bonus = self.get_prime_attr_exp_bonus()

        self.gold = self.get_starting_gold()

        self.to_hit_mod = self.get_to_hit_mod()
        self.dmg_mod = self.get_dmg_mod()
        self.open_doors = self.get_open_doors()
        self.carry_mod = self.get_carry_mod()
        self.carrying_capacity = 750 + self.carry_mod
        self.missile_to_hit_mod = self.get_missile_to_hit_mod()
        self.ac_mod = self.get_ac_mod()
        self.hp_mod = self.get_hp_mod()
        self.hp_max = self.get_hit_points_max()
        self.hp_curr = self.hp_max
        self.raise_dead_survival = self.get_raise_dead_survival()
        self.max_additional_languages = self.get_max_additional_languages()
        self.max_spell_level = self.get_max_spell_level()
        self.chance_und_new_spell = self.get_chance_und_new_spell()
        self.min_max_num_spells_und_level = self.get_min_max_num_spells_und_level()
        self.additional_cleric_1st_level_spells = self.get_additional_cleric_1st_level_spells()
        self.wis_exp_bonus = self.get_wis_exp_bonus()
        self.cha_exp_bonus = self.get_cha_exp_bonus()
        self.max_num_special_hirelings = self.get_max_num_special_hirelings()
        self.retainers_morale = self.max_num_special_hirelings+3

        self.total_exp_bonus = self.prime_attr_exp_bonus + self.wis_exp_bonus + self.cha_exp_bonus

        self.saving_throw = self.get_saving_throw()
        self.death_ray_poison_save = self.saving_throw
        self.wands_save = self.saving_throw
        self.turned_to_stone_save = self.saving_throw
        self.dragon_breath_save = self.saving_throw
        self.spells_staff_save = self.saving_throw

        self.set_saving_throws()

        self.armor_permitted = self.get_armor_permitted()
        self.shield_permitted = self.get_shield_permitted()

        self.cl_spell_slots_lev1 = self.get_cl_spell_slots_lev1()
        self.dr_spell_slots_lev1 = self.get_dr_spell_slots_lev1()
        self.mu_spell_slots_lev1 = self.get_mu_spell_slots_lev1()

        self.base_ac = 9
        self.weaponless_damage = self.get_weaponless_damage()
        self.base_to_hit = 19
        self.melee_to_hit = self.base_to_hit - self.to_hit_mod
        self.missile_to_hit = self.base_to_hit - self.to_hit_mod - self.missile_to_hit_mod
        self.xp = 0
        self.alignment = self.get_alignment()

        self.spells_known = self.get_spells_known()
        self.thieving_skills = self.get_thieving_skills()
        self.get_equipment()
        pennies = (self.gold - int(self.gold))*100
        self.gold = int(self.gold)
        self.silver = int(pennies / 10)
        self.copper = int(pennies % 10)
        self.weight_gold = self.gold
        self.weight_silver = self.silver
        self.weight_copper = self.copper
        self.weight += self.weight_gold + self.weight_silver + self.weight_copper
        self.ac = self.base_ac - self.ac_mod - self.armor.ac_mod - self.shield.ac_mod
        self.weight_thresholds = [x + y for x, y in zip([750, 1000, 1500, 3000], [self.carry_mod, self.carry_mod, self.carry_mod, self.carry_mod])]
        self.mv_rate = self.get_mv_rate()
        self.class_abilities = self.get_class_abilities()


    def set_saving_throws(self):
        if (self.c_class in ["Cleric", "Druid", "Monk"]):
            self.death_ray_poison_save = 11
            self.wands_save = 12
            self.turned_to_stone_save = 14
            self.dragon_breath_save = 16
            self.spells_staff_save = 15
        elif (self.c_class in ["Fighter", "Ranger"]):
            self.death_ray_poison_save = 12
            self.wands_save = 13
            self.turned_to_stone_save = 14
            self.dragon_breath_save = 15
            self.spells_staff_save = 16
        elif (self.c_class == "Paladin"):
            self.death_ray_poison_save = 10
            self.wands_save = 11
            self.turned_to_stone_save = 12
            self.dragon_breath_save = 13
            self.spells_staff_save = 14
        else:
            self.death_ray_poison_save = 13
            self.wands_save = 14
            self.turned_to_stone_save = 13
            self.dragon_breath_save = 16
            self.spells_staff_save = 15


    def add_items(self, item, quant=1):
        self.gold -= quant * item.price
        if hasattr(item, 'weight'):
            self.weight += quant * item.weight
        if (type(item).__name__ == "Weapon"):
            self.weapons.add(item, 1)
        else:
            self.eq_list.add(item, quant)


    def add_armor(self, armor):
        self.armor = armor
        self.gold -= armor.price
        self.weight += armor.weight
        self.armor.ac_mod = armor.ac_mod

    def add_shield(self, shield):
        self.shield = shield
        self.gold -= shield.price
        self.weight += shield.weight
        self.shield.ac_mod = shield.ac_mod

    def get_mv_rate(self):
        for i in range(len(self.weight_thresholds)):
            if (self.weight <= self.weight_thresholds[i]):
                return 12 - (i*3)




    def get_equipment(self):
        self.add_armor(NO_ARMOR)
        self.add_shield(NO_SHIELD)
        self.add_items(BACKPACK)
        self.add_items(BEDROLL)
        self.add_items(RATIONS_DRY, 5)
        self.add_items(WATERSKIN, 2)
        self.add_items(FLINT_STEEL)

        if (random.randint(0,3)):
            self.add_items(TORCH, 5)
        else:
            self.add_items(LAMP_HOODED)
            self.add_items(OIL, 3)

        if (self.c_class == "Magic-User"):
            self.add_items(SPELLBOOK)
            self.add_items(INK)
            self.add_items(PARCHMENT, 5)
            self.add_items(CASE)

        if (self.c_class == "Cleric" or self.c_class == "Paladin"):
            self.add_items(W_HOLY_SYMBOL)

        # Armor & Shield
        if (self.c_class == "Assassin" or self.c_class == "Thief" or self.c_class == "Druid"):
            if (self.gold > 15):
                self.add_armor(LEATHER_ARMOR)
            if (self.gold > 18):
                if (self.c_class == "Druid"):
                    self.add_items(SICKLE_SWORD)
                else:
                    self.add_items(SHORTSWORD)
            else:
                self.add_items(CLUB)
            if (self.c_class == "Assassin" and self.gold > SHIELD.price+10):
                self.add_shield(SHIELD)
            if (self.c_class == "Druid" and self.gold > SHIELD.price+10):
                self.add_shield(SHIELD_WOODEN)
        elif (self.c_class == "Magic-User"):
            self.add_items(SLING)
            self.add_items(STONES, 20)
            self.add_items(DAGGER)
        elif (self.c_class == "Monk"):
            if (self.gold > LONGBOW.price+10):
                self.add_items(LONGBOW)
                self.add_items(ARROWS, 20)
            elif (self.gold > 25):
                self.add_items(SHORTBOW)
                self.add_items(ARROWS, 20)
                #eq[f"Short Bow: {self.missile_to_hit:+} to hit, RoF:2, Range: 50ft, 1d6{self.dmg_mod:+} damage"] = 1
            self.add_items(STAFF)
        elif (self.c_class == "Cleric" or self.c_class == "Fighter" or self.c_class == "Ranger" or self.c_class == "Paladin"):
            if (self.gold >= CHAIN_ARMOR.price+10):
                self.add_armor(CHAIN_ARMOR)
            elif (self.gold >= RING_ARMOR.price+10):
                self.add_armor(RING_ARMOR)
            else:
                self.add_armor(LEATHER_ARMOR)


            if (self.gold > SHIELD.price+10 and random.randint(0,2)):
                self.add_shield(SHIELD)
                if (self.c_class == "Cleric"):
                    if (random.randint(0,1)):
                        self.add_items(WARHAMMER)
                    else:
                        self.add_items(HV_MACE)
                elif (self.gold > BASTARD_SWORD.price+10):
                    if (random.randint(0,2)):
                        self.add_items(LONGSWORD)
                    else:
                        self.add_items(BASTARD_SWORD)
                elif (self.gold > SHORTSWORD.price+10):
                    if (random.randint(0,1)):
                        self.add_items(BATTLE_AXE)
                    else:
                        self.add_items(SHORTSWORD)
                elif (self.gold > SPEAR.price):
                    opc = random.randint(1,3)
                    if (opc == 1):
                        self.add_items(HAND_AXE)
                    elif (opc == 2):
                        self.add_items(WARHAMMER)
                    elif (opc == 3):
                        self.add_items(SPEAR)
                else:
                    self.add_items(CLUB)
            else:
                #no shield
                if (self.c_class == "Cleric"):
                    if (self.gold > FLAIL.price+10):
                        self.add_items(FLAIL)
                    else:
                        self.add_items(STAFF)
                elif (self.DEX - self.STR > 3):
                    if (self.gold > SHORTBOW.price+10):
                        self.add_items(SHORTBOW)
                        self.add_items(ARROWS, 20)
                    else:
                        self.add_items(JAVELIN, 2)
                else:
                    if (self.gold > TWO_H_SWORD.price+10):
                        self.add_items(TWO_H_SWORD)
                    elif (self.gold > BASTARD_SWORD.price+10):
                        self.add_items(BASTARD_SWORD)
                    elif (self.gold > POLEARM.price+10):
                        if (random.randint(0,1)):
                            self.add_items(FLAIL)
                        else:
                            self.add_items(POLEARM)
                    elif (self.gold > BATTLE_AXE.price+10):
                        self.add_items(BATTLE_AXE)
                    elif (self.gold > SPEAR.price+4):
                        self.add_items(SPEAR)
                    else:
                        self.add_items(STAFF)




        if (self.gold < 0):
            self.gold = 0

        if (self.gold > 1 and random.randint(1,3) < 3):
            self.add_items(ROPE, 1)
            if (self.gold > 1 and random.randint(1,3) == 1):
                self.add_items(GRAPPLING_HOOK, 1)

        if (random.randint(1,3) < 3):
            opc = random.randint(1,4)
            if (opc == 1 and self.gold > 0.2):
                self.add_items(CROWBAR, 1)
            elif (opc == 2 and self.gold > 0.75):
                self.add_items(HAMMER, 1)
                self.add_items(SPIKE, 5)
            elif (opc == 3 and self.gold > 2):
                self.add_items(SHOVEL, 1)
            elif (opc == 4 and self.gold > 0.2):
                self.add_items(POLE, 1)

        if (random.randint(1,3) < 3):
            opc = random.randint(1,4)
            if (opc == 1 and self.gold > 1):
                self.add_items(BELL, 1)
            elif (opc == 2 and self.gold > 0.05):
                self.add_items(CANDLE, 5)
            elif (opc == 3 and self.gold > 0.5):
                self.add_items(WHISTLE, 1)
            elif (opc == 4 and self.gold > 0.25):
                self.add_items(CHALK, 5)


    def get_thieving_skills(self):
        thsk = dict()
        if (self.c_class == "Monk" or self.c_class == "Thief"):
            thsk = {"Climb Walls":85, "Delicate Tasks and Traps":15, "Hear Sounds":3, "Hide in Shadows":10, "Move Silently":20, "Open Locks":10}
        return thsk




    def get_spells_known(self):
        spells = list()
        if (self.c_class == "Cleric" and self.cl_spell_slots_lev1 > 0):
            spells.append("Cure Light Wounds")
            spells.append("Detect Evil")
            spells.append("Detect Magic")
            spells.append("Light")
            spells.append("Protection from Evil")
            spells.append("Purify Food and Drink")
        elif (self.c_class == "Druid"):
            spells.append("Detect Magic")
            spells.append("Detect Snares & Pits")
            spells.append("Faerie Fire")
            spells.append("Locate Animals")
            spells.append("Predict Water")
            spells.append("Purify Water")
        elif (self.c_class == "Magic-User"):
            spells.append("Read Magic")
            known = 1
            min_sp, max_sp = self.min_max_num_spells_und_level.split("/")
            if (max_sp == "All"):
                max_sp = '999'
            max_sp = int(max_sp)
            min_sp = int(min_sp)
            mu_spells = ["Charm Person", "Detect Magic", "Hold Portal", "Light", "Magic Missile", "Protection from Evil", "Read Languages", "Shield", "Sleep"]
            random.shuffle(mu_spells)
            for i in range(len(mu_spells)):
                if (rlr.roll('1d100') <= self.chance_und_new_spell):
                    spells.append(mu_spells[i])
                    known += 1
                    if (known == max_sp):
                        return spells
            while (known < min_sp):
                for i in range(len(mu_spells)):
                    if (mu_spells[i] not in spells[i]):
                        if (rlr.roll('1d100') <= self.chance_und_new_spell):
                            spells.append(mu_spells[i])
                            known += 1
                            if (known == min_sp):
                                return spells
        return spells


    def get_alignment(self):
        if (self.c_class == "Fighter" or self.c_class == "Magic-User"):
            als = ["Lawful", "Neutral"]
            return als[random.randint(0,1)]
        if (self.c_class == "Assassin" or self.c_class == "Druid" or self.c_class == "Thief"):
            return "Neutral"
        return "Lawful"


    def get_weaponless_damage(self):
        if (self.c_class == "Monk"):
            return "1d4"
        return "1"

    def get_mu_spell_slots_lev1(self):
        slots1 = 0
        if (self.c_class == "Magic-User"):
            slots1 += 1
            if (self.INT >= 15):
                slots1 += 1
        return slots1


    def get_dr_spell_slots_lev1(self):
        if (self.c_class == "Druid"):
            return 1
        return 0


    def get_cl_spell_slots_lev1(self):
        if (self.c_class == "Cleric" and self.WIS >= 15):
            return 1
        return 0

    def get_shield_permitted(self):
        if (self.c_class == "Druid"):
            return "Wooden"
        if (self.c_class == "Magic-User" or self.c_class == "Monk" or self.c_class == "Thief"):
            return "No"
        return "Yes"


    def get_armor_permitted(self):
        if (self.c_class == "Assasin" or self.c_class == "Druid" or self.c_class == "Thief"):
            return "Leather Armor"
        if (self.c_class == "Magic-User" or self.c_class == "Monk"):
            return "None"
        return "Any"

    def get_saving_throw(self):
        if (self.c_class == "Paladin"):
            return 12
        if (self.c_class == "Fighter" or self.c_class == "Ranger"):
            return 14
        return 15


    def get_prime_attr_exp_bonus(self):
        for i in range(len(self.prime_attrs)):
            if (self.attributes[self.prime_attrs[i]] < 13):
                return 0
        return 5

    def get_prime_attrs(self):
        if (self.c_class == "Assassin"):
            return ["DEX", "STR", "INT"]
        if (self.c_class == "Cleric"):
            return ["WIS"]
        if (self.c_class == "Druid"):
            return ["WIS", "CHA"]
        if (self.c_class == "Fighter"):
            return ["STR"]
        if (self.c_class == "Magic-User"):
            return ["INT"]
        if (self.c_class == "Monk"):
            return ["WIS", "STR", "DEX"]
        if (self.c_class == "Paladin"):
            return ["STR", "CHA"]
        if (self.c_class == "Ranger"):
            return ["STR", "INT", "WIS"]
        if (self.c_class == "Thief"):
            return ["DEX"]
        return "ERROR"


    def get_hit_dice(self):
        if (self.c_class in ["Assassin", "Cleric", "Druid"]):
            return "1d6"
        if (self.c_class in ["Fighter", "Paladin"]):
            return "1d8"
        if (self.c_class == "Ranger"):
            return "2d8"
        else: #Monk, Thief, Magic-User
            return "1d4"

    def get_hit_points_max(self):
        hp = 0
        if (self.c_class == "Ranger"):
            hp = rlr.vmax('1d8') + self.hp_mod + rlr.vhalfmin('1d8') + self.hp_mod
        else:
            # house rule: at first level, max hit points
            hp = rlr.vmax(self.hit_dice) + self.hp_mod
        return hp

    def get_max_num_special_hirelings(self):
        c = self.CHA
        if (c <= 4):
            return 1
        if (c <= 6):
            return 2
        if (c <= 8):
            return 3
        if (c <= 12):
            return 4
        if (c <= 15):
            return 5
        if (c <= 17):
            return 6
        return 7

    def get_additional_cleric_1st_level_spells(self):
        if (self.c_class == "Cleric" and self.WIS >= 15):
            return 1
        return 0

    def get_wis_exp_bonus(self):
        if (self.WIS >= 13):
            return 5
        return 0

    def get_cha_exp_bonus(self):
        if (self.CHA >= 13):
            return 5
        return 0

    def get_min_max_num_spells_und_level(self):
        i = self.INT
        if (i <= 7):
            return '2/4'
        if (i <= 9):
            return '3/5'
        if (i <= 12):
            return '4/6'
        if (i <= 14):
            return '5/8'
        if (i <= 16):
            return '6/10'
        if (i == 17):
            return '7/All'
        return '8/All'


    def get_max_spell_level(self):
        INT = self.INT
        if (INT <= 7):
            return 4
        if (INT <= 10):
            return 5
        if (INT <= 12):
            return 6
        if (INT <= 14):
            return 7
        if (INT <= 16):
            return 8
        return 9

    def get_chance_und_new_spell(self):
        i = self.INT
        if (i >= 18):
            return 95
        if (i == 17):
            return 85
        if (i >= 15):
            return 75
        if (i >= 13):
            return 65
        if (i == 12):
            return 55
        if (i >= 10):
            return 50
        if (i == 9):
            return 45
        if (i == 8):
            return 40
        return 30

    def get_max_additional_languages(self):
        if (self.INT <= 7):
            return 0
        if (self.INT <= 9):
            return 1
        if (self.INT <= 11):
            return 2
        if (self.INT <= 13):
            return 3
        if (self.INT <= 15):
            return 4
        if (self.INT <= 17):
            return 5
        # self.INT == 18
        return 6

    def get_raise_dead_survival(self):
        if (self.CON < 9):
            return 50
        if (self.CON >= 13):
            return 100
        return 75

    def get_hp_mod(self):
        if (self.CON < 9):
            return -1
        if (self.CON >= 13):
            return 1
        return 0

    def get_class(self):
        attributes = self.attributes
        thresholds = [17,15,12,9]
        optim_classes = list()
        c_class = ""

        for t in thresholds:
            if (c_class):
                break
            if (attributes["DEX"]>t and attributes["STR"]>t and attributes["INT"]>t):
                optim_classes.append("Assassin")
            if (attributes["WIS"]>t and attributes["STR"]>t and attributes["DEX"]>t):
                optim_classes.append("Monk")
            if (attributes["STR"]>t and attributes["INT"]>t and attributes["WIS"]>t):
                optim_classes.append("Ranger")
            if (optim_classes):
                c_class = optim_classes[random.randint(0,len(optim_classes)-1)]
            else:
                if (attributes["WIS"]>t and attributes["CHA"]>t):
                    optim_classes.append("Druid")
                if (attributes["STR"]>t and attributes["CHA"]>t):
                    optim_classes.append("Paladin")
                if (optim_classes):
                    c_class = optim_classes[random.randint(0,len(optim_classes)-1)]
                else:
                    if (attributes["STR"]>t):
                        optim_classes.append("Fighter")
                    if (attributes["DEX"]>t):
                        optim_classes.append("Thief")
                    if (attributes["INT"]>t):
                        optim_classes.append("Magic-User")
                    if (attributes["WIS"]>t):
                        optim_classes.append("Cleric")
                    if (optim_classes):
                        c_class = optim_classes[random.randint(0,len(optim_classes)-1)]

        if (not c_class):
            c_class = "Bullshit"

        return c_class


    def get_name(self):
        beginning  = ["A", "Ada", "Aki", "Al", "Ali", "Alo", "Ana", "Ani", "Ba", "Be", "Bo", "Bra", "Bro"]
        beginning += ["Cha", "Chi", "Da", "De", "Do", "Dra", "Dro", "Eki", "Eko", "Ele", "Eli", "Elo"]
        beginning += ["Er", "Ere", "Eri", "Ero", "Fa", "Fe", "Fi", "Fo", "Fra", "Gla", "Gro", "Ha", "He"]
        beginning += ["Hi", "Illia", "Ira", "Ja", "Jo", "Ka", "Ki", "Kra", "La", "Le", "Lo", "Ma"]
        beginning += ["Me", "Mi", "Mo", "Na", "Ne", "No", "O", "Ol", "Or", "Pa", "Pe", "Pi", "Po"]
        beginning += ["Pra", "Qua", "Qui", "Quo", "Ra", "Re", "Ro", "Sa", "Sca", "Sco", "Se", "Sha"]
        beginning += ["She", "Sho", "So", "Sta", "Ste", "Sti", "Stu", "Ta", "Tha", "The", "Tho", "Ti"]
        beginning += ["To", "Tra", "Tri", "Tru", "Ul", "Ur", "Va", "Vo", "Wra", "Xa", "Xi", "Zha", "Zho"]

        middle  = ["bb", "bl", "bold", "br", "bran", "can", "carr", "ch", "cinn", "ck", "ckl", "ckr", "cks"]
        middle += ["dd", "dell", "dr", "ds", "fadd", "fall", "farr", "ff", "fill", "fl", "fr", "genn"]
        middle += ["gg", "gl", "gord", "gr", "gs", "h", "hall", "hark", "hill", "hork", "jenn", "kell"]
        middle += ["kill", "kk", "kl", "klip", "kr", "krack", "ladd", "land", "lark", "ld", "ldr", "lind"]
        middle += ["ll", "ln", "lord", "ls", "matt", "mend", "mm", "ms", "nd", "nett", "ng", "nk", "nn", "nodd"]
        middle += ["ns", "nt", "part", "pelt", "pl", "pp", "ppr", "pps", "rand", "rd", "resh", "rn"]
        middle += ["rp", "rr", "rush", "salk", "sass", "sc", "sh", "sp", "ss", "st", "tall", "tend"]
        middle += ["told", "v", "vall", "w", "wall", "wild", "will", "x", "y", "yang", "yell", "z", "zenn"]

        end  = ["a", "ab", "ac", "ace", "ach", "ad", "adle", "af", "ag", "ah", "ai", "ak", "aker", "al"]
        end += ["ale", "am", "an", "and", "ane", "ar", "ard", "ark", "art", "ash", "at", "ath", "ave"]
        end += ["ea", "eb", "ec", "ech", "ed", "ef", "eh", "ek", "el", "elle", "elton", "em", "en"]
        end += ["end", "ent", "enton", "ep", "er", "esh", "ess", "ett", "ic", "ich", "id", "if", "ik"]
        end += ["il", "im", "in", "ion", "ir", "is", "ish", "it", "ith", "ive", "ob", "och", "od", "odin"]
        end += ["oe", "of", "oh", "ol", "olen", "omir", "or", "orb", "org", "ort", "os", "osh", "ot", "oth"]
        end += ["ottle", "ove", "ow", "ox", "ud", "ule", "umber", "un", "under", "undle", "unt", "ur", "us"]
        end += ["ust", "ut", "", "", "", ""]

        b = random.randint(0, len(beginning)-1)
        m = random.randint(0, len(middle)-1)
        e = random.randint(0, len(end)-1)

        return beginning[b] + middle[m] + end[e]




    def get_attributes(self):
        below_nine_count = 6
        while (below_nine_count>3):
            attributes = dict(STR=max(rlr.roll("3d6"),6), DEX=max(rlr.roll("3d6"),6), CON=max(rlr.roll("3d6"),6),
                         INT=max(rlr.roll("3d6"),6), WIS=max(rlr.roll("3d6"),6), CHA=max(rlr.roll("3d6"),6))

            below_nine_count = 0
            for k,v in attributes.items():
                if (v < 9):
                    below_nine_count += 1

        return attributes

    def get_starting_gold(self):
        return 10*rlr.roll("3d6")

    def get_to_hit_mod(self):
        fighter = self.c_class == "Fighter"
        if (self.STR < 5):
            return -2
        if (self.STR < 7):
            return -1
        if (fighter and self.STR >= 17):
            return +2
        if (fighter and self.STR >= 13):
            return +1
        return 0

    def get_dmg_mod(self):
        fighter = self.c_class == "Fighter"
        if (self.STR < 5):
            return -1
        if (fighter and self.STR == 18):
            return +3
        if (fighter and self.STR == 17):
            return +2
        if (fighter and self.STR == 16):
            return +1
        return 0

    def get_open_doors(self):
        if (self.STR < 7):
            return 1
        if (self.STR < 16):
            return 2
        if (self.STR == 16):
            return 3
        if (self.STR == 17):
            return 4
        if (self.STR == 18):
            return 5
        return 0

    def get_carry_mod(self):
        if (self.STR < 5):
            return -100
        if (self.STR < 7):
            return -50
        if (self.STR < 9):
            return 0
        if (self.STR < 13):
            return 50
        if (self.STR < 16):
            return 100
        if (self.STR == 16):
            return 150
        if (self.STR == 17):
            return 300
        if (self.STR == 18):
            return 500
        return 0

    def get_missile_to_hit_mod(self):
        fighter = self.c_class == "Fighter"
        if (self.DEX < 9):
            return -1
        if (fighter and self.DEX >= 13):
            return 1
        return 0

    def get_ac_mod(self):
        if (self.DEX < 9):
            return -1
        if (self.DEX >= 13):
            return 1
        return 0

    def __descr__(self):
        return str(self)

    def __str__(self):
        output = f'{self.name}\n'
        output += f'{self.alignment} {self.race} {self.c_class}\n'
        output += f'Experience Points: {self.xp} XP     Level 1\n\n'
        output += f'STR:{self.STR}   INT:{self.INT}   WIS:{self.WIS}   CON:{self.CON}   DEX:{self.DEX}   CHA:{self.CHA}\n\n'
        output += f'STR\n'
        output += f'  To-Hit Modifier: {self.to_hit_mod:+}\n'
        output += f'  Damage Modifier: {self.dmg_mod:+}\n'
        output += f'  Open Doors: {self.open_doors} in 6\n'
        output += f'  Carry Modifier: {self.carry_mod:+}\n\n'
        output += f'INT\n'
        output += f'  Maximum Additional Languages: {self.max_additional_languages}\n'
        output += f'  Maximum Spell Level: {self.max_spell_level}\n'
        output += f'  Chance to Understand New Spell: {self.chance_und_new_spell}%\n'
        output += f'  Min/Max Number of Basic Spells Understandable per Level: {self.min_max_num_spells_und_level}\n\n'
        output += f'WIS\n'
        output += f'  Additional 1st level Cleric Spells: {self.additional_cleric_1st_level_spells}\n'
        output += f'  Wisdom Experience Bonus: {self.wis_exp_bonus}%\n\n'
        output += f'CON\n'
        output += f'  Hit Point Modifier: {self.hp_mod:+}\n'
        output += f'  Raise Dead Survival: {self.raise_dead_survival}%\n\n'
        output += f'DEX\n'
        output += f'  Missile To-Hit Modifier: {self.missile_to_hit_mod:+}\n'
        output += f'  Armor Class Modifier: {self.ac_mod:+}\n\n'
        output += f'CHA\n'
        output += f'  Maximum Number of Special Hirelings: {self.max_num_special_hirelings}\n'
        output += f'  Charisma Experience Bonus: {self.cha_exp_bonus}%\n\n'
        output += '\n'
        output += f'Armor Class (AC): {self.ac}\n'
        output += f'Hit Points: {self.hp_curr} / {self.hp_max}\n'
        output += f'THAC0 (Melee): {self.melee_to_hit}\n'
        output += f'THAC0 (Missile): {self.missile_to_hit}\n'
        output += f'Weaponless Damage: {self.weaponless_damage}\n\n'
        output += f'Saving Throws: \n'
        output += f'    Death Rays and Poison: {self.death_ray_poison_save}\n'
        output += f'    Wands (all): {self.wands_save}\n'
        output += f'    Turned to Stone: {self.turned_to_stone_save}\n'
        output += f"    Dragon's Breath: {self.dragon_breath_save}\n"
        output += f'    Spells and Staffs: {self.spells_staff_save}\n\n'
        output += f'Prime Attribute(s): '
        for i in range(len(self.prime_attrs)):
            output += self.prime_attrs[i] + " "
        output += "\n"
        output += f'Prime Attribute(s) Experience Bonus: {self.prime_attr_exp_bonus}%\n'
        output += f'Total Experience Bonus (Prime Attrs + WIS + CHA): {self.total_exp_bonus}%\n\n'
        output += f'Armor Permitted: {self.armor_permitted}\n'
        output += f'Shield Permitted: {self.shield_permitted}\n'

        output += f'\nWealth:\n  {self.gold} gold pieces [{self.weight_gold} cns]\n  {self.silver} silver pieces [{self.weight_silver} cns]\n  {self.copper} copper pieces [{self.weight_copper} cns]\n'
        #print (self.equipment)
        output += f'\nArmor: {str(self.armor)}\n'
        output += f'Shield: {str(self.shield)}\n'
        output += self.weapons.to_str(self)
        output += str(self.eq_list)
        output += f'\nWeight carried: {self.weight}\n'
        output += f'Carrying Capacity: {self.carrying_capacity} / {self.carrying_capacity + 250} / {self.carrying_capacity + 750} / {self.carrying_capacity + 2250}\n'
        output += f'Movement Rate: {self.mv_rate}\n\n'
        if (self.c_class == "Cleric"):
            output += f'Cleric Level 1 Spell Slots: {self.cl_spell_slots_lev1}\n\n'
        if (self.c_class == "Magic-User"):
            output += f'Magic-User Level 1 Spell Slots: {self.mu_spell_slots_lev1}\n\n'
        if (self.c_class == "Druid"):
            output += f'Druid Level 1 Spell Slots: {self.dr_spell_slots_lev1}\n\n'
        output += f'Spells Known:\n'
        if (self.spells_known):
            for i in range(len(self.spells_known)):
                output += '  ' + self.spells_known[i] + "\n"
        else:
            output += "  None\n"
        output += "\n"
        output += f'Thieving Skills:\n'
        #print(self.thieving_skills)
        if (self.thieving_skills):
            for k,v in self.thieving_skills.items():
                output += f'  {k}: {v}'
                if (k == "Hear Sounds"):
                    output += " in 6\n"
                else:
                    output += "%\n"
        else:
            output += "  None\n"
        output += "\n*** Class Abilities ***\n"
        for cabil in self.class_abilities:
            output += cabil
        return output

    def get_class_abilities(self):
        cabil = list()
        if (self.c_class == "Assassin"):
            txt = "DISGUISE: Assassins can disguise themselves with great skill, allowing "
            txt += "them to blend into other groups without causing suspicion. A person of "
            txt += "average Intelligence and Wisdom (both scores averaging about 10) has "
            txt += "only a 5% chance to see through such a disguise, unless it involves "
            txt += "considerable fakery such as posing as a member of the opposite sex. "
            txt += "In these cases the base chance to detect the disguise is 10%. These "
            txt += "chances will be modified by the Referee to take the observer’s "
            txt += "intelligence into account. As a rough guideline, if the observer had the "
            txt += "brutish intelligence of an orc or a particularly foolish human, the chance "
            txt += "to detect the disguise might drop by 1% or 2%. If the observer were "
            txt += "a captain of the guard, a Cleric, a Magic-User, or were otherwise of "
            txt += "greater than average mental capacity, the chance to detect such a disguise "
            txt += "would increase by 1% to 3%. The Assassin’s disguise is more than just "
            txt += "a matter of costume; it encompasses mimicry of speech and behavior as "
            txt += "well. However, if the character is impersonating a specific individual, "
            txt += "the disguise can only make the Assassin look vaguely similar – anyone "
            txt += "at all familiar with the original would spot the imposture immediately. "
            txt += "Disguises are more about blending in, mimicking a different social "
            txt += "class, and – especially – not being recognized afterwards.\n\n"
            cabil.append(txt)
            txt = "MAGIC ITEMS: Assassins can use any magic items usable by Thieves, "
            txt += "plus any magic weapons, armor (leather only), and shields.\n\n"
            cabil.append(txt)
            txt = "POISON: Assassins are able to use poison on their weapons without the "
            txt += "risk of making basic errors. Fighters who coat their swords with poison "
            txt += "might – just might – make the mistake of absentmindedly rubbing their "
            txt += "eyes before remembering to wash the deadly toxin from their hands; "
            txt += "Assassins are trained not to fall prey to such basic errors when using "
            txt += "poison. Assassins are not, however, trained at concocting poisons; most "
            txt += "guilds employ an alchemist for such purposes.\n\n"
            cabil.append(txt)
            txt = "THIEVING SKILL: Assassins have skills similar to those of Thieves, "
            txt += "but comparable to a Thief two levels lower than the Assassin character. "
            txt += "(See the Thief class for an explanation of abilities in the table.)\n\n"
            cabil.append(txt)
            txt = "BACKSTAB: Assassins may attack from behind with a to-hit bonus of "
            txt += "+4, and inflict double damage plus level. This damage multiplier increases "
            txt += "at the same level as that of a Thief.\n\n"
            cabil.append(txt)
            txt = "SAVING THROW BONUS: Assassins gain a +2 bonus on saving throw rolls "
            txt += "against being poison.\n\n"
            cabil.append(txt)
            txt = "IDENTIFY POISON PROPERTIES: Given time for study and analysis, an assassin has "
            txt += "a chance to identify the properties of a poison.\n\n"
            cabil.append(txt)
        elif (self.c_class == "Cleric"):
            txt = "SPELL CASTING: Clerics cast “divine” spells from a specific list, with "
            txt += "numbers as per the Cleric Advancement table. Clerics of specific deities "
            txt += "might have different lists of available spells, designed by the Referee. "
            txt += "Each day, the Cleric selects and prays for a particular set of spells, "
            txt += "choosing any spells from the standard list. Once a spell is cast it cannot "
            txt += "be cast again until the next day, unless the Cleric has prepared (prayed "
            txt += "for) the spell more than once.\n\n"
            cabil.append(txt)
            txt = "BANISHING UNDEAD: Lawful Clerics can “turn” undead monsters (see "
            txt += "“Turning the Undead” in the Combat Section), making them flee from "
            txt += "the Cleric’s holiness. Whether Chaotic Clerics can affect undead at all "
            txt += "is up to the Referee.\n\n"
            cabil.append(txt)
            txt = "SAVING THROW BONUS: Clerics gain a +2 bonus on saving throw rolls "
            txt += "against being paralyzed or poisoned.\n\n"
            cabil.append(txt)
        elif (self.c_class == "Druid"):
            txt = "SPELL CASTING: Druids cast spells from a specific list, with numbers "
            txt += "as per the Druid Advancement Table. Each day, the Druid selects "
            txt += "and prays for a particular set of spells, choosing any spells from the "
            txt += "standard Druid spell list. Once a spell is cast, it cannot be cast again "
            txt += "until the next day, unless the Druid has prepared (prayed for) the spell "
            txt += "more than once.\n\n"
            cabil.append(txt)
            txt = "SAVING THROW BONUS: Druids gain a +2 bonus on saving throw rolls "
            txt += "against fire.\n\n"
            cabil.append(txt)
            txt = "MAGIC ITEMS: Druids are able to use any magical item Clerics can, "
            txt += "with the exception of Clerical-spell scrolls.\n\n"
            cabil.append(txt)
            txt = "SECRET LANGUAGE: The druidic hierarchy speaks a secret language "
            txt += "known to all true (neutral) Druids.\n\n"
            cabil.append(txt)
        elif (self.c_class == "Fighter"):
            txt = "MULTIPLE ATTACKS: Against creatures with 1HD or less, a Fighter "
            txt += "makes one attack per level each round.\n\n"
            cabil.append(txt)
            txt = "PARRY: Fighters with a Dexterity score of 14 or better can fight on the "
            txt += "defensive, parrying enemy blows and dodging attacks, imposing a penalty "
            txt +="to enemy attacks equal to DEX-13.\n\n"
            cabil.append(txt)
            txt = "STRENGTH BONUSES: Unlike most other character classes, Fighters with "
            txt += "a high Strength can have bonuses to hit and on damage.\n\n"
            cabil.append(txt)
        elif (self.c_class == "Magic-User"):
            txt = "SPELL CASTING: Unlike the Cleric, a Magic-User owns a book of spells, "
            txt += "which does not necessarily include all of the spells on the standard lists. "
            txt += "Reading from this book, Magic-Users force selected spell formulae into "
            txt += "their minds, “preparing” as many spells as the Magic-User can mentally "
            txt += "sustain. (It is possible to prepare a spell multiple times using the available "
            txt += "“slots” in the Magic-User’s memory and mental capability.) Once a "
            txt += "prepared spell is cast, it disappears from the Magic-User’s ability to cast, "
            txt += "until it is prepared again. If a Magic-User finds scrolls of spells while "
            txt += "adventuring, these spells can be added to the Magic-User’s spellbook.\n\n"
            cabil.append(txt)
            txt = "SAVING THROW BONUS: Magic-Users gain a bonus of +2 on all saving "
            txt += "throw rolls against spells, including spells from magic wands and staffs.\n\n"
            cabil.append(txt)
            txt = "IDENTIFY MAGIC ITEMS: Magic-Users can attempt to identify the properties of "
            txt += "magic items. Chance equal to learn spell %. It takes 1 full day of study and "
            txt += "analysis of the item to earn a chance to uncover a property. Each subsequent "
            txt += "attempt, regardless of whether or not earlier attempts were successful, "
            txt += "escalates in time: 1 day, 3 day, 1 week, 2 weeks, 1 month, 3 months. This "
            txt += "research may cost money in the form of materials.\n\n"
            cabil.append(txt)
        elif (self.c_class == "Monk"):
            txt = "DEADLY STRIKE: When the Monk’s attack roll is 5 higher than "
            txt += "the required to hit number, the target has a 75% chance to be "
            txt += "stunned by the blow for 2d6 rounds. Moreover, the mystic "
            txt += "perfection of the blow also has a 25% chance to kill the opponent, "
            txt += "provided the opponent’s hit dice are no more than 1 higher than "
            txt += "the Monk’s.\n\n"
            cabil.append(txt)
            txt = "ALERTNESS: Monks are not easily attacked by surprise. A party containing "
            txt += "a Monk is unlikely to be surprised, with only a 1 in 6 chance.\n\n"
            cabil.append(txt)
            txt = "DEFLECT MISSILES: The Monk can deflect arrows and magic missile "
            txt += "spells with a successful saving throw.\n\n"
            cabil.append(txt)
            txt = "SAVING THROW BONUS: Monks gain a +2 bonus against paralysis and poisons.\n\n"
            cabil.append(txt)
        elif (self.c_class == "Paladin"):
            txt = "LAY ON HANDS: A Paladin can “lay on hands” once per day to cure "
            txt += "others of 2 hit points of damage per level of the Paladin, or to cure "
            txt += "disease. If the other person is afflicted by more than one disease, only "
            txt += "one of these will be affected per five levels the Paladin has attained.\n\n"
            cabil.append(txt)
            txt = "INMUNE TO DISEASES: Paladins are immune to all diseases.\n\n"
            cabil.append(txt)
            txt = "WARHORSE: At any level, the character may summon a warhorse that "
            txt += "will arrive from the wilderness to serve as the Paladin’s steed. This "
            txt += "warhorse will be unusually intelligent and extremely strong (5 HD). "
            txt += "However, if the horse is killed, the Paladin may not summon another "
            txt += "within a period of ten game-years.\n\n"
            cabil.append(txt)
        elif (self.c_class == "Ranger"):
            txt = "ALERTNESS: A party containing a Ranger is unlikely to be surprised, "
            txt += "with only a 1 in 6 chance.\n\n"
            cabil.append(txt)
            txt = "MAGIC ITEMS: Rangers can use any magic items that can normally be "
            txt += "used by Fighters.\n\n"
            cabil.append(txt)
            txt = "GIANTS AND GOBLIN-TYPES: Rangers are well trained to deal with "
            txt += "giants, trolls, ogres, orcs, goblins, and kobolds. Against any of these "
            txt += "sorts of monsters, Rangers gain +1 damage per level with a successful "
            txt += "attack roll.\n\n"
            cabil.append(txt)
        elif (self.c_class == "Thief"):
            txt =  "BACKSTAB: When attacking with surprise, from behind, the Thief "
            txt += "gains +4 to hit and inflicts double damage. At levels 5-8, damage is "
            txt += "tripled, and from a Thief above level 8 such an attack inflicts quadruple "
            txt += "damage.\n\n"
            cabil.append(txt)
            txt =  "SAVING THROW BONUS: Thieves gain a +2 bonus on saving throws "
            txt += "against devices, including traps, magical wands or staffs, and other "
            txt += "magical devices.\n\n"
            cabil.append(txt)
            txt = "ASSESS: Thieves can attempt to evaluate the worth of any treasure they find.\n\n"
        return cabil


def get_character():
    ch = Character()
    print(ch)


class CharGen:
    def __init__(self):
        self.rlr = Roller()

    def get_character(self, c_class="Any"):

        character = None

        if (c_class in ["Fighter", "Cleric", "Thief", "Magic-User", "Assassin", "Druid", "Ranger", "Monk", "Paladin"]):
            character = Character()
            while (character.c_class != c_class):
                character = Character()
        else:
            character = Character()

        return character

    def get_alignment(self):
        roll = self.rlr.roll('1d6')
        if (roll > 3):
            return "Lawful"
        if (roll > 1):
            return "Neutral"
        return "Chaotic"

    def get_trait(self):
        r = self.rlr.roll('1d100')
        if (r == 1):
            return "always bored"
        if (r == 2):
            return "angry drunk"
        if (r == 3):
            return "annoyingly cryptic"
        if (r == 4):
            return "avant-garde"
        if (r == 5):
            return "bigoted"
        if (r == 6):
            return "bloody-minded"
        if (r == 7):
        	return "boastful"
        if (r == 8):
        	return "bookworm"
        if (r == 9):
        	return "bossy"
        if (r == 10):
        	return "bully"
        if (r == 11):
        	return "calculating"
        if (r == 12):
        	return "can-do attitude"
        if (r == 13):
        	return "chatterbox"
        if (r == 14):
        	return "chirpy"
        if (r == 15):
        	return "collects small animals"
        if (r == 16):
        	return "compulsive liar"
        if (r == 17):
        	return "condescending"
        if (r == 18):
        	return "conniving"
        if (r == 19):
        	return "conspiracy theorist"
        if (r == 20):
        	return "creep"
        if (r == 21):
        	return "decadent"
        if (r == 22):
        	return "ditz"
        if (r == 23):
        	return "egomaniac"
        if (r == 24):
        	return "exquisite dresser"
        if (r == 25):
        	return "extravagant"
        if (r == 26):
        	return "fanatically loyal"
        if (r == 27):
        	return "fast-talker"
        if (r == 28):
        	return "femme fatale"
        if (r == 29):
        	return "fiercely ambitious"
        if (r == 30):
        	return "fits of melancholy"
        if (r == 31):
        	return "flamboyant"
        if (r == 32):
        	return "folksy wisdom"
        if (r == 33):
        	return "gossip"
        if (r == 34):
        	return "hard-boiled"
        if (r == 35):
        	return "hears voices"
        if (r == 36):
        	return "hillbilly"
        if (r == 37):
        	return "hothead"
        if (r == 38):
        	return "hypochondriac"
        if (r == 39):
        	return "iconoclast"
        if (r == 40):
        	return "idealistic"
        if (r == 41):
        	return "illiterate"
        if (r == 42):
        	return "incredibly persistent"
        if (r == 43):
        	return "insightful observer"
        if (r == 44):
        	return "into crystals"
        if (r == 45):
        	return "jack of all trades"
        if (r == 46):
        	return "jerk"
        if (r == 47):
        	return "klutz"
        if (r == 48):
        	return "knows everybody"
        if (r == 49):
        	return "life of the party"
        if (r == 50):
        	return "love-struck"
        if (r == 51):
        	return "mad genius"
        if (r == 52):
        	return "magnetic personality"
        if (r == 53):
        	return "manic"
        if (r == 54):
        	return "master orator"
        if (r == 55):
        	return "mililtantly vegan"
        if (r == 56):
        	return "misanthrope"
        if (r == 57):
        	return "miser"
        if (r == 58):
        	return "mopey"
        if (r == 59):
        	return "naive"
        if (r == 60):
        	return "nerd"
        if (r == 61):
        	return "no-nonsense"
        if (r == 62):
        	return "obsessive"
        if (r == 63):
        	return "old fart"
        if (r == 64):
        	return "overeducated"
        if (r == 65):
        	return "paranoid"
        if (r == 66):
        	return "perfect manners"
        if (r == 67):
        	return "pouty"
        if (r == 68):
        	return "power-hungry"
        if (r == 69):
        	return "prickly"
        if (r == 70):
        	return "proseliytizer"
        if (r == 71):
        	return "ruthless"
        if (r == 72):
        	return "sadist"
        if (r == 73):
        	return "self-destructive"
        if (r == 74):
        	return "self-important"
        if (r == 75):
        	return "self-pitying"
        if (r == 76):
        	return "senile"
        if (r == 77):
        	return "serene"
        if (r == 78):
        	return "shameless flirt"
        if (r == 79):
        	return "slacker"
        if (r == 80):
        	return "slimy"
        if (r == 81):
        	return "slovenly"
        if (r == 82):
        	return "snarky"
        if (r == 83):
        	return "snitch"
        if (r == 84):
        	return "snob"
        if (r == 85):
        	return "social butterfly"
        if (r == 86):
        	return "sophist"
        if (r == 87):
        	return "spacey"
        if (r == 88):
        	return "terrible memory"
        if (r == 89):
        	return "thick"
        if (r == 90):
        	return "toady"
        if (r == 91):
        	return "totally unreliable"
        if (r == 92):
        	return "twitchy"
        if (r == 93):
        	return "vain"
        if (r == 94):
        	return "vengeful"
        if (r == 95):
        	return "village idiot"
        if (r == 96):
        	return "well-travelled"
        if (r == 97):
        	return "whiner"
        if (r == 98):
        	return "wild child"
        if (r == 99):
        	return "wisecracking"
        if (r == 100):
        	return "world-weary"
        return ""

    def get_henchman(self, h_class="Torchbearer"):
        cost = 15
        wage = 1
        equipment = ["Backpack", "5 Rations", "2 Waterskins", "Bedroll", "Flint & steel", "3 Torches"]
        name = Character.get_name(self)
        STR = self.rlr.roll('3d6')
        DEX = self.rlr.roll('3d6')
        CON = self.rlr.roll('3d6')
        INT = self.rlr.roll('3d6')
        WIS = self.rlr.roll('3d6')
        CHA = self.rlr.roll('3d6')

        alignment = self.get_alignment()

        to_hit = 0
        dmg = 0
        ac_mod = 0
        hp_mod = 0
        carry_cap = 75

        if (CON < 9):
            hp_mod = -1
        elif (CON > 12):
            hp_mod = 1

        if (STR < 5):
            to_hit = -2
            dmg = -1
            carry_cap -= 10
        elif (STR < 7):
            to_hit = -1
            carry_cap -= 5
        elif (STR == 18):
            to_hit = 1
            dmg = 1
            carry_cap += 50
        elif (STR == 17):
            to_hit = 1
            dmg = 1
            carry_cap += 30
        elif (STR == 16):
            to_hit = 1
            carry_cap += 15
        elif (STR > 12):
            carry_cap += 10
        elif (STR > 8):
            carry_cap += 5


        if (DEX < 9):
            ac_mod = -1
        elif (DEX > 12):
            ac_mod = 1

        hp = self.rlr.roll(f'1d6+{hp_mod}')
        if (hp < 1):
            hp = 1

        gender = "Male"
        if (self.rlr.roll('1d4') == 1):
            gender = "Female"

        armor = "None"
        ac = 10 + ac_mod
        shield = "no shield"
        weapon = "club"
        weapon2 = ""

        if (h_class == "Man-at-arms"):
            wage = 2
            if (self.rlr.roll('1d6') <= 2):
                armor = "Leather"
                ac += 2
                cost += 15
            if (self.rlr.roll('1d6') <= 2):
                shield = "shield"
                ac += 1
                cost += 15

            roll = self.rlr.roll('1d6')
            if (roll == 1):
                weapon = f"spear(1d6{dmg:+})"
                cost += 1
            elif (roll == 2):
                weapon = f"handaxe(1d6{dmg:+})"
                cost += 1
            elif (roll == 3):
                weapon = f"sling(1d4{dmg:+})"
                weapon2 = f"club(1d4{dmg:+})"
                cost += 1
            elif (roll == 4):
                weapon = f"club(1d4{dmg:+})"
            elif (roll == 5):
                weapon = f"warhammer(1d4{dmg+1:+})"
                cost += 1
            else:
                if (shield == "shield"):
                    weapon = f"staff(1d6{dmg:+})"
                else:
                    weapon = f"club(1d4{dmg:+})"

            if (self.rlr.roll('1d6')<=2):
                weapon2 = f"dagger(1d4{dmg:+})"
                cost += 2

        occupation = ""
        trait = self.get_trait()
        roll = self.rlr.roll('1d20')
        if (roll <= 7):
            occupation = "farmer"
        elif (roll <= 11):
            occupation = "herder"
        elif (roll == 12):
            occupation = "barber"
        elif (roll == 13):
            occupation = "blacksmith apprentice"
        elif (roll == 14):
            occupation = "beggar"
        elif (roll == 15):
            occupation = "drunk"
        elif (roll == 16):
            occupation = "grave digger"
        elif (roll == 17):
            occupation = "woodcutter"
        elif (roll == 18):
            occupation = "thug"
        elif (roll == 19):
            occupation = "outlaw"
        elif (roll == 20):
            occupation = "gambler"

        output = f"{h_class}: {name}\n"
        output += f'Human, {gender}, {alignment}\n'
        output += f'STR:{STR} DEX:{DEX} CON:{CON} INT:{INT} WIS:{WIS} CHA:{CHA}\n'
        output += f'Former {occupation}, {trait}\n'
        output += f'HP:{hp} AC:{ac} To-Hit:{to_hit:+} MV:12 Sv:17 '
        output += f'Carry_Cap:{carry_cap}\n'
        output += f'Armor:{armor}/{shield}\n'
        output += f'Weapons:{weapon} {weapon2}\n'
        output += f'Cost:{cost}gp Upkeep:Rations+Lodgins Wage:{wage}gp/day\n'
        return output


rlr = Roller()
char_str = str(CharGen().get_character("Any"))
print(char_str)
words = char_str.split()
filename = words[0] + ' ' + words[3] + '.txt'
with open(filename, 'w') as f:
    f.write(char_str)
print()
print("Henchmen for hire in the city after buying drinks, paying for posted notices \nand distributing sword-for-hire pamphlets (total cost: 5gp):")
print("============================================================================")
for i in range(rlr.roll('1d4+1')):
    print(CharGen().get_henchman())
for i in range(rlr.roll('1d4+1')):
    print(CharGen().get_henchman("Man-at-arms"))
print()
print("Additional henchmen if the group hired a town crier (add 5 gp to cost):")
print("============================================================================")
for i in range(rlr.roll('1d4+1')):
    print(CharGen().get_henchman())
for i in range(rlr.roll('1d4+1')):
    print(CharGen().get_henchman("Man-at-arms"))
#print(rlr)
#class_distribution()
