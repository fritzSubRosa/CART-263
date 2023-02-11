/**
Can't Do Anything Right
Stephen Friedrich
*/

let triangles = [];
let sadZone;
let sadTriangle;

function setup() {
    colorMode(HSB);
    createCanvas(1000,1000)
    for (let i = 0; i<150;i++) {
        triangles[i] = new HappyParticle(i);
    }
    sadZone = new Zone();
    sadTriangle = new SadParticle();
    increment = 0;
}

function draw() {
    background(0,0,15);
    sadZone.display();
    for (let i = 0; i<triangles.length; i++){
        triangles[i].display(); // Creates triangles and refreshes movement
        triangles[i].collisionCheck(); // Checks if happy triangles and sad triangles are too close to one another
        triangles[i].move(); // Keeps happy triangles on screen and moves them around while they're still happy
        triangles[i].connectionCheck(); // Checks if happy triangles are near enough to one another to draw a connection
        triangles[i].depressionCheck(); // Checks if a happy triangle has become depressed (unable to draw connections)
    }
    sadTriangle.display(); // Create sad triangle
    sadTriangle.move(); // Sad triangle follows cursor
}

class Zone { // Happy triangles will avoid this zone in the center of the screen
    constructor(){
        this.x = width/2;
        this.y = height/2;
        this.diameter = 200;
    }
    display(){
        stroke(0,0,20);
        fill(0,0,15);
        ellipse(this.x,this.y,this.diameter);
    }
}

class HappyParticle { // The vast majority of particles are "happy" and filled in with warm tones. TriangleSize can be adjusted to make all triangles bigger and still proportional.
    constructor (i) { 
        this.x = random(50,950);
        this.y = random(50,950);
        this.triangleSize = 30;
        this.centerX = this.x+(this.triangleSize/2);
        this.centerY = this.y+(this.triangleSize/2);
        this.hue = round(random(1,80)); // Color will be 
        this.speed = 1;
        this.runAwayThresh = 50;
        this.connectionThresh = 75;
        this.id = i;
        this.isDepressed = false;
        this.saturation = 100;
        this.brightness = 100;
    }
    display(){
        if(dist(this.centerX, this.centerY, sadZone.x,sadZone.y) <= sadZone.diameter/2){
            if(this.centerX > width/2){
                this.x = sadZone.x + sadZone.diameter;
                this.centerX = sadZone.x + sadZone.diameter;
            }
            if (this.centerY > height/2){
                this.y = sadZone.y + sadZone.diameter;
                this.centerY = sadZone.y - sadZone.diameter;
            }
            if (this.centerX < width/2){
                this.x = sadZone.x - sadZone.diameter;
                this.centerX = sadZone.x - sadZone.diameter;
            }
            if (this.centerY < height/2){
                this.centerY = sadZone.y + sadZone.diameter;
                this.y = sadZone.y+sadZone.diameter;
            }
        }
        stroke(0);
        fill(this.hue,this.saturation,this.brightness);
        triangle(this.x,this.y,this.x+this.triangleSize,this.y,this.x+(this.triangleSize/2),this.y+this.triangleSize);
    }
    collisionCheck(){
        if(dist(this.centerX,this.centerY,sadTriangle.centerX,sadTriangle.centerY)<abs(this.runAwayThresh)){
           print("Too close!");
           this.runAway();
        }
        for(let i=0;i<triangles.length;i++){
            if(i!=this.id){
                if(dist(this.centerX,this.centerY,triangles[i].centerX,triangles[i].centerY)<abs(this.runAwayThresh)){
                    this.bounceOff(i);
                }
            }
        }
    }
    connectionCheck(){
        for(let i=0;i<triangles.length;i++){
            if ((dist(this.centerX,this.centerY,triangles[i].centerX,triangles[i].centerY) < this.connectionThresh) && (this.isDepressed == false) && triangles[i].isDepressed == false){
                print("connection!");
                stroke(0,0,100);
                line(this.centerX,this.centerY,triangles[i].centerX,triangles[i].centerY);
            }   
        }
    }
    runAway(){
        if(this.centerX - sadTriangle.centerX >= 0){ // Checks if the sad particle is to the left of happy particle and if so, happy particle moves right.
            this.x = this.x+this.speed;
            this.centerX = this.centerX+this.speed;
            this.getSad();
        }
        if (this.centerX - sadTriangle.centerX < 0){ // Checks if the sad particle is to the right of the happy particle and, if so, happy particle moves left
            this.x = this.x-this.speed;
            this.centerX = this.centerX-this.speed;
            this.getSad();
        }
        if (this.centerY - sadTriangle.centerY >= 0){ // Checks if the sad particle is above the happy particle and, if so, happy particle moves down
            this.y = this.y+this.speed;
            this.centerY = this.centerY+this.speed;
            this.getSad();
        }
        if (this.centerY - sadTriangle.centerY < 0){ // Checks if the sad particle is above the happy particle and, if so, sad particle moves down
            this.y = this.y-this.speed;
            this.centerY = this.centerY-this.speed;
            this.getSad();
        }
    }

