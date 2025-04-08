class Copyist extends Snake {
    constructor(config) {
        super({
            key: "copyist"
        });
    }

    create() {
        this.snakes = [];
        this.snakeBodyGroup = this.add.group();
        super.create();
    }

    update() {
        super.update();
    }

    tick() {
        this.prev = new Phaser.Geom.Point(this.next.x, this.next.y);

        for (let snake of this.snakes) {
            if (snake.dead) {
                this.flashSnake(snake);
                continue;
            }

            this.addSnakeBits(snake);

            if (!snake.dead) {
                this.updateSnakePosition(snake);
            }

            this.checkAppleCollision(snake);
            this.checkBodyCollision(snake);
            this.checkWallCollision(snake);
        }

        // Check if all the snakes are dead
        const undeads = this.snakes.filter((snake) => !snake.dead);
        if (undeads.length === 0 && !this.ending) {
            this.ending = true;
            this.time.addEvent({
                delay: 1000 * this.DEATH_DELAY,
                callback: this.gameOver,
                callbackScope: this
            });
        }
    }

    checkAppleCollision(snake) {
        const head = snake[snake.length - 1];
        if (head.x === this.apple.x && head.y === this.apple.y) {
            this.appleSFX.play();

            this.apple.x = -1000;
            this.apple.y = -1000;
            this.apple.setVisible(false);
            this.startAppleTimer();

            const x = snake[0].x;
            const y = snake[0].y;

            this.time.addEvent({
                delay: this.SNAKE_TICK * 1000,
                callback: () => {
                    this.createSnake(x, y);
                },
                callbackScope: this
            });

            this.addToScore(this.APPLE_SCORE);

            return true;
        }

        return false;
    }

    checkBodyCollision(snake) {
        this.snakeBodyGroup.children.each((bit) => {
            const head = snake[snake.length - 1];
            if (head.x === bit.x && head.y === bit.y) {
                this.die(snake);
                return;
            }
        }, this);
    }

    die(snake) {
        this.hitSFX.play();
        snake.dead = true;
    }

    flashSnake(snake) {
        for (let bit of snake) {
            bit.visible = !bit.visible;
        }
    }

    addSnakeBits(snake) {
        if (snake.dead) return;

        if (snake.snakeBitsToAdd > 0) {
            let bit = this.snakeBodyGroup.create(-100, -100, 'body');
            bit.setOrigin(0, 0);
            snake.unshift(bit)
            snake.snakeBitsToAdd = Math.max(0, snake.snakeBitsToAdd - 1);
        }
    }

    updateSnakePosition(snake) {
        const head = snake[snake.length - 1];
        if (this.next.x == 0 && this.next.y == 0) {
            return;
        }

        this.moveSFX.play();

        for (let i = 0; i < snake.length - 1; i++) {
            snake[i].x = snake[i + 1].x;
            snake[i].y = snake[i + 1].y;
        }
        head.x += this.next.x;
        head.y += this.next.y;
    }

    checkWallCollision(snake) {
        this.wallGroup.children.each((wall) => {
            const head = snake[snake.length - 1];
            if (wall.active && head.x === wall.x && head.y === wall.y) {
                this.die(snake);
                return;
            }
        }, this);
    }

    createSnake(x = this.SNAKE_START_X * this.GRID_SIZE, y = this.SNAKE_START_Y * this.GRID_SIZE) {
        const snake = [];
        const head = this.add.image(x, y, 'head');
        head.setOrigin(0, 0);
        snake.unshift(head);
        snake.snakeBitsToAdd = 3;
        this.snakes.push(snake);
    }
}