/**
 * Represents the main game world, handling rendering, game logic, collisions, and UI.
 */
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

  /**
   * Initializes the world and starts the game loop.
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.randomizeCollectablePositions();
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.draw();
    this.run();
  }

  /**
   * Sets the world reference for the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Main draw loop for the world and UI.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.drawWorld();
    this.drawUI();
    this.continueDrawing();
  }

  /**
   * Draws all game objects in the world.
   */
  drawWorld() {
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.triggerEndbossAttack();
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.bottles);
    this.addObjectsToMap(this.coins);
  }

  /**
   * Draws UI elements such as status bars.
   */
  drawUI() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.healthStatusBar);
    this.addToMap(this.bottlesStatusBar);
    this.addToMap(this.coinStatusBar);
    this.showBossStatusBar();
  }

  /**
   * Draws mobile controls.
   */
  drawMobileControls() {
    this.addToMap(this.mobileControls);
    this.ctx.translate(this.camera_x, 0);
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Continues the draw loop using requestAnimationFrame.
   */
  continueDrawing() {
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds multiple objects to the map.
   * @param {DrawableObject[]} objects - Array of drawable objects.
   */
  addObjectsToMap(objects) {
    objects.forEach((ob) => {
      this.addToMap(ob);
    });
  }

  /**
   * Adds a single object to the map, handling direction and frames.
   * @param {DrawableObject} mo - The drawable object.
   */
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

  /**
   * Flips the image horizontally.
   * @param {DrawableObject} mo - The drawable object.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the image orientation after flipping.
   * @param {DrawableObject} mo - The drawable object.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Triggers the endboss attack when the character reaches a certain position.
   */
  triggerEndbossAttack() {
    const endboss = this.level.enemies.find((e) => e instanceof Endboss);
    if (this.character.x >= 3000 && endboss) {
      endboss.startAttack();
    }
  }

  /**
   * Shows the boss status bar if the boss is attacking.
   */
  showBossStatusBar() {
    const endboss = this.level.enemies.find((e) => e instanceof Endboss);
    if (endboss && endboss.isAttacking) {
      this.addToMap(this.bossStatusBar);
    }
  }

  /**
   * Checks if any throwable object collides with the endboss.
   */
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

  /**
   * Starts the main game loop with different intervals for logic checks.
   */
  run() {
    setInterval(() => {
      this.checkBottleCollisions();
      this.checkCoinCollisions();
    });

    setInterval(() => {
      this.checkEnemyCollisions();
      this.checkEndbossCollision();
      this.checkThrowableObjects();
      this.checkBossCollidingWithThrowableObject();
      this.checkNormalEnemiesCollidingWithThrowableObject();
    }, 50);

    setInterval(() => {
      this.checkGameEnd();
    }, 200);
  }

  /**
   * Handles throwing bottles if the D key is pressed.
   */
  checkThrowableObjects() {
    if (this.keyboard.D && this.bottleCount > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.bottleCount--;
      this.bottlesStatusBar.setPercentage((this.bottleCount / 5) * 100);
    }
  }


  /**
   * Checks collisions between the character and normal enemies.
   */
  checkEnemyCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.isAboveGround()) {
          setTimeout(() => {
            let index = this.level.enemies.indexOf(enemy);
            if (index > -1) {
              this.level.enemies.splice(index, 1);
               this.character.jump();
               this.playEnemyKilledSound();
            }
          }, 20);
        } else {
          this.character.hit(5);
          this.playCharacterHurtSound();
          this.healthStatusBar.setPercentage(this.character.energy);
        }
      }
    });
  }
  /**
   * Checks collision between the character and the endboss.
   */
  checkEndbossCollision() {
    const endboss = this.level.enemies.find((e) => e instanceof Endboss);
    if (endboss && this.character.isColliding(endboss)) {
      this.character.hit(50);
      this.playCharacterHurtSound();
      this.healthStatusBar.setPercentage(this.character.energy);
    }
  }

  /**
   * Determines if the character is jumping on an enemy for a jump kill.
   * @param {DrawableObject} enemy - The enemy object.
   * @returns {boolean} True if jumping on enemy, else false.
   */

  /**
   * Removes an enemy by index and makes the character bounce.
   * @param {number} enemyIndex - Index of the enemy to remove.
   */
  killEnemyByJump(enemyIndex) {
    this.level.enemies.splice(enemyIndex, 1);
   
  }

  /**
   * Checks if normal enemies are hit by throwable objects.
   */
  checkNormalEnemiesCollidingWithThrowableObject() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy, enemyIndex) => {
        if (
          !(enemy instanceof Endboss) &&
          this.isBottleHittingEnemy(bottle, enemy)
        ) {
          this.level.enemies.splice(enemyIndex, 1);
          this.throwableObjects.splice(bottleIndex, 1);
          this.playEnemyKilledSound();
        }
      });
    });
  }

  /**
   * Determines if a bottle is hitting an enemy.
   * @param {ThrowableObject} bottle - The bottle object.
   * @param {DrawableObject} enemy - The enemy object.
   * @returns {boolean} True if bottle hits enemy, else false.
   */
  isBottleHittingEnemy(bottle, enemy) {
    const padding = 40;

    return (
      bottle.x + bottle.width + padding > enemy.x &&
      bottle.x - padding < enemy.x + enemy.width &&
      bottle.y + bottle.height + padding > enemy.y &&
      bottle.y - padding < enemy.y + enemy.height
    );
  }

  /**
   * Randomizes the positions of bottle and coin collectables.
   */
  randomizeCollectablePositions() {
    this.bottles.forEach((bottle) => {
      const randomX = 300 + Math.random() * 3200;
      const randomY = 80 + Math.random() * 100;
      bottle.x = randomX;
      bottle.y = randomY;
    });
    this.coins.forEach((coin) => {
      const randomX = 300 + Math.random() * 3200;
      const randomY = 180 + Math.random() * 160;
      coin.x = randomX;
      coin.y = randomY;
    });
  }

  /**
   * Checks collisions between the character and bottles.
   */
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

        const index = this.bottles.indexOf(bottle);
        this.bottles.splice(index, 1);
      });
  }

  /**
   * Checks collisions between the character and coins.
   */
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

  /**
   * Checks if the game has ended (win or lose).
   */
  checkGameEnd() {
    if (this.character.isDead && this.character.isDead()) {
      this.lose();
    }
    const endboss = this.level.enemies.find((e) => e instanceof Endboss);
    if (endboss && endboss.energy <= 0) {
      this.win();
    }
  }

  /**
   * Handles the win condition and shows the win screen.
   */
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

  /**
   * Handles the lose condition and shows the lose screen.
   */
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

  /**
   * Plays the character hurt sound.
   */
  playCharacterHurtSound() {
    if (!soundEnabled) return;
    let hurtSound = new Audio(sounds.characterHurt);
    hurtSound.volume = 0.1;
    hurtSound.play();
  }

  /**
   * Plays the bottle collected sound.
   */
  playBottleCollectedSound() {
    if (!soundEnabled) return;
    let collectSound = new Audio(sounds.bottleCollected);
    collectSound.volume = 0.1;
    collectSound.play();
  }

  /**
   * Plays the coin collected sound.
   */
  playCoinCollectedSound() {
    if (!soundEnabled) return;
    let collectSound = new Audio(sounds.coinCollected);
    collectSound.volume = 0.1;
    collectSound.play();
  }

  /**
   * Plays the boss hurt sound.
   */
  playBossHurtSound() {
    if (!soundEnabled) return;
    let hurtSound = new Audio(sounds.bossHurt);
    hurtSound.volume = 0.1;
    hurtSound.play();
  }

  /**
   * Plays the game lost sound.
   */
  playGameLostSound() {
    if (!soundEnabled) return;
    let lostSound = new Audio(sounds.gameLost);
    lostSound.volume = 0.1;
    lostSound.play();
  }

  /**
   * Plays the game won sound.
   */
  playGameWonSound() {
    if (!soundEnabled) return;
    let wonSound = new Audio(sounds.gameWon);
    wonSound.volume = 0.1;
    wonSound.play();
  }

  /**
   * Plays the enemy killed sound.
   */
  playEnemyKilledSound() {
    if (!soundEnabled) return; // Add this line!
    let killedSound = new Audio("assets/audio/wilhelm.mp3");
    killedSound.volume = 0.1;
    killedSound.play();
  }
}
