var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true
        }
    },
    scene: [BootScene, PreloadScene, MenuScene, PlayScene]
};

var game = new Phaser.Game(config);
