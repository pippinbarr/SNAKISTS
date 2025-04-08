class Obstructionist extends Snake {
    constructor(config) {
        super({
            key: "obstructionist"
        });

    }

    create() {
        super.create();

        this.leftMargin = 1;
        this.rightMargin = this.NUM_COLS - 2;
        this.topMargin = 3;
        this.bottomMargin = this.NUM_ROWS - 3;
    }

    update() {
        super.update();
    }

    repositionApple(apple) {
        const result = super.repositionApple(apple);
        if (result && this.locationHasCollisionWithGroup(apple.x, apple.y, this.wallGroup)) {
            this.appleTimer = this.time.addEvent({
                delay: this.APPLE_DELAY,
                callback: this.repositionApple,
                args: [this.apple],
                callbackScope: this
            });
        }
    }

    tick() {
        super.tick();

        if (Math.random() < 0.15) {
            const future = 3;
            // Moving horizontally
            if (this.next.x !== 0) {
                const futureX = (this.snakeHead.x + this.next.x * future) / this.GRID_SIZE;
                if (futureX > this.leftMargin && futureX < this.rightMargin) {
                    if (this.apple.x === futureX * this.GRID_SIZE &&
                        (this.apple.y >= this.snakeHead.y - this.GRID_SIZE && this.apple.y <= this.snakeHead.y + this.GRID_SIZE)
                    ) {
                        return;
                    }
                    this.addWall(futureX * this.GRID_SIZE, this.snakeHead.y - this.GRID_SIZE);
                    this.addWall(futureX * this.GRID_SIZE, this.snakeHead.y);
                    this.addWall(futureX * this.GRID_SIZE, this.snakeHead.y + this.GRID_SIZE);
                }
            }
            // Moving vertically
            else if (this.next.y !== 0) {
                const futureY = (this.snakeHead.y + this.next.y * future) / this.GRID_SIZE;
                if (futureY > this.topMargin && futureY < this.bottomMargin) {
                    if (this.apple.y === futureY * this.GRID_SIZE &&
                        (this.apple.x >= this.snakeHead.x - this.GRID_SIZE && this.apple.x <= this.snakeHead.x + this.GRID_SIZE)
                    ) {
                        return;
                    }
                    this.addWall(this.snakeHead.x - this.GRID_SIZE, futureY * this.GRID_SIZE);
                    this.addWall(this.snakeHead.x, futureY * this.GRID_SIZE);
                    this.addWall(this.snakeHead.x + this.GRID_SIZE, futureY * this.GRID_SIZE);
                }

            }
        }
    }

    addWall(x, y) {
        if (x === this.apple.x && y === this.apple.y) {
            return;
        }
        const wall = this.add.image(x, y, 'wall');
        wall.setOrigin(0, 0);
        wall.setDepth(-1000);
        this.wallGroup.add(wall);

        this.wallRemoval = this.time.addEvent({
            delay: this.SNAKE_TICK * 1000 * 50,
            callback: () => {
                this.wallGroup.remove(wall, true, true);
                wall.destroy();
            },
            callbackScope: this
        });
    }
}