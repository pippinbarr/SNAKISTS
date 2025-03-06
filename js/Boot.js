class Boot extends Phaser.Scene {

  constructor(config) {
    super({
      key: 'boot'
    });
  }

  preload() {
    this.load.image('clown_logo', 'assets/images/clown_logo.png');
  }

  create() {
    this.game.scene.start(`preloader`);
  }
}