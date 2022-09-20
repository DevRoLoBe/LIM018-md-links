const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");
const { error } = require("console");
const ejmpRut = "./miReadme.md";

/**
 * Verifies if a file path exist
 * @param {string} paths: the file ath to verify
 * @returns {boolean} if the file path exist or not
 */
const pathExists = (paths) => {
  return fs.existsSync(paths);
};

const filePathIsDirectory = (filePath) => {
  return fs.statSync(filePath).isDirectory();
};

// convertir la ruta relativa en  absoluta
const getAbsolutePath = (pathToResolve) => {
  return path.isAbsolute(pathToResolve)
    ? pathToResolve
    : path.resolve(pathToResolve);
};
// console.log(pathExists(ejmpRut))

const isMd = (paths) => {
  const pathMd = path.extname(paths);
  if (pathMd == ".md") {
    return true;
  }
  return false;
};
// console.log(isMd(path, {validate: false, stats: true}));
const readFile = (file) => {
  return fs.readFileSync(file, "utf-8");
};

const extractLinks = (pathAbsolut) => {
  const regExp = /\[(.+)\]\((https?:\/\/.+)\)/gi;
  //contiene los links
  const fileLinks = readFile(pathAbsolut).match(regExp);
  // retorna links encontrados
  const newFilelinks = fileLinks.map((links) => {
    const textLink = /\[[^\s]+(.+?)\]/gi;
    const matchText = links.match(textLink);
    const httpsLink = /\((https?.+?)\)/gi;
    const matchHttp = links.match(httpsLink);
    const objLinks = {
      href: matchHttp[0].slice(1, -1),
      text: matchText[0].slice(1, -1),
      file: pathAbsolut,
    };
    return objLinks;
  });
  return newFilelinks;
};
const getArrayObjects = extractLinks(getAbsolutePath(ejmpRut));
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

module.exports = {
  getAbsolutePath,
  isMd,
  readFile,
  extractLinks,
  validateLinks,
  pathExists,
};
