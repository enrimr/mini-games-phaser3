class MenuScene extends Phaser.Scene {

    constructor() {
        super('MenuScene');
    }

    create() {
        // Create menu here

        // When play is selected, start the PlayScene
        this.scene.start('PlayScene');
    }
}
