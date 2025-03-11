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

        this.wallGroup.setVisible(false);
        this.snakeHead.setVisible(false);
        this.setScoreText(" ");
        this.instructionsGroup.setVisible(false);

        this.addTextToGrid(2, 2, this.config.definition);

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

    }

    right() {
        if (this.transitionTimer) return;

        this.appleSFX.play();
        this.transitionTimer = setTimeout(() => {
            const gameState = this.config.state;
            this.scene.start(gameState, this.config);
        }, 500);
    }

    up() {

    }

    down() {

    }
}