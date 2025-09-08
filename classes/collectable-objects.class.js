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
  offset = { top: 60, bottom: 60, left: 60, right: 60 };
  
  constructor(x, y) {
    super(x, y, "img/8_coin/coin_1.png"); 
  }
}

class Bottle extends CollectableObject {
  offset = { top: 100, bottom: 100, left: 60, right: 60 };

  constructor(x, y) {
    super(x, y, "img/6_salsa_bottle/salsa_bottle.png");
  }
}
