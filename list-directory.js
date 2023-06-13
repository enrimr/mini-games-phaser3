const fs = require('fs');
const path = require('path');

// Obtener el directorio raíz desde los argumentos de línea de comandos
const rootDirectory = process.argv[2] || './';

// Directorio de los archivos de entrada
const inputDirectory = path.resolve(rootDirectory);

// Archivo de salida
const outputFile = './salida'+rootDirectory+'.txt';

// Extensiones de archivos permitidas
const allowedExtensions = ['.js', '.css'];  // Puedes modificar esta lista según tus necesidades

// Directorios y archivos a excluir
const excludedDirectories = ['css', 'assets'];  // Puedes modificar esta lista según tus necesidades
const excludedFiles = ['phaser.min.js', 'list-directory.js','generator.js'];  // Puedes modificar esta lista según tus necesidades

// Función de recorrido recursivo
function processDirectory(directory) {
    fs.readdir(directory, (err, entries) => {
        if (err) {
            console.error("Error al leer el directorio: ", err);
            process.exit(1);
        }

        entries.forEach(entry => {
            const entryPath = path.join(directory, entry);
            fs.stat(entryPath, (err, stats) => {
                if (err) {
                    console.error(`Error al obtener estadísticas de ${entry}: `, err);
                    return;
                }

                if (stats.isFile()) {
                    // Si la entrada es un archivo, verificamos si su extensión está permitida y si no está excluido
                    const extension = path.extname(entry);
                    if (!allowedExtensions.includes(extension) || excludedFiles.includes(entry)) {
                        return;
                    }

                    // Leemos el contenido del archivo
                    fs.readFile(entryPath, 'utf8', (err, contents) => {
                        if (err) {
                            console.error(`Error al leer el archivo ${entry}: `, err);
                            return;
                        }

                        // Preparamos el contenido para la salida
                        const outputContents = `Archivo: ${entry}\nRuta: ${entryPath}\n\n${contents}\n\n`;

                        // Escribimos el contenido en el archivo de salida
                        fs.appendFile(outputFile, outputContents, 'utf8', err => {
                            if (err) {
                                console.error(`Error al escribir en el archivo de salida: `, err);
                            }
                        });
                    });
                } else if (stats.isDirectory() && !excludedDirectories.includes(entry)) {
                    // Si la entrada es un directorio y no está excluido, procesamos sus archivos
                    processDirectory(entryPath);
                }
            });
        });
    });
}

// Iniciamos el recorrido en el directorio de entrada
processDirectory(inputDirectory);
