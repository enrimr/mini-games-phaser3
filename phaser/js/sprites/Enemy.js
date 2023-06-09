class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, cursors) {
        super(scene, x, y, 'enemy', 1); // Starts on frame 4
        this.cursors = cursors; // Assign cursor keys
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true); // El enemigo no saldrá de los límites del juego
        this.speed = Phaser.Math.GetSpeed(200, 1); // Velocidad del enemigo

        // Player properties and settings go here
        scene.anims.create({
            key: 'enemy-left',
            frames: scene.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'enemy-right',
            frames: scene.anims.generateFrameNumbers('enemy', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    update() {
        this.x -= 1; // Mueve el enemigo a la izquierda

        // Llamar a la animación del enemigo aquí
        this.anims.play('enemy-left', true);

        if (this.x < 50) { // Si el enemigo se sale del límite izquierdo de la pantalla
            this.x = 750; // Lo movemos al extremo derecho
        }
    }
}
