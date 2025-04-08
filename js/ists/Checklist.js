class Checklist extends Snake {
    constructor(config) {
        super({
            key: "checklist"
        });
    }

    create() {
        this.CONTROLS_X = 4;
        this.CONTROLS_Y = 14;

        super.create();

        this.applesEaten = 0;
        this.addTodos();
    }

    /**
     * Add the todos visually to the screen
     */
    addTodos() {
        this.items = this.config.items;
        let dashX = 2;
        let itemX = 4;
        let y = 5;
        for (let item of this.items) {
            item.x = itemX;
            item.y = y;
            item.length = item.text.length;

            this.addTextToGrid(dashX, y, `-`);
            this.addTextToGrid(itemX, y, [item.text]);
            y++;
        }
        this.itemIndex = 0;
    }

    update() {
        super.update();
    }

    hideControls() {
        super.hideControls();
        this.checkTodo();
    }

    tick() {
        super.tick();
    }

    die() {
        super.die();

        if (this.dead) {
            this.checkTodo();


        }
    }

    setGameOverText(gameOverString, spacing, gameOverPointsString, spacing2, gameOverResultString) {
        this.hideControls();
        let gameOverResult;
        if (this.allDone) {
            gameOverResult = this.config.outro.success;
        }
        else {
            gameOverResult = this.config.outro.failure;
        }
        this.addTextToGrid(this.OVER_X, this.OVER_Y, [gameOverString, spacing, gameOverPointsString]);
        this.addTextToGrid(this.OVER_X, this.OVER_Y + 4, gameOverResult);
    }


    checkAppleCollision() {
        const ateIt = super.checkAppleCollision();
        if (ateIt) {
            this.applesEaten++;
            this.checkTodo();
        }
    }

    checkTodo() {
        const item = this.items[this.itemIndex];
        if (item.apples === this.applesEaten || item.points === this.score || item.die && this.dead) {
            this.strikeOutItem(item);
            this.itemIndex++;
            if (this.itemIndex === this.items.length && !this.dead) {
                const deathItem = this.config.die;
                deathItem.x = item.x;
                deathItem.y = item.y + 1;
                this.items.push(deathItem);
                this.addTextToGrid(2, deathItem.y, ["-"]);
                this.addTextToGrid(deathItem.x, deathItem.y, [deathItem.text]);
                this.allDone = true;
            }
        }
    }

    strikeOutItem(item) {
        const line = this.add.line(0, 0, item.x * this.GRID_SIZE, item.y * this.GRID_SIZE + this.GRID_SIZE / 2, item.x * this.GRID_SIZE + item.text.length * this.GRID_SIZE, item.y * this.GRID_SIZE + this.GRID_SIZE / 2, 0xffffff);
        line.setOrigin(0, 0);
        line.setDepth(-1000);
    }
}