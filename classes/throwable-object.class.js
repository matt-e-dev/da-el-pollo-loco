class ThrowableObject extends MoveableObject {
  BOTTLE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  
  ];

  constructor(x, y) {
    super();
    this.loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.BOTTLE_ROTATION); // Load rotation images
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 60;
    this.throw();
  }

  throw() {
    this.speedY = 18;
    this.applyGravity();

    setInterval(() => {
      this.x += 12;
      this.playAnimation(this.BOTTLE_ROTATION); // Play rotation animation while moving
    }, 50); // Adjusted interval for smooth animation
  }
}
