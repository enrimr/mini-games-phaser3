var config = {
    type: Phaser.AUTO,
    width: 768,
    height: 512,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [BootScene, PreloadScene, MenuScene, PlayScene]
};

var game = new Phaser.Game(config);
