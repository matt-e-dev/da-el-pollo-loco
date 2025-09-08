class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 280;
  width = 150;
  height = 100;

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof CollectableObject
    ) {
      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  drawOffsetFrame(ctx) {
    if (
      this instanceof Coin ||
      this instanceof SmallChicken ||
      this instanceof Chicken ||
      this instanceof Character ||
      this instanceof Bottle ||
      this instanceof Endboss
    ) {
      const xPos = this.x + this.offset.left;
      const yPos = this.y + this.offset.top;
      const width = this.width - this.offset.left - this.offset.right;
      const height = this.height - this.offset.top - this.offset.bottom;

      ctx.beginPath();
      ctx.lineWidth = 5;
      ctx.strokeStyle = "red";
      ctx.rect(xPos, yPos, width, height);
      ctx.stroke();
    }
  }

  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementByIdlement("image"); <img id= "image" srx>
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}