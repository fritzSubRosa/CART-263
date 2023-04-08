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
let points = [];
let arraySize =0;

function preload() {
  imageRef = loadImage("assets/images/morsecode.png");
  //qrCode = loadImage("assets/images/qr.png");
  myFont = loadFont('assets/ordrededepart.ttf');
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
  ////////////visual and sounds/////////////
  fill(0);
  background(30);
  points[0].wire();
  
  for ( let j=0; j<arraySize ; j++){
    points[j].path();
  }
  if (recording==1) {
    points.push(new Electricity());
    arraySize++; 
  }
  /////////////////////////////

    fill(255);
    textSize(32);
    textAlign(CENTER);
    textFont(myFont);
    text(promptWord,width/2,height/8);
    text(join(wordArray,""),width/2,height/4);
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
   image(imageRef,width/3,(height-height/3),300,300);
}
function mousePressed(){
    recording = true;
    awaitingSymbol = false;
    print("Recording!");
}

function mouseReleased(){
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
    this.exponent = 0.2;   // Determines the curve

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