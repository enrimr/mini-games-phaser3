class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'enemy');

        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Enemy properties and settings go here
    }

    update() {
        // Enemy movement and behavior goes here
    }
}
