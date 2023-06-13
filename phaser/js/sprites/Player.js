class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, cursors) {
        super(scene, x, y, 'player', 1); // Starts on frame 4
        this.cursors = cursors; // Assign cursor keys
        this.life = 100; // Vida inicial del enemigo
        this.healthBar = new HealthBar(scene, x-32, y, 0x00ff00);  // Verde
        this.isDefeated = false; // Agrega el flag
        // Establece los límites de movimiento en x del jugador
        this.minX = 150;
        this.maxX = this.scene.physics.world.bounds.width - 150;

        // Player properties and settings go here
        scene.anims.create({
            key: 'player-left',
            frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'player-turn',
            frames: [{ key: 'player', frame: 25 }],
            frameRate: 20
        });

        scene.anims.create({
            key: 'player-right',
            frames: scene.anims.generateFrameNumbers('player', { start: 33, end: 35 }),
            frameRate: 10,
            repeat: -1
        });

        // DEFEATED
        scene.anims.create({
            key: 'player-left-defeated',
            frames: scene.anims.generateFrameNumbers('player_defeated', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'player-turn-defeated',
            frames: [{ key: 'player_defeated', frame: 25 }],
            frameRate: 20
        });

        scene.anims.create({
            key: 'player-right-defeated',
            frames: scene.anims.generateFrameNumbers('player_defeated', { start: 33, end: 35 }),
            frameRate: 10,
            repeat: -1
        });

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }

    update() {
        //this.x = Phaser.Math.Clamp(this.x, this.minX, this.maxX);

        // Player movement and behavior goes here
        // Imprime las posiciones X e Y del jugador en la consola
        //console.log(`Player Position - X: ${this.x}, Y: ${this.y}`);
        // Update the animation based on the player's movement
        if (this.cursors.left.isDown) {
            this.setVelocityX(-160);
            this.anims.play('player-left'+this.status(), true);
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(160);
            this.anims.play('player-right'+this.status(), true);
        } else {
            this.setVelocityX(0);
            this.anims.play('player-turn'+this.status());
        }

        if (this.cursors.up.isDown && this.body.touching.down) {
            this.setVelocityY(-200);
        }

        // Mover la barra de salud con el jugador
        this.healthBar.x = this.x - 16;
        this.healthBar.y = this.y - 20;
        this.healthBar.draw();
    }

    decreaseHealth(damage) {
        this.life -= damage;
        this.healthBar.decrease(damage);
        if (this.life <= 0) {
            this.isDefeated = true; // Actualiza el flag cuando la salud llega a 0
        }
    }   

    status() {
        if (this.isDefeated) return '-defeated';
        else return '';
    }
}
