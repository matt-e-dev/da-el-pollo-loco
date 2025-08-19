class ThrowableObject extends MoveableObject {

  constructor() {
    super();
    this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = 100;
    this.y = 180;
    this.height = 100;
    this.width = 40;
    this.throw(100, 150);
          
  }

  throw(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 20;
      this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  
  }

}

