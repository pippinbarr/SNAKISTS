class Tourist extends Snake {
    constructor(config) {
        super({
            key: "tourist"
        });

        this.sites = ["barcelona", "caserta", "copenhagen", "honolulu", "ljubljana", "oaxaca", "paris", "procida", "rome", "sorrento", "sydney", "valetta"];
    }

    create() {

        this.site = this.randomSite();
        this.slide = this.add.image(WIDTH / 2, HEIGHT / 2, this.site);

        super.create();
    }

    update() {
        super.update();
    }

    tick() {
        super.tick();
    }

    restart() {
        this.site = this.randomSite();
        this.slide.setTexture(this.site);

        super.restart();
    }

    setGameOverText(gameOverString, spacing, gameOverPointsString, spacing2, gameOverResultString) {
        this.hideControls();
        const gameOverResult = [...this.config.outro];
        gameOverResult[0] = gameOverResult[0].replace("%SITE%", this.site.toUpperCase());
        this.addTextToGrid(this.OVER_X, this.OVER_Y, [gameOverString, spacing, gameOverPointsString]);
        this.addTextToGrid(this.OVER_X, this.OVER_Y + 4, gameOverResult);
    }

    randomSite() {
        const site = this.sites[Math.floor(Math.random() * this.sites.length)];
        return site;
    }
}