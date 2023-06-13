var config = {
    type: Phaser.AUTO,
    width: 256,
    height: 256,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            //debug: true
        }
    },
    scene: [BootScene, PreloadScene, MenuScene, PlayScene],
    title: 'Asulito #1',
    //seed: 1419463258969,
    version: '0.16b',
    banner: {
        hidePhaser: true
    }
};

var game = new Phaser.Game(config);
