class PlayScene extends Phaser.Scene {

    constructor() {
        super('PlayScene');
    }

    playerEnemyCollision(player, enemy) {
        // Restar vida al jugador y al enemigo
        if (player.y < enemy.y && player.body.velocity.y > 0) {
            // El jugador está encima del enemigo, destruir el enemigo y no quitar vida al jugador.
            enemy.decreaseHealth(100);
            player.body.setVelocityY(-300); // Hace que el jugador rebote

        } else {
            // El jugador no está encima del enemigo, quitar vida al jugador.
            player.decreaseHealth(20);
            enemy.decreaseHealth(20);
        }
    
        console.log(`Vida del jugador: ${player.life}`);
        console.log(`Vida del enemigo: ${enemy.life}`);
    
        // Comprobar si la vida del jugador o del enemigo ha llegado a 0
        if (player.life <= 0) {
            console.log('El jugador ha perdido!');
            // Aquí podrías implementar la lógica para cuando el jugador pierde
        }
        if (enemy.life <= 0) {
            console.log('El enemigo ha perdido!');
            // Aquí podrías implementar la lógica para cuando el enemigo pierde
            enemy.destroy();
            enemy.healthBar.destroy();
        }
    }

    initWorldWithSin() {
        this.platforms = this.physics.add.staticGroup();
        this.lastY = 400; // Comienza a mitad de altura, ajusta según sea necesario
        this.stepSize = 62; // Ancho de la plataforma, ajusta según sea necesario
        this.totalSteps = Math.floor(this.physics.world.bounds.width / this.stepSize); // Número total de plataformas que puedes encajar en el ancho del mundo
    
        // Crear la primera plataforma
        this.platforms.create(0, this.lastY, 'platform');
    
        for(let i = 1; i < this.totalSteps; i++) {
            // Varía la altura de la plataforma siguiente utilizando la función seno para un efecto de ondulación
            this.lastY += Math.sin(i * Math.PI / 15) * 50;  // Ajusta los parámetros según sea necesario
    
            // Crear una plataforma en la posición y altura actuales
            this.lastPlatform = this.platforms.create(i * this.stepSize, this.lastY, 'platform');
        }
    }

    initWorld() {
        this.platforms = this.physics.add.staticGroup();
    
        // Variables para llevar la cuenta de la posición actual
        let x = 0;
        let y = 300; // Este valor será aleatorio más tarde
    
        // Variables para el tamaño de la plataforma
        let platformWidth = 32;
        let platformHeight = 32;
    
        console.log(this.physics.world.bounds.width)
        // Genera el mundo
        while (x < this.physics.world.bounds.width) {
            // Crea una plataforma en la posición actual
            let platform = this.platforms.create(x + platformWidth / 2, y, 'platform');
            platform.displayWidth = platformWidth;
            platform.refreshBody();
    
            // Crea un tile sprite debajo de la plataforma
            let tileSpriteHeight = this.physics.world.bounds.height - y - platformHeight / 2;
            this.add.tileSprite(x + platformWidth / 2, y + platformHeight / 2 + tileSpriteHeight / 2, platformWidth, tileSpriteHeight, 'platform-down');

            // Aumenta la x para la próxima plataforma
            x += platformWidth;
    
            const differenceLevels = 4;
            // Aleatoriza la altura de la próxima plataforma, pero manténla dentro de cierto rango
            // Cambia aquí para limitar la diferencia de altura a un máximo de 100 píxeles
            let heightChange = Phaser.Math.Between(-differenceLevels, differenceLevels);
            let nextY = y + heightChange;
            if (nextY < y - differenceLevels) nextY = y - differenceLevels;
            else if (nextY > y + differenceLevels) nextY = y + differenceLevels;
            y = Phaser.Math.Clamp(nextY, differenceLevels, this.physics.world.bounds.height - differenceLevels);
        }
    }
    
    
    collectPowerUp(player, powerUp) {
        powerUp.disableBody(true, true); // Esconde y desactiva la caja de potenciador
        //powerUp.destroy(); // Destruye el powerUp
        player.speed *= 2; // Duplica la velocidad del jugador
        this.activePowerUps--;
        console.log("POWERUP SPEED x2")
    }
    

