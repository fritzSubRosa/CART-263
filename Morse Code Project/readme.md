
# Telegraph

## tel·e·graph  (tĕl′ĭ-grăf′) n.

1. A communications system that transmits and receives simple unmodulated electric impulses, especially one in which the transmission and reception stations are directly connected by wires.

>## CART 263: Creative Computation 2 – Winter 2023
>Playful interaction
>By Noémie Carrier & Stephen Friedrich

![Starting Page](Capture d’écran 2023-04-13 230906.png)


# Concept and Execution

The idea of this project is to reverse-engineer one of the oldest modern telecommunication technologies, the telegraph, using modern techniques - in this case, JavaScript and MQTT. Initially intended to trigger vibrations in a smart phone, the transmission now instead takes place visually, with players needing to watch the movement of dots along the telegraph wire and translate them into text as they go. The player guesses are then graded for accuracy and speed and the results are displayed, allowing players to compare their performance without strictly making the experience competitive. 

Turning communication into a difficult, laborious process like this forces players to be contemplative about each letter as they decode it, bringing an inherent dramatic tension letter by letter which is lost in an era where whole words, paragraphs, and pages can be transmitted instantly. To ensure the process is not too difficult, however, the prompt questions which guide the telegrapher's communication are made visible to all players. 

There are two main narrative arcs that take place in the course of Morse Code Adventure - a micro arc and a macro arc. The macro arc is most readily apparent, delineated by the different "screens" of the experience: the telegrapher attempts to communicate a word, the players decipher that word, and then are evaluated in their performance before starting again. The micro loop is what makes this experience different from any other, as it takes place letter-by-letter both as the player decodes each letter as it is transmitted and as the telegrapher attempts to use an unfamiliar technology to encode their desired message. Each dot or dash adds to a player's understanding of the symbol and then in turn to the meaning of the word as a whole, allowing clever or perceptive players to deduce whole or parts of the intended message before they arrive.

![Game Page](Capture d’écran 2023-04-13 230941.png)

# Setup

The code runs on a main screen, and any player can join with the QR code that links to P5js editor. You can find a copy of that code in the files under the name *Player page*. The telegraph, the main controller for the game, is 3D printed and slightly modified to integrate wires. Is is connected to a makey makey, but the code also works without the device, simply by using any key on a keyboard.

# Inspirations and sources

The Telegraph .stl file was created by IngeniumCanada February 14, 2018. It was created with a lesson plan and activity for kids. To learn more or to acess the files, here is the link from thingiverse; https://www.thingiverse.com/thing:2646029 and a link directly from their website; https://ingeniumcanada.org/education/3d-educational-resources/3d-telegraph-key.

The word formed by dots during the guessing phase of the game was inspired by a coding challenge from the coding train, but was adapted to the content of the class. https://www.youtube.com/watch?v=4hA7G3gup-4.

The royalty free font we used can be found here: https://www.1001freefonts.com/ordre-de-depart.font.
