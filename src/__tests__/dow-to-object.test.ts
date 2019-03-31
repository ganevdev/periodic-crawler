const onlyUrl = require('../dow-to-object').__get__('onlyUrl');

describe('onlyUrl', () => {
  test('onlyUrl()', () => {
    const onlyUrlArray = onlyUrl([
      {
        url: 'example.com/test1',
        dowDate: new Date(),
        body: '<h1>some test</h1>'
      },
      {
        url: 'example.com/test-folder/test2',
        dowDate: new Date(),
        body: '<h1>some test2</h1>'
      }
    ]);
    expect(onlyUrlArray).toEqual([
      'example.com/test1',
      'example.com/test-folder/test2'
    ]);
  });
});
