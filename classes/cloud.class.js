class Cloud extends MoveableObject {

    x = Math.random() * 500; 
    y = 50;
    height = 250;
    width = 500;

  constructor() {
    super();
    this.loadImage("img/5_background/layers/4_clouds/1.png");

  }

}

