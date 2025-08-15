class MoveableObject extends DrawableObject{
  height = 150;
  width = 100;

 

  speed = 0.15;
  otherDirection = false;

  speedY = 0; // Vertical speed for gravity
  acceleration = 0.5; // Acceleration due to gravity

  lastHit = 0; // Timestamp of the last hit

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration; // Increase speedY to simulate gravity
      }
    });
  }

  isAboveGround() {
    return this.y < 180; // Assuming 180 is the ground level
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 15; // Set an initial speed for the jump
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // i = 0, 1, 2, 3, 4, 5, 6
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  // character.isColliding(chicken);
  isColliding(mo) {
    return this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height;
  }

  hit() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
      console.log("Character is dead");
    } else {
      this.lastHit =  new Date().getTime(); 
    }
  }

  isDead() {
    return this.energy <= 0;
  }

  isHurt() {

    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000; 
    return timepassed < 1; 
  }
  
};




