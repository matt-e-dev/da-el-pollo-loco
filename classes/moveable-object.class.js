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

  lastHit = 0; // Timestamp of the last hit

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
    if (this instanceof Character || this instanceof Chicken ) {

      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();

    }
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

  // character.isColliding(chicken);
  isColliding(mo) {
    return this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height;
  }

  hit() {
    this.energy -= 10;
    if (this.energy < 0) {
      this.energy = 0;
      console.log("Character is dead");
    } else {
      this.lastHit =  new Date().getTime(); 
    }
  }

  isDead() {
    return this.energy <= 0;
  }

  isHurt() {

    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000; 
    return timepassed < 1; 
  }
  
};




