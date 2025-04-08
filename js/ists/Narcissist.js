class Narcissist extends Snake {
    constructor(config) {
        super({
            key: "narcissist"
        });
    }

    create() {
        super.create();

        // this.OVER_X = 3;
    }

    update() {
        super.update();
    }

    tick() {
        super.tick();
    }

    gameOver() {

        window.open('mailto:pippin.barr@gmail.com?subject=I love your work!&body=I wanted to take a couple of minutes to write you an email about how much I respect and appreciate your work...', '_blank');

        super.gameOver();
    }
}