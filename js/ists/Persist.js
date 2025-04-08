class Persist extends Snake {
    constructor(config) {
        super({
            key: "persist"
        });

        this.persistentCameras = [];
    }

    create() {
        super.create();
        this.menuAndRestartDisabled = false;
        this.camera = this.cameras.main;
    }

    update() {
        super.update();
    }

    tick() {
        super.tick();
    }

    restart() {
        if (this.menuAndRestartDisabled) return;
        super.restart();
    }

    gotoMenu() {
        if (this.menuAndRestartDisabled) return;
        this.camera.setBackgroundColor("rgba(255, 0, 0, 0)");
        this.scene.run("menu");
        this.scene.bringToTop("persist");
        this.instructionsGroup.setVisible(false);
        this.menuAndRestartDisabled = true;
    }
}