class Onanist extends Snake {
    constructor(config) {
        super({
            key: "onanist"
        });
    }

    create() {
        this.SNAKE_START_X = 5;
        this.SNAKE_START_Y = Math.floor(this.NUM_ROWS / 2);

        super.create();

        this.arousal = 0;

        this.strokeLength = 4;
        this.knuckleStartX = 5;
        this.knuckleStartY = 15;
        this.knuckleEndX = this.knuckleStartX + this.strokeLength * 2;
        this.knuckleEndY = this.knuckleStartY + 2;

        this.hand = [];
        for (let y = this.knuckleStartY; y <= this.knuckleEndY; y += 2) {
            for (let x = this.knuckleStartX; x < this.knuckleEndX; x += 2) {
                let wall = this.wallGroup.create(x * this.GRID_SIZE, y * this.GRID_SIZE, 'wall')
                wall.setOrigin(0, 0);
                this.hand.push(wall);
            }
        }
        this.leftmostWall = this.hand[0];
    }

    createSnake() {
        super.createSnake();
        this.snakeBitsToAdd = 0;
        this.snakeBitsToRemove = 0;

        this.grow(3);

        this.base = this.snake[2];
    }

    update() {
        super.update();
    }

    tick() {
        this.arousal -= 0.025;

        console.log(this.arousal, this.snakeBitsToAdd, this.snakeBitsToRemove);

        if (this.arousal < 0) {
            this.arousal = 0;
            if (this.snake.length >= 6) {
                this.snakeBitsToRemove = 3;
            }
        }
        if (this.snakeBitsToRemove > 0) {
            this.ungrow();
            this.snakeBitsToRemove--;
            if (this.snakeBitsToRemove < 0) this.snakeBitsToRemove = 0;
        }

        if (this.snakeBitsToAdd > 0) {
            this.grow(1);
            this.snakeBitsToAdd--;
            if (this.snakeBitsToAdd < 0) this.snakeBitsToAdd = 0;
        }

        super.tick();
    }

    left() {
        this.next = new Phaser.Geom.Point(-this.GRID_SIZE, 0);
    }

    right() {
        this.next = new Phaser.Geom.Point(this.GRID_SIZE, 0);
    }

    up() {

    }

    down() {

    }

    startAppleTimer() {

    }

    updateSnakePosition() {
        if (this.next.x === 0) return;

        if (this.next.x < 0) {
            if (this.leftmostWall.x > this.base.x) {
                // Going left
                for (let finger of this.hand) {
                    finger.x -= this.GRID_SIZE;
                }
                this.moveSFX.play();
                this.arousal += 0.1;
            }
        }
        else if (this.next.x > 0) {
            if (this.leftmostWall.x < this.snakeHead.x - this.GRID_SIZE) {
                // Going right
                for (let finger of this.hand) {
                    finger.x += this.GRID_SIZE;
                }
                this.moveSFX.play();
                this.arousal += 0.1;

            }
        }
        if (this.arousal >= 1) {
            this.arousal = 0;
            this.snakeBitsToAdd = 3;
            this.appleSFX.play();
        }
    }

    grow(amount) {
        for (let i = 0; i < amount; i++) {
            const x = this.snakeHead.x + i * this.GRID_SIZE;
            const y = this.snakeHead.y;
            let bit = this.snakeBodyGroup.create(x, y, 'body');
            bit.setOrigin(0, 0);
            this.snake.unshift(bit)
        }
        this.snakeBitsToAdd = Math.max(0, this.snakeBitsToAdd - 1);
        this.snakeHead.x += amount * this.GRID_SIZE;

    }

    ungrow() {
        console.log("Ungrowing")
        const bit = this.snake.shift();
        this.wallGroup.remove(bit);
        bit.destroy(true, true);
        this.snakeBitsToRemove = Math.max(0, this.snakeBitsToRemove - 1);
        this.snakeHead.x -= this.GRID_SIZE;
    }
}