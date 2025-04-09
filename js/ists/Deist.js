class Deist extends Snake {
    constructor(config) {
        super({
            key: "deist"
        });

        this.SNAKE_START_X = 4;
        this.SNAKE_START_Y = 6;

        this.CONTROLS_X = 4;
        this.CONTROLS_Y = 8;
    }

    create() {
        super.create();

        this.next = new Phaser.Geom.Point(this.GRID_SIZE, 0);
        this.startAppleTimer();
    }

    createControls() {
        this.addTextToGrid(this.CONTROLS_X, this.CONTROLS_Y, this.strings.deist.controls, this.controlsGroup);
        this.controlsVisible = true;
    }

    update() {
        super.update();
    }

    up() {

    }

    down() {

    }

    left() {

    }

    right() {

    }

    tick() {
        super.tick();
    }

    setGameOverText(gameOverString, spacing, gameOverPointsString, spacing2, gameOverResultString) {
        super.setGameOverText(gameOverString, spacing, gameOverPointsString, spacing2, gameOverResultString);
        this.hideControls();
    }

    startAppleTimer() {
        super.startAppleTimer();
    }

    repositionApple(apple) {
        super.repositionApple(apple);
    }
}