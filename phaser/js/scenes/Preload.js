class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
    }

    preload() {
        // Preload game assets here
        this.load.image('background', 'assets/images/background.png');
        this.load.image('ground', 'assets/images/ground.png');
        this.load.spritesheet('player', 'assets/images/king-sprites-01.png', { frameWidth: 32, frameHeight: 32 }); // Load the player spritesheet
        this.load.spritesheet('enemy', 'assets/images/enemy-sprites-01.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        this.scene.start('MenuScene');
    }
}
