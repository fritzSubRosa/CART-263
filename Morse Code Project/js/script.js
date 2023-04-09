"use strict";


// Rube Goldberg setup, update with your own info!
let myName = "Main"; // Who are you? Make sure it matches the previous person's variable! 
let nextName = "Player"; // Who is next on the list? Make sure it matches the next person's variable!
let dataToSend;  // Variable to hold the data to send to the next person on the list
//let timer = false;
//let duration = 2;
//let endTime;
//let myInterval; 
let message;
let allPlayers = [];
let newPlayer;

// MQTT client details. We are using a public server called shiftr.io. Don't change this. 
let broker = {
  hostname: 'public.cloud.shiftr.io',
  port: 443
};
let client;

let creds = {
  clientID: Math.random().toString(16).slice(3), 
  userName: 'public', 
  password: 'public' 
}
let topic = 'MorseCode'; // This is the topic we are all subscribed to
// End of MQTT client details 


// dot is 0 dash is 1
let imageRef;
let letterTimer = 0;
let symbolTimer = 0;
let storedTime = 0;
let completeSymbol;
let recording = false; //I'LL use it too!! ^^ can we change it to mouseState?
let awaitingSymbol = false;
let identifyLetter = false;
let symbolArray=[];
let letterArray=[];
let wordArray=[];
let promptArray=["rambunctious","modified","rapscallion","pungent","scullion","prancing","brouhaha","prank","parsed","marigold","oboeshoes","chronological","propagate","deity","analog","smelter","galvanize","hardwire","abscond","outwith","jaywalker","junebug","ellipse","diegesis","hypoxia","proforma","crampon","carabiner","shinguard","pentiment","palimpsest","supposed","interspersed","redoubt","citadel","pretension","illumine"];
let promptWord;
let answerKey=["01","A","1000","B","1010","C","100","D","0","E","0010","F","110","G","0000","H","00","I","0111","J","101","K","0100","L","11","M","10","N","111","O","0110","P","1101","Q","010","R","000","S","1","T","001","U","0001","V","011","W","1001,","X","1011","Y","1100","Z"];

////////Visual and sounds////////
let slideState =0;     //In which page (start/game/score) are we in.
let points = [];    //array of points that represent the electric current
let arraySize =0;   //Size of the points array
let qrCode;         //QR code image
let morseCodeRef = "A || .- B || -... C || -.-. D || -.. E || .";
let codeRef;       //Morse code reference image
let dotFont;       //Special font made out of dots
let beepSound;
let bark;

function preload() {
  codeRef = loadImage("assets/images/morsecode.png");
  qrCode = loadImage("assets/images/qrcode.png");
  dotFont = loadFont('assets/ordrededepart.ttf');
  //soundFormats('mp3', 'ogg');
  //bark=loadSound("assets/sounds/bark.wav");
  //beepSound = loadSound("assets/sounds/478946__skibkamusic__morse_code_radio_ss_hq.mp3");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(30);
    promptWord = promptArray[int(random(0,promptArray.length))];
    print(promptWord);
    MQTTsetup();
    points.push(new Electricity());
}

