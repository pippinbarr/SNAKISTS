class Plenist extends Snake {
    constructor(config) {
        super({
            key: "plenist"
        });
    }

    create() {
        super.create();
    }

    createWalls() {
        // Create the walls
        this.WALL_LEFT = 1;
        this.WALL_RIGHT = this.NUM_COLS - 2;
        this.WALL_TOP = 3;
        this.WALL_BOTTOM = this.NUM_ROWS - this.WALL_TOP - 1;

        this.wallGroup = this.add.group();
        for (let y = 0; y < this.NUM_ROWS; y++) {
            for (let x = 0; x < this.NUM_COLS; x++) {
                let wall = this.wallGroup.create(x * this.GRID_SIZE, y * this.GRID_SIZE, 'wall')
                wall.setOrigin(0, 0);
            }
        }
    }


    update() {
        super.update();
    }

    tick() {
        super.tick();
    }
}