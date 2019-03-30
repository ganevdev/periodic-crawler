// import got from 'got';
import _ from 'lodash/fp';

const onlyUrl = require('../dow-to-object').__get__('onlyUrl');

/* eslint-disable sonarjs/no-duplicate-string */

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

describe('some lodash', () => {
  test('empty object', () => {
    expect(_.assign({}, { time: 10000 })).toEqual({ time: 10000 });
    expect(_.assign(undefined, { time: 10000 })).toEqual({ time: 10000 });
    expect(_.assign({ time: 10 }, { time: 10000 })).toEqual({ time: 10000 });
  });
});
