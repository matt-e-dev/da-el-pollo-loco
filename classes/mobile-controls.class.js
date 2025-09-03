class MobileControls extends DrawableObject {
  constructor() {
    super();
    this.buttons = [
      {
        name: "left",
        img: this.loadButtonImage("assets/icons/left-arrow.png"),
        x: 20,
        y: 400,
        width: 60,
        height: 60,
      },
      {
        name: "right",
        img: this.loadButtonImage("assets/icons/right-arrow.png"),
        x: 90,
        y: 400,
        width: 60,
        height: 60,
      },
      {
        name: "jump",
        img: this.loadButtonImage("assets/icons/jump-icon.png"),
        x: 650,
        y: 400,
        width: 60,
        height: 60,
      },
      {
        name: "throw",
        img: this.loadButtonImage("assets/icons/throw-icon.png"),
        x: 580,
        y: 400,
        width: 60,
        height: 60,
      },
    ];
  }

  loadButtonImage(path) {
    let img = new Image();
    img.src = path;
    return img;
  }

  shouldDisplayControls() {
    return window.innerWidth <= 760;
  }

  draw(ctx) {
    // Only draw controls if screen width is 760px or smaller
    if (this.shouldDisplayControls()) {
      this.buttons.forEach((btn) => {
        if (btn.img.complete && btn.img.naturalWidth > 0) {
          ctx.drawImage(btn.img, btn.x, btn.y, btn.width, btn.height);
        }
      });
    }
  }
}
