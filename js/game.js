let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic;
let soundEnabled = true;

const sounds = {
  jump: "assets/audio/jump.mp3",
  characterHurt: "assets/audio/character-hurt.mp3",
  bottleCollected: "assets/audio/bottle-collected.mp3",
  coinCollected: "assets/audio/coin-collected.mp3",
  bossHurt: "assets/audio/boss-hurt.mp3",
  gameLost: "assets/audio/game-lost.mp3",
  gameWon: "assets/audio/game-won.mp3",
  enemyKilled: "assets/audio/enemy-killed.mp3",
  backgroundMusic: "assets/audio/background-music.mp3",
};


function init() {
  canvas = document.getElementById("canvas");
  initLevel();
  playBackgroundMusic();
  world = new World(canvas, keyboard);
}

function startGame() {
  document.getElementById("start_screen").classList.add("d-none");
  document.getElementById("game_container").classList.remove("d-none");
  init();
}

function restartGame() {
  clearAllIntervals(); 

  document.getElementById("end_screen").classList.add("d-none");
  document.getElementById("win_message").classList.add("d-none");
  document.getElementById("lose_message").classList.add("d-none");
  document.getElementById("try_again_btn").classList.add("d-none");

  document.getElementById("game_container").classList.remove("d-none");

  if (backgroundMusic) {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    backgroundMusic = null;
  }

  init()
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function playBackgroundMusic() {
  backgroundMusic = new Audio(sounds.backgroundMusic);
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.1;
  backgroundMusic.play();
}

// Add this function globally (outside the class)
function toggleSound() {
  soundEnabled = !soundEnabled;

  if (!soundEnabled && backgroundMusic) {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  } else if (soundEnabled && backgroundMusic) {
    backgroundMusic.play();
  }
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
