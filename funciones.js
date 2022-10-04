const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");
const ejmpRut = "./miReadme.md";

/**
 * Verifies if a file path exist
 * @param {string} paths: the file ath to verify
 * @returns {boolean} if the file path exist or not
 */
// Comprueba que el archivo exista
const pathExists = (paths) => {
  return fs.existsSync(paths);
};

// Verifica que el archivo sea un directorio
const fileIsDirectory = (filePath) => {
  return fs.statSync(filePath).isDirectory();
};
// Lee el directorio
const readDirectory = (pathAbsolut) => fs.readdirSync(pathAbsolut);

// convertir la ruta relativa en  absoluta
const getAbsolutePath = (pathToResolve) => {
  return path.isAbsolute(pathToResolve)
    ? pathToResolve
    : path.resolve(pathToResolve);
};
// console.log(pathExists(ejmpRut))

// Validamos que el archivo sea de extención .md
const isMd = (pathAbsolut) => {
  const pathMd = path.extname(pathAbsolut);
  if (pathMd === ".md") {
    return true;
  }
  return false;
};
// console.log(isMd(path, {validate: false, stats: true}));
// Filtra archivos desde un array
const fileOrDirectory = (pathContent, pathDir) => {
  const result = [];
  for (let i = 0; i < pathContent.length; i++) {
    const absolutePath = path.join(pathDir, pathContent[i]);

    if (!isDirectory(absolutePath)) {
      result.push(absolutePath);
    } else {
      const subDirs = fileOrDirectory(readDir(absolutePath), absolutePath);
      result.concat(subDirs);
    }
  }
  console.log(result,'siii');
  return result;
};
// Filtra rutas con la extención .md
const filterPathsMd = (paths) => {
  return paths.filter((paths) => {
    return isMd(paths) === true;
  });
};
// lee  archivos
const readFile = (pathsMd) => {
  if (!Array.isArray(pathsMd)) {
    return fs.readFileSync(pathsMd, "utf-8");
  }
  return pathsMd.map((path) => {
    return fs.readFileSync(path, "utf-8");
  });
};

// Exrtrae link de los archivos
const extractLinks = (fileRead, pathMd) => {
  const regExp = /\[(.+)\]\((https?:\/\/.+)\)/gi;
  // const readfile = fs.readFileSync(pathAbsolut, "utf8");
  //contiene los links
  const fileLinks = fileRead.match(regExp);
  if (fileRead === "") {
    return [];
  }
  if (fileLinks === null) {
    return [];
  }
  // retorna links encontrados, es un arr
  const newFilelinks = fileLinks.map((links) => {
    const textLink = /\[[^\s]+(.+?)\]/gi;
    const matchText = links.match(textLink);
    const httpsLink = /\((https?.+?)\)/gi;
    const matchHttp = links.match(httpsLink);
    const objLinks = {
      href: matchHttp[0].slice(1, -1),
      text: matchText[0].slice(1, -1),
      file: pathMd,
    };
    return objLinks;
  });
  return newFilelinks;
};
// const getArrayObjects = extractLinks(getAbsolutePath(ejmpRut));

// Valida links de los archivos
const validateLinks = (arrayObjetos) => {
  // const arrayObjects = extractLinks(paths);
  const arrayPromesas = arrayObjetos.map((objLink) => {
    return fetch(objLink.href).then((res) => {
      if (res.status >= 200 && res.status < 400) {
        return {
          ...objLink,
          status: res.status,
          statusText: res.statusText,
          message: "ok",
        };
      }
      return {
        ...objLink,
        status: res.status,
        statusText: res.statusText,
        message: "fail",
      };
    });
  });
  return Promise.all(arrayPromesas);
};
// console.log(getArrayObjects);

// saber cantidad de links y si son únicos
const statsLinks = (arrayObjects) => {
  const arraylinks = arrayObjects.map((objcts) => {
    return objcts.href;
  });
  const totalLinks = arraylinks.length;
  const arrayUnics = [];
  arraylinks.forEach((objcts) => {
    if (!arrayUnics.includes(objcts)) {
      arrayUnics.push(objcts);
    }
  });
  return { totalLinks, arrayUnics: arrayUnics.length };
};

// links rotos
const brokenLinks = (ValidateLink) => {
  return ValidateLink.filter((link) => {
    return link.message === "fail";
  }).length;
};

// brokenLinks(arrayDFiveObjcts);
module.exports = {
  pathExists,
  getAbsolutePath,
  fileIsDirectory,
  readDirectory,
  isMd,
  filterPathsMd,
  readFile,
  fileOrDirectory,
  statsLinks,
  extractLinks,
  validateLinks,
  brokenLinks,
};
