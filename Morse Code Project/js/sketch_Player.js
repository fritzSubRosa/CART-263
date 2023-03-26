/*
Screen based Rube Goldberg machine template 
CART253, Creative Computation, Fall 2022
Concordia University
l wilkins

We are using the Eclipse Paho MQTT client library: https://www.eclipse.org/paho/clients/js/ to create an MQTT client that sends and receives messages. The client is set up for use on the shiftr.io test MQTT broker (https://shiftr.io/try)

ACCESS HERE!!
https://editor.p5js.org/FancyPants/full/bP6zyULu9 

Example from:
https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate 


*/


///////////////////////////////////////MQTT client details///////////////////////////////////////////////

let myName = "Player"; // Who are you? Make sure it matches the previous person's variable! 
let nextName = "Main"; // Who is next on the list? Make sure it matches the next person's variable!
let dataToSend;  // Variable to hold the data to send to the next person on the list
let timer = false;
let duration = 2;
let endTime;
let myInterval; 

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

///////////////////////////////////////Player details////////////////////////////////////////////////

var myButton1;


function setup() {
  // Normal program setup goes here
  createCanvas(960, 540);
  background(50);
  MQTTsetup(); // Setup the MQTT client

}


function draw() {
  
}

function mousePressed(){ 
  // Sends a message on mouse pressed to test. You can use sendMQTTMessage(msg) at any time, it doesn't have to be on mouse pressed. 
  sendMQTTMessage(95); // This function takes 1 parameter, here I used a random number between 0 and 255 and constrained it to an integer. You can use anything you want.
  background(random(255), 0, 50);
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

function checkTimer(){
if(millis() > endTime){
 print("ended");
 timer = false;
 clearInterval(myInterval);
 background(50);
 } else {
 background(255, 0, 0);
}



//////////////////////////////////////////////MQTT/////////////////////////////////////////////

}
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