// HealthBar.js
class TrackLine {

    constructor(scene, x, y, color) {
        this.line = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.value = 100;
        this.p = 76 / 100;
        this.color = color;

        this.draw();

        scene.add.existing(this.line);
    }

    draw() {
        this.bar.clear();
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x, this.y, 200, 4);
        this.bar.fillStyle(this.color);
        this.bar.fillRect(this.x, this.y, 200, 4);
    }

    destroy() {
        this.bar.destroy();
    }
}
