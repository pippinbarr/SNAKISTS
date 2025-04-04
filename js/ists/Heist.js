class Heist extends Snake {
    constructor(config) {
        super({
            key: "heist"
        });
    }

    create() {
        this.SNAKE_START_X = 11;
        this.SNAKE_START_Y = this.NUM_ROWS - 3;

        this.CONTROLS_X = 11;
        this.CONTROLS_Y = this.SNAKE_START_Y - 4;

        super.create();

        this.wallGroup = this.add.group();
        this.bank = [];
        this.map = [
            "xxxxxxxxxxxxxxxxxxxxxx",
            "xa a ax        xa a ax",
            "x        xxxx        x",
            "x         xx         x",
            "xa a ax  xxxx  xa a ax",
            "xxxxxxx        xxxxxxx",
            "x     xxxx  xxxx     x",
            "x           x        x",
            "x  x        x     x  x",
            "x  xxxxxxxxxx  xxxx  x",
            "x              x a   x",
            "x              xa a  x",
            "xxxxxxxxxxxxxxxxxxx  x",
            "x                    x",
            "x                    x",
            "x x a x a xx a x a x x",
            "x xxxxxxxxxxxxxxxxxx x",
            "x                    x",
            "x                    x",
            "xxxxx    xxxx    xxxxx",
            "x                    x",
            "x xxxxxxxxxxxxxxxxxx x",
            "x                    x",
            "x                    x",
            "xxxxxxxxxx  xxxxxxxxxx",
        ];
        let left = 1;
        let top = 4;
        let x = left;
        let y = top;

        for (let row of this.map) {
            x = left;
            for (let i = 0; i < row.length; i++) {
                if (row[i] === "x") {
                    const wall = this.wallGroup.create(x * this.GRID_SIZE, y * this.GRID_SIZE, 'wall')
                    wall.setOrigin(0, 0);
                }
                else if (row[i] === "a") {
                    const cash = this.add.image(x * this.GRID_SIZE, y * this.GRID_SIZE, 'tile');
                    cash.setOrigin(0, 0);
                    cash.setTint(0xaaffaa);
                    this.bank.push(cash);
                }
                x++;
            }
            y++;
        }
        this.wallGroup.setDepth(-1000);

    }

    startAppleTimer() {

    }

    createWalls() {

    }

    update() {
        super.update();
    }

    tick() {
        super.tick();

        this.snakeBitsToAdd = 1;
        this.checkCashGrab();

        const x = this.snakeHead.x;
        const y = this.snakeHead.y;

        if (x < 0 || x > WIDTH || y < 0 || y > HEIGHT) {
            this.gameOver();
        }
    }

    checkCashGrab() {
        for (let cash of this.bank) {
            if (cash.x === this.snakeHead.x && cash.y === this.snakeHead.y) {
                this.addToScore(this.APPLE_SCORE);
                this.appleSFX.play();
                cash.setPosition(-1000, -1000);
            }
        }
    }

    setScoreText(scoreString) {
        scoreString = `$${scoreString}`;
        if (scoreString.length < this.MAX_SCORE.toString().length) {
            let spacesToAdd = (this.MAX_SCORE.toString().length - scoreString.length) + 1;
            scoreString = Array(spacesToAdd).join(" ") + scoreString;
        }
        this.addTextToGrid(this.scoreX - scoreString.length, this.scoreY, [scoreString]);
    }

    setGameOverText(gameOverString, spacing, gameOverPointsString, spacing2, gameOverResultString) {
        this.hideControls();
        let gameOverResult;
        if (this.dead) {
            gameOverResult = this.config.outro.died;
        }
        else {
            gameOverResult = this.config.outro.escaped;
            gameOverResult.push(`$${this.score}`);
        }
        this.addTextToGrid(this.OVER_X, this.OVER_Y, [gameOverString, spacing]);
        this.addTextToGrid(this.OVER_X, this.OVER_Y + 2, gameOverResult);
    }
}