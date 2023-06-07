class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
    }

    preload() {
        // Preload game assets here
        this.load.image('background', 'assets/images/background.png');
        this.load.image('ground', 'assets/images/ground.png');
        this.load.image('player', 'assets/images/player.png');
    }

    create() {
        this.scene.start('MenuScene');
    }
}
