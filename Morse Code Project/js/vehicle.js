//https://www.youtube.com/watch?v=4hA7G3gup-4
class Vehicle{
    constructor(x,y){
        this.position = createVector(random(-400,windowWidth+400), random(-400,windowHeight+400));
        this.target= createVector(x,y);
        this.velocity= createVector();
        this.acceleration= createVector();
        this.maxSpeed = 4;
        this.maxForce = 0.04; //play with this one to get different effects on the speed
    }
    
    behavior(){
        var arrive = this.arrive(this.target);
        this.applyForce(arrive);
    }
    applyForce(f){
        this.acceleration.add(f);
    }
    
    
    update(){
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.acceleration.mult(0);
    }
    show(){
        push();
        stroke (255);
        strokeWeight(10);
        point(this.position.x, this.position.y);
        pop();
    }

    arrive(target){
        var desired = p5.Vector.sub(target, this.position);
        var d = desired.mag();
        var speed = this.maxSpeed;
        if(d < 100){
            speed = map(d,0,100, 0, this.maxSpeed)
        }
        desired.setMag(speed);
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);
        return steer;
    }
}
    