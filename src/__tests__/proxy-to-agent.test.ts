import proxyToAgent from '../proxy-to-agent';
// const proxyToAgent = require('../proxy-to-agent');

describe('proxy-to-agent', () => {
  test('proxyToAgent', () => {
    const proxyToAgentTest = proxyToAgent([
      '123.123.2.42:8080@superLogin:superPassword',
      {
        host: '123.123.2.42',
        port: 9090,
        proxyAuth: 'superLogin:superPassword'
      }
    ]);
    // console.log(proxyToAgentTest);
    expect(proxyToAgentTest).toEqual([
      {
        host: '123.123.2.42',
        port: 8080,
        proxyAuth: 'superLogin:superPassword'
      },
      {
        host: '123.123.2.42',
        port: 9090,
        proxyAuth: 'superLogin:superPassword'
      }
    ]);
  });
});
