class Typist extends Snake {
    constructor(config) {
        super({
            key: "typist"
        });
    }

    create() {
        super.create();


        this.output = {
            home: {
                x: 3,
                y: 18
            },
            position: {
                x: 3,
                y: 18
            },
            rightMargin: this.NUM_COLS - 4,
            index: 0
        };

        this.text = ["ALL WORK AND NO ", "PLAY MAKES JACK A ", "DULL BOY."];
        this.lineIndex = 0;
        this.charIndex = 0;

        this.createTypewriter();
        this.setKey();
    }

    createTypewriter() {
        this.typewriter = {};
        let x = 3;
        let y = 20;

        const keys = "QWERTYUIOPASDFGHJKLZXCVBNM,.".toUpperCase().split("");
        for (let key of keys) {
            const apple = this.add.image(x * this.GRID_SIZE, y * this.GRID_SIZE, 'apple');
            apple.setOrigin(0, 0);
            apple.depth = -1001;
            const wall = this.add.image(x * this.GRID_SIZE, y * this.GRID_SIZE, 'wall');
            wall.setOrigin(0, 0);
            wall.depth = -1000;
            this.wallGroup.add(wall);
            this.addTextToGrid(x, y, key, this.textGroup);
            this.typewriter[key] = {
                char: "key",
                walls: [wall],
                apples: [apple],
                position: {
                    x: x,
                    y: y
                }
            }

            x += 2;
            if (x > this.NUM_COLS - 3) {
                x = 3;
                y += 2;
            }
        }

        // Spacebar
        x = 5;
        y = 26;
        let walls = [];
        let apples = [];
        for (let i = 0; i < 9; i++) {
            const apple = this.add.image(x * this.GRID_SIZE + (i * this.GRID_SIZE), y * this.GRID_SIZE, 'apple');
            apple.setOrigin(0, 0);
            apple.depth = -1001;
            apples.push(apple);
            const wall = this.add.image(x * this.GRID_SIZE + (i * this.GRID_SIZE), y * this.GRID_SIZE, 'wall');
            wall.setOrigin(0, 0);
            wall.depth = -1000;
            walls.push(wall);
            this.wallGroup.add(wall);
        }
        this.typewriter["space"] = {
            char: " ",
            walls: walls,
            apples: apples,
            position: {
                x: x,
                y: y
            }
        }
    }

    checkAppleCollision() {
        let collision = false;
        for (let apple of this.key.apples) {
            if (this.snakeHead.x === apple.x && this.snakeHead.y === apple.y) {
                collision = true;
                break;
            }
        }

        if (collision) {
            this.appleSFX.play(); // Typing sound

            // Type the letter
            this.type();

            this.apple.x = -1000;
            this.apple.y = -1000;
            this.apple.visible = false;

            this.snakeBitsToAdd += this.NEW_BODY_PIECES_PER_APPLE;
            this.addToScore(this.APPLE_SCORE);

            setTimeout(() => {
                for (let wall of this.apple.walls) {
                    wall.setActive(true);
                    wall.setVisible(true);
                }
                this.startAppleTimer();
                this.charIndex++;
                if (this.charIndex >= this.text[this.lineIndex].length) {
                    this.charIndex = 0;
                    this.lineIndex++;
                    if (this.lineIndex >= this.text.length) {
                        this.lineIndex = 0;
                    }
                }
            }, this.SNAKE_TICK * 1000);

            return true;
        }

        return false;
    }

    repositionApple() {
        this.setKey();
    }

    setKey() {
        let char = this.text[this.lineIndex][this.charIndex];
        if (char === " ") {
            char = "space";
        }
        this.key = this.typewriter[char];
        const walls = this.key.walls;
        const position = this.key.position;

        for (let wall of walls) {
            wall.setVisible(false);
            wall.setActive(false);
        }
        this.apple.x = position.x * this.GRID_SIZE;
        this.apple.y = position.y * this.GRID_SIZE;

        this.apple.visible = true;
        this.apple.walls = walls;
    }


    update() {
        super.update();
    }

    tick() {
        super.tick();
    }

    type() {
        const char = this.text[this.lineIndex][this.charIndex];
        this.addTextToGrid(this.output.position.x, this.output.position.y, char);

        // this.output.index++;
        this.output.position.x++;

        // Check if that's a full sentence
        if (this.charIndex >= this.text[this.lineIndex].length) {
            this.carriageReturn();
            // this.output.index = 0;
            this.output.position.x = this.output.home.x;
        }

        // Check if we need to word wrap (i.e. it's a space and the next)
        // word will take us over the limit

        // Is it a space?
        // if (this.text[this.output.index] === " ") {
        //     // Check the length of the next word (is there a cool way to do this??)
        //     let length = 0;
        //     let foundEnd = true;
        //     for (let i = this.output.index + 1; i < this.text.length; i++) {
        //         const char = this.text[i];
        //         if (char !== " ") {
        //             length++;
        //         }
        //         else {
        //             foundEnd = false;
        //             break;
        //         }
        //     }
        //     console.log(length, foundEnd);
        // }

        // if (this.output.position.x >= this.output.rightMargin) {
        //     this.carriageReturn();
        //     this.output.position.x = this.output.home.x;
        // }
    }

    carriageReturn() {
        for (let y = 0; y < this.output.home.y; y++) {
            for (let x = this.output.home.x; x < this.output.rightMargin; x++) {
                this.textGrid[y][x].text = this.textGrid[y + 1][x].text;
            }
        }
        for (let x = this.output.home.x; x < this.output.rightMargin; x++) {
            this.textGrid[this.output.home.y][x].text = "";
        }
    }
}