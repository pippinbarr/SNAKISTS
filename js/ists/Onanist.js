class Onanist extends Snake {
    constructor(config) {
        super({
            key: "onanist"
        });
    }

    create() {
        this.SNAKE_START_X = 5;
        this.SNAKE_START_Y = Math.floor(this.NUM_ROWS / 2);

        this.CONTROLS_X = 5;
        this.CONTROLS_Y = 11;

        super.create();

        this.arousal = 0.75;
        this.arousalIncrease = 0.033;
        this.arousalDrop = this.arousalIncrease * 0.25;
        this.arousalBase = 0.33;
        this.EDGE_LENGTH = 13;
        this.edgeCounter = 0;
        this.MAX_EDGES = 0;

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

    createControls() {
        let controlsStrings = [];
        if (this.sys.game.device.os.desktop) {
            controlsStrings = [...this.strings.ui.controls.keyboard];
        }
        else {
            controlsStrings = [...this.strings.ui.controls.touch];
        }

        controlsStrings.push("HAND");

        this.addTextToGrid(this.CONTROLS_X, this.CONTROLS_Y, controlsStrings, this.controlsGroup);
        this.controlsVisible = true;
    }

    hideControls() {
        super.hideControls();
        this.arousal = 0.66;
    }

    createSnake() {
        super.createSnake();

        // this.snakeHead.setTint(0xff0000);
        // this.snakeHead.setAlpha(0.5);
        this.snakeBitsToAdd = 0;
        this.snakeBitsToRemove = 0;

        this.grow(3);

        this.base = this.snake[2];
    }

    update() {
        super.update();
    }

    tick() {
        this.tickArousal();

        this.manageSnakeBits();

        super.tick();
    }

    addSnakeBits() {

    }

    tickArousal() {
        this.arousal -= this.arousalDrop;

        // Check if arousal has dropped so low we need to shrink
        if (this.arousal < 0) {
            // Bump it up so it can fall again in a bit
            // but not immediately
            this.arousal = this.arousalBase;
            // If the snake is long enough to shrink, shrink it
            if (this.snake.length >= 7) {
                this.snakeBitsToRemove = 3;
            }
        }
    }

    manageSnakeBits() {
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
                this.arousal += this.arousalIncrease;
            }
        }
        else if (this.next.x > 0) {
            if (this.leftmostWall.x < this.snakeHead.x - this.GRID_SIZE) {
                // Going right
                for (let finger of this.hand) {
                    finger.x += this.GRID_SIZE;
                }
                this.moveSFX.play();
                this.arousal += this.arousalIncrease;

            }
        }
        if (this.arousal >= 1) {
            this.arousal = this.arousalBase;

            if (this.snake.length < this.EDGE_LENGTH) {
                this.snakeBitsToAdd = 3;
                this.appleSFX.play();
            }
            else {
                this.edgeCounter++;
                if (this.edgeCounter > this.MAX_EDGES) {
                    this.die();
                }
            }
        }
    }

    grow(amount) {
        for (let i = 0; i < amount; i++) {
            const x = this.snakeHead.x + i * this.GRID_SIZE;
            const y = this.snakeHead.y;
            let bit = this.snakeBodyGroup.create(x, y, 'body');
            // bit.setAlpha(Math.random() * 0.5 + 0.5);
            bit.setOrigin(0, 0);
            this.snake.unshift(bit)
        }
        this.snakeHead.x += amount * this.GRID_SIZE;
    }

    ungrow() {
        const bit = this.snake.shift();
        this.snakeBodyGroup.remove(bit, true);
        bit.setActive(false);
        bit.destroy(true, true);
        this.snakeHead.x -= this.GRID_SIZE;
        // Hand moves back with the dick I mean snake
        if (this.hand[0].x > this.snakeHead.x) {
            for (let finger of this.hand) {
                finger.x -= this.GRID_SIZE;
            }
        }
    }
}