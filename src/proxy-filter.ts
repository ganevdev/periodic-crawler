// Функция для фильтрации всех прокси из project-settings, возвращающая только работающие прокси
// если работающих прокси нет - останавливает работу скрипта и выводит ошибку

// import got from 'got';
import _ from 'lodash/fp';
import proxySimpleTest from 'proxy-simple-test';

export default async function proxyFilter(
  proxies: string[],
  url: string = 'example.com',
  proxySimpleTestOptions: string | object = '<h1>Example Domain</h1>',
  options: {
    throwErrorIfNoProxies: boolean;
  }
): Promise<string[]> {
  try {
    const proxiesArray = await Promise.all(
      await proxies.map(async (proxy) => {
        if (proxy === 'localhost') {
          return '';
        }
        const res = await proxySimpleTest(proxy, url, proxySimpleTestOptions);
        if (res === true) {
          return proxy;
        } else {
          return '';
        }
      })
    );
    const proxiesArrayCompact = await _.compact(proxiesArray);
    if (proxiesArrayCompact.length === 0) {
      if (options.throwErrorIfNoProxies) {
        throw console.error('Нет работающих прокси');
      } else {
        return ['localhost'];
      }
    } else {
      return proxiesArrayCompact;
    }
  } catch (error) {
    throw console.error(error);
  }
}
