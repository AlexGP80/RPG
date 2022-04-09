# RPG
RPG Games Utilities

A mess consisting of diverse tools I make for the TTRPG games I run.

- Rolemaster/API: Tools for the spanish version of Rolemaster published in the 90s by Joc International. They're suitable for the Roll20 API, hence the usage of JavaScript. They allow to get the attack, critical and maneuver roll results fast without needing to consult the rulebook tables, enabling games to run way smoother. TBD: make changes so this tools can be used in the command line using node.js  
- utils/roller.py: A roller tool to simulate any kind of RPG dice roll, like "3d6", "2d6+1d4-1", "1d17"... Made with Python. TBD: Dropping and keeping dice, roll with advantage/disadvantage...
- utils/shuffleroller.py: A tool to facilitate playing TTRPGs by WhatsApp or other chats where you cannot add a roller bot. Every DM has his share of players who don't want to install telegram, discord... But they want to do things with their characters between live sessions. This tool generates all possible results for a roll (i.e. 1-100 in 1d100) and shuffles them, displaying the shuffled list. Ex: 01:37, 02:88, 03:45... 99:21, 100:66. So you say to your pesky player who doesn't want to install telegram: "pick a number between 1 and 100" (or whatever the case). Then you use that number as the index in the shuffled list you've generated using this tool and that's the roll result. TBD: Allow for bell curves, like in 3d6 (it's not 3-18 shuffled, because 9-12 are much more probable than 3 or 18)

