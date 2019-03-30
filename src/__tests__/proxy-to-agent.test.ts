import proxyToAgent from '../proxy-to-agent';

describe('proxyToAgent', () => {
  test('proxyToAgent() string', () => {
    const proxyAgent = proxyToAgent('5.188.181.243:8074@ZWRpYzot:lWkSyUuH');
    expect(proxyAgent).toEqual([
      {
        host: '5.188.181.243',
        port: 8074,
        proxyAuth: 'ZWRpYzot:lWkSyUuH'
      }
    ]);
  });
  test('proxyToAgent() array', () => {
    const proxyAgent = proxyToAgent([
      '5.188.181.243:8074@ZWRpYzot:lWkSyUuH',
      '5.188.181.248:5338@hpG7jifr:Ho2atnDl'
    ]);
    expect(proxyAgent).toEqual([
      {
        host: '5.188.181.243',
        port: 8074,
        proxyAuth: 'ZWRpYzot:lWkSyUuH'
      },
      {
        host: '5.188.181.248',
        port: 5338,
        proxyAuth: 'hpG7jifr:Ho2atnDl'
      }
    ]);
  });
});
