/**
 * Main game script for initializing and controlling the game state, sound, and input.
 */

let canvas;
let world;
let keyboard = new Keyboard();
let backgroundMusic;
/**
 * Indicates whether sound is enabled. Loaded from localStorage, defaults to true.
 * @type {boolean}
 */
let soundEnabled =
  localStorage.getItem("soundEnabled") !== null
    ? localStorage.getItem("soundEnabled") === "true"
    : true;

/**
 * Object containing all sound file paths used in the game.
 */
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

/**
 * Initializes the sound icon on the page based on the sound setting.
 */
function initSoundIcon() {
  const soundIcon = document.getElementById("sound-icon");
  if (soundIcon) {
    soundIcon.textContent = soundEnabled ? "🔊" : "🔇";
  }
}

/**
 * Plays the background music in a loop.
 */
function playBackgroundMusic() {
  backgroundMusic = new Audio(sounds.backgroundMusic);
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.1;
  backgroundMusic.play();
}

/**
 * Toggles the sound setting and updates localStorage and the sound icon.
 */
function toggleSound() {
  soundEnabled = !soundEnabled;
  localStorage.setItem("soundEnabled", soundEnabled);
  const soundIcon = document.getElementById("sound-icon");
  if (soundIcon) {
    soundIcon.textContent = soundEnabled ? "🔊" : "🔇";
  }
  if (!soundEnabled && backgroundMusic) {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    backgroundMusic = null;
  } else if (soundEnabled && !backgroundMusic) {
    playBackgroundMusic();
  }
}

/**
 * Initializes the game, level, sound, and controls.
 */
function init() {
  canvas = document.getElementById("canvas");
  initLevel();
  if (soundEnabled) {
    playBackgroundMusic();
  }
  hideImpressum();
  initSoundIcon();
  world = new World(canvas, keyboard);
  addMobileControlListeners();
}

/**
 * Starts the game and shows the game container.
 */
function startGame() {
  document.getElementById("start_screen").classList.add("d-none");
  document.getElementById("game_container").classList.remove("d-none");
  init();
}

/**
 * Hides the impressum button.
 */
function hideImpressum() {
  const impressum = document.getElementById("impressum_btn");
  if (impressum) {
    impressum.classList.add("d-none");
  }
}

/**
 * Clears all active intervals in the game.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Restarts the game and resets the UI and music.
 */
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

// Initialize sound icon on page load
document.addEventListener("DOMContentLoaded", initSoundIcon);

/**
 * Handles keyboard keydown events and updates the keyboard state.
 */
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

/**
 * Handles keyboard keyup events and updates the keyboard state.
 */
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
