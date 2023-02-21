let weather;
function preload() {
  weather = loadJSON('https://api.open-meteo.com/v1/forecast?latitude=43.61&longitude=-116.20&hourly=temperature_2m,cloudcover,windspeed_10m,winddirection_10m&daily=weathercode,sunrise,sunset&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=America%2FDenver'); // JSON DERULO
}
let linespacing = 18;
let headerBuffer = 32;
let textSizeLevelOne = 32;
let textSizeLevelTwo = 24;
let textSizeLevelThree = 16;
let latRemap;
let longRemap;

function setup() {
  createCanvas(500, 500);
  
  // Cloud Cover
  colorMode(HSB);
  print(weather.hourly.cloudcover);
  print(weather.hourly.cloudcover.length);
  print(weather.hourly.cloudcover[(weather.hourly.cloudcover.length)-1]);
  background(210,100-(weather.hourly.cloudcover[(weather.hourly.cloudcover.length)-1]),100-(0.5*(weather.hourly.cloudcover[(weather.hourly.cloudcover.length)-1])));

  //Headline
  colorMode(RGB);
  print("The Weather:");
  print(weather);
  print(weather.hourly);
  fill(255);
  textAlign(CENTER);
  textSize(textSizeLevelOne);
  text("Boise, ID, USA",width/2,headerBuffer);
  textSize(textSizeLevelTwo);
  
  // Lat Long Dot
  print(latRemap);
  print(longRemap);
  latRemap = map(weather.latitude,-90,90,0,height);
  longRemap = map(weather.longitude,-180,180,0,width);
  print(latRemap);
  print(longRemap);
  fill(0,255,0);
  circle(longRemap,(height-latRemap),20);

  // Wind Speed and Direction
  fill(255);
  text("Prevailing Wind:", width/2,(height/2)-linespacing);
  textSize(textSizeLevelThree);
  text(weather.current_weather.windspeed + " mp/h",width/2,height/2);
  if(weather.current_weather.winddirection > 348.75 || weather.current_weather.winddirection <= 11.25){
    textSize(textSizeLevelThree);
    text("N", width/2, (height/2)+linespacing);
  }
  else if (weather.current_weather.winddirection > 11.25 && weather.current_weather.winddirection <= 33.75){
    text("NNE", width/2, (height/2)+linespacing);
  }
  else if (weather.current_weather.winddirection > 33.75 && weather.current_weather.winddirection <= 56.25){
    text("NE", width/2, (height/2)+linespacing);
  }
  else if (weather.current_weather.winddirection > 56.25 && weather.current_weather.winddirection <= 78.85){
    text("ENE", width/2, (height/2)+linespacing);
  }
  else if (weather.current_weather.winddirection > 78.85 && weather.current_weather.winddirection <= 101.25){
    text("E", width/2, (height/2)+linespacing);
  }
  else if (weather.current_weather.winddirection > 101.25 && weather.current_weather.winddirection <= 123.75){
    text("ESE", width/2, (height/2)+linespacing);
  }
  else if (weather.current_weather.winddirection > 123.75 && weather.current_weather.winddirection <146.25){
    text("SE", width/2, (height/2)+linespacing);
  }
  else if (weather.current_weather.winddirection > 146.25 && weather.current_weather.winddirection <= 168.75){
    text("SSE", width/2, (height/2)+linespacing);
  }
  else if (weather.current_weather.winddirection > 168.75 && weather.current_weather.winddirection <= 191.25){
    text("S", width/2, (height/2)+linespacing);
  }
  else if (weather.current_weather.winddirection > 191.25 && weather.current_weather.winddirection <= 213.75){
    text("SSW", width/2, (height/2)+linespacing);
  }
  else if (weather.current_weather.winddirection > 213.75 && weather.current_weather.winddirection <= 236.25){
    text("SW", width/2, (height/2)+linespacing);
  }
  else if (weather.current_weather.winddirection > 236.25 && weather.current_weather.winddirection <= 258.75){
    text("WSW", width/2, (height/2)+linespacing);
  }
  else if (weather.current_weather.winddirection > 258.75 && weather.current_weather.winddirection <= 281.25){
    text("W", width/2, (height/2)+linespacing);
  }
  else if (weather.current_weather.winddirection > 281.25 && weather.current_weather.winddirection <= 303.75){
    text("WNW", width/2, (height/2)+linespacing);
  }
  else if (weather.current_weather.winddirection > 303.75 && weather.current_weather.winddirection <= 326.25){
    text("NW", width/2, (height/2)+linespacing);
  }
  else if (weather.current_weather.winddirection > 326.25 && weather.current_weather.winddirection <= 348.75){
    text("WNW", width/2, (height/2)+linespacing);
  }
  else {
    text("ERROR: Noneuclidean wind detected", width/2,(height/2)+10);
  }
  
 
}

