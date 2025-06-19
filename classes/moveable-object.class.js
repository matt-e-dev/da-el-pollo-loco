class MoveableObject {
  x = 120;
  y = 250;

  height = 150;
  width = 100;

  img;
  imageCache = {};
  currentImage = 0;

  speed = 0.15;

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
}



