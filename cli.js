#!/usr/bin/env node
const chalk = require('chalk');
const { statsLinks, brokenLinks} = require('./funciones');

const mdLinks = require('./index.js');
// argv[0] = ruta de node
// argv[1] = ruta de mdLinks
// argv[2] = ruta del archivo
// argv[3] = --validate
// argv[4] = --stats

const argv = process.argv.slice(2);

const pathSimple = argv.filter((element) => {
  return element !== '--stats' && element !== '--validate';
});
const validate = argv.includes('--validate');
const stats = argv.includes('--stats');
const help = argv.includes('--help');
if (pathSimple.length === 0) {
  console.log('Porfavor ingrese una ruta o archivo que desea analizar');
  console.log('** Para mayor información escriba --help, para revisar las distintas opciones **');
}
if (help && !stats && !validate) {
  console.log(`
   ☺☺☺☺☺ OPCIONES ☺☺☺☺☺
  💨 md-links ${chalk.green('<path>')} ${chalk.red('=>')} Path hace referencia al archivo o directorio que desees analizar.
  💨 md-links <path> ${chalk.green('--validate')} ${chalk.red('=>')} Esta opción se hace la petición HTTP.
  💨 md-links <path> ${chalk.green('--stats')} ${chalk.red('=>')} Esta opción obtendra las estadísticas de los links encontrados, como el total de links y los links unicos.
  💨 md-links <path> ${chalk.green('--validate --stats')} o ${chalk.green('--stats --validate')} ${chalk.red('=>')} Esta opción obtendra las estadísticas de los links encontrados, como el total de links, los links unicos y links rotos.
  💨 md-links ${chalk.green('--help')} ${chalk.red('=>')} Muestra informacion acerca de las distintas opciones.

  ${chalk.cyan('♥ by DevRoLoBe ♥')}
  `);
}
pathSimple.forEach((path) => {
  if(!stats && !help){
  mdLinks(path, { validate })
    .then((result) => {
      console.log(result);
    })
    .catch(() => {
      console.log(chalk.red.bold('la ruta ingresada no existe'));
    });
  }
if (stats && !validate) {
  mdLinks(path, { validate })
      .then((result) => {
        // console.log(statsLinks(result));
        console.log('Total de links: ',chalk.green(statsLinks(result).totalLinks));
        console.log('Links Unicos: ', chalk.green(statsLinks(result).arrayUnics));
      });
    }
if (stats && validate) {
  mdLinks(path, { validate })
      .then((result) => {
        console.log('Total de Links:', statsLinks(result).totalLinks);
        console.log('Links Unicos:', statsLinks(result).arrayUnics);
        console.log('Links Rotos: ', brokenLinks(result));
      });
  }
});

