/**
Tic Tac Toe
Stephen Friedrich
*/

"use strict";

let currentTurn = -1; //This is going to track whose turn it and should contain only null, 1, or -1 as a value. 
let grid = ["","","","","","","","",""]; // This is our board, with entry 0 being the top left hand corner, entry 1 top middle, and so on from left to right, top to bottom. It is currently full of null values.
let stalemateCheck = 0;


/**
Description of preload
*/
function preload() {

}

/**
Description of setup
*/
function setup() {
    createCanvas(1500,1500);
    background(0,0,0);
    fill(255,255,255);
    noStroke();
    rect(595,300,10,900);
    rect(895,300,10,900);
    rect(300,595,900,10);
    rect(300,895,900,10);
}

function mousePressed(){
    if(mouseX > 300 && mouseX < 600 && mouseY > 300 && mouseY <600){ // top left corner, array 0
        if(occupiedCheck(0) == false){ // check if the square is occupied
            if(currentTurn == 1){ // Check whose turn it is. 1 is O, -1 is X
                fill (255,255,255);
                circle (450,450,200); 
                fill (0,0,0);
                circle (450,450,175); // rather than bother with drawing an O I am technically drawing two circles. Is this correct? No. Will it technically work? Let's see.
                currentTurn = currentTurn*-1; // I use this command to switch whose turn it currently is. The convention, as above is 1 = Oh, -1 = X
                grid[0] = 1; // // This indicates that this space is occupied by an Oh, which I will check later, see below.
                checkWinCondition(); // Check if anyone wins the game.
            } else if (currentTurn == -1){
                stroke(255,255,255);
                strokeWeight(10);
                line(350,350,550,550); // Draw X, along with line 50
                line(550,350,350,550);
                currentTurn = currentTurn*-1; // Alternate turn, see above
                grid[0] = -1;
                checkWinCondition();
            }
        }
    } else if (mouseX > 600 && mouseX < 900 && mouseY > 300 && mouseY <600){ // top middle, array 1. For line-by line, see lines 37-54. These sections are functionally identical.
        if(occupiedCheck(1)==false){
            if(currentTurn == 1){
                fill(255,255,255);
                circle(750,450,200);
                fill(0,0,0);
                circle(750,450,175); // see comment line 43
                currentTurn = currentTurn *-1;
                grid[1] = 1;
                checkWinCondition();
            } else if (currentTurn == -1){
                stroke(255,255,255);
                strokeWeight(10);
                line(650,350,850,550);
                line(850,350,650,550);
                currentTurn = currentTurn*-1;
                grid[1] = -1;
                checkWinCondition();
            }
        }
    } else if (mouseX > 900 && mouseX < 1200 && mouseY > 300 && mouseY <600){ // top right, array 2. For line-by line, see lines 37-54. These sections are functionally identical.
        if(occupiedCheck(2)==false){
            if(currentTurn == 1){
                fill(255,255,255);
                circle(1050,450,200);
                fill(0,0,0);
                circle(1050,450,175); // see comment line 43
                currentTurn = currentTurn *-1;
                grid[2] = 1;
                checkWinCondition();
            } else if (currentTurn == -1){
                stroke(255,255,255);
                strokeWeight(10);
                line(950,350,1150,550);
                line(1150,350,950,550);
                currentTurn = currentTurn*-1;
                grid[2] = -1;
                checkWinCondition();
            }
        }
    } else if (mouseX > 300 && mouseX < 600 && mouseY > 600 && mouseY < 900){ // middle left, array 3. For line-by line, see lines 37-54. These sections are functionally identical.
        if(occupiedCheck(3)==false){
            if(currentTurn == 1){
                fill(255,255,255);
                circle(450,750,200);
                fill(0,0,0);
                circle(450,750,175); // see comment line 43
                currentTurn = currentTurn *-1;
                grid[3] = 1;
                checkWinCondition();
            } else if (currentTurn == -1){
                stroke(255,255,255);
                strokeWeight(10);
                line(350,650,550,850);
                line(550,650,350,850);
                currentTurn = currentTurn*-1;
                grid[3] = -1;
                checkWinCondition();
            }
        }
    } else if (mouseX >600 && mouseX < 900 && mouseY >600 && mouseY <900){ // middle middle, array 4. For line-by line, see lines 37-54. These sections are functionally identical.
        if(currentTurn == 1){
            fill(255,255,255);
            circle(750,750,200);
            fill(0,0,0);
            circle(750,750,175); // see comment line 43
            currentTurn = currentTurn *-1;
            grid[4] = 1;
            checkWinCondition();
        } else if (currentTurn == -1){
            stroke(255,255,255);
            strokeWeight(10);
            line(650,650,850,850);
            line(650,850,850,650);
            currentTurn = currentTurn*-1;
            grid[4] = -1;
            checkWinCondition();
        }
    } else if (mouseX >900 && mouseX < 1200 && mouseY >600 && mouseY <900){ // middle right, array 5. For line-by line, see lines 37-54. These sections are functionally identical.
        if(currentTurn == 1){
            fill(255,255,255);
            circle(1050,750,200);
            fill(0,0,0);
            circle(1050,750,175); // see comment line 43
            currentTurn = currentTurn *-1;
            grid[5] = 1;
            checkWinCondition();
        } else if (currentTurn == -1){
            stroke(255,255,255);
            strokeWeight(10);
            line(950,650,1150,850);
            line(950,850,1150,650);
            currentTurn = currentTurn*-1;
            grid[5] = -1;
            checkWinCondition();
        }
    } else if (mouseX > 300 && mouseX < 600 && mouseY > 900 && mouseY < 1200){ //bottom left, array 6. For line-by line, see lines 37-54. These sections are functionally identical.
        if(currentTurn == 1){
            fill(255,255,255);
            circle(450,1050,200);
            fill(0,0,0);
            circle(450,1050,175); // see comment line 43
            currentTurn = currentTurn *-1;
            grid[6] = 1;
            checkWinCondition();
        } else if (currentTurn == -1){
            stroke(255,255,255);
            strokeWeight(10);
            line(350,950,550,1150);
            line(350,1150,550,950);
            currentTurn = currentTurn*-1;
            grid[6] = -1;
            checkWinCondition();
        }
    } else if (mouseX > 600 && mouseX < 900 && mouseY > 900 && mouseY < 1200){ // bottom middle, array 7. For line-by line, see lines 37-54. These sections are functionally identical.
        if(currentTurn == 1){
            fill(255,255,255);
            circle(750,1050,200);
            fill(0,0,0);
            circle(750,1050,175); // see comment line 43
            currentTurn = currentTurn *-1;
            grid[7] = 1;
            checkWinCondition();
        } else if (currentTurn == -1){
            stroke(255,255,255);
            strokeWeight(10);
            line(650,950,850,1150);
            line(650,1150,850,950);
            currentTurn = currentTurn*-1;
            grid[7] = -1;
            checkWinCondition();
        }
    } else if (mouseX > 900 && mouseX < 1200 && mouseY > 900 && mouseY < 1200){ // bottom right, array 8. For line-by line, see lines 37-54. These sections are functionally identical.
        if(currentTurn == 1){
            fill(255,255,255);
            circle(1050,1050,200);
            fill(0,0,0);
            circle(1050,1050,175); // see comment line 43
            currentTurn = currentTurn *-1;
            grid[8] = 1;
            checkWinCondition();
        } else if (currentTurn == -1){
            stroke(255,255,255);
            strokeWeight(10);
            line(950,950,1150,1150);
            line(950,1150,1150,950);
            currentTurn = currentTurn*-1;
            grid[8] = -1;
            checkWinCondition();
        }
    }
}

