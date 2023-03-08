/**
There's Only One Moise Kean
Stephen
*/

"use strict";

let table;
let players = [];
let legend = [];
let slideNumber = 0;
let newOrder = 1;
let wonderkids = [];
let margin = 250;
let allTeams = ["Arsenal","Aston Villa","Brentford","Brighton and Hove Albion","Burnley","Chelsea","Crystal Palace","Everton","Leeds United","Leicester City","Liverpool","Manchester City","Manchester United","Newcastle United","Norwich City","Southampton","Tottenham Hotspur","Watford","West Ham United","Wolverhampton Wanderers"]
let backgroundOpacity = 0;
let fadedBackground = false;
let explanation = ["","Every Premier League Player, 2020-2021","Red-Carded Players","Goalscorers","Players With Only 1 Appearance","Singleton Players With a Goal or a Red Card"];
let badBoys = [];
let goalScorers = [];
let singletons = [];
let goalGrid = [];
let redGrid = [];


function preload() {
    table = loadTable("premStats.csv","csv","header");

}

function setup() {
    createCanvas(1500,1000);
    
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
    for(let i = 0; i<20;i++){
        legend[i] = new PremPlayer(allTeams[i])    // Team Names
        legend[i].createLegend(i,allTeams[i]);
        fill(255);
        noStroke();
        text(allTeams[i], 1100, 170+(i*42));
    }
    
    // Makes a 20*20 grid for Goalscorers
    for(let i=0;i<20;i++){
        for(let k = 0;k<20;k++){
            goalGrid.push(new p5.Vector((i*40)+100,(k*40)+100));
        }
    }

    // Makes a 10X10 Grid for Red Cards
    for(let i=0;i<10;i++){
        for(let k = 0; k<10;k++){
            redGrid.push(new p5.Vector((i*100)+100,(k*100)+100));
        }
    }
    drawPitch();
}

