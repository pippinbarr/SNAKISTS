class Conformist extends Snake {
    constructor(config) {
        super({
            key: "conformist"
        });
    }

    create() {
        super.create();

        this.createConformZone();
        this.conformed = true;
    }

    createConformZone() {
        this.leftX = 5;
        this.rightX = 18;
        this.topY = 13;
        this.bottomY = this.topY + 5;

        this.snakeHead.x = this.leftX * this.GRID_SIZE;
        this.snakeHead.y = this.topY * this.GRID_SIZE;

        this.conformGroup = this.add.group();

        for (let y = this.topY; y <= this.bottomY; y++) {
            for (let x = this.leftX; x <= this.rightX; x++) {
                if (this.isOnTrack(x, y)) {
                    this.addConform(x, y);
                }
            }
        }
    }

    isOnTrack(x, y) {
        return ((y === this.topY || y === this.bottomY) && (x >= this.leftX && x <= this.rightX)) || ((y > this.topY && y < this.bottomY) && (x === this.leftX || x === this.rightX));
    }

    addConform(x, y) {
        const conform = this.conformGroup.create(x * this.GRID_SIZE, y * this.GRID_SIZE, 'tile');
        conform.setTint(0x00ff00);
        conform.setAlpha(0.2);
        conform.setOrigin(0, 0);
        conform.setDepth(-100);
    }

    update() {
        super.update();
    }

    tick() {
        super.tick();

        if (!this.dead) {
            this.checkConforming();
        }
    }

    repositionApple(apple) {
        const bum = this.snake[0];
        apple.setPosition(bum.x, bum.y);
        apple.setVisible(true);
    }

    checkConforming() {
        if (!this.isOnTrack(this.snakeHead.x / this.GRID_SIZE, this.snakeHead.y / this.GRID_SIZE)) {
            this.conformed = false;
            this.die();
        }
    }

    setGameOverText(gameOverString, spacing, gameOverPointsString, spacing2, gameOverResultString) {
        this.hideControls();
        let gameOverResult;
        if (this.conformed) {
            gameOverResult = this.config.outro.success;
        }
        else {
            gameOverResult = this.config.outro.failure;
        }
        this.addTextToGrid(this.OVER_X, this.OVER_Y, [gameOverString, spacing, gameOverPointsString]);
        this.addTextToGrid(this.OVER_X, this.OVER_Y + 4, gameOverResult);
    }

}