    bounceOff(i){
        if(this.centerX - triangles[i].centerX >= 0){ // Checks if the sad particle is to the left of happy particle and if so, happy particle moves right.
            this.x = this.x+this.speed;
            this.centerX = this.centerX+this.speed;
        }
        if (this.centerX - triangles[i].centerX < 0){ // Checks if the sad particle is to the right of the happy particle and, if so, happy particle moves left
            this.x = this.x-this.speed;
            this.centerX = this.centerX-this.speed;
        }
        if (this.centerY - triangles[i].centerY >= 0){ // Checks if the sad particle is above the happy particle and, if so, happy particle moves down
            this.y = this.y+this.speed;
            this.centerY = this.centerY+this.speed;
        }
        if (this.centerY - triangles[i].centerY < 0){ // Checks if the sad particle is above the happy particle and, if so, sad particle moves down
            this.y = this.y-this.speed;
            this.centerY = this.centerY-this.speed;
        }
    }
    
    move(){
        this.velo = random((-1*this.speed),this.speed);
        
        if(this.isDepressed == false){
            this.x = this.x+this.velo;
            this.centerX = this.centerX+this.velo;
            this.y = this.y+this.velo;
            this.centerY = this.centerY+this.velo;
        }
        if(this.centerX+(this.TriangleSize/2) >= width){
            this.x = this.x-this.speed;
            this.centerX = this.centerX-this.speed;
        }
        if((this.y+(this.TriangleSize/2) >= height)){
            this.y = this.y-this.speed;
            this.centerY = this.centerY-this.speed;

        }
        if((this.x-(this.TriangleSize/2) <= 0)){
            this.x = this.x + this.speed;
            this.centerX = this.centerX+this.speed;

        }
        if (this.y-(this.TriangleSize/2) <= 0){
            this.y = this.y + this.speed;
            this.centerY = this.centerY+this.speed;

        }
    }
    getSad(){
        if (this.hue < 240){ // Make triangle bluer
            this.hue++;
        }
        if (this.saturation > 50){ // Desaturate triangle
            this.saturation--;
        }
        if (this.brightness > 50){ // Make triangle darker
            this.brightness--;
        }
    }
    depressionCheck(){
        if (this.hue > 220){ // 220 instead of 240 to give wiggle room and make the transition to depressed happen a little faster. 
            this.isDepressed = true;
        }
    }
}

class SadParticle {
    constructor (){
        this.x = width/2;
        this.y = height/2;
        this.hue = 240;
        this.centerX = this.x+5;
        this.centerY = this.y+5;
        this.triangleSize = 30; // Relic of when this was a triangle
    }
    display(){
        stroke(0);
        fill(this.hue,50,40);
        ellipse(this.centerX,this.centerY,this.triangleSize,this.triangleSize);

    }
    move(){
        this.x = width*noise(increment); // The sadParticle will move 
        this.y = height*noise(increment+5);
        this.centerX = this.x+5;
        this.centerY = this.y+5;
        increment = increment+0.0007;
    }

}