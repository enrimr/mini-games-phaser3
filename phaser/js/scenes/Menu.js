class MenuScene extends Phaser.Scene {
    constructor() {
        super("MenuScene");
    }

    preload(){
        this.load.binary('tune', 'assets/audio/sid/cybernoid2.sid');
        this.load.plugin('SIDPlayerPlugin', 'assets/audio/sid/SIDPlayerPluginES5.js', true);
        this.load.script('jsSID', 'assets/audio/sid/jsSID.js');
    }

    create() {

        this.input.keyboard.on('keydown-ENTER', function (event) {
            this.scene.start('PlayScene');
        }, this);
        
        const SIDplayer = this.plugins.get('SIDPlayerPlugin');
        let sidData = this.cache.binary.get(`tune`);
        SIDplayer.loadLocal(sidData);
        SIDplayer.setmodel(6581);

        let fontSize = this.sys.game.config.width * 0.065; // Set font size as 5% of game width
        let title = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, `${game.config.gameTitle}`, { fontSize: fontSize + 'px', fill: '#fff' });
        title.setOrigin(0.5);  // Centra el título
    
        let buttonFontSize = this.sys.game.config.width * 0.085; // Set button font size as 2.5% of game width
        this.playButton = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2 + 50, 'Jugar', { fontSize: buttonFontSize + 'px', fill: '#0f0' });
        this.playButton.setInteractive() // Asegúrate de que el texto es interactivo para poder escuchar los eventos de entrada.
            .on('pointerover', () => this.enterButtonHoverState(this.playButton)) // Cuando el cursor pasa por encima, llama a enterButtonHoverState.
            .on('pointerout', () => this.enterButtonRestState(this.playButton)) // Cuando el cursor se va, llama a enterButtonRestState.
            .on('pointerup', () => this.scene.start('PlayScene'));
        this.playButton.setOrigin(0.5);  // Centra el botón de jugar
    
        this.playButton.on('pointerdown', () => {
            this.scene.start('PlayScene');  // Cambia a la escena de juego
        });

        let gameSeriesSize = this.sys.game.config.width * 0.03; // Set font size as 5% of game width
        let gameSeries = this.add.text(12, this.sys.game.config.height - 20, `${game.config.gameVersion}`, { fontSize: gameSeriesSize + 'px', fill: '#fff' });
        title.setOrigin(0.5);  // Centra el título
    }
    

    enterButtonHoverState(button) {
        button.setColor('#ff0'); // Cambia el color del texto a amarillo cuando el cursor está por encima.
    }
    
    enterButtonRestState(button) {
        button.setColor('#0f0'); // Cambia el color del texto a verde cuando el cursor se va.
    }
}
