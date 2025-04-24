# pokemon-stat-trivia
This is going to be fun


Credits:

The CSV file I used for this project was taken from this draft league Spreadsheet: https://docs.google.com/spreadsheets/d/1488hyy1WdT0gGhAOquUdEOcCQ-gJJLbc8BT6phPPzUo 
I don't want to take any credit for creating the CSV file myself since making a spreadsheet like that would take a lot of effort, which I did not put in. Instead, I found a spreadsheet of the entire Pokedex in a public Pokémon Draft League sheet, converted it to a CSV file, and then modified it as needed. 

I learned how to color the Pokémon stat bars from the Pokémon Showdown teambuilder: https://play.pokemonshowdown.com/teambuilder
I wanted to learn how to create stat bars with varying colors based on that stat, so I used Inspect Element on the showdown teambuilder and reverse-engineered their coloring process. I figured out that the colors were determined by an HSL color where the hue was determined by the result of the Pokémon stat formula (at level 100 with no EVs, 31 IVs, and a neutral nature) divided by 4, rounded up. I wanted to understand how to color my stats this way for two reasons. One, the audience for this website is Competitive Pokémon players, and those players are familiar with this color scheme for stats. Two, I wanted to learn how to make variable CSS colors in REACT because that sounded like a cool and useful skill to learn. I also want to reiterate that I did not steal this code from Pokémon Showdown; all of the code for the color functions was written with my own hands, and I used math and my knowledge of Pokémon to determine the formula myself. I did not find the direct formula that they used. Also, shout out to Pokémon Showdown in general, that website is super awesome and well-made, and I’ve had a lot of fun on it and met a lot of great people through it. 

This project was heavily inspired by this random Pokémon generator: https://randompokemon.com/
I took on this project because I often manually hosted this game for my friends over the internet, where I would use this random Pokémon generator to generate a Pokémon, and then I would find that Pokémon's stats using Google and send a screenshot of those stats to said friends. I decided to take on this project because I wanted to use my coding skills to simplify the process so that I could generate the Pokémon and its stats all with the click of one button. The control panel for my website was directly inspired by the control panel from this website, as I associate that design with randomizing Pokémon in my head and wanted to have my game also capture that feeling.

The db_utils file was provided to me for my University's Web Engineering class as starter code for our SQL database project. 

