class Car extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        // Configuración adicional del coche
        // ...
    }

    update() {
        // Lógica de actualización del coche
        // ...
    }
}
