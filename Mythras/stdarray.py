import random
from datetime import datetime
from roller import Roller

random.seed(datetime.now().microsecond)

print(datetime.now())
print()

r = Roller()
output = ""

for i in range(5):
    output += " " + str(r.roll("3d6"))

output += " |"

for i in range(2):
    output += " " + str(r.roll("2d6+6"))

print(output)
print("\n\n")
