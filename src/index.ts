import _ from 'lodash/fp';

import createPeriodicCrawler from './create-periodic-crawler';
import { PeriodicCrawlerOptionsDefaults, UrlBodyObject } from './types';

const defaults: PeriodicCrawlerOptionsDefaults = {
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
  options?: Record<string, any>
): Promise<UrlBodyObject[]> {
  return await createPeriodicCrawler(urls, _.assign(defaults, options));
}

/* eslint-disable fp/no-mutation */
module.exports = periodicCrawler;
export default periodicCrawler;
