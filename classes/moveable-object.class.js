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
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration; // Increase speedY to simulate gravity
      }
    });
  }

  isAboveGround() {
    return this.y < 180; // Assuming 180 is the ground level
  }

  //loadImage('img/test.png')

  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementByIdlement("image"); <img id= "image" srx>
    this.img.src = path;
  }

  moveRight() {
    this.x += this.speed;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveLeft() {
    this.x -= this.speed;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "blue";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();

  }

  jump() {
    this.speedY = 15; // Set an initial speed for the jump
  }

  playAnimation(images) {
    let i = this.currentImage % images.length; // i = 0, 1, 2, 3, 4, 5, 6
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
};




