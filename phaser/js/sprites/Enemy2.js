class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'enemy', 1); // Starts on frame 4

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true); // El enemigo no saldrá de los límites del juego
        this.speed = Phaser.Math.GetSpeed(200, 1); // Velocidad del enemigo

        // Definir animaciones del enemigo aquí
        scene.anims.create({
            key: 'enemy-left',
            frames: scene.anims.generateFrameNumbers('enemy', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
    }

    update(time, delta) {
        this.x -= this.speed * delta; // Mueve el enemigo a la izquierda

        // Llamar a la animación del enemigo aquí
        this.anims.play('enemy-left', true);

        if (this.x < -50) { // Si el enemigo se sale del límite izquierdo de la pantalla
            this.x = 850; // Lo movemos al extremo derecho
        }
    }
}
