class MoveableObject {

    x = 120;
    y = 400;
    img;

    //loadImage('img/test.png')

    loadImage(path) {

        this.img = new Image(); // this.img = document.getElementByIdlement("image"); <img id= "image" srx>
        this.img.src = path;
    }

    moveRight() {
        console.log("Moving right");
    }

}

