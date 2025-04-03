class Miniaturist extends Snake {
    constructor(config) {
        super({
            key: "miniaturist"
        });
    }

    create() {
        super.create();

        this.cameras.main.setZoom(1 / 10);

        this.uiCamera = this.cameras.add();
        const h = this.GRID_SIZE * 4;
        const y = HEIGHT - h;
        this.uiCamera.setViewport(0, y, WIDTH, h);
        this.uiCamera.centerOn(WIDTH / 2, HEIGHT);

    }
}