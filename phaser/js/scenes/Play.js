class PlayScene extends Phaser.Scene {

    constructor() {
        super('PlayScene');
    }

    create() {
        // Create game objects here
        let background = this.add.image(400, 300, 'background'); // Asume que tu juego es de 800x600 px
        background.setScale(2, 2); // Ajusta el tamaño de la imagen al doble de su tamaño original

        let player = this.player = new Player(this, 100, 100); // Crea el sprite del jugador
    }

    update() {
        // Game loop code goes here
        // Actualiza el jugador
        this.player.update();
    }
}
