class Character extends MoveableObject {

  height = 150;
  speed = 10;
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  currentImage = 0;
  world;

  constructor() {
    super();
    this.loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.y = 300;
    this.animate();
  }

  animate() {
    setInterval(() => {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
          this.x += this.speed;
          this.otherDirection = false;
            console.log("Moving RIGHT");
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.x -= this.speed;
          console.log("Moving LEFT");
          this.otherDirection = true;
        }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            // Walk animation
            let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 7 % 6; => 1, Rest 1
            let path = this.IMAGES_WALKING[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            if (this.world.keyboard.RIGHT) {
                console.log("Animating RIGHT");
            }
            if (this.world.keyboard.LEFT) {
                console.log("Animating LEFT");
            }
        }
    }, 50);
  }
}
