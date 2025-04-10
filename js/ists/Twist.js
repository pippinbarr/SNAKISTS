class Twist extends Snake {
    constructor(config) {
        super({
            key: "twist"
        });
    }

    create() {
        super.create();

        this.wallGroup.children.each((wall) => {
            wall.setOrigin(0.5, 0.5);
        });
        this.snakeBodyGroup.children.each((bit) => {
            bit.setOrigin(0.5, 0.5);
        });
        this.apple.setOrigin(0.5, 0.5);
        this.textGroup.children.each((char) => {
            char.x -= this.GRID_SIZE / 2;
            char.y -= this.GRID_SIZE / 2;
        });
        this.snakeHead.setOrigin(0.5, 0.5);
    }

    update() {
        super.update();
    }

    tick() {
        super.tick();

        if (this.next.x > 0 || this.next.y < 0) {
            this.twist(1);
        }
        else if (this.next.x < 0 || this.next.y > 0) {
            this.twist(-1);
        }
    }

    addSnakeBits() {
        if (this.next.x == 0 && this.next.y == 0) return;

        if (this.snakeBitsToAdd > 0) {
            let bit = this.snakeBodyGroup.create(-100, -100, 'body');
            bit.setOrigin(0.5, 0.5);
            this.snake.unshift(bit)
            this.snakeBitsToAdd = Math.max(0, this.snakeBitsToAdd - 1);
        }
    }

    die() {
        super.die();

        console.log("Tweening?")

        const targets = [...this.wallGroup.getChildren(), ...this.snakeBodyGroup.getChildren(), this.snakeHead, this.apple, ...this.textGroup.getChildren(), this.cameras.main];
        this.tweens.add({
            targets: targets,
            rotation: 0,
            duration: this.SNAKE_TICK * 1000 * 10,
            delay: this.SNAKE_TICK * 1000 * 30
        });
    }

    twist(direction) {
        const delta = 0.1 * direction;

        this.wallGroup.children.each((wall) => {
            wall.rotation += delta;
        });
        this.snakeBodyGroup.children.each((bit) => {
            bit.rotation += delta;
        });
        this.snakeHead.rotation += delta;
        this.apple.rotation += delta;
        this.textGroup.children.each((char) => {
            char.rotation += delta;
        });

        this.cameras.main.rotation -= delta;
    }
}