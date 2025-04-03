const DEBUG = false;
const START_SCENE = "menu";
const WIDTH = 480;
const HEIGHT = 640;
const LANG = "en";

let config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  backgroundColor: "#000000",
  scene: [
    Boot,
    Preloader,
    Menu,
    Snake,
    Definition,

    Alarmist,
    Deist,
    Demist,
    Gist,
    Miniaturist,
    Nudist,
    Obstructionist,
    Persist,
    Plenist,
    Purist,
    Sadist,
    Tourist,
    Twist,
    Typist
  ],
  render: {
    pixelArt: true,
  },
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: DEBUG
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.BOTH,
    width: WIDTH,
    height: HEIGHT,
  },
};

let game = new Phaser.Game(config);