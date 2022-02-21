import random
import re
from datetime import datetime

random.seed(datetime.now().microsecond)

class Roll():
    def __init__(self, descr, result_list, result_total):
        self.date_time = datetime.now()
        self.descr = descr
        self.result_list = result_list
        self.result_total = result_total

    def __descr__(self):
        return str(self)

    def __str__(self):
        output = f'{self.date_time}: {self.descr} = {self.result_total} ( '

        for roll_part, partial_result in self.result_list.items():
            output += roll_part + str(partial_result) + ", "
        output += ')'
        return output

class Roller():
    def __init__(self):
        self.roll_log = list()

    def __str__(self):
        output = ''
        for entry in self.roll_log:
            output += str(entry) + '\n'
        return output

    def __descr__(self):
        return str(self)

    def highest(self, roll_str):
        roll_str_curated = roll_str.lower().replace(" ","").replace("+"," ").replace("-"," -")
        roll_parts = list()
        roll_parts = re.split(" ", roll_str_curated)
        result_total = 0
        result_list = dict()
        num_part = 0

        for part in roll_parts:
            part_r_list = list()
            if 'd' in part:
                num, dice = part.split('d')
                if not num:
                    num = 1
                num = int(num)
                mult = 1
                if num<0:
                    mult = -1
                    num = abs(num)
                if not dice:
                    dice = 6
                dice = int(dice)
                for _ in range(num):
                    die_result = mult * dice
                    part_r_list.append(die_result)
                    result_total += die_result
            else:
                result_total += int(part)
                part_r_list.append(int(part))
            result_list[str(part)] = part_r_list
            num_part += 1
        self.roll_log.append(Roll(roll_str, result_list, result_total))
        return result_total


    def lowest(self, roll_str):
        roll_str_curated = roll_str.lower().replace(" ","").replace("+"," ").replace("-"," -")
        roll_parts = list()
        roll_parts = re.split(" ", roll_str_curated)
        result_total = 0
        result_list = dict()
        num_part = 0

        for part in roll_parts:
            part_r_list = list()
            if 'd' in part:
                num, dice = part.split('d')
                if not num:
                    num = 1
                num = int(num)
                mult = 1
                if num<0:
                    mult = -1
                    num = abs(num)
                if not dice:
                    dice = 6
                dice = int(dice)
                for _ in range(num):
                    die_result = mult * 1
                    part_r_list.append(die_result)
                    result_total += die_result
            else:
                result_total += int(part)
                part_r_list.append(int(part))
            result_list[str(part)] = part_r_list
            num_part += 1
        self.roll_log.append(Roll(roll_str, result_list, result_total))
        return result_total


    def roll(self, roll_str):
        roll_str_curated = roll_str.lower().replace(" ","").replace("+"," ").replace("-"," -")
        roll_parts = list()
        roll_parts = re.split(" ", roll_str_curated)
        result_total = 0
        result_list = dict()
        num_part = 0

        for part in roll_parts:
            part_r_list = list()
            if 'd' in part:
                num, dice = part.split('d')
                if not num:
                    num = 1
                num = int(num)
                mult = 1
                if num<0:
                    mult = -1
                    num = abs(num)
                if not dice:
                    dice = 6
                dice = int(dice)
                for _ in range(num):
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

r = Roller()
print(r.lowest("1d20+1d4"))
print(r.highest("1d20+1d4"))
print(str(r))
