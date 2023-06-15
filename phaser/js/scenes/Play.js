class PlayScene extends Phaser.Scene {

    constructor() {
        super('PlayScene');
    }

    playerEnemyCollision(player, enemy) {
        // Restar vida al jugador y al enemigo
        if (player.y < enemy.y && player.body.velocity.y > 0) {
            enemy.decreaseHealth(100);
            player.body.setVelocityY(-300);
        } else {
            player.decreaseHealth(20);
            enemy.decreaseHealth(20);
        }

        if (player.isDead()) {
            // Lógica para cuando el jugador pierde
        }
        if (enemy.isDead()) {
            // Lógica para cuando el enemigo pierde
            enemy.destroy();
            enemy.healthBar.destroy();
        }
    }

    createPlatform(x, y) {
        let platform = this.platforms.create(x, y, 'platform');
        return platform;
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
            let platform = this.createPlatform(x + platformWidth / 2, y);
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
        player.doubleSpeed(); // Duplica la velocidad del jugador
        this.activePowerUps--;
        console.log("POWERUP SPEED x2")
    }
    

    createPowerUp(x, y) {
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
    createGameObject(scene, x, y) {
        return scene.add.text(x, y, 'Phaser3\nPhaser3\nPhaser3\nPhaser3', {
            fontSize: 25,
        })
    }

    init ()
    {
        this.cameras.main.fadeIn(100);
        const fxCamera = this.cameras.main.postFX.addPixelate(40);
        this.add.tween({
            targets: fxCamera,
            duration: 700,
            amount: -1,
        });
    }
    
    initCollisions(){
        // Crea una base estática en la parte inferior del juego
        let ground = this.physics.add.staticGroup();
        this.player.setCollideWorldBounds(true); // Limite para que el jugador no salga del mapa
        // Habilita la colisión entre el jugador y la base
        this.physics.add.collider(this.player, ground);
        this.physics.add.collider(this.enemies, ground);
        this.physics.add.collider(this.player, this.enemies, this.playerEnemyCollision, null, this);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.collider(this.player, this.powerUps, this.collectPowerUp, null, this);
    }

    generateEnemies(){
        this.enemies = this.physics.add.group();  // Crea un grupo para los enemigos

        for(let i = 0; i < 15; i++) {  // Cambia 5 a la cantidad de enemigos que quieras
            let x = Phaser.Math.RND.between(100, 900);  // Posición aleatoria en x
            let y = Phaser.Math.RND.between(100, 200);  // Posición aleatoria en y
            let enemy = new Enemy(this, x, y);  // Crea un nuevo enemigo
            enemy.body.setSize(18, 14); // ajusta estos valores a lo que necesites
            enemy.body.setOffset(7, 18); // Ajusta estos valores a lo que necesites

            this.enemies.add(enemy);  // Añade el enemigo al grupo
        }
    }

    initHUD(){

    }

    create() {
        this.input.keyboard.on('keydown-D', function (event) {
            if (event.ctrlKey) {
                this.showDebugHUD();
            }
        }, this);
        this.hud = new PowerupDisplay(this, 1, 1, null); // Pass the cursor keys to the player
        //this.powerupDisplay = new PowerupDisplay(scene, scene.scale.width, 0);
        var gameObject = this.createGameObject(this, 600, 300)
        gameObject.postFX.addPixelate(10);
        gameObject.postFX.clear();
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
        //this.cameras.main.setZoom(1.3);
        // Dentro del método create()
        this.powerUps = this.physics.add.staticGroup();
        this.activePowerUps = 0;  // Número de powerups actualmente en pantalla

        this.initWorld();
        this.generateEnemies();
        this.initCollisions();
        this.initHUD();
        
        //this.cameras.main.setDeadzone(500, 200);
        //this.cameras.main.setZoom(1);
        if (this.cameras.main.deadzone)
        {
           const graphics = this.add.graphics().setScrollFactor(0);
            graphics.lineStyle(2, 0x00ff00, 1);
            graphics.strokeRect(200, 200, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);
        }

        this.text = this.add.text(32, 32).setScrollFactor(0).setFontSize(8).setColor('#ffffff');
    }
    
    showDebugHUD(){
        var cam = this.cameras.main;

        if (cam.deadzone)
        {
            this.text.setText([
                'ScrollX: ' + cam.scrollX,
                'ScrollY: ' + cam.scrollY,
                'MidX: ' + cam.midPoint.x,
                'MidY: ' + cam.midPoint.y,
                'deadzone left: ' + cam.deadzone.left,
                'deadzone right: ' + cam.deadzone.right,
                'deadzone top: ' + cam.deadzone.top,
                'deadzone bottom: ' + cam.deadzone.bottom
            ]);
        }
        else
        {
            this.text.setText([
                'ScrollX: ' + cam.scrollX,
                'ScrollY: ' + cam.scrollY,
                'MidX: ' + cam.midPoint.x,
                'MidY: ' + cam.midPoint.y
            ]);
        }
    }

    update(time) {

        if (game.config.physics.arcade.debug) {
            this.showDebugHUD();
        }
        

        // Game loop code goes here
        // Actualiza el jugador
        this.player.update();
        if (this.player.powerupTimer)
            this.hud.update(this.player.powerup, Math.round(this.player.powerupTimer.getRemainingSeconds()));
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
            this.createPowerUp(x, y);
        }
    }
}
