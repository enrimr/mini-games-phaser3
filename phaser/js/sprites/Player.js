class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        // Ajusta el tamaño del sprite del jugador
        this.setScale(0.25); // Reduce el tamaño del jugador a la mitad

        // Habilita la física del cuerpo
        this.scene.physics.world.enable(this);
        
        // Añade el jugador a la escena
        this.scene.add.existing(this);
    }

    create() {
        // Inicializa los controles del cursor
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    update() {
        // Controla el movimiento del jugador con los cursores del teclado
        if (this.cursors.left.isDown) {
            this.setVelocityX(-160);
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(160);
        } else {
            this.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.body.touching.down) {
            this.setVelocityY(-300); // Ajusta la altura del salto
        }
    }
}
