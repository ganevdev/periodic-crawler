import createPeriodicCrawler from './create-periodic-crawler';

const defaults: PeriodicCrawlerOptions = {
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
  },
  gotOptions: {
    timeout: 10000,
    headers: {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
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
