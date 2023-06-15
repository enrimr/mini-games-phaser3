class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, cursors) {
        super(scene, x, y, 'enemy', 1); // Starts on frame 4
        this.scene = scene; // Guarda la referencia a la escena

        this.cursors = cursors; // Assign cursor keys
        this.life = 50; // Vida inicial del enemigo
        this.healthBar = new HealthBar(scene, x, y, 0xff0000);  // Rojo
        this.lastDamageTime = 0;
        this.damageCooldown = 1000; // Cooldown de daño en milisegundos

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

    getGameWidth() {
        return this.scene.physics.world.bounds.width;
    }

    update() {
        this.x -= 1; // Mueve el enemigo a la izquierda

        // Llamar a la animación del enemigo aquí
        this.anims.play('enemy-left', true);

        if (this.x < 50) { // Si el enemigo se sale del límite izquierdo de la pantalla
            this.x = this.getGameWidth() - 200; // Lo movemos al extremo derecho
            this.y = 200; // Lo movemos al extremo derecho
        }

        // Mover la barra de salud con el jugador
        this.healthBar.x = this.x - 16;
        this.healthBar.y = this.y - 20;
        this.healthBar.draw();
    }

    

    /*decreaseHealth() {
        this.life -= 20;
        this.healthBar.decrease(20);
        
    }*/

    decreaseHealth(damage) {
        const currentTime = this.scene.time.now;
        if (currentTime > this.lastDamageTime + this.damageCooldown) {
            this.life -= damage;
            this.healthBar.decrease(damage);
            this.lastDamageTime = currentTime;
    
            if (this.life <= 0) {
                this.healthBar.destroy(); // Asegúrate de que el objeto healthBar se destruye cuando el enemigo se queda sin salud
                this.destroy();
            }
        }
    }
    

    setSize(width, height) {
        if (this.body) {
            this.body.setSize(width, height);
            this.body.setOffset((this.width - width) / 2, (this.height - height) / 2);
        }
    }

    isDead() {
        return this.life <= 0;
    }
}
