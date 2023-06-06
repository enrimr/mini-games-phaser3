class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
    }

    preload() {
        // Preload game assets here
    }

    create() {
        this.scene.start('MenuScene');
    }
}
