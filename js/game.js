let canvas;
let world;


function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas);

  // ctx.drawImage(world.character.img, 20, 20, 50, 150);

  // ctx.drawImage(world.enemies.img, 20, 20, 50, 150);

  console.log('my character is', world.character);

  console.log('my enemies are', world.enemies);
 
}
