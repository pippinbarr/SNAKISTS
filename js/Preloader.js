class Preloader extends Phaser.Scene {

  constructor(config) {
    super({
      key: `preloader`
    });
  }

  preload() {
    this.load.bitmapFont('atari', 'assets/fonts/atari.png', 'assets/fonts/atari.xml');

    this.load.image(`head`, `assets/images/head.png`);
    this.load.image(`body`, `assets/images/body.png`);
    this.load.image(`apple`, `assets/images/apple.png`);
    this.load.image(`wall`, `assets/images/wall.png`);
    this.load.image(`black`, `assets/images/black.png`);

    this.load.audio('move', [`assets/sounds/move.mp3`, `assets/sounds/move.ogg`, `assets/sounds/move.wav`]);
    this.load.audio('hit', [`assets/sounds/hit.mp3`, `assets/sounds/hit.ogg`, `assets/sounds/hit.wav`]);
    this.load.audio('apple', [`assets/sounds/apple.mp3`, `assets/sounds/apple.ogg`, `assets/sounds/apple.wav`]);
    this.load.audio('lost-point', [`assets/sounds/lost-point.mp3`, `assets/sounds/lost-point.ogg`, `assets/sounds/lost-point.wav`]);

    this.load.json('strings', `assets/json/${LANG}.json`);

    // Loading screen visuals

    let style = {
      fontFamily: 'Commodore',
    };
    let invisible = this.add.text(0, 0, "123456", style);
    invisible.visible = false;

    this.cameras.main.setBackgroundColor(0x000000);

    this.clown = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, `clown_logo`);

    let progressBar = this.add.graphics();

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(this.clown.x - this.clown.width / 2, this.clown.y + this.clown.height / 2, this.clown.width * value, 5);
    });
  }

  create() {
    setTimeout(() => {
      this.scene.start(START_SCENE);
    }, 1000);
  }
}
