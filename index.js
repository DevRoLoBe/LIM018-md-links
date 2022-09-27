const {
  getAbsolutePath,
  isMd,
  statsLinks,
  extractLinks,
  validateLinks,
  pathExists,
} = require("./funciones.js");

const mdlinks = (path, options) => {
  return new Promise((resolve, reject) => {
    let links = [];
    if (!pathExists(path)) {
      reject(new Error("La ruta ingresada no existe"));
    }
    // chequear que la ruta sea absoluta
    const absolut = getAbsolutePath(path);
    //TODO: check if absolut is a directory or a file
    // valida si el archivo es md
    if (!isMd(absolut)) {
      reject(new Error("No se encontró archivos con extencion .md"));
    }
    const arrayObjects = extractLinks(absolut);
    // if (readFile(path)) {
    //   reject(new Error("No se puede leer el archivo"));
    // }
    if(!options.validate){
      links = arrayObjects;
      resolve(links);
    }
    links = validateLinks(arrayObjects);
    resolve (links);
  });
};

// mdlinks("./miReadme.md", {validate: true}).then((result) => {
//   console.log(result);
// });
module.exports = mdlinks;





