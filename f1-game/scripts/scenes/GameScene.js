class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {
        // Cargar los assets del juego
        this.load.image('car', 'assets/images/car-red.png');
        //this.load.image('track', 'assets/images/track.png');
        // ...


        // Cargar la imagen
this.load.image('car', 'assets/images/car.png');

// Crear la imagen
var car = this.add.image(400, 300, 'car');

// Aplicar un filtro de color
car.setTint(0xff0000); // Cambiar el color a rojo
    }

    create() {
        // Crear los elementos del juego
        //this.add.image(400, 300, 'track');
        this.car = this.add.image(400, 550, 'car');
        // ...

        // Crear la imagen
        this.car2 = this.add.image(400, 300, 'car');

        // Aplicar un filtro de color
        this.car2.setTint(0xff0000); // Cambiar el color a rojo

        //this.rivals = this.physics.add.group();  // Crea un grupo para los enemigos

        for (let i = 0; i < 5; i++) {  // Cambia 5 a la cantidad de enemigos que quieras
            let x = 400; // Ajusta la posición en x según tus necesidades
            let y = 400+i*20; // Posición aleatoria en y

            //let rival = new Car(this, x, y);  // Crea un nuevo enemigo
            let rival = this.add.image(x, y, 'car');

            // Generar un color aleatorio
            let color = Phaser.Display.Color.RandomRGB();

            // Aplicar un filtro de color
            rival.setTint(color.color);

            //this.rivals.add(rival);  // Añade el enemigo al grupo
        }

        // Crear la línea como suelo
        var groundLine = new Phaser.Geom.Line(0, 580, 800, 580);
        var points = Phaser.Geom.Line.GetPoints(groundLine, 32); // Dividir la línea en 32 puntos

        // Crear las plataformas en los puntos de la línea
        points.forEach(point => {
            this.add.rectangle(point.x, point.y, 64, 16, 0x00ff00).setOrigin(0.5); // Crear plataformas rectangulares en cada punto
        });

        // Habilitar colisiones entre el coche y las plataformas
        var platforms = this.physics.add.staticGroup();
        this.physics.add.collider(this.car, platforms);
        this.physics.add.collider(this.rivals, platforms);
    }
}
