import got from 'got';

import dowToObject from './dow-to-object';
import proxyFilter from './proxy-filter';
import proxyToAgenet from './proxy-to-agent';

async function whatProxyToUse(
  options: {
    useProxy: boolean;
    proxies: string[];
    url: string;
    proxySimpleTestOptions: string | object;
  } = {
    useProxy: true,
    proxies: ['localhost'],
    url: 'example.com',
    proxySimpleTestOptions: '<h1>Example Domain</h1>'
  }
): Promise<AgentObject[]> {
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

export default async function periodicCrowler(
  arrayUrls: string[],
  options: {
    proxy: {
      useProxy: boolean;
      proxies: string[];
      url: string;
      proxySimpleTestOptions: string | object;
    };
    settings: {
      pauseMin: number;
      pauseMax: number;
      maxWhileNumber: number;
    };
  } = {
    proxy: {
      useProxy: true,
      proxies: ['localhost'],
      url: 'example.com',
      proxySimpleTestOptions: '<h1>Example Domain</h1>'
    },
    settings: {
      pauseMin: 5,
      pauseMax: 10,
      maxWhileNumber: 5
    }
  }
): Promise<UrlBodyObject[]> {
  const filteredProxiesAgenets = await whatProxyToUse(options.proxy);
  const gotOptions = { timeout: 10000 };
  return await dowToObject(
    options.settings,
    filteredProxiesAgenets,
    gotOptions,
    got,
    arrayUrls
  );
}
