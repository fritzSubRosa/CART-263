"use strict";

// dot is 0 dash is 1
let letterTimer = 0;
let symbolTimer = 0;
let storedTime = 0;
let completeSymbol;
let recording = false;
let awaitingSymbol = false;
let identifyLetter = false;
let symbolArray=[];
let letterArray=[];
let wordArray=[];
let promptArray=["rambunctious","modified","rapscallion","pungent","scullion","prancing","brouhaha","prank","parsed","marigold","oboeshoes","chronological","propagate","deity","analog","smelter","galvanize","hardwire","abscond","outwith","jaywalker","junebug","ellipse","diegesis"];
let promptWord;
let answerKey=["01","A","1000","B","1010","C","100","D","0","E","0010","F","110","G","0000","H","00","I","0111","J","101","K","0100","L","11","M","10","N","111","O","0110","P","1101","Q","010","R","000","S","1","T","001","U","0001","V","011","W","1001,","X","1011","Y","1100","Z"];

function preload() {

}

function setup() {
    createCanvas(1000,1000);
    background(0);
    frameRate(30);
    promptWord = promptArray[int(random(0,promptArray.length))];
    print(promptWord);
}

function draw() {
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text(promptWord,width/2,height/8);
    text(join(wordArray,""),width/2,height/4);
    if(recording == true){
        recordSymbol();
    }
    if(awaitingSymbol == true){
        //check if the letter is complete by waiting
        fill(0,255,255);
        ellipse(width-(width/4), height-(height/4),25);
        letterTimer++
        if (letterTimer > 30){
            identifyLetter = true;
            awaitingSymbol = false;
            background(0);
            letterTimer = 0;
            completeSymbol = join(symbolArray,"");
            print(completeSymbol);
        }
    }
    if(identifyLetter == true){
        decodeLetter();
    }
}
function mousePressed(){
    recording = true;
    awaitingSymbol = false;
    print("Recording!");
    fill(0,255,0);
    ellipse(height/2,width/2,25);
}

function mouseReleased(){
    recording = false;
    letterTimer = 0;
    storedTime = symbolTimer;
    symbolTimer = 0;
    if(storedTime > 15){
        append(symbolArray, "1");
    }
    else {
        append(symbolArray, "0");
    }
    storedTime = 0;
    print(symbolArray);
    awaitingSymbol = true;
}

function decodeLetter(){
    for(let i=0;i<answerKey.length;i=i+2){
        if(completeSymbol == answerKey[i]){
            append(wordArray,answerKey[i+1])
            print(join(wordArray,""));
        }
    }
    identifyLetter = false;
    symbolArray = [];
}

function recordSymbol(){
    symbolTimer++;
    background(0);
    fill(255);
    ellipse(width/2,height/2,100);
    if(symbolTimer>15){
        background(0);
        fill(255);
        rectMode(CENTER);
        rect(width/2,height/2,400,100);
    }
}
