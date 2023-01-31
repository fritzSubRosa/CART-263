/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

let triangles = [];
let sadZone;

function setup() {
    colorMode(HSB);
    createCanvas(1000,1000)
    for (let i = 0; i<500;i++) {
        triangles[i] = new HappyParticle();
    }
    sadZone = new Zone();
}

function draw() {
    background(0,0,60);
    sadZone.display();
    for (let i = 0; i<triangles.length; i++){
        triangles[i].display();
    }

}


class Zone {
    constructor(){
        this.x = width/2;
        this.y = height/2;
        this.diameter = 200;
    }
    display(){
        stroke(0,0,75);
        fill(0,0,60);
        ellipse(this.x,this.y,this.diameter);
    }
}

class HappyParticle {
    constructor () { 
        this.x = random(50,950);
        this.y = random(50,950);
        this.centerX = this.x+5;
        this.centerY = this.y+5;
        this.hue = random(0,80);
    }
    display(){
        if(dist(this.centerX, this.centerY, sadZone.x,sadZone.y) <= sadZone.diameter/2){
            if(this.centerX > width/2){
                this.x = sadZone.x + sadZone.diameter;
            }
            if (this.centerY > height/2){
                this.y = sadZone.y + sadZone.diameter;
            }
            if (this.centerX < width/2){
                this.x = sadZone.x - sadZone.diameter;
            }
            if (this.centerY < height/2){
                this.y = sadZone.y + sadZone.diameter;
            }
        } else {
            fill(255);
        }
        stroke(0);
        fill(this.hue,100,100);
        triangle(this.x,this.y,this.x+10,this.y,this.x+5,this.y+10);
    }
}

