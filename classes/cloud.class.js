/**
 * Represents a cloud in the game background.
 * Extends MoveableObject and handles cloud movement and animation.
 */
class Cloud extends MoveableObject {
  x = Math.random() * 500;
  y = 50;
  height = 250;
  width = 500;
  speed = 0.15;

  /**
   * Creates a new Cloud and initializes its position and animation.
   */
  constructor() {
    super();
    this.loadImage("img/5_background/layers/4_clouds/1.png");
    this.animate();
  }

  /**
   * Starts the cloud movement animation.
   */
  animate() {
    this.moveLeft();
  }

  /**
   * Moves the cloud to the left over time.
   */
  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
