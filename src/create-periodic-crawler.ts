import got from 'got';

import dowToObject from './dow-to-object';
import proxyFilter from './proxy-filter';
import proxyToAgent from './proxy-to-agent';
import {
  AgentObject,
  PeriodicCrawlerOptionsDefaults,
  PeriodicCrawlerOptionsProxy,
  UrlBodyObject
} from './types';

async function whatProxyToUse(
  options: PeriodicCrawlerOptionsProxy
): Promise<AgentObject[]> {
  if (options.useProxy && options.proxies !== ['localhost']) {
    if (options.filterProxy) {
      const filteredProxies = await proxyFilter(
        options.proxies,
        options.urlForTest,
        options.proxySimpleTestOptions,
        { throwErrorIfNoProxies: true }
      );
      return proxyToAgent(filteredProxies);
    } else {
      return proxyToAgent(options.proxies);
    }
  } else {
    return [{ host: 'localhost' }];
  }
}

export default async function createPeriodicCrawler(
  arrayUrls: string[],
  options: PeriodicCrawlerOptionsDefaults
): Promise<UrlBodyObject[]> {
  const filteredProxiesAgents = await whatProxyToUse(options.proxy);
  const gotOptions = options.gotOptions;
  return await dowToObject(
    options.settings,
    filteredProxiesAgents,
    gotOptions,
    got,
    arrayUrls
  );
}
