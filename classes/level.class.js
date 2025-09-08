class Level {

    enemies;
    clouds;
    backgroundObjects;
    collectableObjects = [];
    level_end_x = 3500;

    constructor(enemies, clouds, bottles, coins,  backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }
}