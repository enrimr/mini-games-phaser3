const fs = require('fs');
const path = require('path');

function createDirectoryStructure(structure, basePath) {
  structure.forEach(item => {
    const itemPath = path.join(basePath, item);
    if (item.endsWith('/')) {
      createDirectory(itemPath);
    } else {
      createFile(itemPath);
    }
  });
}

function createDirectory(path) {
  try {
    fs.mkdirSync(path);
    console.log(`Directorio creado: ${path}`);
  } catch (err) {
    console.error(`Error al crear directorio: ${path}`, err);
  }
}

function createFile(path) {
  try {
    fs.writeFileSync(path, '');
    console.log(`Archivo creado: ${path}`);
  } catch (err) {
    console.error(`Error al crear archivo: ${path}`, err);
  }
}

function readStructureFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data.trim().split('\n');
  } catch (err) {
    console.error(`Error al leer el archivo: ${filePath}`, err);
    return [];
  }
}

const filePath = 'f1-game-files.txt'; // Ruta del archivo de entrada
const baseDir = __dirname; // Directorio base actual

const structure = readStructureFromFile(filePath);
createDirectoryStructure(structure, baseDir);

