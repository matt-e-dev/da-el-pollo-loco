class ThrowableObject extends MoveableObject {

  constructor(x, y) {
    super();
    this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 40;
    this.throw();
          
  }

  throw() {
  
    this.speedY = 15;
      this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 10);
  
  }

}

