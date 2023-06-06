const fs = require('fs');

const dirs = [
    'css',
    'js',
    'js/scenes',
    'js/sprites',
    'assets',
    'assets/images',
    'assets/audio',
    'assets/audio/sfx'
];

const files = [
    { path: 'index.html', content: '<!DOCTYPE html>\n<html>\n<body>\n\t<!-- Tu código HTML aquí -->\n</body>\n</html>' },
    { path: 'css/style.css', content: '/* Tu código CSS aquí */' },
    { path: 'js/phaser.min.js', content: '// Phaser library here' },
    { path: 'js/game.js', content: '// Tu código de juego aquí' },
    { path: 'js/scenes/Boot.js', content: '// Código de la escena de inicio aquí' },
    { path: 'js/scenes/Preload.js', content: '// Código de la escena de precarga aquí' },
    { path: 'js/scenes/Menu.js', content: '// Código de la escena del menú aquí' },
    { path: 'js/scenes/Play.js', content: '// Código de la escena de juego aquí' },
    { path: 'js/sprites/Player.js', content: '// Código del sprite del jugador aquí' },
    { path: 'js/sprites/Enemy.js', content: '// Código del sprite del enemigo aquí' },
    { path: 'assets/images/background.png', content: '', binary: true },
    { path: 'assets/images/player.png', content: '', binary: true },
    { path: 'assets/images/enemy.png', content: '', binary: true },
    { path: 'assets/audio/bgm.mp3', content: '', binary: true },
    { path: 'assets/audio/sfx/jump.mp3', content: '', binary: true },
    { path: 'assets/audio/sfx/hit.mp3', content: '', binary: true },
];

dirs.forEach(dir => {
    fs.mkdirSync(dir, { recursive: true });
});

files.forEach(file => {
    if (file.binary) {
        fs.writeFileSync(file.path, Buffer.alloc(0));
    } else {
        fs.writeFileSync(file.path, file.content);
    }
});
