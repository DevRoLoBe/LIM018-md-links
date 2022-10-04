const { getAbsolutePath,validateLinks } = require("../funciones.js");
const fetch = require("node-fetch");
jest.mock("node-fetch");

// fetch ("hola")
// describe("getAbsolutePath()", () => {
//   it("si se le pasa una ruta absoluta retorna la misma ruta", () => {
//     // DADO
//     const absolutePath =
//       "/d/LABORATORIA/md-links/LIM018-md-link/test/test-readme.md";

//     // CUANDO
//     const resolvedPath = getAbsolutePath(absolutePath);
//     // ENTONCES
//     expect(resolvedPath).toBe(absolutePath);
//   });
//   // it ('si se le pasa una ruta relativa debe retornar absoluta')
// });

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
  it.only('should resolve successfully', ()=>{
    fetch.mockReturnValueOnce({status:200 , estatusText: 'OK'});
    validateLinks(arrayParam).then((result)=> {
  expect (result).toEqual(arrResult);
    })
  })
});
