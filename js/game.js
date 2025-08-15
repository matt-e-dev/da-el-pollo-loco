let canvas;
let world;
let keyboard = new Keyboard();


function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  // ctx.drawImage(world.character.img, 20, 20, 50, 150);

  // ctx.drawImage(world.enemies.img, 20, 20, 50, 150);

  console.log('my character is', world.character);

  console.log('my enemies are', world.enemies);
 
}

window.addEventListener("keydown", (e) => {
  console.log("Key pressed:", e.key);
});

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
      keyboard.RIGHT = true;
      console.log("RIGHT arrow pressed");
  }
  if (e.keyCode == 37) {
      keyboard.LEFT = true;
      console.log("LEFT arrow pressed");
  }
  if (e.keyCode == 38) {
      keyboard.UP = true;
      console.log("UP arrow pressed");
  }
  if (e.keyCode == 40) {
      keyboard.DOWN = true;
      console.log("DOWN arrow pressed");
  }
  if (e.keyCode == 32) {
      keyboard.SPACE = true;
      console.log("SPACE pressed");
  }
     if (e.keyCode == 68) {
       keyboard.D = true;
       console.log("D pressed");
     }
    

});

// ...existing code...

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
      keyboard.RIGHT = false;
      console.log("RIGHT arrow released");
  }
  if (e.keyCode == 37) {
      keyboard.LEFT = false;
      console.log("LEFT arrow released");
  }
  if (e.keyCode == 38) {
      keyboard.UP = false;
      console.log("UP arrow released");
  }
  if (e.keyCode == 40) {
      keyboard.DOWN = false;
      console.log("DOWN arrow released");
  }
  if (e.keyCode == 32) {
      keyboard.SPACE = false;
      console.log("SPACE released");
  }
    
  if (e.keyCode == 68) {  // Change from 64 to 68
      keyboard.D = false;
      console.log("D released");
  }
});