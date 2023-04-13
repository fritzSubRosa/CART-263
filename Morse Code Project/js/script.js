"use strict";


// MQTT setup
let myName = "Main"; // Who is the message coming from?
let nextName = "Player"; // Who is the message sent to?
let message; 
let allPlayers = []; //Array of players' usernames
let newPlayer;

// MQTT client details. We are using a public server called shiftr.io.
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
let recording = false;
let awaitingSymbol = false;
let identifyLetter = false;
let symbolArray=[];
let letterArray=[];
let wordArray=[];
let hiddenArray=[];
let promptArray=["Give yourself a nickname!","What's the last movie you watched?","What's your favorite color?","Where are you from?","What's the last name of your favorite author?","What's your favorite animal?"];
let promptWord;
let answerKey=["01","A","1000","B","1010","C","100","D","0","E","0010","F","110","G","0000","H","00","I","0111","J","101","K","0100","L","11","M","10","N","111","O","0110","P","1101","Q","010","R","000","S","1","T","001","U","0001","V","011","W","1001,","X","1011","Y","1100","Z"];
let answerWord;
let timerStartTrigger = false;

////////Visual and sounds////////
let slideState =0;     //In which page (start/game/score) are we in.
let electricityPoints = [];    //array of points that represent the electric current
let arraySize =0;   //Size of the points array
let qrCode;         //QR code image
let codeRef;       //Morse code reference image
var font;          //Georgia font (normal)
let dotFont;       //Special font made out of dots
let xStart=0; //for the scrolling text in the start menu
let beepSound;
var vehiclesArray = [];
let limit = 0; //variable to limit the amount of time the text points are calculated
  
  function preload() {
    codeRef = loadImage("assets/images/morsecode.png");
    qrCode = loadImage("assets/images/qrcode.png");
    font = loadFont("assets/Georgia.ttf")
    dotFont = loadFont('assets/ordrededepart.ttf');
    soundFormats('mp3', 'ogg');
    beepSound = loadSound("assets/sounds/478946__skibkamusic__morse_code_radio_ss_hq.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  promptWord = promptArray[int(random(0,promptArray.length))];
  print(promptWord);
  MQTTsetup();
  electricityPoints.push(new Electricity());
}

function basicVisuals(){ // Insert here everything we want to keep from one slide page to the other
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
  curveVertex(windowWidth, windowHeight/2);
  curveVertex(windowWidth, windowHeight/2);
  curveVertex(windowWidth, windowHeight+20);
  curveVertex(windowWidth, windowHeight+20);
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
  curveVertex(windowWidth, windowHeight-61);
  curveVertex(windowWidth, windowHeight+60);
  curveVertex(windowWidth, windowHeight+200);
  endShape();
  noStroke();
  fill(255);
  rect((windowWidth/2)-100,(windowHeight/16*7)-35, 200, 45, 20);
  pop();
  textAlign(CENTER);
  textSize(32);
  textFont(dotFont);
}

function draw() {
  /////////////////////////////START PAGE////////////////////////////
  if(slideState==0){
    basicVisuals();
    push();
    textFont("georgia");
    text("tel·e·graph  (tĕl′ĭ-grăf′) n. ",windowWidth/2,(windowHeight/8))
    textSize(24);
    text("Join the game with your technologically advanced device",(windowWidth/2)-200,windowHeight*0.52, 400,400);
    textAlign(LEFT);
    text("1. A communications system that transmits and receives simple unmodulated electric impulses, especially one in which the transmission and reception stations are directly connected by wires.",windowWidth/4,windowHeight*0.15,windowWidth/2,800);
    noStroke();
    fill(255);
    rect(0,windowHeight*0.3, width,42);
    pop();
    for (let x = xStart; x < width; x += 4000) { //use a for loop to draw the line of text multiple times
      fill(0); 
      text("-.- -. --- -.-. -.- / -.- -. --- -.-. -.- .-.-.- / .-- .... --- .----. ... / - .... . .-. . ..--.. / .-- --- --- -.. . -. / ... .... --- . .-.-.- / .-- --- --- -.. . -. / ... .... --- . --..-- / .-- .... --- ..--.. / .-- --- --- -.. . -. / ... .... --- . / .-.. .. -.- . / - --- / -.- -. --- .-- -.-.--", x,windowHeight*0.35); //display text
    }
    xStart--; //move the starting point of the loop up to create the scrolling animation, yStart-- is the same as yStart = yStart -1 or yStart-=1
    
    image(qrCode, (windowWidth/2)-100, windowHeight-50-200, 200, 200);
    text("Start",windowWidth/2,windowHeight*0.44);
  }
  ////////////////////////////GAME PAGE///////////////////////////////
  else if(slideState==1){
    basicVisuals();
    //electric cable
    strokeWeight(50);
    noFill();
    line((windowWidth/6)-200, 100, (windowWidth/6)+150, 50);
    line((windowWidth/6)-20, 100, (windowWidth/6)+70, windowHeight-50);
    strokeWeight(20);
    curve(-200, 100, 0, 170, windowWidth/6, 150, (windowWidth/6)+50, 0);
    electricityPoints[0].wire();
    for ( let j=0; j<arraySize ; j++){
      electricityPoints[j].path();
    }
    if (recording==1) {
      electricityPoints.push(new Electricity());
      arraySize++; 
    }
    
    //Images and instructions
    text("Submit",windowWidth/2,(windowHeight/16*7));
    image(codeRef,(windowWidth/2)-(((windowHeight/2)-20)/2),windowHeight/2,(windowHeight/2)-20,(windowHeight/2)-20);
    image(qrCode, windowWidth-50-200, windowHeight-50-200, 200, 200);
    push();
    textSize(24);
    textFont("georgia");
    text("Use the QR code to join",windowWidth-50-100, windowHeight*0.57);
    text("Write your one word answer to the prompt with the telegraph:",width*0.25,height/8,width/2,400);
    pop();
    text(promptWord,width/2,height*0.2);
    text(join(hiddenArray,""),width/2,height*0.25);
    
    
    //Telegraph basic functions
    if(recording == true){
      recordSymbol();
    }
    if(awaitingSymbol == true){ //check if the letter is complete by waiting
      letterTimer++
      if (letterTimer > 30){
        identifyLetter = true;
        awaitingSymbol = false;
        letterTimer = 0;
        completeSymbol = join(symbolArray,"");
        print(completeSymbol);
      }
    }
    if(identifyLetter == true){
      decodeLetter();
    }
  }
  //////////////////////////GUESS PAGE////////////////////////////////
  else if(slideState == 2){
    basicVisuals();
    
    //See vehicle.js
    if(limit==0){ //defines where are the arrival coordonates of the textPoints, only one time.
      textFont(font);
      textAlign(CENTER);// WHY WONT THAT WORK??
      var textPoints = font.textToPoints(answerWord,width/3,height/3,180) //Creates a collection of point on the edge of each letter
      for (var i=0; i<textPoints.length; i++){ //for each of those points, generates a x and y to be used later.
        var pt = textPoints[i];
        var vehicle = new Vehicle(pt.x,pt.y);
        vehiclesArray.push(vehicle);
      }
      limit=1;
    }
    for(var i = 0; i< vehiclesArray.length; i++){
      var v = vehiclesArray[i];
      v.behavior();
      v.update();
      v.show();
    }
    
    text("Time to guess!",width/2,height/8);
    text("Scores!",windowWidth/2,(windowHeight/16*7));
    if(timerStartTrigger == false){
      timerStartTrigger = true;
      sendMQTTMessage(2);
    }
  }
  //////////////////////////SCORE PAGE////////////////////////////////
  else if(slideState == 3){
    basicVisuals();
    text("Scores",width/2,height/6);
    text("Restart",windowWidth/2,(windowHeight/16*7));
    for (let i=0; i<allPlayers.length;i++){
      allPlayers[i].displayPlayer();
    }
  }
  }
  function keyPressed(){
    //beepSound.play();
    recording = true;
    awaitingSymbol = false;
    print("Recording!");
  }
  
  function keyReleased(){
    //beepSound.stop();
    recording = false;
    letterTimer = 0;
    storedTime = symbolTimer;
    symbolTimer = 0;
    if(storedTime > 15){
        append(symbolArray, "1"); // If the input was long, record a 1 (dash)
        sendMQTTMessage(1); // Technically redundant, but the program does send a dash to the player
    }
    else {
        append(symbolArray, "0"); // If the input was short, record a 0 (dot)
        sendMQTTMessage(0); // see line 257
    }
    storedTime = 0;
    print(symbolArray);
    awaitingSymbol = true;
}
function mouseReleased(){
    /////////////Change slideState/////////
    if(mouseX <=(windowWidth/2)+100 && mouseX >=(windowWidth/2)-100 && mouseY>=(windowHeight/16*7)-35 && mouseY<=(windowHeight/16*7)+35){
      slideState++;
      print("slideState"+slideState);
      if(slideState>=4){
          slideState = 1;
          allPlayers = [];
          timerStartTrigger = false;
      }
    }
}

function decodeLetter(){
    for(let i=0;i<answerKey.length;i=i+2){ // For every entry in the answer key...
        if(completeSymbol == answerKey[i]){ // ...compare it to the symbol given...
            append(wordArray,answerKey[i+1]) // ... if it matches, append the corresponding letter to the wordArray...
            append(hiddenArray,"*"); // ... and generate a new asterisk to put on the screen.
            print(join(wordArray,""));
            answerWord = (join(wordArray,"")); // Turn the word array into a single string, to use later
        }
    }
    identifyLetter =  false;
    symbolArray = [];
}

function recordSymbol(){
    symbolTimer++;
    print("dot"); 
    if(symbolTimer>15){ // If the button is held for a certain period, return a dash in log
      print("dash");
    }
}

class Electricity{ //Live visual of electricity as the telegraph is being used
  constructor(){
    this.beginX = windowWidth*0.125;  // Initial x-coordinate
    this.beginY = 150;  // Initial y-coordinate
    this.endX = windowWidth*1.1;   // Final x-coordinate
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
  constructor(username,guess,time){ // Takes 3 things from the message received - the username, the player's guess, and their time
    this.username = username;
    this.guess = guess;
    this.time = time;
    this.correct = 0;
    this.incorrect = 0;
    this.guessArray = [];
    this.percentCorrect = 0;
    this.x = random((windowWidth/8),(windowWidth-(windowWidth/8)));
    this.y = random((windowHeight/8),(windowHeight-(windowHeight/8)));
  }

  scoreMe(){
    this.guessArray = split(this.guess,""); // Splits the player's guess into an array, with a letter in each index
    for(let i=0;i<wordArray.length;i++){  // For each entry in the array containing the word to be decoded...
      if(wordArray[i] == this.guessArray[i]){ //... compare the entry to the correspending index in the guess...
        this.correct++; // If they match
      }
      else{
        this.incorrect++; // If they don't match
      }
    }
    this.percentCorrect = int(100*((this.correct)/(this.correct+this.incorrect))); // Turn the number of correct/incorrect into a percentage
    this.diameter = map(this.time,0,30,200,0); // Map time to complete to diameter, in reverse - higher times mean smaller diameters
    this.color = map(this.percentCorrect,0,100,0,255); // Map correctness to color - the more correct an answer is, the whiter the circle will be
  }

  displayPlayer(){ // Creates a circle randomly on the screen with the player's guess. Bigger circles mean faster responses, lighter circles mean more correct.
    fill(0);
    textSize(20);
    text(this.username,this.x,(this.y+(this.diameter*0.6)));
    noStroke();
    fill(this.color); 
    ellipse(this.x,this.y,this.diameter);
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