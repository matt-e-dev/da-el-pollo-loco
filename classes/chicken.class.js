class Chicken extends MoveableObject {
    constructor() {
    super();
        this.loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
        
      this.x = 200 + Math.random() * 500; // Random x position
      this.y = 300;
  }
}
