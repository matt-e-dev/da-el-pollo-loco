class World {
  character = new Character();
  level = level1;
  enemies = level1.enemies;
  clouds = level1.clouds;
  backgroundObjects = level1.backgroundObjects;
  energy = 100;

  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthStatusBar = new HealthStatusBar();
  bottlesStatusBar = new BottlesStatusBar();
  coinStatusBar = new CoinStatusBar();
  bossStatusBar = new BossStatusBar();
  // In your level file or constructor, add:
  collectableObjects = [
    new Coin(350, 320),
    new Bottle(480, 275),
    new Coin(720, 290),
    new Bottle(880, 180),
    new Coin(1200, 310),
    new Bottle(1450, 260),
    new Coin(1680, 300),
    new Bottle(1920, 220),
  ];
  throwableObjects = [];
  bottleCount = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.checkCollisions();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // order matters, so we draw the background first, why?
    // because of ctx.clearRect, which clears the whole canvas and then we draws everything again

    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.triggerEndbossAttack();

    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.collectableObjects);

    this.ctx.translate(-this.camera_x, 0); //back
    //space for fixed objects
    this.addToMap(this.healthStatusBar);
    this.addToMap(this.bottlesStatusBar);
    this.addToMap(this.coinStatusBar);
    this.showBossStatusBar();
    this.ctx.translate(this.camera_x, 0); //forward

    this.ctx.translate(-this.camera_x, 0);

    // draw is being called recursively
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  triggerEndbossAttack() {
    const endboss = this.level.enemies.find((e) => e instanceof Endboss);
    if (this.character.x >= 3000 && endboss) {
      endboss.startAttack();
    }
  }

  showBossStatusBar() {
    const endboss = this.level.enemies.find((e) => e instanceof Endboss);
    if (endboss && endboss.isAttacking) {
      this.addToMap(this.bossStatusBar);
    }
  }

  addObjectsToMap(objects) {
    objects.forEach((ob) => {
      this.addToMap(ob);
    });
  }

  // mo = moveable object
  // This method is used to add any moveable object to the map
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowableObjects();
      this.checkCollectableCollisions();
      this.checkBossCollidingWithThrowableObject();
    }, 200);
  }

  checkThrowableObjects() {
    if (this.keyboard.D && this.bottleCount > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.bottleCount--; // Decrease bottle count
      this.bottlesStatusBar.setPercentage((this.bottleCount / 5) * 100);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit(10);
        console.log("Collision with character, enemy", this.character.energy);
        this.healthStatusBar.setPercentage(this.character.energy);
      }
    });
  }

  checkBossCollidingWithThrowableObject() {
    this.throwableObjects.forEach((bottle) => {
      const endboss = this.level.enemies.find((e) => e instanceof Endboss);
      if (endboss && bottle.isCollidingForEndboss(endboss)) {
        console.log("Bottle collided with endboss!");
        endboss.hit(40);
        console.log("Collision with endboss, bottle", endboss.energy);
        this.bossStatusBar.setPercentage(endboss.energy);
      }
    });
  }

  checkCollectableCollisions() {
    this.collectableObjects.forEach((collectable, index) => {
      if (this.character.isColliding(collectable) && !collectable.collected) {
        collectable.collect();
        if (collectable instanceof Coin) {
          this.coinStatusBar.setPercentage(this.coinStatusBar.percentage + 20);
        } else if (collectable instanceof Bottle) {
          this.bottleCount++;
          this.bottlesStatusBar.setPercentage((this.bottleCount / 5) * 100);
        }
        // Remove collected item from array
        this.collectableObjects.splice(index, 1);
      }
    });
  }
}
