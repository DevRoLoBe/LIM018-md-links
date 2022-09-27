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

// Validamos que el archivo sea de extención .md
const isMd = (paths) => {
  const pathMd = path.extname(paths);
  if (pathMd == ".md") {
    return true;
  }
  return false;
};
// console.log(isMd(path, {validate: false, stats: true}));

const extractLinks = (pathAbsolut) => {
  const regExp = /\[(.+)\]\((https?:\/\/.+)\)/gi;
  const readfile = fs.readFileSync(pathAbsolut, "utf8");
  //contiene los links
  const fileLinks = readfile.match(regExp);
  if (readfile === "") {
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
const arrayDFiveObjcts = validateLinks(getArrayObjects).then((result) => {
  return result;
});

const statsLinks = (arrayObjects) => {
  const arraylinks = arrayObjects.map((objcts) => {
    return objcts.href;
  });
  // console.log(arraylinks.length);
  const totalLinks = arraylinks.length;
  // console.log(totalLinks);
  const arrayUnics = [];
  arraylinks.forEach((objcts) => {
    if (!arrayUnics.includes(objcts)) {
      arrayUnics.push(objcts);
      console.log(arrayUnics);
    }
  });
  return { totalLinks, arrayUnics: arrayUnics.length };
};
const brokenLinks = (arrayObjects) => {
  return arrayObjects.then((objLinks) => {
    const linksFilters = objLinks.filter((link) => {
      return link.message === "fail";
    });
    return linksFilters.length;
  });
};
brokenLinks(arrayDFiveObjcts);
module.exports = {
  getAbsolutePath,
  isMd,
  statsLinks,
  extractLinks,
  validateLinks,
  pathExists,
  brokenLinks,
};
