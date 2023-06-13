var config = {
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: [TitleScene, GameScene, FinishScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

var game = new Phaser.Game(config);
