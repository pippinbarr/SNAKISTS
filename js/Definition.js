class Definition extends Snake {
    constructor(config) {
        super({
            key: "walloftext"
        });
    }

    init(data) {
        super.init(data);
    }

    create() {
        super.create();

        this.transitionTimer = undefined;

        this.wallGroup.setVisible(false);
        this.snakeHead.setVisible(false);
        this.setScoreText(" ");
        this.instructionsGroup.setVisible(false);

        const maxWidth = this.NUM_COLS - 4;

        const word = this.config.definition.word.toUpperCase();
        const part = this.config.definition.part.toUpperCase();
        const text = [`${word}`, `(${part})`, "", ""];

        const words = this.config.definition.definition.toUpperCase().split(" ");
        let line = "";

        // Go through each word
        for (let i = 0; i < words.length; i++) {
            const word = words[i];

            // Check how this word fits for wrapping
            if (line.length + word.length < maxWidth) {
                // This word fits on the line so add it
                line = line + word + " ";
            }
            else {
                // This word would take it over the limit
                // So add the line
                text.push(line);
                text.push("");
                line = "";
                // Repeat this iteration
                i--;
            }
        }
        text.push(line);

        this.addTextToGrid(2, 3, text);

        let instructions = "OH NO."
        if (this.sys.game.device.os.desktop) {
            instructions = this.strings.definition.instructions.keyboard;
        }
        else {
            instructions = this.strings.definition.instructions.touch;
        }
        this.addTextToGrid(2, this.NUM_ROWS - 3, instructions);
    }

    createInstructions() {

    }

    createControls() {

    }

    update() {
        super.update();
    }

    tick() {
        super.tick();
    }

    left() {
        if (this.transitionTimer) return;

        this.transitionTimer = this.time.addEvent({
            delay: 500,
            callback: this.gotoMenu,
            callbackScope: this
        });
    }

    right() {
        if (this.transitionTimer) return;
        this.appleSFX.play();

        this.transitionTimer = this.time.addEvent({
            delay: 500,
            callback: () => {
                const gameState = this.config.state;
                this.scene.start(gameState, this.config);
            },
            callbackScope: this
        });
    }

    up() {

    }

    down() {

    }
}