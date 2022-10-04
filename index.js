const {
  pathExists,
  getAbsolutePath,
  fileIsDirectory,
  readDirectory,
  isMd,
  filterPathsMd,
  readFile,
  fileOrDirectory,
  extractLinks,
  validateLinks,
} = require("./funciones.js");

const mdlinks = (path, options) => {
  return new Promise((resolve, reject) => {
    // let links = [];
    if (!fileIsDirectory(path)) {
      if(pathExists(path)) {
      reject(new Error("La ruta ingresada no existe"));
    }
    // chequear que la ruta sea absoluta
    const absolut = getAbsolutePath(path);
    //TODO: check if absolut is a directory or a file
    // valida si el archivo es md
    if (!isMd(absolut)) {
      reject(new Error("No se encontró archivos con extencion .md"));
    }
    const fileRead = readFile(absolut);
    const extract = extractLinks(fileRead, absolut);
    if(!options.validate){
      resolve(extract);
    }
    resolve(validateLinks(extract));
  }
  const routeAbsolute = getAbsolutePath(path);
  const readDir = readDirectory(routeAbsolute);
  const fileOrDir = fileOrDirectory(readDir, routeAbsolute, []);
  const routeMd = filterPathsMd(fileOrDir);
  const arrays = [];
  routeMd.forEach((md) => {
    const read = readFile(md);
    const extract = extractLinks(read, md);
    arrays.push(extract);
  });
  const arrUnido = arrays.flat();
  if (!options.validate) {
    resolve(arrUnido);
  }
  resolve(validateLinks(arrUnido));
  });
};
// mdlinks("./miReadme.md", {validate: true}).then((result) => {
//   console.log(result);
// });
module.exports = mdlinks;





