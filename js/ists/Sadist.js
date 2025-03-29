class Sadist extends Snake {
    constructor(config) {
        super({
            key: "sadist"
        });
    }

    checkAppleCollision() {
        if (this.snakeHead.x === this.apple.x && this.snakeHead.y === this.apple.y) {
            this.appleSFX.play();

            this.apple.x = -1000;
            this.apple.y = -1000;
            this.apple.visible = false;
            this.startAppleTimer();
            this.die();

            return true;
        }

        return false;
    }

    checkBodyCollision() {
        this.snakeBodyGroup.children.each((bit) => {
            if (this.snakeHead.x === bit.x && this.snakeHead.y === bit.y) {
                this.addToScore(this.APPLE_SCORE);
                this.reset();
                return;
            }
        }, this);
    }

    checkWallCollision() {
        this.wallGroup.children.each((wall) => {
            if (this.snakeHead.x === wall.x && this.snakeHead.y === wall.y) {
                this.addToScore(this.APPLE_SCORE);
                this.reset();
                return;
            }
        }, this);
    }

    reset() {
        this.hitSFX.play();
        this.dead = true;
        this.time.addEvent({
            delay: 1000 * this.DEATH_DELAY,
            callback: () => {
                this.snakeBodyGroup.clear(true, false);
                this.snakeHead.destroy();
                this.createSnake();
                this.dead = false;
                this.snakeHead.x = this.SNAKE_START_X * this.GRID_SIZE;
                this.snakeHead.y = this.SNAKE_START_Y * this.GRID_SIZE;
            },
            callbackScope: this
        });
    }

    die() {
        this.appleDeath = true;
        this.appleSFX.play();
        this.dead = true;
        this.lastNext = new Phaser.Geom.Point(this.next.x, this.next.y);
        this.next = new Phaser.Geom.Point(0, 0);
        this.time.addEvent({
            delay: 1000 * this.SNAKE_TICK,
            callback: this.gameOver,
            callbackScope: this
        });
    }

    flashSnake() {
        if (!this.appleDeath) {
            super.flashSnake();
        }
    }
}