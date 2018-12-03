# Memory Game Project

## Table of Contents
* [About](#About)
* [Development](#Development)
* [Contribute](#Contribute)
* [How to play](#Playing-Instructions)
* [Dependencies](#Dependencies)

## About 
This project is part of udacity FEND reuired project list for certification.
It is mainly focused on DOM manipulation concepts.    

## Development

The starter project (https://github.com/udacity/fend-project-memory-game) had some HTML and CSS styling to display a static version of the Memory Game project. It was needed to convert this project from a static project to an interactive one.
It is completed according to project rubric.(https://review.udacity.com/#!/rubrics/591/view)

## Contribute
clone the project using (git clone https://github.com/rajyotiroshan/fend-project-memory-game.git) from git cli.
open /index.html to play the gameor check the available functionalities. 

## Playing-Instructions
Intially all cards symbol are hidden. There are total 16 cards with two cards having same symbol.
as soon as first click occurs onto the board, counter starts.
clicking a card reveal it's symbol.
Playing steps.
1. click a card.
2. click another card. 
3. if both cards symbol matches it will remain open.
4. if did not match, the cards will hide it's symbol.
5. try to remember the revealed card symbol and position on the deck.
6. repeat step 1 to 5 untill all the cards on deck are opened.

Just after all cards are opened,a score card will display.
It contains your total moves, total time in seconds, and your start ratings.
There is minimum one star is given to every player for total-moves>=18.

On socre card you will be given two option to resatrt the game.
clicking restart: will immediately starts the counter.
clicking exit: will let you go to the board, and on first click the counter will start.

Enjoy!

## Dependencies
This project is written in  vanilla javascript.
for styling css is used., and for fonts style 
(https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css)
and (https://fonts.googleapis.com/css?family=Coda) are used.
for markup pure html is used.
For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
