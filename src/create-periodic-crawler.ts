import got from 'got';

import dowToObject from './dow-to-object';
import proxyFilter from './proxy-filter';
import proxyToAgenet from './proxy-to-agent';

async function whatProxyToUse(options: {
  useProxy: boolean;
  proxies: string[];
  url: string;
  proxySimpleTestOptions: string | object;
}): Promise<AgentObject[]> {
  if (options.useProxy && options.proxies !== ['localhost']) {
    const filteredProxies = await proxyFilter(
      options.proxies,
      options.url,
      options.proxySimpleTestOptions,
      { throwErrorIfNoProxies: true }
    );
    return proxyToAgenet(filteredProxies);
  } else {
    return [{ host: 'localhost' }];
  }
}

export default async function createPeriodicCrawler(
  arrayUrls: string[],
  options: PeriodicCrawlerOptions
): Promise<UrlBodyObject[]> {
  const filteredProxiesAgenets = await whatProxyToUse(options.proxy);
  const gotOptions = options.gotOptions;
  return await dowToObject(
    options.settings,
    filteredProxiesAgenets,
    gotOptions,
    got,
    arrayUrls
  );
}
