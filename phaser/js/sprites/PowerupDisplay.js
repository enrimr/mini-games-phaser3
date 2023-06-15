class PowerupDisplay extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.sprite = scene.add.sprite(0, 0, 'powerupDisplay').setOrigin(1, 0);
        this.text = scene.add.text(-this.sprite.width / 2, this.sprite.height / 2, '', { color: 'white', fontSize: '16px', align: 'center' });
        //this.add(this.sprite);
        this.add(this.text);
        this.scene = scene;
        scene.add.existing(this);
        scene.cameras.main.startFollow(this); // Hace que la cámara ignore este objeto, esencialmente convirtiéndolo en un elemento de la UI.
        
        this.text = scene.add.text(32, 32).setScrollFactor(0).setFontSize(10).setColor('#12ff44');

    }

    update(powerup, remainingTime) {
        var cam = this.scene.cameras.main;

        if (powerup) {
            this.text.setText(`Speed: ${remainingTime}s left`);
        } else {
            this.text.setText('');
        }

        //this.x = this.scene.cameras.main.scrollX + this.scene.cameras.main.width - 10;
        //this.y = this.scene.cameras.main.scrollY + 10; // Ubica el display en la parte superior de la pantalla
        /*this.text.setText([
                'ScrollX: ' + cam.scrollX,
                'ScrollY: ' + cam.scrollY,
                'MidX: ' + cam.midPoint.x,
                'MidY: ' + cam.midPoint.y
            ]);*/
    }
}