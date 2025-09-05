class SmallChicken extends MoveableObject {
  height = 50;
  width = 50;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");

    this.moveLeft();
    this.speed = 0.15 * Math.random() * 5;
    this.x = 200 + Math.random() * 3000; 
    this.y = 400;
    this.animate();
    this.loadImages(this.IMAGES_WALKING);
    this.applyGravity();
  }

  animate() {
    setInterval(() => {
      this.moveLeft()
      if (Math.random() < 0.2 && this.isOnGround()) {
        this.jump();
      }
    }, 1000 / 60);

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }

  jump() {
    this.speedY = 10;
  }

  isOnGround() {
    return this.y >= 330;
  }

  applyGravity() {
    setInterval(() => {
      if (!this.isOnGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        if (this.y > 400) {
          // Clamp to ground level
          this.y = 400;
          this.speedY = 0;
        }
      }
    }, 1000 / 25);
  }
}
