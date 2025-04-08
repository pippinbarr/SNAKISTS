class Twist extends Snake {
    constructor(config) {
        super({
            key: "twist"
        });
    }

    create() {
        super.create();

        this.wallGroup.children.each((wall) => {
            wall.setOrigin(0.5);
        });
        this.snakeBodyGroup.children.each((bit) => {
            bit.setOrigin(0.5);
        });
        this.apple.setOrigin(0.5);
        this.textGroup.children.each((char) => {
            char.setOrigin(0.5);
        });
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