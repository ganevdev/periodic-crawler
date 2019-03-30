// Функция для фильтрации всех прокси из project-settings, возвращающая только работающие прокси
// если работающих прокси нет - останавливает работу скрипта и выводит ошибку

// import got from 'got';
import _ from 'lodash/fp';
import proxySimpleTest from 'proxy-simple-test';

export default async function proxyFilter(
  agentProxies: AgentObject[],
  url: string = 'example.com',
  options: string | object = '<h1>Example Domain</h1>'
): Promise<AgentObject[]> {
  try {
    const proxiesArray = await Promise.all(
      await agentProxies.map(async (agentProxie) => {
        const proxyString = 
        const res = await proxySimpleTest(proxyString, url, options);
        if (res === true) {
          return agentProxie;
        } else {
          return '';
        }
      })
    );
    const proxiesArrayCompact = await _.compact(proxiesArray);
    if (proxiesArrayCompact.length === 0) {
      throw console.error('Нет работающих прокси');
    } else {
      return proxiesArrayCompact;
    }
  } catch (error) {
    throw console.error(error);
  }
}
