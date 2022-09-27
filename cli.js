#!/usr/bin/env node
// const { statsLinks, brokenLinks} = require('./funciones');
const chalk = require('chalk');
const { statsLinks } = require('./funciones.js');

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
pathSimple.forEach((path) => {
  mdLinks(path, { validate })
    .then((result) => {
      // console.log(result, 'anais');
    })
    .catch(() => {
      console.log('Ingrese una ruta valida');
    });
});

if (stats ){
  pathSimple.map((e) => {
    return mdLinks(e, { validate })
      .then((result) => {
      const r = result
        console.log(statsLinks(r), 'juana');
      });
  });
}
