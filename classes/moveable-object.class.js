/**
 * Represents a moveable object in the game world.
 * Extends DrawableObject and provides movement, gravity, collision, and state logic.
 */
class MoveableObject extends DrawableObject {
  height = 150;
  width = 100;
  speed = 0.15;
  otherDirection = false;
  speedY = 0; 
  acceleration = 0.5; 
  lastHit = 0; 

  /**
   * Applies gravity to the object, updating its vertical position and speed.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 20);
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if above ground, else false.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting its vertical speed.
   */
  jump() {
    this.speedY = 14;
  }

  /**
   * Plays an animation by cycling through the provided images.
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Checks collision with another moveable object using bounding boxes and offsets.
   * @param {MoveableObject} mo - The other moveable object.
   * @returns {boolean} True if colliding, else false.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }
  /**
   * Checks collision with the endboss using increased padding.
   * @param {MoveableObject} mo - The endboss object.
   * @returns {boolean} True if colliding, else false.
   */
  isCollidingForEndboss(mo) {
    const padding = 30;
    return (
      this.x + this.width > mo.x - padding &&
      this.y + this.height > mo.y - padding &&
      this.x < mo.x + mo.width + padding &&
      this.y < mo.y + mo.height + padding
    );
  }

  /**
   * Applies damage to the object and updates its energy.
   * @param {number} damage - The amount of damage to apply.
   */
  hit(damage) {
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is dead (energy <= 0).
   * @returns {boolean} True if dead, else false.
   */
  isDead() {
    return this.energy <= 0;
  }

  /**
   * Checks if the object is currently hurt (recently hit).
   * @returns {boolean} True if hurt, else false.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }
}
