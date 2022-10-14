const { getAbsolutePath,validateLinks , isMd, extractLinks, readFile} = require("../funciones.js");

const fetch = require("node-fetch");
jest.mock("node-fetch");
describe("getAbsolutePath()", () => {
  it("si se le pasa una ruta absoluta retorna la misma ruta", () => {
    // DADO
    const absolutePath =
      "/d/LABORATORIA/md-links/LIM018-md-link/test/test-readme.md";

    // CUANDO
    const resolvedPath = getAbsolutePath(absolutePath);
    // ENTONCES
    expect(resolvedPath).toBe(absolutePath);
  });
  // it ('si se le pasa una ruta relativa debe retornar absoluta')
});
describe('ruta con extension md ', () => {
  const path = './test-readme.md';
  const path1 = '../test/folderOone/prueba.jpg';
  it('is isMd a function', () => {
    expect(typeof isMd).toBe('function');
  });

  it('si es extension md', () => {
    expect(isMd(path)).toBeTruthy();
  });

  it('no es extension md', () => {
    expect(isMd(path1)).toBeFalsy();
  });
});
describe('extract Links', () => {
  it('archivo esta vacio', () => {
    const path1 = './folderOone/pruebaVacia.md';
    expect(extractLinks(readFile(path1), path1)).toEqual([]);
  });
  it('archivo no contiene links', () => {
    const path2 = './folderOone/pruebaNotLinks.md';
    expect(extractLinks(readFile(path2), path2)).toEqual([]);
  });
  it('archivo con links, extraer los link', () => {
    const path = '../prueba.md';
    const objetos = [
      {
        href: 'https://nodejs.org/',
    text: 'Node.js',
    file: path,
      },
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: path,
      },
      {
        href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg',
    text: 'md-links',
    file: path,
      },
      ]
      expect(extractLinks(readFile(path), path)).toEqual(objetos);
  });
});
describe('Testing validateLinks', ()=>{
  const arrayParam = [
    {
      href: 'https://jestjs.io/docs/es-ES/getting-started',
      text: 'Empezando con Jest - Documentación oficial',
      file: 'D:\\LABORATORIA\\md-links\\LIM018-md-links\\miReadme.md'
    },
    {
      href: 'https://jestjs.io/docs/es-ES/asynchronous',
      text: 'Tests de código asincrónico con Jest - Documentación oficial',
      file: 'D:\\LABORATORIA\\md-links\\LIM018-md-links\\miReadme.md'
    },
    {
      href: 'https://jestjs.io/docs/es-ES/asynchronous',
      text: 'Tests de código asincrónico con Jest - Documentación oficial',
      file: 'D:\\LABORATORIA\\md-links\\LIM018-md-links\\miReadme.md'
    }
  ]
  const arrResult = [
    {
      href: 'https://jestjs.io/docs/es-ES/getting-started',
      text: 'Empezando con Jest - Documentación oficial',
      file: 'D:\\LABORATORIA\\md-links\\LIM018-md-links\\miReadme.md',
      status: 400,
      statusText: 'fail',
      message: 'fail'
    },
    {
      href: 'https://jestjs.io/docs/es-ES/asynchronous',
      text: 'Tests de código asincrónico con Jest - Documentación oficial',
      file: 'D:\\LABORATORIA\\md-links\\LIM018-md-links\\miReadme.md',
      status: 200,
      statusText: 'OK',
      message: 'ok'
    },
    {
      href: 'https://jestjs.io/docs/es-ES/asynchronous',
      text: 'Tests de código asincrónico con Jest - Documentación oficial',
      file: 'D:\\LABORATORIA\\md-links\\LIM018-md-links\\miReadme.md',
      status: 200,
      statusText: 'OK',
      message: 'ok'
    }
  ]
  it('should resolve successfully', ()=>{
    fetch.mockResolvedValueOnce({status:400,  statusText: 'fail'});
    validateLinks(arrayParam).then((result)=> {
  expect (result).toEqual(arrResult);
    })
  })
});
