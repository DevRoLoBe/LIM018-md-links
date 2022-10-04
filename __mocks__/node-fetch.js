const fetch = jest.fn( (url) => {
  //devueve una promesa

  return Promise.resolve({
    status: 200,
    statusText: 'OK',
  });
})
module.exports = fetch;
