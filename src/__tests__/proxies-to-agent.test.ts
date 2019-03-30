import proxiesToAgent from '../proxies-to-agent';

const proxiesTestArray = [
  '11.11.11:9999@login:pass',
  '11.11.11:9999',
  {
    host: '11.22.33',
    port: 9999,
    proxyAuth: 'login:pass'
  },
  {
    host: '11.22.33',
    port: 9999
  }
];

describe('proxiesToAgent', () => {
  test('proxiesToAgent()', () => {
    const resArray = proxiesToAgent(proxiesTestArray);
    expect(resArray).toEqual([
      { host: '11.11.11', port: 9999, proxyAuth: 'login:pass' },
      { host: '11.11.11', port: 9999 },
      {
        host: '11.22.33',
        port: 9999,
        proxyAuth: 'login:pass'
      },
      {
        host: '11.22.33',
        port: 9999
      }
    ]);
  });
});
