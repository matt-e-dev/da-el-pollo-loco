class World {
  character = new Character();
  level = level1;
  enemies = level1.enemies;
  clouds = level1.clouds;
  backgroundObjects = level1.backgroundObjects;
  energy = 100;
  gameLost = false;

  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthStatusBar = new HealthStatusBar();
  bottlesStatusBar = new BottlesStatusBar();
  coinStatusBar = new CoinStatusBar();
  bossStatusBar = new BossStatusBar();
  mobileControls = new MobileControls();
  throwableObjects = [];
  bottleCount = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.randomizeCollectablePositions();
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.run();
  }

  randomizeCollectablePositions() {
    this.collectableObjects = [];
    this.generateCoins();
    this.generateBottles();
  }

  generateCoins() {
    // Generate 8 coins at random positions
    for (let i = 0; i < 8; i++) {
      const randomX = 300 + Math.random() * 3200; // Between 300 and 3500
      const randomY = 180 + Math.random() * 140; // Between 180 and 320 (above ground)
      this.collectableObjects.push(new Coin(randomX, randomY));
    }
  }

  generateBottles() {
    // Generate 8 bottles at random positions
    for (let i = 0; i < 8; i++) {
      const randomX = 300 + Math.random() * 3200; // Between 300 and 3500
      const randomY = 180 + Math.random() * 140; // Between 180 and 320 (above ground)
      this.collectableObjects.push(new Bottle(randomX, randomY));
    }
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.triggerEndbossAttack();

    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.collectableObjects);

    this.ctx.translate(-this.camera_x, 0); //back
    this.addToMap(this.healthStatusBar);
    this.addToMap(this.bottlesStatusBar);
    this.addToMap(this.coinStatusBar);
    this.showBossStatusBar();
    this.addToMap(this.mobileControls);
    this.ctx.translate(this.camera_x, 0); //forward
    this.ctx.translate(-this.camera_x, 0);

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
      this.checkGameEnd(); // <-- Added here
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
        this.playCharacterHurtSound();
        this.healthStatusBar.setPercentage(this.character.energy);
      }
    });
  }

  checkBossCollidingWithThrowableObject() {
    this.throwableObjects.forEach((bottle) => {
      const endboss = this.level.enemies.find((e) => e instanceof Endboss);
      if (endboss && bottle.isCollidingForEndboss(endboss)) {
        this.playBossHurtSound();
        endboss.hit(25);
        this.bossStatusBar.setPercentage(endboss.energy);
      }
    });
  }

  

  checkCollectableCollisions() {
    this.collectableObjects.forEach((collectable, index) => {
      if (this.character.isColliding(collectable) && !collectable.collected) {
        collectable.collect();
        if (collectable instanceof Coin) {
          this.playCoinCollectedSound();
          this.coinStatusBar.setPercentage(this.coinStatusBar.percentage + 20);
        } else if (collectable instanceof Bottle) {
          this.playBottleCollectedSound();
          this.bottleCount++;
          this.bottlesStatusBar.setPercentage((this.bottleCount / 5) * 100);
        }
        this.collectableObjects.splice(index, 1);
      }
    });
  }

  //win or lose endscreen conditions

  checkGameEnd() {
    if (this.character.isDead && this.character.isDead()) {
      this.lose();
    }
    const endboss = this.level.enemies.find((e) => e instanceof Endboss);
    if (endboss && endboss.energy <= 0) {
      this.win();
    }
  }

  win() {
    document.getElementById("game_container").classList.add("d-none");
    document.getElementById("end_screen").classList.remove("d-none");
    document.getElementById("win_message").classList.remove("d-none");
    document.getElementById("lose_message").classList.add("d-none");
    if (!this.gameWon) {
      this.playGameWonSound();
      this.gameWon = true;
    }
  }

  lose() {
    document.getElementById("game_container").classList.add("d-none");
    document.getElementById("end_screen").classList.remove("d-none");
    document.getElementById("lose_message").classList.remove("d-none");
    document.getElementById("win_message").classList.add("d-none");
    if (!this.gameLost) {
      this.playGameLostSound();
      this.gameLost = true;
    }
  }

  playCharacterHurtSound() {
    let hurtSound = new Audio("assets/audio/character-hurt.mp3");
    hurtSound.volume = 0.1;
    hurtSound.play();
  }

  playBottleCollectedSound() {
    let collectSound = new Audio("assets/audio/bottle-collected.mp3");
    collectSound.volume = 0.1;
    collectSound.play();
  }

  playCoinCollectedSound() {
    let collectSound = new Audio("assets/audio/coin-collected.mp3");
    collectSound.volume = 0.1;
    collectSound.play();
  }

  playBossHurtSound() {
    let hurtSound = new Audio("assets/audio/boss-hurt.mp3");
    hurtSound.volume = 0.1;
    hurtSound.play();
  }

  playGameLostSound() {
    let lostSound = new Audio("assets/audio/game-lost.mp3");
    lostSound.volume = 0.1;
    lostSound.play();
  }

  playGameWonSound() {
    let wonSound = new Audio("assets/audio/game-won.mp3");
    wonSound.volume = 0.1;
    wonSound.play();
  }
}
