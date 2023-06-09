class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, cursors) {
        super(scene, x, y, 'player', 1); // Starts on frame 4
        this.cursors = cursors; // Assign cursor keys
        this.life = 100; // Vida inicial del enemigo
        this.healthBar = new HealthBar(scene, x-32, y, 0x00ff00);  // Verde


        // Player properties and settings go here
        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'turn',
            frames: [{ key: 'player', frame: 25 }],
            frameRate: 20
        });

        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('player', { start: 33, end: 35 }),
            frameRate: 10,
            repeat: -1
        });

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    update() {
        // Player movement and behavior goes here
        // Update the animation based on the player's movement
        if (this.cursors.left.isDown) {
            this.setVelocityX(-160);
            this.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(160);
            this.anims.play('right', true);
        } else {
            this.setVelocityX(0);
            this.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.body.touching.down) {
            this.setVelocityY(-330);
        }

        // Mover la barra de salud con el jugador
        this.healthBar.x = this.x - 16;
        this.healthBar.y = this.y - 20;
        this.healthBar.draw();
    }

    decreaseHealth() {
        this.life -= 10;
        this.healthBar.decrease(10);
    }
}
