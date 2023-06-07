class PlayScene extends Phaser.Scene {

    constructor() {
        super('PlayScene');
    }

    create() {
        // Create game objects here
        this.add.image(400, 300, 'background'); // Asume que tu juego es de 800x600 px
        this.player = new Player(this, 100, 100); // Crea el sprite del jugador
        this.player.create(); // Inicializa los controles del jugador

        // Crea una base estática en la parte inferior del juego
        let ground = this.physics.add.staticGroup();
        ground.create(400, this.sys.game.config.height - 25, 'ground'); // 'ground' es la key de la imagen de la base

        //ground.create(400, 568, 'ground').setScale(2).refreshBody(); // Asume que 'ground' es la key de la imagen de la base
          
        // Habilita la colisión entre el jugador y la base
        this.physics.add.collider(this.player, ground);
    }

    update() {
        // Game loop code goes here
        // Actualiza el jugador
        this.player.update();
    }
}
