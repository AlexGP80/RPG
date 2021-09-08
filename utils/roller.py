import random
import re
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
        roll_parts = re.split(" ", roll_str_curated)
        result_total = 0
        result_list = list()
        
        for part in roll_parts:
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
                    result_list.append(die_result)
                    result_total += die_result
            else:
                result_total += int(part)
                result_list.append(int(part))
        self.roll_log.append(Roll(roll_str, result_list, result_total))    
        return result_total

r = Roller()
print(r.roll("1d8+1"))
print(str(r))