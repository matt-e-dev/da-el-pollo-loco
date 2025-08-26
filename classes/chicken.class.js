class Chicken extends MoveableObject {

  height = 100;
  width = 80;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
   
  ];

  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");

    this.moveLeft();
    this.speed = 0.15 * Math.random() * 5;
    this.x = 200 + Math.random() * 3000; // Random x position
    this.y = 340;
    this.animate();
    this.loadImages(this.IMAGES_WALKING);
  }

  animate() {

     setInterval(() => {
       this.moveLeft();
     }, 1000 / 60);
    
    setInterval(() => {
     this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }
}
