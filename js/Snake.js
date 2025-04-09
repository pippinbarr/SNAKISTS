class Snake extends Phaser.Scene {

    constructor(config = {}) {
        super({
            key: config.key ? config.key : `snake`
        });

        this.stateName = config.key ? config.key : `snake`;

        this.GRID_SIZE = 20;
        this.NUM_ROWS = 0;
        this.NUM_COLS = 0;
        this.NUM_ROWS = HEIGHT / this.GRID_SIZE;
        this.NUM_COLS = WIDTH / this.GRID_SIZE;

        this.FONT_SIZE = 20;
        this.SNAKE_START_LENGTH = 4;
        this.SNAKE_START_X = 11;
        this.SNAKE_START_Y = 11;
        this.SNAKE_TICK = 0.2;
        this.NEW_BODY_PIECES_PER_APPLE = 3;
        this.SNAKE_FLICKER_SPEED = 0.2;
        this.APPLE_SCORE = 10;
        this.MAX_SCORE = 9999999990;
        this.APPLE_DELAY = 1500;
        this.DEATH_DELAY = 3;

        this.CONTROLS_X = 8;
        this.CONTROLS_Y = 7;

        this.textGrid = [];

        this.score = 0;
        this.next = new Phaser.Geom.Point(0, 0);
        this.prev = {
            x: undefined,
            y: undefined
        };
        this.bodyPiecesToAdd = 0;
        this.dead = false;

        this.snakeHead = undefined;
        this.snakeBodyGroup = undefined;
        this.wallGroup = undefined;
        this.apple = undefined;
    }

    init(data) {
        this.strings = this.cache.json.get(`strings`);
        this.config = data;
    }

    create() {
        this.cameras.main.setBackgroundColor(0x000000);

        this.textGrid = [];
        this.dead = false;
        this.inputEnabled = true;
        this.gameIsOver = false;

        this.width = this.GRID_SIZE * this.NUM_COLS;


        this.instructionsButtonGroup = this.add.group();

        this.createWalls();
        this.createApple();
        this.createTexts();
        this.createSnake();
        this.createInput();

        this.moveSFX = this.sound.add('move', 0.2);
        this.hitSFX = this.sound.add('hit', 0.2);
        this.appleSFX = this.sound.add('apple', 0.2);

        // Set up for score
        this.score = 0;
        this.scoreX = this.NUM_COLS - 2;
        this.scoreY = 1;
        this.setScoreText(this.score.toString());

        // Set up for game over
        this.OVER_X = 4;
        this.OVER_Y = Math.floor(this.NUM_ROWS / 2) - 2;

        this.appleTimer = undefined;

        // Create the update tick
        this.ticker = this.time.addEvent({
            callback: this.tick,
            callbackScope: this,
            delay: 1000 * this.SNAKE_TICK,
            repeat: -1,
        })

        this.scene.bringToTop("persist");
    }

    update() {
        if (this.sys.game.device.os.desktop) {
            this.handleKeyboardInput();
        }
    }

    tick() {
        this.prev = new Phaser.Geom.Point(this.next.x, this.next.y);

        if (this.dead) {
            this.flashSnake();
            return;
        }

        this.addSnakeBits();

        if (!this.dead) {
            this.updateSnakePosition();
        }

        this.checkAppleCollision();
        this.checkBodyCollision();
        this.checkWallCollision();
    }

    /**
     * Large-scale gameplay handling
     */


    gameOver() {
        if (this.gameIsOver) return;

        this.gameIsOver = true;
        this.setGameOverText(this.strings.ui.gameover, "", this.score + ` ${this.strings.ui.points}`, "", "");
    }

    gotoMenu() {
        this.scene.start("menu");
    }

    restart() {
        this.scene.start(this.stateName);
    }

    startAppleTimer() {
        this.appleTimer = this.time.addEvent({
            delay: this.APPLE_DELAY,
            callback: this.repositionApple,
            args: [this.apple],
            callbackScope: this
        });
    }

    /**
     * Input handling
     */

    handleKeyboardInput() {
        if (this.rKey.isDown) {
            this.restart();
        }
        else if (this.mKey.isDown) {
            this.gotoMenu();
        }

        if (this.dead) return;
        if (!this.inputEnabled) return;

        if (this.controlsVisible && (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown)) {
            this.hideControls();
            this.startAppleTimer();
        }

        // Check which key is down and set the next direction appropriately
        if (this.cursors.left.isDown) {
            this.left();
        }
        else if (this.cursors.right.isDown) {
            this.right();
        }
        if (this.cursors.up.isDown) {
            this.up();
        }
        else if (this.cursors.down.isDown) {
            this.down();
        }
    }

    handleTouchInput(dx, dy) {
        if (this.dead) return;
        if (!this.inputEnabled) return;
        // Check for reasonable input size
        if (Math.abs(dx) < 50 && Math.abs(dy) < 50) {
            return;
        }

        if (this.controlsVisible) {
            this.hideControls();
            this.startAppleTimer();
        }

        if (Math.abs(dx) - Math.abs(dy) > 0) {
            // Horizontal
            if (dx > 0) {
                this.right();
            }
            else {
                this.left();
            }
        }
        else {
            if (dy > 0) {
                this.down();
            }
            else {
                this.up();
            }
        }



    }

    /**
     * Snake handling (haha)
     */

    left() {
        if (this.prev.x == 0) this.next = new Phaser.Geom.Point(-this.GRID_SIZE, 0);
    }

    right() {
        if (this.prev.x == 0) this.next = new Phaser.Geom.Point(this.GRID_SIZE, 0);
    }

    up() {
        if (this.prev.y == 0) this.next = new Phaser.Geom.Point(0, -this.GRID_SIZE);
    }

    down() {
        if (this.prev.y == 0) this.next = new Phaser.Geom.Point(0, this.GRID_SIZE);
    }

    die() {
        if (this.dead) return;

        this.hitSFX.play();
        this.dead = true;
        this.lastNext = new Phaser.Geom.Point(this.next.x, this.next.y);
        this.next = new Phaser.Geom.Point(0, 0);
        this.time.addEvent({
            delay: 1000 * this.DEATH_DELAY,
            callback: this.gameOver,
            callbackScope: this
        });
    }

    flashSnake() {
        for (let bit of this.snake) {
            bit.visible = !bit.visible;
        }
    }

    addSnakeBits() {
        if (this.next.x == 0 && this.next.y == 0) return;

        if (this.snakeBitsToAdd > 0) {
            let bit = this.snakeBodyGroup.create(-100, -100, 'body');
            bit.setOrigin(0, 0);
            this.snake.unshift(bit)
            this.snakeBitsToAdd = Math.max(0, this.snakeBitsToAdd - 1);
        }
    }

    updateSnakePosition() {
        if (this.next.x == 0 && this.next.y == 0) {
            return;
        }

        this.moveSFX.play();

        for (let i = 0; i < this.snake.length - 1; i++) {
            this.snake[i].x = this.snake[i + 1].x;
            this.snake[i].y = this.snake[i + 1].y;
        }
        this.snakeHead.x += this.next.x;
        this.snakeHead.y += this.next.y;

        // Wrapping
        // if (this.snakeHead.x >= this.width) {
        //     this.snakeHead.x = this.GRID_SIZE;
        // }
        // else if (this.snakeHead.x < 0) {
        //     this.snakeHead.x = this.width - this.GRID_SIZE;
        // }
        // if (this.snakeHead.y >= this.height) {
        //     this.snakeHead.y = this.GRID_SIZE;
        // }
        // else if (this.snakeHead.y < 0) {
        //     this.snakeHead.y = this.height - this.GRID_SIZE;
        // }
    }

    checkAppleCollision() {
        if (this.snakeHead.x === this.apple.x && this.snakeHead.y === this.apple.y) {
            this.appleSFX.play();

            this.apple.x = -1000;
            this.apple.y = -1000;
            this.apple.setVisible(false);
            this.startAppleTimer();
            this.snakeBitsToAdd += this.NEW_BODY_PIECES_PER_APPLE;
            this.addToScore(this.APPLE_SCORE);

            return true;
        }

        return false;
    }

    checkBodyCollision() {
        this.snakeBodyGroup.children.each((bit) => {
            if (this.snakeHead.x === bit.x && this.snakeHead.y === bit.y) {
                this.die();
                return;
            }
        }, this);
    }

    checkWallCollision() {
        this.wallGroup.children.each((wall) => {
            if (wall.active && this.snakeHead.x === wall.x && this.snakeHead.y === wall.y) {
                this.die();
                return;
            }
        }, this);
    }

    /**
     * Apple handling
     */

    repositionApple(apple) {
        if (!this.apple) return;
        if (!apple) apple = this.apple;

        apple.setVisible(true);

        let x = this.getRandomLocationWithin(this.WALL_LEFT + 1, this.WALL_RIGHT);
        let y = this.getRandomLocationWithin(this.WALL_TOP + 1, this.WALL_BOTTOM);

        let collisionCount = 0;
        let foundLocation = false;
        while (!foundLocation) {
            if (this.locationHasCollisionWithGroup(x * this.GRID_SIZE, y * this.GRID_SIZE, this.snakeBodyGroup)) {
                collisionCount++;
                if (collisionCount > 5) {
                    break;
                }
            }
            else {
                foundLocation = true;
                break;
            }
        }

        if (foundLocation) {
            apple.x = x * this.GRID_SIZE;
            apple.y = y * this.GRID_SIZE;
            return true;
        }
        else {
            this.appleTimer = this.time.addEvent({
                delay: this.APPLE_DELAY,
                callback: this.repositionApple,
                args: [this.apple],
                callbackScope: this
            });
            return false;
        }
    }

    locationHasCollisionWithGroup(x, y, group) {
        let collision = false;
        group.children.each((element) => {
            if (element.x == x && element.y == y) {
                collision = true;
                return;
            }
        });
        return collision;
    }

    getRandomLocationWithin(min, max) {
        return min + (Math.floor(Math.random() * (max - min)));
    }

    /**
     * UI handling
     */

    hideControls() {
        if (this.next.x == 0 && this.next.y == 0) {
            this.controlsGroup.children.each((letter) => {
                letter.text = '';
            });
            this.controlsVisible = false;
        }
    }

    addToScore(amount) {
        this.score = Math.min(this.score + amount, this.MAX_SCORE);
        this.setScoreText(this.score.toString());
    }

    setScoreText(scoreString) {
        if (scoreString.length < this.MAX_SCORE.toString().length) {
            let spacesToAdd = (this.MAX_SCORE.toString().length - scoreString.length) + 1;
            scoreString = Array(spacesToAdd).join(" ") + scoreString;
        }
        this.addTextToGrid(this.scoreX - scoreString.length, this.scoreY, [scoreString]);
    }

    setGameOverText(gameOverString, spacing, gameOverPointsString, spacing2, gameOverResultString) {
        this.hideControls();
        const gameOverResult = this.config.outro;
        this.addTextToGrid(this.OVER_X, this.OVER_Y, [gameOverString, spacing, gameOverPointsString]);
        this.addTextToGrid(this.OVER_X, this.OVER_Y + 4, gameOverResult);
    }

    addTextToGrid(startX, startY, text, group, buttonGroup, callback) {
        let x = startX;
        let y = startY;

        for (let i = 0; i < text.length; i++) {
            x = startX;
            for (let j = 0; j < text[i].length; j++) {
                this.textGrid[y][x].text = text[i].charAt(j);
                if (group) {
                    group.add(this.textGrid[y][x]);
                }
                if (buttonGroup) {
                    let sprite = buttonGroup.create(x * this.GRID_SIZE, y * this.GRID_SIZE, 'apple');
                    sprite.setOrigin(0, 0);
                    sprite.setAlpha(0.001);
                    sprite.name = text;
                    sprite.setInteractive();
                    sprite.on('pointerdown', callback, this);
                }
                x++;
            }
            y++;
        }
    }




    /**
     * create() helpers
     */

    createWalls() {
        // Create the walls
        this.WALL_LEFT = 1;
        this.WALL_RIGHT = this.NUM_COLS - 2;
        this.WALL_TOP = 3;
        this.WALL_BOTTOM = this.NUM_ROWS - this.WALL_TOP - 1;

        this.wallGroup = this.add.group();
        for (let y = this.WALL_TOP; y <= this.WALL_BOTTOM; y++) {
            for (let x = this.WALL_LEFT; x <= this.WALL_RIGHT; x++) {
                if (y == this.WALL_TOP || y == this.WALL_BOTTOM || x == this.WALL_LEFT || x == this.WALL_RIGHT) {
                    let wall = this.wallGroup.create(x * this.GRID_SIZE, y * this.GRID_SIZE, 'wall')
                    wall.setOrigin(0, 0);
                }
            }
        }
    }

    createApple() {
        this.apple = this.add.image(-100, -100, 'apple');
        this.apple.setOrigin(0, 0);
        this.apple.setVisible(false);
    }

    createTexts() {
        this.instructionsGroup = this.add.group();
        this.controlsGroup = this.add.group();

        this.createTextGrid();
        this.createInstructions();
        this.createControls();
    }

    createTextGrid() {
        this.textGroup = this.add.group();
        for (let y = 0; y < this.NUM_ROWS; y++) {
            this.textGrid.push([]);
            for (let x = 0; x < this.NUM_COLS; x++) {
                const charX = this.GRID_SIZE * 0.5 + x * this.GRID_SIZE;
                const charY = y * this.GRID_SIZE + this.GRID_SIZE / 2;
                const char = this.add.bitmapText(charX, charY, 'atari', '', this.FONT_SIZE, this.textGroup);
                this.textGroup.add(char);
                char.setOrigin(0.5, 0.5);
                char.tint = 0xffffff;
                this.textGrid[y].push(char);
            }
        }
    }

    createInstructions() {
        let instructionsY = this.NUM_ROWS - 2;
        let instructionsX = 2;

        this.instructionsGroup = this.add.group();

        if (this.sys.game.device.os.desktop) {
            this.addTextToGrid(instructionsX, instructionsY, this.strings.ui.reset.keyboard, this.instructionsGroup);
        }
        else {
            this.addTextToGrid(instructionsX, instructionsY, this.strings.ui.reset.touch.restart, this.instructionsGroup, this.instructionsButtonGroup, this.restart);
            this.addTextToGrid(instructionsX + 9, instructionsY, this.strings.ui.reset.touch.menu, this.instructionsGroup, this.instructionsButtonGroup, this.gotoMenu);
        }
    }

    createControls() {
        let controlsStrings = [];
        if (this.sys.game.device.os.desktop) {
            controlsStrings = [...this.strings.ui.controls.keyboard];
        }
        else {
            controlsStrings = [...this.strings.ui.controls.touch];
        }

        controlsStrings.push("SNAKE");

        this.addTextToGrid(this.CONTROLS_X, this.CONTROLS_Y, controlsStrings, this.controlsGroup);
        this.controlsVisible = true;
    }

    createSnake() {
        this.snake = [];
        this.snakeBodyGroup = this.add.group();
        this.snakeHead = this.add.image(this.SNAKE_START_X * this.GRID_SIZE, this.SNAKE_START_Y * this.GRID_SIZE, 'head');
        this.snakeHead.setOrigin(0, 0);
        this.snake.unshift(this.snakeHead);

        this.snakeBitsToAdd = 3;
    }

    createInput() {
        if (this.sys.game.device.os.desktop) {
            this.cursors = this.input.keyboard.createCursorKeys();
            this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
            this.mKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        }
        else {
            // Mobile
            this.input.on("pointerup", () => {
                const dx = this.input.activePointer.upX - this.input.activePointer.downX;
                const dy = this.input.activePointer.upY - this.input.activePointer.downY;
                this.handleTouchInput(dx, dy);
            });
        }
        this.next = new Phaser.Geom.Point(0, 0);
    }
}