/**
 * Represents a small chicken enemy in the game.
 * Extends MoveableObject and handles movement, animation, and jumping.
 */
class SmallChicken extends MoveableObject {
  height = 50;
  width = 50;
  offset = { top: 50, bottom: 40, left: 30, right: 30 };
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * Creates a new SmallChicken and initializes its position, speed, and animation.
   */
  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.moveLeft();
    this.speed = 0.15 * Math.random() * 5;
    this.x = 700 + Math.random() * 3000;
    this.y = 600 - this.height;
    this.animate();
    this.loadImages(this.IMAGES_WALKING);
    this.applyGravity();
  }

  /**
   * Handles movement and animation for the small chicken.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
      if (Math.random() < 0.2 && this.isOnGround()) {
        this.jump();
      }
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }

  /**
   * Makes the small chicken jump.
   */
  jump() {
    this.speedY = 10;
  }

  /**
   * Checks if the small chicken is on the ground.
   * @returns {boolean} True if on ground, else false.
   */
  isOnGround() {
    return this.y >= 400;
  }

  /**
   * Applies gravity to the small chicken.
   */
  applyGravity() {
    setInterval(() => {
      if (!this.isOnGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        if (this.y > 400) {
          this.y = 400;
          this.speedY = 0;
        }
      }
    }, 1000 / 25);
  }
}
