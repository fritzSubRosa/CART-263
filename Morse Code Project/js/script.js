"use strict";


// Rube Goldberg setup, update with your own info!
let myName = "Main"; // Who are you? Make sure it matches the previous person's variable! 
let nextName = "Main"; // Who is next on the list? Make sure it matches the next person's variable!
let dataToSend;  // Variable to hold the data to send to the next person on the list
//let timer = false;
//let duration = 2;
//let endTime;
//let myInterval; 
let message;

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
let promptArray=["rambunctious","modified","rapscallion","pungent","scullion","prancing","brouhaha","prank","parsed","marigold","oboeshoes","chronological","propagate","deity","analog","smelter","galvanize","hardwire","abscond","outwith","jaywalker","junebug","ellipse","diegesis","hypoxia","proforma","crampon","carabiner","shinguard","pentiment","palimpsest","supposed","interspersed","redoubt","citadel","pretension","illumine"];
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
    MQTTsetup();
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

// When a message arrives, do this: 
function onMessageArrived(message) {
    let dataReceive = split(trim(message.payloadString), "/");// Split the incoming message into an array deliniated by "/"
    console.log("Message Received:");
    console.log(String(dataReceive[1])); 
  // 0 is who its from
  // 1 is who its for
  // 2 is the data
    if(dataReceive[1] == myName){ // Check if its for me
      console.log("Its for me! :) ");
      console.log(dataReceive[2]);
      endTime = millis() + (duration*1000);
       timer = true;
       print("start timer");
       myInterval = setInterval(checkTimer);
      console.log(dataReceive[2]);
    } else {
      console.log("Not for me! :( ");
    }
    if(int(dataReceive[3]) > 10){ 
      console.log("yes!");
    } else { 
      console.log("nope");
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


//////////////////////////////////////////////MQTT/////////////////////////////////////////////

// Callback functions
function onConnect() {
  client.subscribe(topic);
  console.log("connected");
  // is working
}
function onConnectionLost(response) {
  if (response.errorCode !== 0) {
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