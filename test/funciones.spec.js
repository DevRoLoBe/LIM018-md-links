const { default: jestHoist } = require("babel-plugin-jest-hoist");
const { getAbsolutePath,validateLinks } = require("../funciones.js");
const fetch = require("node-fetch");
const { describe } = require("yargs");
const { it } = require("jest-circus");

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

describe('Testing validateLinks', ()=>{

  const directory = './folderOone';

  it('should resolve successfully', ()=>{

  })

})
