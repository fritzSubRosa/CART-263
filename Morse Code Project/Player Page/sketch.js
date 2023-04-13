/*
Morse Code Adventures: Player-Side 
*/


///////////////////////////////////////MQTT client details///////////////////////////////////////////////

let myName = "Player"; // Who are you? Make sure it matches the previous person's variable! 
let nextName = "Main"; // Who is next on the list? Make sure it matches the next person's variable!
let dataToSend;  // Variable to hold the data to send to the next person on the list
let timer = false;
let timeElapsed = 0;
let ticks = 0;
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

////////////////////////////////Player details/////////////////////////////

var username;
var answer;

function preload(){

}


function setup() {
  // Normal program setup goes here
  //createCanvas(440,660 );
  //background(50);
  MQTTsetup(); // Setup the MQTT client
  document.getElementById("guessSection").style.display = "none"
  document.getElementById("instructions").style.display="none";
  document.getElementById("guessSubmit").style.display = "none";
  console.log(topic);
}


function draw() {
  if (timer == true){
    if (millis()>=1000+timeElapsed){ 
        ticks++;
        timeElapsed = millis();
        console.log(ticks)
    }
    if(ticks > 30){
      timer = false;
    }
  }
}

////////////////////////////////////Text Box//////////////////////////////////
function defineUsername() {
  username = document.getElementById("Name").value;
  document.getElementById("Username").innerHTML = "Welcome, "+username+"!";
  document.getElementById("Name").style.display="none";
  document.getElementById("buttonName").style.display="none";
  document.getElementById("instructions").style.display="block";
  document.getElementById("guessSection").style.display = "block";
}
function submitAnswer() {
  timer = false;
  console.log(ticks);
  answer = document.getElementById("answer").value;
  document.getElementById("guess").innerHTML = "Your guess is "+answer;
  sendMQTTMessage(username,answer,ticks); 
}

// When a message arrives, do this: 
function onMessageArrived(message) {
  let dataReceive = split(trim(message.payloadString), "/");
  if(dataReceive[1] == myName){ 
    if(dataReceive[2] == 2){
      console.log("Start the clock!");
      timer = true;
      document.getElementById("guessSubmit").style.display = "block";
    }
  }
}

// Sending a message
function sendMQTTMessage(msg1, msg2,msg3) {
      message = new Paho.MQTT.Message(myName + "/" + nextName+"/"+ msg1 +"/"+msg2+ "/" +msg3); // add messages together: 
// My name + Next name + data separated by / 
      topic ='MorseCode'
      console.log(topic);
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