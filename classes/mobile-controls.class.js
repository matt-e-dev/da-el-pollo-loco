// Add event listeners in your init() function
function addMobileControlListeners() {
  const buttons = {
    "btn-left": "LEFT",
    "btn-right": "RIGHT",
    "btn-jump": "SPACE",
    "btn-throw": "D",
  };

  Object.keys(buttons).forEach((btnId) => {
    const btn = document.getElementById(btnId);
    const key = buttons[btnId];

    btn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard[key] = true;
    });

    btn.addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard[key] = false;
    });
  });
}


