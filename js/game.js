let canvas;
let ctx;
let world = new World();


function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  ctx.drawImage(world.character.img, 20, 20, 50, 150);

  ctx.drawImage(world.chicken.img, 20, 20, 50, 150);

  console.log('my character is', world.character);

  console.log('my enemies are', world.enemies);
 
}
