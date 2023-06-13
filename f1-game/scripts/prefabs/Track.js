class Track extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        scene.add.existing(this);
        // Configuración adicional del circuito
        // ...
    }

    update() {
        // Lógica de actualización del circuito
        // ...
    }
}
