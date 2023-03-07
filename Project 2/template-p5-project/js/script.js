/**
There's Only One Moise Kean
Stephen
*/

"use strict";

let table;
let players = [];
let slideNumber = 0;
let newOrder = 1;
let wonderkids = [];

function preload() {
    table = loadTable("premStats.csv","csv","header");

}

function setup() {
    createCanvas(1000,1000);
    background(53, 159, 1);
    drawPitch();
    for (let i = 0; i<table.getRowCount();i++){
        players[i] = new PremPlayer(table.getString(i,0),   // Team Name
                                    table.get(i,1),         // Jersey Number
                                    table.getString(i,2),   // Player Name
                                    table.getString(i,3),   // Player Position
                                    table.get(i,4),         // Appearances (Starts)
                                    table.get(i,5),         // Sub Appearances
                                    table.get(i,6),         // Goals
                                    table.get(i,7),         // Penalty Goals
                                    table.get(i,8),         // Yellow Cards
                                    table.get(i,9),         // Red Cards
                                    table.get(i,10),        // Team Code
                                    table.get(i,11))        // Player Code
        }
    print(players);
}

function draw() {
    
}

class PremPlayer {
    constructor(team,number,name,position,appearances,subs,goals,pens,yellows,reds,code,playercode){ // A lot of these attributes weren't ultimately used, but you could easily tweak this to look for anything at all!
        this.team = team;
        this.number = number;
        this.name = name;
        this.position = position;
        this.appearances = appearances;
        this.subs = subs;
        this.goals = goals;
        this.pens = pens;
        this.yellows = yellows;
        this.reds = reds;
        this.code = code;
        this.order = playercode;
        this.primaryColor = color(0);
        this.secondaryColor = color (0);
        this.tertiaryColor = color(0);
        this.textColor = color(0);
        this.striped = false;
        this.x = 25;
        this.y = height+50;
        this.xIncrement = 0;
        this.yIncrement = 0;
        this.displacement = 45;
        this.upDisplacement = 25;
        this.diameter = 15;
        this.strokeWeight = 3;
        this.numberSize = 10;
        this.newOrder = 0;
        this.xIncrement = this.code*this.displacement;
        this.yIncrement = height-this.order*this.upDisplacement;

        // The below block determines the colors of the center, ring, stripe (if applicable) and text of each player
        if (this.team == "Arsenal"){
            this.primaryColor = color(245,0,0);
            this.secondaryColor = color(255);
            this.textColor = color(255);
        }
        else if (this.team == "Aston Villa"){
            this.primaryColor = color(133,1,28);
            this.secondaryColor = color (164,201,249);
            this.textColor = color(255);
        } 
        else if (this.team == "Brentford"){
            this.primaryColor = color(249,0,0);
            this.secondaryColor = color(255);
            this.tertiaryColor = color(0);
            this.textColor = color (0);
            this.striped = true;
        } 
        else if (this.team == "Brighton and Hove Albion"){
            this.primaryColor = color(0,0,255);
            this.secondaryColor = color(255);
            this.tertiaryColor = color(240,185,4);
            this.striped = true;
        }
        else if (this.team == "Burnley"){
            this.primaryColor = color(129,192,255);
            this.secondaryColor = color(129,1,26);
            this.textColor = color (255);
        }
        else if (this.team == "Chelsea"){
            this.primaryColor = color (0,0,255);
            this.secondaryColor = color (255);
            this.textColor = color(255);
        }
        else if (this.team == "Crystal Palace"){
            this.primaryColor = color(212,24,29);
            this.secondaryColor = color(27, 77, 173);
            this.textColor = color(255);
        }
        else if (this.team == "Everton"){
            this.primaryColor = color(13, 48, 122);
            this.secondaryColor = color(22, 85, 164);
            this.textColor = color(255);
        }
        else if (this.team == "Leeds United"){
            this.primaryColor = color (255);
            this.secondaryColor = color (209, 220, 30);
        }
        else if (this.team == "Leicester City"){
            this.primaryColor = color(25,70,155);
            this.secondaryColor = color(238, 178, 30);
            this.textColor = color(255);
        }
        else if (this.team == "Liverpool"){
            this.primaryColor = color (209, 4, 37);
            this.secondaryColor = color (248, 152, 104);
            this.textColor = color(255);
        }
        else if (this.team == "Manchester City"){
            this.primaryColor = color(105, 190, 239);
            this.secondaryColor = color (255);
            this.textColor = color(255);
        }
        else if (this.team == "Manchester United"){
            this.primaryColor = color(226, 39, 46);
            this.secondaryColor = color(255, 230, 0);
            this.textColor = color(255);
        }
        else if (this.team == "Newcastle United"){
            this.primaryColor = color(255);
            this.secondaryColor = color(0);
            this.tertiaryColor = color(0);
            this.textColor = color(255,0,0);
            this.striped = true;
        }
        else if (this.team == "Norwich City"){
            this.primaryColor = color(251, 214, 1);
            this.secondaryColor = color(1, 139, 20);
        }        
        else if (this.team == "Southampton"){
            this.primaryColor = color(255);
            this.tertiaryColor = color(0);
            this.secondaryColor = color(242, 38, 47);
            this.striped = true;
        }
        else if (this.team == "Tottenham Hotspur"){
            this.primaryColor = color (255);
            this.secondaryColor = color (34, 42, 71);
        }
        else if (this.team == "Watford"){
            this.primaryColor = color (229, 211, 67);
            this.secondaryColor = color (0);
        }
        else if (this.team == "West Ham United"){
            this.primaryColor = color (192, 216, 228);
            this.secondaryColor = color (117, 22, 44);
        }
        else if (this.team == "Wolverhampton Wanderers"){
            this.primaryColor = (0);
            this.secondaryColor = color (249, 203, 48);
            this.textColor = color(249, 203, 48);
        }
    }
    drawPlayer(){
        if (this.striped == false){ // Solid jerseys
            strokeWeight(this.strokeWeight);
            stroke(this.secondaryColor);
            fill(this.primaryColor);
            circle(this.x+this.xIncrement,this.y-this.yIncrement,this.diameter)
            textAlign(CENTER);
            noStroke();
            fill(this.textColor);
            textSize(this.numberSize);
            text (this.number,this.x+this.xIncrement,this.y+5-this.yIncrement);
        } else { // Striped jerseys
            strokeWeight(this.strokeWeight);
            stroke(this.tertiaryColor);
            fill(this.primaryColor)
            circle(this.x+this.xIncrement,this.y-this.yIncrement,this.diameter)
            rectMode(CENTER);
            noStroke();
            fill(this.secondaryColor);
            rect(this.x+this.xIncrement,this.y-this.yIncrement,(this.diameter/4),this.diameter*.80)
            textAlign(CENTER);
            noStroke();
            fill(this.textColor);
            textSize(this.numberSize);
            text (this.number,this.x+this.xIncrement,this.y+5-this.yIncrement);
        }
    }
    redCards() { // Finds players who got a red card and appends a red card icon to them. 
        if (this.reds != 0){
            rectMode(CENTER);
            fill(255,0,0);
            rect(this.x+this.xIncrement+(this.diameter*.4),this.y-this.yIncrement-(this.diameter*.4),5,10);
        }
    }
    goalsScored() { // Finds players who scored at least one goal and appends a goal icon to them.
        if (this.goals != 0){
            strokeWeight(1);
            stroke(0);
            fill(255);
            ellipse(this.x+this.xIncrement-(this.diameter*.4),this.y-this.yIncrement-(this.diameter*.4),10);
        }
    }
    singleAppearance() { // Finds players who only played one match, either as a stsarter or sub
        if(this.appearances ==1 || (this.appearances == 0 && this.subs == 1)){ 
            this.drawPlayer();
            this.redCards();
            this.goalsScored();
        }
    }
    exceptionalCases(){
        if(this.appearances == 1 && (this.goals > 0 || this.reds > 0)){ // Of the players who played only one match (note: none of the sub-only players were remarkable), who scored a goal or got a red card?
            this.x = width/6;
            this.y = height+100;
            this.newOrder = newOrder; // "Order" is team-specific, so I need to give each player a new index value here in order for the list to format correctly.
            newOrder++; //Hoooow does it feeeel
            this.upDisplacement = 100;
            this.diameter = 25;
            this.numberSize = 16;
            this.xIncrement = 0;
            this.yIncrement = height-this.newOrder*this.upDisplacement;
            print(this.yIncrement);
            this.drawPlayer();
            this.redCards();
            this.goalsScored();
            fill(0);
            noStroke();
            textSize(24);
            textAlign(LEFT);
            text (this.name, this.x+this.xIncrement+ 100, this.y-this.yIncrement);
            text (this.team, this.x+this.xIncrement+ 100, this.y-this.yIncrement+30);
            text ("Goals: "+this.goals, this.x+this.xIncrement+300,this.y-this.y-this.yIncrement);
            text ("Red Cards: "+this.reds, this.x+this.xIncrement+300,this.y-this.y-this.yIncrements+30);
        }
    }
}

