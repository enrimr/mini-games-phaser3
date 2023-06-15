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
        this.defaultSpeed = 128;
        this.maxSpeed = 512;
        this.speed = 128;
        this.movementDirectionX = 'left';

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

        this.powerup = null;
        this.powerupTimer = null;
        this.powerupDisplay = new PowerupDisplay(scene, scene.scale.width, 0);

        this.lasers = scene.physics.add.group({
            classType: Phaser.Physics.Arcade.Sprite,
            maxSize: 10,
            runChildUpdate: true // Para que los láseres se actualicen incluso cuando están fuera de la cámara
        });

        this.bombs = scene.physics.add.group({
            classType: Phaser.Physics.Arcade.Sprite,
            maxSize: 10,
            runChildUpdate: true // Para que las bombas se actualicen incluso cuando están fuera de la cámara
        });

        // Crear una tecla para la barra espaciadora
        this.spacebar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // Crear una tecla para la tecla 'Z'
        this.zKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);


        scene.add.existing(this);
        scene.physics.add.existing(this);
        
    }

    fireBomb() {
        // Obtener el primer láser inactivo en el grupo, o crear uno nuevo si no hay ninguno
        let bomb = this.bombs.get(this.x, this.y, 'bomb');
    
        if (!bomb) {
            return; // Si no se pudo crear el láser, terminar la función
        }
    
        bomb.setActive(true);
        bomb.setVisible(true);
    
        // Configurar el láser
        if (this.movementDirectionX === 'left') {
            bomb.body.velocity.x = -100 + this.body.velocity.x; 
        } else {
            bomb.body.velocity.x = 100 + this.body.velocity.x; 
        }
        bomb.body.velocity.y = -200; // Velocidad del láser (negativa para que se mueva hacia arriba)
    
        // Configurar una función para desactivar el láser cuando esté fuera de la pantalla
        bomb.body.setCollideWorldBounds(true);
        bomb.body.onWorldBounds = true; // Habilita el evento 'worldbounds' para este objeto
    
        // Este evento se activará cuando el láser salga de los límites del mundo
        this.scene.physics.world.on('worldbounds', function(body) {
            // Verifica si el cuerpo que salió de los límites del mundo es el láser
            if (body.gameObject === this) {
                this.setActive(false);
                this.setVisible(false);
            }
        }, bomb); // Pasa el láser como contexto para la función de devolución de llamada
    }
    
    fireLaser() {
        let laser = this.lasers.get(this.x, this.y, 'laser');
        
        if (!laser) {
            return;
        }
        
        laser.setActive(true);
        laser.setVisible(true);
    
        laser.body.setGravityY(0);
        laser.body.velocity.y = 0;

        if (this.movementDirectionX === 'left') {
            laser.body.velocity.x = -200; // Velocidad del láser (negativa para que se mueva a la izquierda)
        } else {
            laser.body.velocity.x = 200; // Velocidad del láser (positiva para que se mueva a la derecha)
        }
    
        laser.body.setCollideWorldBounds(true);
        laser.body.onWorldBounds = true; 
    
        this.scene.physics.world.on('worldbounds', function(body) {
            if (body.gameObject === this) {
                this.setActive(false);
                this.setVisible(false);
            }
        }, laser);
    }
    
    update() {
        //this.x = Phaser.Math.Clamp(this.x, this.minX, this.maxX);

        // Player movement and behavior goes here
        // Imprime las posiciones X e Y del jugador en la consola
        //console.log(`Player Position - X: ${this.x}, Y: ${this.y}`);
        // Update the animation based on the player's movement
        if (this.cursors.left.isDown) {
            this.setVelocityX(-this.speed);
            this.anims.play('player-left'+this.status(), true);
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(this.speed);
            this.anims.play('player-right'+this.status(), true);
        } else {
            this.setVelocityX(0);
            this.anims.play('player-turn'+this.status());
        }

        if (this.cursors.up.isDown && this.body.touching.down) {
            this.setVelocityY(-200);
        }

        if (this.cursors.right.isDown) {
            console.log('Moving right');
            this.movementDirectionX = 'right';
        } else if (this.cursors.left.isDown) {
            console.log('Moving left');
            this.movementDirectionX = 'left';
        }

        
        // Mover la barra de salud con el jugador
        this.healthBar.x = this.x - 16;
        this.healthBar.y = this.y - 20;
        this.healthBar.draw();

        let remainingTime = null;
        if (this.powerup && this.powerupTimer) {
            remainingTime = Math.round(this.powerupTimer.getRemainingSeconds());
        }
        this.powerupDisplay.update(this.powerup, remainingTime);

        // Disparar un láser cuando se presiona la barra espaciadora
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.fireBomb();
        }

        // Disparar un láser cuando se presiona la tecla 'Z'
        if (Phaser.Input.Keyboard.JustDown(this.zKey)) {
            this.fireLaser();
        }
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

    isDead() {
        return this.life <= 0;
    }

    doubleSpeed() {
        this.powerup = true;
        if (this.speed < this.maxSpeed) {
            this.speed *= 2; // Duplica la velocidad
             // Crea un temporizador para restablecer la velocidad después de 10 segundos
             this.powerupTimer = this.scene.time.delayedCall(10000, () => {
                this.speed /= 2;
                if (this.speed === this.defaultSpeed) this.powerup = false;
            });
        }
    }
}
