const { getAbsolutePath } = require('../index.js')

describe('getAbsolutePath()', () => {

  it('si se le pasa una ruta absoluta retorna la misma ruta', () => {
    // DADO
    const absolutePath = '/d/LABORATORIA/md-links/LIM018-md-link/test/test-readme.md'

    // CUANDO
    const resolvedPath = getAbsolutePath(absolutePath)

    // ENTONCES
    expect(resolvedPath).toBe(absolutePath)
  });
  it ('si se le pasa una ruta relativa debe retornar absoluta')

});
