class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud(), new Cloud()];
  backgroundObjects = [

    new BackgroundObject("img/5_background/layers/3_third_layer/1.png"),
  ]


  canvas;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addToMap(this.character);

    this.clouds.forEach((cloud) => {
    this.addToMap(cloud);
    });

    this.enemies.forEach((enemy) => {
      this.addToMap(enemy);
    });

    this.backgroundObjects.forEach((backgroundObject) => {
    this.addToMap(backgroundObject);
    });
    
    // draw is being called recursively
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  // mo = moveable object
  // This method is used to add any moveable object to the map
  addToMap(mo) {
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }
  
}
