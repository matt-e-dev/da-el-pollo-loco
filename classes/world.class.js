class World {
  character = new Character();
  level = level1;
  enemies = level1.enemies;
  clouds = level1.clouds;
  backgroundObjects = level1.backgroundObjects;
  bottles = level1.bottles;
  coins = level1.coins;
  energy = 100;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  healthStatusBar = new HealthStatusBar();
  bottlesStatusBar = new BottlesStatusBar();
  coinStatusBar = new CoinStatusBar();
  bossStatusBar = new BossStatusBar();
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

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.drawWorld();
    this.drawUI();
    this.continueDrawing();
  }

  drawWorld() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.triggerEndbossAttack();
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.bottles); // Draw bottles
    this.addObjectsToMap(this.coins); // Draw coins
  }

  drawUI() {
    this.ctx.translate(-this.camera_x, 0); // back
    this.addToMap(this.healthStatusBar);
    this.addToMap(this.bottlesStatusBar);
    this.addToMap(this.coinStatusBar);
    this.showBossStatusBar();
  }

  drawMobileControls() {
    this.addToMap(this.mobileControls);
    this.ctx.translate(this.camera_x, 0); // forward
    this.ctx.translate(-this.camera_x, 0);
  }

  continueDrawing() {
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
    mo.drawOffsetFrame(this.ctx);
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
      this.checkBottleCollisions();
      this.checkCoinCollisions();
      this.checkBossCollidingWithThrowableObject();
      this.checkNormalEnemiesCollidingWithThrowableObject();
      this.checkGameEnd();
    }, 50);
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
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy)) {
        if (this.isJumpingOnEnemy(enemy)) {
          this.killEnemyByJump(index);
        } else {
          // Different damage based on enemy type
          if (enemy instanceof Endboss) {
            this.character.hit(50); // Endboss deals massive damage
          } else {
            this.character.hit(5); // Normal enemies deal small damage
          }
          this.playCharacterHurtSound();
          this.healthStatusBar.setPercentage(this.character.energy);
        }
      }
    });
  }

  isJumpingOnEnemy(enemy) {
    const jumpPadding = 45; // Generous padding for easier head-jumping
    const characterBottom = this.character.y + this.character.height;
    const enemyTop = enemy.y;
    return (
      characterBottom - jumpPadding < enemyTop + jumpPadding &&
      this.character.speedY < 0 &&
      !(enemy instanceof Endboss)
    );
  }

  killEnemyByJump(enemyIndex) {
    this.level.enemies.splice(enemyIndex, 1);
    this.character.jump(); // Make character bounce up
    this.playEnemyKilledSound();
  }

  checkBossCollidingWithThrowableObject() {
    this.throwableObjects.forEach((bottle) => {
      const endboss = this.level.enemies.find((e) => e instanceof Endboss);
      if (endboss && bottle.isCollidingForEndboss(endboss)) {
        this.playBossHurtSound();
        endboss.hit(5);
        this.bossStatusBar.setPercentage(endboss.energy);
      }
    });
  }

  checkNormalEnemiesCollidingWithThrowableObject() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (
          !(enemy instanceof Endboss) &&
          this.isBottleHittingEnemy(bottle, enemy)
        ) {
          this.level.enemies.splice(enemyIndex, 1); // Remove enemy
          this.throwableObjects.splice(bottleIndex, 1); // Remove bottle
          this.playEnemyKilledSound();
        }
      });
    });
  }

  isBottleHittingEnemy(bottle, enemy) {
    const padding = 40; // Generous padding for easier hits

    return (
      bottle.x + bottle.width + padding > enemy.x &&
      bottle.x - padding < enemy.x + enemy.width &&
      bottle.y + bottle.height + padding > enemy.y &&
      bottle.y - padding < enemy.y + enemy.height
    );
  }

  randomizeCollectablePositions() {
    // Randomize bottle positions
    this.bottles.forEach((bottle) => {
      const randomX = 300 + Math.random() * 3200;
      const randomY = 180 + Math.random() * 140;
      bottle.x = randomX;
      bottle.y = randomY;
    });

    // Randomize coin positions
    this.coins.forEach((coin) => {
      const randomX = 300 + Math.random() * 3200;
      const randomY = 180 + Math.random() * 140;
      coin.x = randomX;
      coin.y = randomY;
    });
  }

  // Update checkBottleCollisions() to use this.bottles:
  checkBottleCollisions() {
    this.bottles
      .filter(
        (bottle) => this.character.isColliding(bottle) && !bottle.collected
      )
      .forEach((bottle) => {
        bottle.collect();
        this.playBottleCollectedSound();
        this.bottleCount++;
        this.bottlesStatusBar.setPercentage((this.bottleCount / 5) * 100);

        // Remove from bottles array
        const index = this.bottles.indexOf(bottle);
        this.bottles.splice(index, 1);
      });
  }

  // Update checkCoinCollisions() to use this.coins:
  checkCoinCollisions() {
    this.coins
      .filter((coin) => this.character.isColliding(coin) && !coin.collected)
      .forEach((coin) => {
        coin.collect();
        this.playCoinCollectedSound();
        this.coinStatusBar.setPercentage(this.coinStatusBar.percentage + 20);

        // Remove from coins array
        const index = this.coins.indexOf(coin);
        this.coins.splice(index, 1);
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
    document.getElementById("try_again_btn").classList.remove("d-none"); // <-- Show button
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
    document.getElementById("try_again_btn").classList.remove("d-none"); // <-- Show button
    if (!this.gameLost) {
      this.playGameLostSound();
      this.gameLost = true;
    }
  }

  playCharacterHurtSound() {
    if (!soundEnabled) return;
    let hurtSound = new Audio(sounds.characterHurt);
    hurtSound.volume = 0.1;
    hurtSound.play();
  }

  playBottleCollectedSound() {
    if (!soundEnabled) return;
    let collectSound = new Audio(sounds.bottleCollected);
    collectSound.volume = 0.1;
    collectSound.play();
  }

  playCoinCollectedSound() {
    if (!soundEnabled) return;
    let collectSound = new Audio(sounds.coinCollected);
    collectSound.volume = 0.1;
    collectSound.play();
  }

  playBossHurtSound() {
    if (!soundEnabled) return;
    let hurtSound = new Audio(sounds.bossHurt);
    hurtSound.volume = 0.1;
    hurtSound.play();
  }

  playGameLostSound() {
    if (!soundEnabled) return;
    let lostSound = new Audio(sounds.gameLost);
    lostSound.volume = 0.1;
    lostSound.play();
  }

  playGameWonSound() {
    if (!soundEnabled) return;
    let wonSound = new Audio(sounds.gameWon);
    wonSound.volume = 0.1;
    wonSound.play();
  }

  playEnemyKilledSound() {
    if (!soundEnabled) return; // Add this line!
    let killedSound = new Audio("assets/audio/wilhelm.mp3");
    killedSound.volume = 0.1;
    killedSound.play();
  }
}
