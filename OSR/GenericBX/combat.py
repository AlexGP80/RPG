import random
import copy
from datetime import datetime

random.seed(datetime.now())

rlr = Roller()

class Weapon(object):
    def __init__(self,
                 name,
                 damage="1d6", 
                 versatile=False, 
                 melee_and_ranged=False, 
                 rate_of_fire=0, 
                 weapon_range=0):
        self.name = name
        self.damage = damage
        self.versatile = versatile
        self.melee_and_ranged = melee_and_ranged
        self.rate_of_fire = rate_of_fire
        self.weapon_range = weapon_range

SHORTSWORD = Weapon("shortsword", "1d6")
DAGGER = Weapon("dagger", "1d4", melee_and_ranged=True, rate_of_fire=1, weapon_range=10)
        
class Monster_Stats(object):
    def __init__(self, monster_type, movement, ac, hd, attacks, save, morale, hoard, xp):
        self.monster_type = monster_type
        self.movement = movement
        self.ac = ac
        self.hd = hd
        self.hd_val = 0
        num, dice = hd.split('d')
        num = int(num)
        if (num == 1 and dice[0]!='8'):
            self.hd_val = 0
        else: 
            self.hd_val = num
        self.attacks = attacks
        self.save = save
        self.morale = morale
        self.hoard = hoard
        self.xp = xp
        #shield?
    

        
KOBOLD_SHORTSWORD = Monster_Stats("Kobold", 60, 12, '1d4', [[SHORTSWORD.name,SHORTSWORD.damage+"-1"]], 'H0', 6, 'I(XIII)', 5)
KOBOLD_DAGGER = Monster_Stats("Kobold", 60, 12, '1d4', [[DAGGER.name,DAGGER.damage+"-1"]], 'H0', 6, 'I(XIII)', 5)
GIANT_HORNED_CHAMELEON = Monster_Stats("Giant Horned Chameleon", 120, 18, '5d8', [["bite", "2d4"],["horn", "1d6"]], 'F3', 7, "VI", 800)

class Monster(object):
    def __init__(self, name, monster_stats):
        self.monster_stats = monster_stats
        self.hp = rlr.roll(self.monster_stats.hd)
        self.name = name

    def __str__(self):
        output = self.name
        output += " (" + self.monster_stats.monster_type + "): "
        output += " MV:" + str(self.monster_stats.movement)
        output += " AC:" + str(self.monster_stats.ac)
        output += " HD:" + str(self.monster_stats.hd)
        output += " HP:" + str(self.hp)
        output += " AT:"
        attacks = self.monster_stats.attacks
        for i in range(len(attacks)):
            output += str(attacks[i][0])+"["+str(attacks[i][1])+"]"
            if ((i+1) < len(attacks)):
                output += ","
        output += " Mo:" + str(self.monster_stats.morale)
        return output
        
    def __descr__(self):
        return str(self)
    
    def initiative(self):
        return rlr.roll("1d6")
    
    def attack(self, monster):
        for attack in self.monster_stats.attacks:
            output = f'{self.name} attacks {monster.name} with its {attack[0]}\n'
            output += f"{self.name} rolls 1d20+{self.monster_stats.hd_val} vs {monster.name}'s AC ({monster.monster_stats.ac}): "
            roll = rlr.roll("1d20+"+str(self.monster_stats.hd_val))
            output += f"{roll}\n"
            crit = False
            if (roll-self.monster_stats.hd_val == 20):
                crit = True
            if (roll >= monster.monster_stats.ac or crit):
                damage = rlr.roll(attack[1])
                if (damage < 1): 
                    damage = 1
                if (crit):
                    damage += 1
                    output += "CRITICAL!: "
                output += f"{self.name} hits {monster.name} for {damage} points of damage."
                monster.hp -= damage
                if (monster.hp <= 0):
                    output += f"\n{self.name} slains {monster.name}"
            else:
                output += f"{self.name} misses {monster.name}"
        return output
        
bill = Monster("Bill the Kobold", KOBOLD_SHORTSWORD)
frank = Monster("Frank the Kobold", KOBOLD_DAGGER)
papamoscas = Monster("Papamoscas", GIANT_HORNED_CHAMELEON)

print(bill)
print(frank)
print(papamoscas)

while (bill.hp > 0 and papamoscas.hp > 0):
    bini = bill.initiative()
    fini = papamoscas.initiative()
    while (bini == fini):
        bini = bill.initiative()
        fini = papamoscas.initiative()
    if (bini > fini):
        print(bill.attack(papamoscas))
        if (papamoscas.hp > 0):
            print(papamoscas.attack(bill))
    else:
        print(papamoscas.attack(bill))
        if (bill.hp > 0):
            print (bill.attack(papamoscas))