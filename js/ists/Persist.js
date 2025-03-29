class Persist extends Snake {
    constructor(config) {
        super({
            key: "persist"
        });

        this.persistentCameras = [];
    }

    create() {
        super.create();

        this.camera = this.cameras.main;
    }

    update() {
        super.update();
    }

    tick() {
        super.tick();
    }

    gotoMenu() {
        this.camera.setBackgroundColor("rgba(255, 0, 0, 0)");
        this.scene.run("menu");
        this.scene.bringToTop("persist");
    }
}