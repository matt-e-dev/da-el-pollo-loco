/**
 * Represents a throwable object (bottle) in the game.
 * Extends MoveableObject and handles throwing, movement, and rotation animation.
 */
class ThrowableObject extends MoveableObject {
  BOTTLE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /**
   * Creates a new ThrowableObject and starts its throw animation.
   * @param {number} x - The x position of the throwable object.
   * @param {number} y - The y position of the throwable object.
   */
  constructor(x, y) {
    super();
    this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.BOTTLE_ROTATION);
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 60;
    this.throw();
  }

  /**
   * Initiates the throw, applies gravity, and starts rotation animation.
   */
  throw() {
    this.speedY = 18;
    this.applyGravity();
    setInterval(() => {
      this.x += 12;
      this.playAnimation(this.BOTTLE_ROTATION);
    }, 50);
  }
}
