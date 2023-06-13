class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    create() {
        this.add.text(400, 300, '¡Bienvenido al Juego de Fórmula 1!', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        this.playButton = this.add.text(200, 500, 'Jugar', { fontSize: '60px', fill: '#0f0' });
        this.playButton.setInteractive() // Asegúrate de que el texto es interactivo para poder escuchar los eventos de entrada.
            .on('pointerover', () => this.enterButtonHoverState(this.playButton)) // Cuando el cursor pasa por encima, llama a enterButtonHoverState.
            .on('pointerout', () => this.enterButtonRestState(this.playButton)) // Cuando el cursor se va, llama a enterButtonRestState.
            .on('pointerup', () => this.scene.start('PlayScene'));
        this.playButton.setOrigin(0.5);  // Centra el botón de jugar

        this.playButton.on('pointerdown', () => {
            this.scene.start('GameScene');  // Cambia a la escena de juego
        });
    }

    enterButtonHoverState(button) {
        button.setColor('#ff0'); // Cambia el color del texto a amarillo cuando el cursor está por encima.
    }
    
    enterButtonRestState(button) {
        button.setColor('#0f0'); // Cambia el color del texto a verde cuando el cursor se va.
    }
}
