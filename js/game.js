let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic;
// Load sound setting from localStorage, default to true if not set
let soundEnabled =
  localStorage.getItem("soundEnabled") !== null
    ? localStorage.getItem("soundEnabled") === "true"
    : true;

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
  playEnemyKilledSound: "assets/audio/wilhelm.mp3",
};

// Initialize sound icon on page load
function initSoundIcon() {
  const soundIcon = document.getElementById("sound-icon");
  if (soundIcon) {
    soundIcon.textContent = soundEnabled ? "🔊" : "🔇";
  }
}

function init() {
  canvas = document.getElementById("canvas");
  initLevel();

  // Only play background music if sound is enabled
  if (soundEnabled) {
    playBackgroundMusic();
  }

    hideImpressum();

  initSoundIcon(); // Update sound icon when game startsall

  world = new World(canvas, keyboard);
  addMobileControlListeners();
}

function startGame() {
  document.getElementById("start_screen").classList.add("d-none");
  document.getElementById("game_container").classList.remove("d-none");

  init();
}

function hideImpressum() {
  const impressum = document.getElementById("impressum_btn");
  if (impressum) {
    impressum.classList.add("d-none");
  }
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

  init();
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

  // Save to localStorage
  localStorage.setItem("soundEnabled", soundEnabled);

  // Update icon
  const soundIcon = document.getElementById("sound-icon");
  if (soundIcon) {
    soundIcon.textContent = soundEnabled ? "🔊" : "🔇";
  }

  if (!soundEnabled && backgroundMusic) {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    backgroundMusic = null; // Clear the reference
  } else if (soundEnabled && !backgroundMusic) {
    // Start music if sound was just enabled and no music is playing
    playBackgroundMusic();
  }
}

// Initialize sound icon on page load
document.addEventListener("DOMContentLoaded", initSoundIcon);

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