function draw() {
 /*    if(slideNumber==2){
        print(redGrid);
        drawPitch();
        opacityFilter();
        for(let i=0;i<badBoys.length;i++){
            if (badBoys[i].striped == false){ // Solid jerseys
                strokeWeight(badBoys[i].strokeWeight);
                stroke(badBoys[i].secondaryColor);
                fill(badBoys[i].primaryColor);
                circle(redGrid[i].x,redGrid[i].y,badBoys[i].diameter)
                textAlign(CENTER);
                noStroke();
                fill(badBoys[i].textColor);
                textSize(badBoys[i].numberSize);
                text (badBoys[i].number,redGrid[i].x,redGrid[i].y);
            } else { // Striped jerseys
                strokeWeight(badBoys[i].strokeWeight);
                stroke(badBoys[i].tertiaryColor);
                fill(badBoys[i].primaryColor)
                circle(badBoys[i].x,badBoys[i].y,badBoys[i].diameter)
                rectMode(CENTER);
                noStroke();
                fill(badBoys[i].secondaryColor);
                rect(badBoys[i].x,badBoys[i].y,(badBoys[i].diameter/4),badBoys[i].diameter*.80)
                textAlign(CENTER);
                noStroke();
                fill(badBoys[i].textColor);
                textSize(badBoys[i].numberSize);
                text (badBoys[i].number,badBoys[i].x+badBoys[i].y+5);
            }
        }
    }  */
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
        this.vectorLocation = new p5.Vector(this.x+this.xIncrement,this.y+this.yIncrement);

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
    createLegend(index,name){
        this.name = name
        this.x = 1050;
        this.y = (index*42)+165;
        this.diameter = 30
        if(this.name == "Brentford" || this.name == "Brighton and Hove Albion" || this.name == "Newcastle United" || this.name == "Southampton"){
            strokeWeight(this.strokeWeight);
            stroke(this.tertiaryColor);
            fill(this.primaryColor);
            circle(this.x,this.y,this.diameter);
            rectMode(CENTER);
            noStroke();
            fill(this.secondaryColor);
            rect(this.x,this.y,(this.diameter/4),this.diameter*.80);
        }
        else {
            strokeWeight(4);
            stroke(this.secondaryColor);
            fill(this.primaryColor);
            circle(this.x,this.y,this.diameter);
        }
        stroke(0);
        fill(255);
        ellipse(1350,500,15);
        text("Goal Scorer",1375,505);
        text("Red-Carded",1375,535);
        fill(255,0,0);
        rect(1350,530,10,15)
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
    drawPlayerGrid(){
        if (this.striped == false){ // Solid jerseys
            strokeWeight(this.strokeWeight);
            stroke(this.secondaryColor);
            fill(this.primaryColor);
            circle(this.x,this.y,this.diameter)
            textAlign(CENTER);
            noStroke();
            fill(this.textColor);
            textSize(this.numberSize);
            text (this.number,this.x,this.y+5);
        } else { // Striped jerseys
            strokeWeight(this.strokeWeight);
            stroke(this.tertiaryColor);
            fill(this.primaryColor)
            circle(this.x,this.y,this.diameter)
            rectMode(CENTER);
            noStroke();
            fill(this.secondaryColor);
            rect(this.x,this.y,(this.diameter/4),this.diameter*.80)
            textAlign(CENTER);
            noStroke();
            fill(this.textColor);
            textSize(this.numberSize);
            text (this.number,this.x,this.y+5);
    }
    }
    redCards() { // Finds players who got a red card and appends a red card icon to them. 
        if (this.reds != 0){
            badBoys.push(this);
            badBoys[badBoys.length-1].drawPlayer();
            rectMode(CENTER);
            fill(255,0,0);
            rect(this.x+this.xIncrement+(this.diameter*.4),this.y-this.yIncrement-(this.diameter*.4),5,10);
            
        }
    }
    goalsScored() { // Finds players who scored at least one goal and appends a goal icon to them.
        if (this.goals != 0){
            goalScorers.push(this);
            goalScorers[goalScorers.length-1].drawPlayer();
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
            this.diameter = 35;
            this.numberSize = 16;
            this.xIncrement = 0;
            this.yIncrement = height-this.newOrder*this.upDisplacement;
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
        drawPitch();
        opacityFilter();
        print("Creating players!");
        for (var k = 0;k<players.length;k++){
            players[k].drawPlayer();
        }
    }
     if(slideNumber == 2){
        print("Issuing cards");
        drawPitch();
        opacityFilter();
        for(var k = 0;k<players.length;k++){
            players[k].redCards();
        }
    } 
    if(slideNumber ==3){
        print("Scoring goooooooooaaaals!");
        drawPitch();
        opacityFilter();
        for(var k = 0;k<players.length;k++){
            players[k].goalsScored();
        }
    }
    if(slideNumber == 4){
        print("Getting subbed off!");
        drawPitch();
        opacityFilter();
        for(var k = 0;k<players.length;k++){
            players[k].singleAppearance();
        }
    }
    if(slideNumber == 5){
        print("Narrowing down!")
        drawPitch();
        opacityFilter();
        for(var k = 0;k<players.length;k++){
            players[k].exceptionalCases();
        }
    }
}
function drawPitch(){ // I ended up making this its own function for the sake of refreshing the screen. Ended up being easier.
    background(53, 159, 1);
    noStroke();
    fill(0);
    rectMode(CORNER);
    textAlign(LEFT);
    rect(1000,0,500,1000);
    fill(255);
    textSize(32);
    text("There's Only One Moise Kean",1025,50);
    textSize(16);
    text("An Exploration of the 2021-2022 Premier League Season",1025,80);
    for(let i = 0; i<20;i++){
       
        legend[i].createLegend(i,allTeams[i]);
        fill(255);
        noStroke();
        textAlign(LEFT);
        textSize(16);
        text(allTeams[i], 1100, 170+(i*42));
    }
    textAlign(CENTER);
    text(explanation[slideNumber],1250,120);
    textAlign(LEFT);
    stroke(255);
    strokeWeight(10);
    fill(53,159,1);
    rectMode(CENTER);
    rect((width/2)-margin,height/2,700,900); // Pitch lines
    circle((width/2)-margin,height/2,150)    // Midfield circle
    line(150,500,850,500); // Midfield line
    circle((width/2)-margin,225,150); // Pen box circle, top
    circle((width/2)-margin,775,150); // Pen box circle, bottom
    rect((width/2)-margin,150, 450,200); // Pen box, top
    rect((width/2)-margin,850, 450,200); // Pen box, bottom
    rect((width/2)-margin,90, 250,75); // 6-yard box, top
    rect((width/2)-margin,910, 250,75); // 6-yard box, bottom
}

function opacityFilter(){
    for(let backgroundOpacity=0;backgroundOpacity<25;backgroundOpacity++){
        noStroke();
        fill(255,backgroundOpacity);
        rect(500,500,1000,1000);
        backgroundOpacity++;
        }
}