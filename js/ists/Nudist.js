class Nudist extends Snake {
    constructor(config) {
        super({
            key: "nudist"
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

    createSnake() {
        this.snake = [];
        this.snakeBodyGroup = this.add.group();
        this.snakeHead = this.add.image(this.SNAKE_START_X * this.GRID_SIZE, this.SNAKE_START_Y * this.GRID_SIZE, 'head');
        this.snakeHead.setOrigin(0, 0);
        this.snakeHead.setTint(0xf4b5cd);
        this.snake.unshift(this.snakeHead);

        this.snakeBitsToAdd = 3;
    }

    addSnakeBits() {
        if (this.next.x == 0 && this.next.y == 0) return;

        if (this.snakeBitsToAdd > 0) {
            let bit = this.snakeBodyGroup.create(-100, -100, 'body');
            bit.setOrigin(0, 0);
            bit.setTint(0xf4b5cd);
            this.snake.unshift(bit)
            this.snakeBitsToAdd = Math.max(0, this.snakeBitsToAdd - 1);
        }
    }

    setGameOverText(gameOverString, spacing, gameOverPointsString, spacing2, gameOverResultString) {
        const gameOverResult = this.config.outro;
        this.addTextToGrid(this.OVER_X, this.OVER_Y, [gameOverString, spacing, gameOverPointsString]);
        this.addTextToGrid(this.OVER_X, this.OVER_Y + 4, gameOverResult);
    }
}