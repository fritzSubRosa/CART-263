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
}

function draw() {
    background(0,0,15);
    sadZone.display();
    for (let i = 0; i<triangles.length; i++){
        triangles[i].display();
        triangles[i].collisionCheck();
        triangles[i].move();
        triangles[i].connectionCheck();
        triangles[i].depressionCheck();
    }
    sadTriangle.display();
    sadTriangle.move();
}


class Zone {
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

class HappyParticle {
    constructor (i) { 
        this.x = random(50,950);
        this.y = random(50,950);
        this.triangleSize = 20;
        this.centerX = this.x+(this.triangleSize/2);
        this.centerY = this.y+(this.triangleSize/2);
        this.hue = round(random(1,80));
        this.speed = 1;
        this.runAwayThresh = 50;
        this.connectionThresh = 75;
        this.id = i;
        this.isConnected = false;
        this.isDepressed = false;
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
        fill(this.hue,100,100);
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
            this.isConnected = false;
            if ((dist(this.centerX,this.centerY,triangles[i].centerX,triangles[i].centerY) < this.connectionThresh) && (this.isDepressed == false) && triangles[i].isDepressed == false){
                print("connection!");
                stroke(0,0,100);
                line(this.centerX,this.centerY,triangles[i].centerX,triangles[i].centerY);
                this.isConnected = true;
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
        if (this.hue < 240){
            this.hue++;
        }
    }
    depressionCheck(){
        if (this.hue > 220){
            this.isDepressed = true;
            print ("Triangle " +this.id+"'s depression status is: "+this.isDepressed);
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
        this.triangleSize = 20;
    }
    display(){
        stroke(0);
        fill(this.hue,100,100);
        triangle(this.x,this.y,(this.x+this.triangleSize/2),this.y+this.triangleSize,this.x+this.triangleSize,this.y);
    }
    move(){
        this.x = mouseX;
        this.y = mouseY;
        this.centerX = this.x+5;
        this.centerY = this.y+5;
    }

}
