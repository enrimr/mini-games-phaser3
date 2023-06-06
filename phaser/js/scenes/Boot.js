class BootScene extends Phaser.Scene {

    constructor() {
        super('BootScene');
    }

    preload() {
        // Preload assets needed for the load screen here
    }

    create() {
        this.scene.start('PreloadScene');
    }
}
