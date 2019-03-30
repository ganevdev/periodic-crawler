// import proxyToString from 'proxy-to-string';
import splitProxy from 'split-proxy';

// Функция которая получает массив из строк и /или агентов, а выдает только объекты-агенты

export default function proxiesToAgent(
  proxies: (string | AgentObject)[]
): AgentObject[] {
  return proxies.map((oneProxy) => {
    if (typeof oneProxy === 'string') {
      const proxyObject = splitProxy(oneProxy);
      if (proxyObject.login) {
        return {
          host: proxyObject.ipAddress,
          port: Number(proxyObject.port),
          proxyAuth: proxyObject.login + ':' + proxyObject.password
        };
      } else {
        return {
          host: proxyObject.ipAddress,
          port: Number(proxyObject.port)
        };
      }
    } else {
      return oneProxy;
    }
  });
}
