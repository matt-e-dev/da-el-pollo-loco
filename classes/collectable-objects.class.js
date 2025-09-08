/**
 * Represents a collectable object in the game world.
 * Extends DrawableObject and provides collection logic.
 */
class CollectableObject extends DrawableObject {
  collected = false;

  /**
   * Creates a new CollectableObject.
   * @param {number} x - The x position of the object.
   * @param {number} y - The y position of the object.
   * @param {string} imagePath - The path to the object's image.
   */
  constructor(x, y, imagePath) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.y = y;
  }

  /**
   * Marks the object as collected.
   */
  collect() {
    this.collected = true;
  }
}

/**
 * Represents a coin collectable in the game.
 * Extends CollectableObject and sets its image and offset.
 */
class Coin extends CollectableObject {
  offset = { top: 60, bottom: 60, left: 60, right: 60 };
  
  /**
   * Creates a new Coin.
   * @param {number} x - The x position of the coin.
   * @param {number} y - The y position of the coin.
   */
  constructor(x, y) {
    super(x, y, "img/8_coin/coin_1.png"); 
  }
}

/**
 * Represents a bottle collectable in the game.
 * Extends CollectableObject and sets its image and offset.
 */
class Bottle extends CollectableObject {
  offset = { top: 100, bottom: 100, left: 60, right: 60 };

  /**
   * Creates a new Bottle.
   * @param {number} x - The x position of the bottle.
   * @param {number} y - The y position of the bottle.
   */
  constructor(x, y) {
    super(x, y, "img/6_salsa_bottle/salsa_bottle.png");
  }
}
