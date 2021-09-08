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
        self.max_hp = self.hp
        self.name = name
        self.dead = False
        
    def take_damage(self, damage):
        self.hp -= damage
        if (self.hp <= 0):
            self.dead = True

    def __str__(self):
        output = self.name
        output += " (" + self.monster_stats.monster_type + "): "
        output += " MV:" + str(self.monster_stats.movement)
        output += " AC:" + str(self.monster_stats.ac)
        output += " HD:" + str(self.monster_stats.hd)
        output += " HP:" + str(self.hp) + r"/" + str(self.max_hp)
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
    
    def attack(self, monsters):
        output = ""
        for attack in self.monster_stats.attacks:
            if (monsters):
                monster = monsters.pop(random.randint(0,len(monsters))-1)
                output += f'{self.name} attacks {monster.name} with its {attack[0]}\n'
                output += f"{self.name} rolls 1d20+{self.monster_stats.hd_val} vs {monster.name}'s AC ({monster.monster_stats.ac}): "
                natural_roll = rlr.roll("1d20")
                adjusted_roll = natural_roll + self.monster_stats.hd_val
                output += f"{natural_roll} + {self.monster_stats.hd_val} = {adjusted_roll} vs AC {monster.monster_stats.ac}. "
                crit = False
                
                if (natural_roll == 20):
                    crit = True
                    output += "Critical "
                
                if (adjusted_roll >= monster.monster_stats.ac or crit):
                    output += "Hit "
                    damage = rlr.roll(attack[1])
                    if (damage < 1): 
                        damage = 1
                    if (crit):
                        damage += 1
                    output += f"({damage} points of damage)\n"
                    monster.take_damage(damage)
                else:
                    output += "Miss\n"

                if (monster.hp <= 0):
                    output += f"{self.name} slains {monster.name}\n"
                else:
                    monsters.append(monster)
                    
        return output

class Side(object):
    def __init__(self, name, members, roller):
        self.name = name
        self.members = members
        self.roller = roller
    
    def get_initiative(self):
        return self.roller.roll("1d6")
    
    def surprised(self):
        if (self.roller.roll("1d6") == 1):
            return True
        return False
    
    def status(self):
        output = f"{self.name}\n"
        for member in self.members:
            output += f" - {member}\n"
        return output
        
    def __str__(self):
        output = f"'{self.name}' ("
        cont = 0
        for member in self.members:
            output += member.name
            cont += 1
            if (cont < len(self.members)):
                output += ", "
        output += ")"
        return output
        
    def __descr__(self):
        return str(self)
    
    def attack(self, targets):
        for attacker in self.members:
            defenders = list()
            if (not attacker.dead):
                for defender in targets.members:
                    if (not defender.dead):
                        defenders.append(defender)
            print(attacker.attack(defenders))
        
    def tpk(self):
        for member in self.members:
            if (not member.dead):
                return False
        return True
    
    
    
class Combat(object):
    def __init__(self, side_a, side_b, roller):
        self.side_a = side_a
        self.side_b = side_b
        self.roller = roller
        
    def initiative(self):
        side_a_ini = self.side_a.get_initiative()
        side_b_ini = self.side_b.get_initiative()
        while (side_a_ini == side_b_ini):
            side_a_ini = self.side_a.get_initiative()
            side_b_ini = self.side_b.get_initiative()
        print(f"{self.side_a.name} rolls initiative: {side_a_ini}")
        print(f"{self.side_b.name} rolls initiative: {side_b_ini}")
        if (side_a_ini > side_b_ini):
            print(f"{self.side_a.name} wins initiative this round")
            return self.side_a
        print(f"{self.side_b.name} wins initiative this round")
        return self.side_b
    
    
    def combat(self):
        print(f"\nSTART OF COMBAT BETWEEN {self.side_a} AND {self.side_b}")
        print("\nDETERMINE IF EITHER GROUP IS SURPRISED")
        a_surprised = self.side_a.surprised()
        b_surprised = self.side_b.surprised()
        surprise_round = (a_surprised != b_surprised)
        if (surprise_round):
            if (a_surprised):
                print(f"Group {self.side_a.name} is surprised")
            else:
                print(f"Group {self.side_b.name} is surprised")
        else:
            print("Neither group is surprised")
        
        if (surprise_round):
            print("\nSURPRISE ROUND")
            print("TBD")
            
        round_num = 0
        combat_over = False
        while (not combat_over):
            round_num += 1
            print(f"\nSTART OF ROUND {round_num}")
            print(f"SIDE A: {self.side_a.status()}")
            print(f"SIDE B: {self.side_b.status()}")

            print(f"\nDECLARE SPELLS PHASE")
            print("TBD")
            
            print("\nDETERMINE INITIATIVE PHASE")
            attacking_side = self.initiative()
            if (attacking_side == self.side_a):
                defending_side = self.side_b
            else:
                defending_side = self.side_a
            
            print("\nMOVEMENT & MISSILE PHASE")
            print("TBD")
            
            print("\nMELEE & SPELLS PHASE")
            attacking_side.attack(defending_side)
            defending_side.attack(attacking_side)
            
            print("\nBOOKEEPING PHASE")
            if (self.side_a.tpk()):
                print(f"All members of group {self.side_a.name} have been slain.")
                print(f"Group {self.side_b.name} win the combat.")
                combat_over = True
            elif (self.side_b.tpk()):
                print(f"All members of group {self.side_b.name} have been slain.")
                print(f"Group {self.side_a.name} win the combat.")
                combat_over = True
            else:
                print("Combat continues...")
    
    
    
bill = Monster("Bill the Kobold", KOBOLD_SHORTSWORD)
frank = Monster("Frank the Kobold", KOBOLD_DAGGER)
papamoscas = Monster("Papamoscas", GIANT_HORNED_CHAMELEON)

bill = Monster("Bill the Cham", GIANT_HORNED_CHAMELEON)
frank = Monster("Frank the Cham", GIANT_HORNED_CHAMELEON)

rlr = Roller()

print(bill)
print(frank)
print(papamoscas)


sa = Side("A mi rollo", [papamoscas], rlr)
sb = Side("Cham Charm", [bill, frank], rlr)

cmb = Combat(sa, sb, rlr)
cmb.combat()

print(bill)
print(frank)
print(papamoscas)
