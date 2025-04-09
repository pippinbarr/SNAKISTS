class Gist extends Snake {
    constructor(config) {
        super({
            key: "gist"
        });

        this.SNAKE_START_X = 4;
        this.SNAKE_START_Y = 6;

        this.CONTROLS_X = 4;
        this.CONTROLS_Y = 8;
    }

    create() {
        super.create();

        this.gotIt = false;

        this.gistPostAppleTimer = undefined;
    }

    update() {
        super.update();
    }

    tick() {
        super.tick();
    }

    checkAppleCollision() {
        const ate = super.checkAppleCollision();
        if (ate && !this.gotIt) {
            this.gotIt = true;
            this.time.addEvent({
                delay: 2500,
                callback: this.die,
                callbackScope: this
            });
            return true;
        }
        return false;
    }

    setGameOverText(gameOverString, spacing, gameOverPointsString, spacing2, gameOverResultString) {
        this.hideControls();
        let gameOverResult;
        if (this.gotIt) {
            gameOverResult = this.config.outro.success;
        }
        else {
            gameOverResult = this.config.outro.failure;
        }
        this.addTextToGrid(this.OVER_X, this.OVER_Y, [gameOverString, spacing, gameOverPointsString]);
        this.addTextToGrid(this.OVER_X, this.OVER_Y + 4, gameOverResult);
    }

}