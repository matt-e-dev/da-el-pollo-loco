let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic;

function init() {
  canvas = document.getElementById("canvas");
  initLevel();
  playBackgroundMusic();
  world = new World(canvas, keyboard);

  // ctx.drawImage(world.character.img, 20, 20, 50, 150);
  // ctx.drawImage(world.enemies.img, 20, 20, 50, 150);
}

function startGame() {
  document.getElementById("start_screen").style.display = "none";
  document.getElementById("game_container").style.display = "block";
  init();
}

function playBackgroundMusic() {
  let backgroundMusic = new Audio("assets/audio/background-music.mp3");
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.1;
  backgroundMusic.play();
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
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();

    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches[i];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const canvasX = x * scaleX;
      const canvasY = y * scaleY;

      // Check against your mobile controls button positions
      if (canvasX >= 20 && canvasX <= 80 && canvasY >= 400 && canvasY <= 460) {
        keyboard.LEFT = true;
      }
      if (canvasX >= 90 && canvasX <= 150 && canvasY >= 400 && canvasY <= 460) {
        keyboard.RIGHT = true;
      }
      if (
        canvasX >= 580 &&
        canvasX <= 640 &&
        canvasY >= 400 &&
        canvasY <= 460
      ) {
        keyboard.D = true; // Jump (UP key)
      }
      if (
        canvasX >= 650 &&
        canvasX <= 710 &&
        canvasY >= 400 &&
        canvasY <= 460
      ) {
        keyboard.SPACE = true;
      }
    }
  },
  { passive: false }
);

canvas.addEventListener(
  "touchend",
  function (e) {
    e.preventDefault();
    // Reset all controls when touch ends
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.D = false;
    keyboard.SPACE = false;
  },
  { passive: false }
);

canvas.addEventListener(
  "touchmove",
  function (e) {
    e.preventDefault();
  },
  { passive: false }
);