    create() {
        this.nextPlatformTime = 0;  // Inicializa nextPlatformTime

        // dentro de tu método create en PlayScene
        this.physics.world.setBounds(0, 0, 10000, 600); // cambia 10000 y 600 a las dimensiones que necesites

        // Create game objects here
        //this.add.image(400, 300, 'background'); // Asume que tu juego es de 800x600 px
        this.background = this.add.tileSprite(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height, 'background');
        this.background.setOrigin(0, 0);  // Asegúrate de que el origen esté en la esquina superior izquierda, para que el fondo se dibuje correctamente

        this.cursors = this.input.keyboard.createCursorKeys(); // Create cursor keys
        this.player = new Player(this, 200, 100, this.cursors); // Pass the cursor keys to the player
        this.player.body.setSize(18, 26); // ajusta estos valores a lo que necesites
        this.player.body.setOffset(8, 6); // Ajusta estos valores a lo que necesites
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height);

        //this.enemy = new Enemy(this, 200, 300, this.cursors); // Crea el sprite del enemigo

        this.enemies = this.physics.add.group();  // Crea un grupo para los enemigos

        for(let i = 0; i < 15; i++) {  // Cambia 5 a la cantidad de enemigos que quieras
            let x = Phaser.Math.RND.between(100, 900);  // Posición aleatoria en x
            let y = Phaser.Math.RND.between(100, 200);  // Posición aleatoria en y
            let enemy = new Enemy(this, x, y);  // Crea un nuevo enemigo
            enemy.body.setSize(18, 14); // ajusta estos valores a lo que necesites
            enemy.body.setOffset(7, 18); // Ajusta estos valores a lo que necesites

            this.enemies.add(enemy);  // Añade el enemigo al grupo
        }

        // Dentro del método create()
        this.powerUps = this.physics.add.staticGroup();
        this.physics.add.collider(this.player, this.powerUps, this.collectPowerUp, null, this);
        this.activePowerUps = 0;  // Número de powerups actualmente en pantalla

        this.initWorld();

        // Crea una base estática en la parte inferior del juego
        let ground = this.physics.add.staticGroup();
        //ground.create(400, this.sys.game.config.height - 25, 'ground'); // 'ground' es la key de la imagen de la base

        this.player.setCollideWorldBounds(true); // Limite para que el jugador no salga del mapa
        // Habilita la colisión entre el jugador y la base
        this.physics.add.collider(this.player, ground);
        this.physics.add.collider(this.enemies, ground);
        this.physics.add.collider(this.player, this.enemies, this.playerEnemyCollision, null, this);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);

    }

    update(time) {
        // Game loop code goes here
        // Actualiza el jugador
        this.player.update();
        //this.enemy.update();
        // Actualiza todos los enemigos
        Phaser.Actions.Call(this.enemies.getChildren(), enemy => {
            enemy.update();
        });
        
        if (Phaser.Math.RND.between(0, 100) < 5 && this.activePowerUps < 5) { // 0.5% de probabilidad cada frame
            
            // Encuentra una plataforma aleatoria
            let randomPlatform = Phaser.Utils.Array.GetRandom(this.platforms.getChildren());
    
            // Crea una nueva caja de potenciador en una posición aleatoria cerca de la plataforma
            let x = randomPlatform.x;
            let y = randomPlatform.y - 32 - 40;
            console.log(`Aparece PowerUp ${x},${y}`);
            let powerUp = this.powerUps.create(x, y, 'powerup-box');
            this.powerUps.add(powerUp);
            this.activePowerUps++;

            // Crea un temporizador de eventos para hacer parpadear la caja de potenciador durante los últimos 2 segundos
            this.time.delayedCall(5000, () => {
                // Dentro de este bloque de código, estamos después de 3 segundos
                // Entonces, crearemos un evento que hará que el powerup parpadee 10 veces durante 2 segundos
                this.time.addEvent({
                    delay: 350,
                    repeat: 14,
                    callback: () => {
                        powerUp.setVisible(!powerUp.visible);
                    }
                });
            });

            // Crea un temporizador de eventos para eliminar la caja de potenciador después de 5 segundos
            this.time.delayedCall(10000, () => {
                powerUp.destroy();
                this.activePowerUps--;
            });
        }
    }
}
