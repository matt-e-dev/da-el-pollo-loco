class BackgroundObject extends MoveableObject {

    width = 720;
    height = 400;

    constructor(imagePath, x) {

        super().loadImage(imagePath);
        this.x = x;
        //480 is height of the canvas, so we set y to 480 - height of the background object
        this.y = 480 - this.height;
  
    }
}