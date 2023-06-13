class FinishScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FinishScene' });
    }

    create() {
        this.add.text(400, 300, '¡Has terminado la carrera!', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
    }
}
