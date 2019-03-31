import createPeriodicCrawler from './create-periodic-crawler';

const defaults: PeriodicCrawlerOptions = {
  proxy: {
    useProxy: false,
    filterProxy: true,
    proxies: ['localhost'],
    urlForTest: 'example.com',
    proxySimpleTestOptions: '<h1>Example Domain</h1>'
  },
  settings: {
    pauseMin: 5,
    pauseMax: 10,
    maxWhileNumber: 5
  },
  gotOptions: {
    timeout: 10000,
    headers: {
      'user-agent': 'Mozilla/5.0'
    }
  }
};

async function periodicCrawler(
  urls: string[],
  options = defaults
): Promise<UrlBodyObject[]> {
  return await createPeriodicCrawler(urls, options);
}

/* eslint-disable fp/no-mutation */
module.exports = periodicCrawler;
export default periodicCrawler;
