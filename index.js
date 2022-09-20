const { fstat } = require("graceful-fs");
const {
  getAbsolutePath,
  isMd,
  readFile,
  extractLinks,
  validateLinks,
  pathExists,
} = require("./funciones.js");

const mdlinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (!pathExists) {
      reject(new Error("La ruta ingresada no existe"));
    }
    // chequear que la ruta sea absoluta
    const absolut = getAbsolutePath(path);

    //TODO: check if absolut is a directory or a file
    

    // valida si el archivo es md
    if (!isMd(absolut)) {
      reject(new Error("No se encontró archivos con extencion .md"));
    }

    if (readFile(path)) {
      reject(new Error("No se puede leer el archivo"));
    }
  });
};

mdlinks("./miReadme.md").then((result) => {
  console.log(result);
});
