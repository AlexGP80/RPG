import random
import re
from datetime import datetime

random.seed(datetime.now().microsecond)

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
        for k,v in self.result_list.items():
            output += k + str(v) + ", "
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
        roll_parts = re.split(" ", roll_str_curated)
        result_total = 0
        result_list = dict()
        num_part = 0

        for part in roll_parts:
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





r = Roller()
print(r.roll("4d6+1"))
print(str(r))
