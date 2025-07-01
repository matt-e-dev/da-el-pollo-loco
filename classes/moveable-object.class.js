class MoveableObject {


  height = 150;
  width = 100;

  img;
  imageCache = {};
  currentImage = 0;

  speed = 0.15;
  otherDirection = false;

  speedY = 0; // Vertical speed for gravity
  acceleration = 0.5; // Acceleration due to gravity

  applyGravity() {
    setInterval(() => {
     
      if (this.y < 180) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration; // Increase speedY to simulate gravity
      }
   })
 }

  
  


  //loadImage('img/test.png')

  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementByIdlement("image"); <img id= "image" srx>
    this.img.src = path;
  }

  moveRight() {
    console.log("Moving right");
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // i = 0, 1, 2, 3, 4, 5, 6
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

}



