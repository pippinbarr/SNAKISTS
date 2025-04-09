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

    checkAppleCollision() {
        const ate = super.checkAppleCollision();
        if (ate) {
            this.snakeBitsToAdd = this.snake.length - 1 + this.NEW_BODY_PIECES_PER_APPLE;
            for (let i = 0; i < this.snake.length - 1; i++) {
                this.snake[i].setAlpha(0.5);
                this.snake[i].setDepth(1000);
            }
            this.snake.splice(0, this.snake.length - 1);
        }
    }

    tick() {
        super.tick();
    }
}