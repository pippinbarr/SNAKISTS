class Demist extends Snake {
    constructor(config) {
        super({
            key: "demist"
        });
    }

    create() {
        super.create();

        this.maxMist = 0.94;

        this.mistGrid = [];
        this.mistGroup = this.add.group();
        for (let y = 0; y < this.NUM_ROWS; y++) {
            this.mistGrid.push([]);
            for (let x = 0; x < this.NUM_COLS; x++) {
                const mistX = this.GRID_SIZE * 0.5 + x * this.GRID_SIZE;
                const mistY = y * this.GRID_SIZE + this.GRID_SIZE / 2;
                const mist = this.add.image(mistX, mistY, 'tile');
                this.mistGroup.add(mist);
                mist.setOrigin(0.5, 0.5);
                mist.tint = 0xffffff;
                mist.setAlpha(0.5);
                this.mistGrid[y].push(mist);
            }
        }
    }

    update() {
        super.update();
    }

    tick() {
        super.tick();

        // Increase the mist
        this.mistGroup.children.each((mist) => {
            mist.alpha += 0.01;
            if (mist.alpha > this.maxMist) {
                mist.alpha = this.maxMist;
            }
        });

        // Demist with the snake's last bodybit
        const x = this.snake[0].x / this.GRID_SIZE;
        const y = this.snake[0].y / this.GRID_SIZE;
        this.mistGrid[y][x].setAlpha(0);
    }
}