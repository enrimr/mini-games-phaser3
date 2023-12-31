window.onload = function() {
    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        scene: [TitleScene, GameScene, FinishScene]
    };

    var game = new Phaser.Game(config);
};
