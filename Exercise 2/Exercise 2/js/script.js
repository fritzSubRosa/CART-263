/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";


let ball = [];
let rectangle = [];

function setup(){
    createCanvas(400,400);
    for (let i = 0; i < 50; i++){
        ball[i] = new Particle(i);
    }
    
}

function draw(){
    background (0,47,108);
    for (let i = 0; i < ball.length; i++){
        ball[i].move();
    }
    for (let i = 0; i < rect.length; i++){
        rectangle[i].move();
    }
}

class Particle{
    constructor(pSize){
        this.x = random(width);
        this.y = random(height);
        this.diameter = (pSize*random(3));
        this.speed = 5;
        this.red = 0;
        this.green = 0;
        this.blue = 0;
        this.id = pSize;
    }
    move(){
        fill(this.red,this.green,this.blue);  
        ellipse(this.x,this.y,this.diameter);
        if(this.x < 200 && this.y < 200){
            if (this.red <255){
                this.red++;
            }
            if (this.green>0){
                this.green--;
            }
            if (this.blue>0){
                this.blue--;
            }
        } else if (this.x>200 && this.y > 200){
            if (this.blue<255){
                this.blue++;
            }
            if (this.red>0){
                this.red--;
            }
            if (this.green){
                this.green--;
            }
        } else if (this.x>200 && this.y < 200 && this.green <= 256){
            if (this.green<255){
                this.green++;
            }
            if (this.red>0){
                this.red--;
            }
            if (this.blue>0){
                this.blue--;
            }
        } else if (this.x<200 && this.y>200){
            if (this.red<255){
                this.red++;
            }
            if (this.green<255){
                this.green++;
            }
            if (this.blue<255){
                this.blue++;
            }
        }
        if((this.x+(this.diameter/2) >= width)){
            this.x = this.x-this.speed;
        }
        if((this.y+(this.diameter/2) >= height)){
            this.y = this.y-this.speed;
        }
        if((this.x-(this.diameter/2) <= 0)){
            this.x = this.x + this.speed;
        }
        if (this.y-(this.diameter/2) <= 0){
            this.y = this.y + this.speed;
        }
        if(mouseX > 200 && this.speed < 20){
            this.speed++;
        } else if(mouseX < 200 && this.speed > 2){
            this.speed--;
        } 
        this.x += random(-this.speed, this.speed);
        this.y += random(-this.speed, this.speed);
    }
}


// Speed based on mouse position
/*
move(){
        ellipse(this.x,this.y,this.diameter);
        if(mouseX > 200 && this.speed < 20){
            this.speed++;
        } else if(mouseX < 200 && this.speed > 2){
            this.speed--;
        } 
        this.x += random(-this.speed, this.speed);
        this.y += random(-this.speed, this.speed);

    }
}
*/

// Change color on particle position
/*
   if(this.x < 200 && this.y < 200){
            if (this.red <255){
                this.red++;
            }
            if (this.green>0){
                this.green--;
            }
            if (this.blue>0){
                this.blue--;
            }
        } else if (this.x>200 && this.y > 200){
            if (this.blue<255){
                this.blue++;
            }
            if (this.red>0){
                this.red--;
            }
            if (this.green){
                this.green--;
            }
        } else if (this.x>200 && this.y < 200 && this.green <= 256){
            if (this.green<255){
                this.green++;
            }
            if (this.red>0){
                this.red--;
            }
            if (this.blue>0){
                this.blue--;
            }
        } else if (this.x<200 && this.y>200){
            if (this.red<255){
                this.red++;
            }
            if (this.green<255){
                this.green++;
            }
            if (this.blue<255){
                this.blue++;
            }
        }
        fill(this.red,this.green,this.blue);    
        */


// Colide off Walls
/*
if((this.x+(this.diameter/2) >= width)){
            this.x = this.x-this.speed;
        }
        if((this.y+(this.diameter/2) >= height)){
            this.y = this.y-this.speed;
        }
        if((this.x-(this.diameter/2) <= 0)){
            this.x = this.x + this.speed;
        }
        if (this.y-(this.diameter/2) <= 0){
            this.y = this.y + this.speed;
        }
*/