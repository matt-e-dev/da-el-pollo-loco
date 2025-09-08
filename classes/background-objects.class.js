/**
 * Represents a background object in the game world.
 * Extends MoveableObject and sets its position and image.
 */
class BackgroundObject extends MoveableObject {
  width = 720;
  height = 480;

  /**
   * Creates a new BackgroundObject.
   * @param {string} imagePath - The path to the background image.
   * @param {number} x - The x position of the background object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    //480 is height of the canvas, so we set y to 480 - height of the background object
    this.y = 480 - this.height;
  }
}
