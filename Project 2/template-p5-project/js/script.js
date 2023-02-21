/**
There's Only One 
Stephen
*/

"use strict";

let table;
let players = [];

function preload() {
    table = loadTable("premStats.csv","csv","header");

}

function setup() {
    createCanvas(1000,1000);
    background(50);
    for (let i = 0; i<table.getRowCount();i++){
        players[i] = new PremPlayer(table.getString(i,0),  // Team Name
                                    table.get(i,1),        // Jersey Number
                                    table.getString(i,2),   // Player Name
                                    table.getString(i,3),   // Player Position
                                    table.get(i,4),         // Appearances (Starts)
                                    table.get(i,5),         // Sub Appearances
                                    table.get(i,6),         // Goals
                                    table.get(i,7),         // Penalty Goals
                                    table.get(i,8),         // Yellow Cards
                                    table.get(i,9),         // Red Cards
                                    table.get(i,10))        // Team Code
        }
}

function draw() {
    for(let i = 0; i<table.getRowCount();i++){
        players[i].draw();
    }
}

class PremPlayer {
    constructor(team,number,name,position,appearances,subs,goals,pens,yellows,reds,code){
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
        this.primaryColor = color(0);
        this.secondaryColor = color (0);
        this.tertiaryColor = color(0);
        this.striped = false;
        this.x = random(width);
        this.y = random(height);
        this.diameter = 50;
        this.strokeWeight = 10;

        if (this.team == "Arsenal"){
            this.primaryColor = color(245,0,0);
            this.secondaryColor = color(255);
            this.drawPlayer();
            
        }
        else if (this.team == "Aston Villa"){
            this.primaryColor = color(133,1,28);
            this.secondaryColor = color (164,201,249);
            this.drawPlayer();
        }
        else if (this.team == "Brentford"){
            this.primaryColor = color(249,0,0);
            this.secondaryColor = color(255);
            this.tertiaryColor = color(0);
            this.striped = true;
            this.drawPlayer();
        }
        else if (this.team == "Brighton and Hove Albion"){
            this.primaryColor = color(0,0,255);
            this.secondaryColor = color(255);
            this.tertiaryColor = color(240,185,4);
            this.striped = true;
            this.drawPlayer();
        }
        else if (this.team == "Burnley"){
            this.primaryColor = color(129,192,255);
            this.secondaryColor = color(129,1,26);
            this.drawPlayer();
        }
        else if (this.team == "Chelsea"){
            this.primaryColor = color (0,0,255);
            this.secondaryColor = color (255);
            this.drawPlayer();
        }
        else if (this.team == "Crystal Palace"){
            this.primaryColor = color(212,24,29);
            this.secondaryColor = color(27, 77, 173);
            this.drawPlayer();
        }
        else if (this.team == "Everton"){
            this.primaryColor = color(13, 48, 122);
            this.secondaryColor = color(22, 85, 164);
            this.drawPlayer();
        }
        else if (this.team == "Leeds United"){
            this.primaryColor = color (255);
            this.secondaryColor = color (209, 220, 30);
            this.drawPlayer();
        }
       
    }
    drawPlayer(){
        if (this.striped == false){
            strokeWeight(this.strokeWeight);
            stroke(this.secondaryColor);
            fill(this.primaryColor);
            circle(this.x,this.y,this.diameter)
        } else {
            strokeWeight(this.strokeWeight);
            stroke(this.tertiaryColor);
            fill(this.primaryColor)
            circle(this.x,this.y,this.diameter)
            rectMode(CENTER);
            noStroke();
            fill(this.secondaryColor);
            rect(this.x,this.y,(this.diameter/4),this.diameter*.75)
        }
    } 

}