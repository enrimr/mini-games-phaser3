class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Player properties and settings go here
    }

    update() {
        // Player movement and behavior goes here
    }
}
