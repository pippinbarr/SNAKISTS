class Gist extends Snake {
    constructor(config) {
        super({
            key: "gist"
        });

        this.SNAKE_START_X = 4;
        this.SNAKE_START_Y = 6;

        this.CONTROLS_X = 4;
        this.CONTROLS_Y = 8;
    }

    create() {
        super.create();

        this.gistPostAppleTimer = undefined;
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
            return true;
        }
        return false;
    }
}