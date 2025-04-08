class Alarmist extends Snake {
    constructor(config) {
        super({
            key: "alarmist"
        });
    }

    create() {
        super.create();

        this.cameraX = this.cameras.main.x;
        this.cameraY = this.cameras.main.y;

        this.numAlarmistUnits = 6;
        this.alarmistGroup = this.add.group();
        this.alarmistUnits = [];
        for (let i = 0; i < this.numAlarmistUnits; i++) {
            const unit = this.add.image(-100, -100, 'head');
            unit.setOrigin(0, 0);
            unit.setTint(0xff0000);
            unit.setVisible(false);
            unit.index = i;
            unit.threatLevel = 1 - ((i + 1) / (this.numAlarmistUnits));
            console.log(unit.threatLevel);
            this.alarmistUnits.push(unit);
            this.alarmistGroup.add(unit);
        }
    }

    update() {
        super.update();

        const panicking = this.checkPanic();

        if (!panicking && !this.dead && !this.controlsVisible) {
            this.clearText();
        }
    }

    clearText() {
        for (let y = 2; y < this.NUM_ROWS - 2; y++) {
            for (let x = 0; x < this.NUM_COLS; x++) {
                this.textGrid[y][x].text = "";
            }
        }
    }

    die() {
        this.clearText();
        this.cameras.main.setPosition(0, 0);
        super.die();
    }

    checkPanic() {
        if (this.dead) {
            return false;
        }

        this.cameras.main.setPosition(this.cameraX, this.cameraY);

        // Move the alarmist units
        const dx = this.next.x;
        const dy = this.next.y;
        for (let unit of this.alarmistUnits) {
            unit.x = this.snakeHead.x + ((unit.index + 1) * dx);
            unit.y = this.snakeHead.y + ((unit.index + 1) * dy);
        }

        for (let unit of this.alarmistUnits) {
            // Check collision with walls
            for (let wall of this.wallGroup.getChildren()) {
                if (unit.x === wall.x && unit.y === wall.y) {
                    this.panic(unit);
                    return true;
                }
                else if (this.snakeHead.x / this.GRID_SIZE === this.WALL_LEFT + 1 || this.snakeHead.x / this.GRID_SIZE === this.WALL_RIGHT - 1 || this.snakeHead.y / this.GRID_SIZE === this.WALL_BOTTOM - 1 || this.snakeHead.y / this.GRID_SIZE === this.WALL_TOP + 1) {
                    this.panic({
                        threatLevel: 0.8
                    });
                    return true;
                }
            }
            // Check for collision with bodyodyodyody
            for (let bodyPiece of this.snakeBodyGroup.getChildren()) {
                if (unit.x === bodyPiece.x && unit.y === bodyPiece.y) {
                    this.panic(unit);
                    return true;
                }
            }
        }

        return false;
    }

    tick() {
        super.tick();


    }

    panic(unit) {
        // Camera shake
        this.maxPanic = 50;

        const dx = Phaser.Math.FloatBetween(-this.maxPanic * unit.threatLevel, this.maxPanic * unit.threatLevel);
        const dy = Phaser.Math.FloatBetween(-this.maxPanic * unit.threatLevel, this.maxPanic * unit.threatLevel);

        this.cameras.main.setPosition(dx, dy);

        // Words of warning
        if (Math.random() < unit.threatLevel) {
            const x = Phaser.Math.Between(0, this.NUM_COLS - 9);
            const y = Phaser.Math.Between(2, this.NUM_ROWS - 3);
            this.addTextToGrid(x, y, [this.config.careful]);
        }
    }
}