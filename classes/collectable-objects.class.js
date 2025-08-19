class CollectableObject extends DrawableObject {
  collected = false;

  constructor(x, y, imagePath) {
    super();
    this.loadImage(imagePath);
    this.x = x;
    this.y = y;
  }

  collect() {
    this.collected = true;
  }
}

class Coin extends CollectableObject {
  constructor(x, y) {
    super(x, y, "img/8_coin/coin_1.png"); 
  }
}

class Bottle extends CollectableObject {
  constructor(x, y) {
    super(x, y, "img/6_salsa_bottle/salsa_bottle.png"); 
  }
}
