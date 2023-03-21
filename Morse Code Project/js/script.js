"use strict";


let letterTimer = 0;
let storedTime = 0;
let symbol;
let recording = false;
let awaitingSymbol = true;
let symbolArray=[];
let letterArray=[];
let wordTimer = 0;

function preload() {

}

function setup() {
    createCanvas(1000,1000);
    background(0);
    frameRate(30);
}

function draw() {
    if(recording == true){
        recordSymbol();
    }
    if(awaitingSymbol == false){
        decodeLetter();
    }
}
function mousePressed(){
    recording = true;
    print("Recording!");
    fill(0,255,0);
    ellipse(height/2,width/2,25);
}

function mouseReleased(){
    recording = false;
    storedTime = timer;
    timer = 0;
    if(storedTime > 30){
        append(symbolArray, "Dash");
    }
    else {
        append(symbolArray, "Dot");
    }
    storedTime = 0;
    print(symbolArray);
}

function decodeLetter(){
    
}

function recordSymbol(){
    letterTimer++;
}