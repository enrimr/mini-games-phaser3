class PlayScene extends Phaser.Scene {

    constructor() {
        super('PlayScene');
    }

    playerEnemyCollision(player, enemy) {
        // Aquí es donde manejas lo que sucede cuando el jugador y el enemigo colisionan
        console.log('El jugador ha colisionado con el enemigo!');
    }

    
    create() {
        // Create game objects here
        this.add.image(400, 300, 'background'); // Asume que tu juego es de 800x600 px
        this.cursors = this.input.keyboard.createCursorKeys(); // Create cursor keys
        this.player = new Player(this, 100, 100, this.cursors); // Pass the cursor keys to the player
        this.enemy = new Enemy(this, 200, 300, this.cursors); // Crea el sprite del enemigo
        //this.player.create(); // Inicializa los controles del jugador

        // Crea una base estática en la parte inferior del juego
        let ground = this.physics.add.staticGroup();
        ground.create(400, this.sys.game.config.height - 25, 'ground'); // 'ground' es la key de la imagen de la base

        // Habilita la colisión entre el jugador y la base
        this.physics.add.collider(this.player, ground);
        this.physics.add.collider(this.enemy, ground);
        this.physics.add.collider(this.player, this.enemy, this.playerEnemyCollision, null, this);

    }

    update() {
        // Game loop code goes here
        // Actualiza el jugador
        this.player.update();
        this.enemy.update();
    }
}
