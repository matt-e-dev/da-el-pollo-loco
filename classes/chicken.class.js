/**
 * Represents a normal chicken enemy in the game.
 * Extends MoveableObject and handles movement and animation.
 */
class Chicken extends MoveableObject {
  height = 80;
  width = 60;
  offset = { top: 60, bottom: 100, left: 50, right: 50 };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  imageDead = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";

  /**
   * Creates a new Chicken and initializes its position, speed, and animation.
   */
  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.moveLeft();
    this.speed = 0.15 * Math.random() * 5;
    this.x = 700 + Math.random() * 3000;
    this.y = 340;
    this.animate();
    this.loadImages(this.IMAGES_WALKING);
  }

  /**
   * Handles movement and animation for the chicken.
   */
  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1800 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
