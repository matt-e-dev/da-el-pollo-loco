let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);

  // ctx.drawImage(world.character.img, 20, 20, 50, 150);

  // ctx.drawImage(world.enemies.img, 20, 20, 50, 150);
}

window.addEventListener("keydown", (e) => {});

window.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

// mobile controls based on the position of the images on the canvas

canvas = document.getElementById("canvas");

canvas.addEventListener("mousedown", function (e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (x >= 20 && x <= 80 && y >= 400 && y <= 460) {
    keyboard.LEFT = true;
  }
  if (x >= 90 && x <= 150 && y >= 400 && y <= 460) {
    keyboard.RIGHT = true;
  }
  if (x >= 650 && x <= 710 && y >= 400 && y <= 460) {
    keyboard.SPACE = true;
  }
  if (x >= 580 && x <= 640 && y >= 400 && y <= 460) {
    keyboard.D = true;
  }
});

canvas.addEventListener("mouseup", function (e) {
  keyboard.LEFT = false;
  keyboard.RIGHT = false;
  keyboard.SPACE = false;
  keyboard.D = false;
});

canvas.addEventListener(
  "touchstart",
  function (e) {
    const rect = canvas.getBoundingClientRect();
    for (let i = 0; i < e.touches.length; i++) {
      const x = e.touches[i].clientX - rect.left;
      const y = e.touches[i].clientY - rect.top;

      if (x >= 20 && x <= 80 && y >= 400 && y <= 460) {
        keyboard.LEFT = true;
      }
      if (x >= 90 && x <= 150 && y >= 400 && y <= 460) {
        keyboard.RIGHT = true;
      }
      if (x >= 650 && x <= 710 && y >= 400 && y <= 460) {
        keyboard.SPACE = true;
      }
      if (x >= 580 && x <= 640 && y >= 400 && y <= 460) {
        keyboard.D = true;
      }
    }
  },
  false
);

canvas.addEventListener(
  "touchend",
  function (e) {
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.SPACE = false;
    keyboard.D = false;
  },
  false
);
