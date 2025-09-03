class MoveableObject extends DrawableObject {
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
    }, 20);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180; // Assuming 180 is the ground level
    }
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
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  // Increased padding for endboss collision detection with throwableobject bottle

  isCollidingForEndboss(mo) {
    const padding = 30;
    return (
      this.x + this.width > mo.x - padding &&
      this.y + this.height > mo.y - padding &&
      this.x < mo.x + mo.width + padding &&
      this.y < mo.y + mo.height + padding
    );
  }

  hit(damage) {
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
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




