/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/


function setup() {
    createCanvas(1000,1000)
    testTriangle = new HappyParticle();
}

function draw() {
    background(200);
    print(testTriangle.startX);
    print(testTriangle.startY);
}


class HappyParticle {
    constructor () { 
        
    }
}