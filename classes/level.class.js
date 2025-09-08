/**
 * Represents a game level, containing all objects and entities for that level.
 */
class Level {
  enemies;
  clouds;
  backgroundObjects;
  collectableObjects = [];
  level_end_x = 3500;

  /**
   * Creates a new Level instance.
   * @param {Array} enemies - Array of enemy objects.
   * @param {Array} clouds - Array of cloud objects.
   * @param {Array} bottles - Array of bottle objects.
   * @param {Array} coins - Array of coin objects.
   * @param {Array} backgroundObjects - Array of background objects.
   */
  constructor(enemies, clouds, bottles, coins, backgroundObjects) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
    this.coins = coins;
  }
}