function mouseReleased(){
    slideNumber++;
    if (slideNumber == 1){
        print("Creating players!");
        for (var k = 0;k<players.length;k++){
            players[k].drawPlayer();
        }
    }
     if(slideNumber == 2){
        print("Issuing cards");
        for(var k = 0;k<players.length;k++){
            players[k].redCards();
        }
    } 
    if(slideNumber ==3){
        print("Scoring goooooooooaaaals!");
        for(var k = 0;k<players.length;k++){
            players[k].goalsScored();
        }
    }
    if(slideNumber == 4){
        print("Getting subbed off!");
        drawPitch();
        for(var k = 0;k<players.length;k++){
            players[k].singleAppearance();
        }
    }
    if(slideNumber == 5){
        print("Narrowing down!")
        drawPitch();
        for(var k = 0;k<players.length;k++){
            players[k].exceptionalCases();
        }
    }
}
function drawPitch(){ // I ended up making this its own function for the sake of refreshing the screen. Ended up being easier.
    background(53, 159, 1);
    stroke(255);
    strokeWeight(10);
    fill(53,159,1);
    rectMode(CENTER);
    rect(width/2,height/2,700,900); // Pitch lines
    circle(width/2,height/2,150)    // Midfield circle
    line(150,500,850,500); // Midfield line
    circle(width/2,225,150);
    circle(width/2,775,150);
    rect(width/2,150, 450,200);
    rect(width/2,850, 450,200);
    rect(width/2,90, 250,75);
    rect(width/2,910, 250,75);
}