function draw() {

  ////////////background/////////////
  fill(0);
  background(130);
  push();
  fill(110);
  noStroke();
  beginShape();
  curveVertex(0, windowHeight);
  curveVertex(0, windowHeight);
  curveVertex(0, windowHeight-460);
  curveVertex((windowWidth/6), windowHeight/2);
  curveVertex((windowWidth/6)*2, windowHeight-130);
  curveVertex((windowWidth/6)*3, windowHeight-200);
  curveVertex((windowWidth/6)*4, windowHeight-120);
  curveVertex((windowWidth/6)*5, windowHeight-299);
  curveVertex((windowWidth/6)*6, windowHeight/2);
  curveVertex((windowWidth/6)*6, windowHeight/2);
  curveVertex((windowWidth/6)*6, windowHeight+20);
  curveVertex((windowWidth/6)*6, windowHeight+20);
  endShape();
  fill(30);
  beginShape();
  curveVertex(0, windowHeight);
  curveVertex(0, windowHeight);
  curveVertex(0, windowHeight-46);
  curveVertex((windowWidth/6), windowHeight-60);
  curveVertex((windowWidth/6)*2, windowHeight-51);
  curveVertex((windowWidth/6)*3, windowHeight-32);
  curveVertex((windowWidth/6)*4, windowHeight-27);
  curveVertex((windowWidth/6)*5, windowHeight-41);
  curveVertex((windowWidth/6)*6, windowHeight-61);
  curveVertex((windowWidth/6)*6, windowHeight+60);
  curveVertex((windowWidth/6)*6, windowHeight+200);
  endShape();
  pop();
  strokeWeight(50);
  noFill();
  line((windowWidth/6)-200, 100, (windowWidth/6)+150, 50);
  line((windowWidth/6)-20, 100, (windowWidth/6)+70, windowHeight-50);
  strokeWeight(20);
  curve(-200, 100, 0, 170, windowWidth/6, 150, (windowWidth/6)+50, 0);

  ///////electric cable//////
  points[0].wire();
  for ( let j=0; j<arraySize ; j++){
    points[j].path();
  }
  if (recording==1) {
    points.push(new Electricity());
    arraySize++; 
  }

  /////////Images and instructions//////////////////
  push();
  noStroke();
  fill(255);
  rect((windowWidth/2)-100,(windowHeight/16*7)-35, 200, 45, 20);
  fill(0);
  text("Submit",windowWidth/2,(windowHeight/16*7));
  pop();
  image(codeRef,(windowWidth/2)-200,windowHeight/2,400,400);
  image(qrCode, windowWidth-50-200, windowHeight-50-200, 200, 200);
  textSize(22);
  textFont("georgia");
  textAlign(CENTER);
  text("Use the QR code to join",windowWidth-50-100, windowHeight-300);
  text("Write your one word answer to the prompt with the telegraph:",width/2,height/8);
  textSize(32);
  textFont(dotFont);
  text(promptWord,width/2,height/6);
  text(join(wordArray,""),width/2,height/8*3);
    if(recording == true){
        recordSymbol();
    }
    if(awaitingSymbol == true){ //check if the letter is complete by waiting
        //fill(0,255,255);
        //ellipse(width-(width/4), height-(height/4),25);
        letterTimer++
        if (letterTimer > 30){
            identifyLetter = true;
            awaitingSymbol = false;
            background(130);
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
    //beepSound.play();
    recording = true;
    awaitingSymbol = false;
    print("Recording!");
}

function mouseReleased(){
    //beepSound.stop();
    recording = false;
    letterTimer = 0;
    storedTime = symbolTimer;
    symbolTimer = 0;
    if(storedTime > 15){
        append(symbolArray, "1");
        sendMQTTMessage(1);
    }
    else {
        append(symbolArray, "0");
        sendMQTTMessage(0);
    }
    storedTime = 0;
    print(symbolArray);
    awaitingSymbol = true;

    /////////////Change slideState/////////
    if(mouseX <=(windowWidth/2)+100 && mouseX >=(windowWidth/2)-100 && mouseY>=(windowHeight/16*7)-35 && mouseY<=(windowHeight/16*7)-35){ //If mouseX&mouseY are inside the button
      //(windowWidth/2)-100,(windowHeight/16*7)-35, 200, 45
      slideState++
      print("slideState");
      if(slideState>=2){

      }
    }
}

function decodeLetter(){
    for(let i=0;i<answerKey.length;i=i+2){
        if(completeSymbol == answerKey[i]){
            append(wordArray,answerKey[i+1])
            print(join(wordArray,""));
        }
    }
    identifyLetter =  false;
    symbolArray = [];
}

function recordSymbol(){
    symbolTimer++;
    print("dot"); 
    //background(130);
    //fill(255);
    //ellipse(width/2,height/2,100);
    if(symbolTimer>15){
      print("dash");
        //background(130);
        //fill(255);
        //rectMode(CENTER);
        //rect(width/2,height/2,400,100);
    }
}

class Electricity{ //Live visual of electricity as the telegraph is being used
  constructor(){
    this.beginX = windowWidth/6;  // Initial x-coordinate
    this.beginY = 150;  // Initial y-coordinate
    this.endX = windowWidth+100;   // Final x-coordinate
    this.endY = 250;   // Final y-coordinate
    this.exponent = 0.3;   // Determines the curve

    this.distX = this.endX - this.beginX;// X-axis distance to move
    this.distY = this.endY - this.beginY;// Y-axis distance to move
    this.x = 0.0;        // Current x-coordinate
    this.y = 0.0;        // Current y-coordinate
    this.step = 0.01;    // Size of each step along the path
    this.pct = 0;      // Percentage traveled (0.0 to 1.0)
  }

  path(){
  this.pct += this.step;
  if (this.pct < 1.0) {
    this.x = this.beginX + (this.pct * this.distX);
    this.y = this.beginY + (pow(this.pct, this.exponent) * this.distY);//pow(n^e) <-- exponents in p5js
  }
  fill(0);
  ellipse(this.x, this.y, 20, 20);
  }
  wire(){
    this.pct = this.step;
    
    for(; this.pct< 1.0; this.pct += this.step){
      this.x = this.beginX + (this.pct * this.distX);
      this.y = this.beginY + (pow(this.pct, this.exponent) * this.distY);
      fill(0);
      ellipse(this.x, this.y, 10, 10); 
    }
    
  }
}

///////////////////////Score//////////////////
class Player {
  constructor(username,guess,timer){
    this.username = username;
    this.guess = guess;
    this.timer = timer;
    this.correct = 0;
    this.incorrect = 0;
    this.accuracy;
    this.guessArray = [];
  }

  scoreMe(){
    this.guessArray = split(this.guess,"");
    console.log(wordArray);
    console.log(this.guessArray);
    for(let i=0;i<wordArray.length;i++){
      if(wordArray[i] == guessArray[i]){
        console.log("correct!")
        this.correct++;
      }
      else{
        console.log("incorrect!")
        this.incorrect++;
      }
    }
    console.log("player scored!");
    console.log(allPlayers);
  }
}

//////////////////////////////MQTT//////////////////////////////////
// When a message arrives, do this: 
function onMessageArrived(message) {
    let dataReceive = split(trim(message.payloadString), "/");// Split the incoming message into an array deliniated by "/"
    console.log("Message Received:");
    if(dataReceive[1]==myName){
      console.log("For me!")
      console.log(String(dataReceive[3])); 
      newPlayer = new Player (dataReceive[2],dataReceive[3],dataReceive[4]);
      console.log("Data sorted");
      append(allPlayers,newPlayer);
      console.log("Player generated");
      newPlayer.scoreMe();
      console.log("Player scored");
      console.log(allPlayers);
    }
  }
  
  // Sending a message
  function sendMQTTMessage(msg) {
        message = new Paho.MQTT.Message(myName + "/" + nextName+"/"+msg); // add messages together: 
  // My name + Next name + data separated by / 
        message.destinationName = topic;
        console.log("Message Sent!");
        client.send(message);
  }

// Callback functions
function onConnect() {
  client.subscribe(topic);
  console.log("connected");
  // is working
}
function onConnectionLost(response) {
  if (response.errorCode !== 0) {
    print("Connection lost");
    // If it stops working
  }
}
function MQTTsetup(){
  client = new Paho.MQTT.Client(broker.hostname, Number(broker.port), creds.clientID);
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  client.connect({
        onSuccess: onConnect,
    userName: creds.userName, // username
    password: creds.password, // password
    useSSL: true
  });
}