function occupiedCheck(targetSquare){
    if (grid[targetSquare] == 1 || grid[targetSquare] == -1){
        return true;
    } else {
        return false;
    }
}

function checkWinCondition(){ // Hope you like if statements! :D 
    if (grid[0]+grid[1]+grid[2]==3){ // Top row, Oh. Check if all 3 top rows are filled with Ohs.
        ohWins();
    } else if (grid[0]+grid[1]+grid[2]==-3){ // Top row, X.
        xWins();
    } else if (grid[3]+grid[4]+grid[5]==3){ // Middle Row
        ohWins();
    } else if (grid[3]+grid[4]+grid[5]==-3){
        xWins();
    } else if (grid[6]+grid[7]+grid[8]==3){ // Bottom Row
        ohWins();
    } else if (grid[6]+grid[7]+grid[8]==-3){
        xWins();
    } else if (grid[0]+grid[3]+grid[6]==3){ // Left column
        ohWins();
    } else if (grid[0]+grid[3]+grid[6]==-3){ 
        xWins();
    } else if (grid[1]+grid[4]+grid[7]==3){ // Middle column
        ohWins();
    } else if (grid[1]+grid[4]+grid[7]==-3){
        xWins();
    } else if (grid[2]+grid[5]+grid[8]==3){ // Right column
        ohWins();
    } else if (grid[2]+grid[5]+grid[8]==-3){
        xWins();
    } else if (grid[0]+grid[4]+grid[8]==3){ // Down digonal
        ohWins();
    } else if (grid[0]+grid[4]+grid[8]==-3){
        xWins();
    } else if (grid[2]+grid[4]+grid[6] == 3){
        ohWins();
    } else if (grid[2]+grid[4]+grid[6]==-3){
        xWins();
    } else if (checkStalemate()==true) {
        rectMode(CENTER);
        textAlign(CENTER);
        fill(0,255,0);
        rect(750,750,600,300);
        stroke(255,255,255);
        textSize(24);
        text("Strange game. The only winning move is not to play.", 750,750);
    }
}

function xWins(){
    rectMode(CENTER);
    textAlign(CENTER);
    fill(0,255,0);
    rect(750,750,600,300);
    stroke(255,255,255);
    textSize(32);
    text("Player X wins!", 750,750);
}

function ohWins(){
    rectMode(CENTER);
    textAlign(CENTER);
    fill(0,255,0);
    rect(750,750,600,300);
    stroke(255,255,255);
    textSize(32);
    text("Player O wins!", 750,750);
}

function checkStalemate(){
    for (let i=0;i<9;i++){
        if(grid[i]==1 || grid[i]==-1){
            stalemateCheck++;
            if (stalemateCheck == 9) {
                return true;
            } else {
                return false;
            }

        }
    }
}