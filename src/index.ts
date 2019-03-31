import jsonfile from 'jsonfile';
import path from 'path';

import periodicCrawler from './periodic-crawler';

async function indexTest(): Promise<void> {
  const res = await periodicCrawler(['example.com'], {
    proxy: {
      useProxy: false,
      proxies: ['localhost'],
      url: 'example.com',
      proxySimpleTestOptions: '<h1>Example Domain</h1>'
    },
    settings: {
      pauseMin: 5,
      pauseMax: 10,
      maxWhileNumber: 5
    }
  });
  console.log(res);
  jsonfile.writeFileSync(path.resolve('./res.json'), res, {
    spaces: 2,
    EOL: '\r\n'
  });
}
indexTest();
