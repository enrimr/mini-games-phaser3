// HealthBar.js
class HealthBar {

    constructor(scene, x, y, color) {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.value = 100;
        this.p = 76 / 100;
        this.color = color;

        this.draw();

        scene.add.existing(this.bar);
    }

    decrease(amount) {
        this.value -= amount;

        if (this.value < 0) {
            this.value = 0;
        }

        this.draw();

        return (this.value === 0);
    }

    draw() {
        this.bar.clear();
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x, this.y, 32, 4);
        this.bar.fillStyle(this.color);
        this.bar.fillRect(this.x, this.y, 32 * (this.value / 100), 4);
    }
}
