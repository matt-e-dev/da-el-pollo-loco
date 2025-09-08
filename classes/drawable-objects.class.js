/**
 * Represents a drawable object in the game world.
 * Provides basic drawing and image loading functionality.
 */
class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  width = 150;
  height = 100;

  /**
   * Draws the object's image on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a blue frame around the object for debugging.
   * Only applies to certain object types.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof CollectableObject
    ) {
      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /**
   * Draws a red offset frame for collision debugging.
   * Only applies to certain object types.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawOffsetFrame(ctx) {
    if (
      this instanceof Coin ||
      this instanceof SmallChicken ||
      this instanceof Chicken ||
      this instanceof Character ||
      this instanceof Bottle ||
      this instanceof Endboss
    ) {
      const xPos = this.x + this.offset.left;
      const yPos = this.y + this.offset.top;
      const width = this.width - this.offset.left - this.offset.right;
      const height = this.height - this.offset.top - this.offset.bottom;

      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = "red";
      ctx.rect(xPos, yPos, width, height);
      ctx.stroke();
    }
  }

  /**
   * Loads a single image for the object.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images into the image cache.
   * @param {string[]} arr - Array of image file paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}