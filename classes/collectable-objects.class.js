class CollectableObject extends DrawableObject {
  value = 10; // Points or quantity when collected
  collected = false;

  constructor(x, y, imagePath, value = 10) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.y = y;
  }

  collect() {
    this.collected = true;
    // Add collection animation or sound here
  }
}

class Coin extends CollectableObject {
  constructor(x, y) {
    super(x, y, "img/8_coin/coin_1.png"); // 20 points
  }
}

class Bottle extends CollectableObject {
  constructor(x, y) {
    super(x, y, "img/6_salsa_bottle/salsa_bottle.png"); // 10 bottles
  }
}
