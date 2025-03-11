class Gist extends Snake {
    constructor(config) {
        super({
            key: "gissst"
        });

        this.SNAKE_START_X = 4;
        this.SNAKE_START_Y = 6;

        this.CONTROLS_X = 4;
        this.CONTROLS_Y = 8;
    }

    create() {
        super.create();
    }

    update() {
        super.update();
    }

    tick() {
        super.tick();
    }

    checkAppleCollision() {
        const ate = super.checkAppleCollision();
        if (ate && !this.gistPostAppleTimer) {
            this.gistPostAppleTimer = setTimeout(() => {
                this.die();
            }, 2500);
        }
    }

    setGameOverText(gameOverString, spacing, gameOverPointsString, spacing2, gameOverResultString) {
        const gameOverResult = this.config.outro;
        this.addTextToGrid(this.OVER_X, this.OVER_Y, [gameOverString, spacing, gameOverPointsString]);
        this.addTextToGrid(this.OVER_X, this.OVER_Y + 4, gameOverResult);
    }
}