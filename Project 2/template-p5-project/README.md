# There's Only One Moise Kean - An Exploration of the 2021-2022 Premier League Season

This project takes data on every player who played at least one match in the English Premier League and creates objects representing each player and their statistics. The players are divided up by teams and arranged in order, then eliminated if they played more than a single match. From the remaining players, this program identifies players who did something remarkable in their only match - i.e. a Red Card or a goal. The program then presents those players, with their names and team. The entire program could perform the above tasks with any data set for any league, provided it was formatted correctly and team colors could be updated. 

Data Source: https://www.kaggle.com/datasets/azminetoushikwasi/epl-21-22-matches-players?select=all_players_stats.csv

UPDATE POST-REVISION

I made several large changes based on feedback, mostly in terms of presentation. The pitch now is covered by a partially-opaque layer in order to draw the eye to the data better. I attempted to make lerp movement from where the various data points are to an array of vectors arranged in a grid across the screen, to no avail. It's definitely feasible, I just don't really understand vectors / lerp well enough to actually picture how it would work with how I've structured drawing the data points up to this point. Large sections of the file have accordingly been commented out but are included if only to show my thought process.
