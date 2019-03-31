import splitProxy from 'split-proxy';

// Функция которая получает строку-прокси, а выдает объект agent

export default function proxyToAgent(
  proxies: (string | AgentObject)[]
): AgentObject[] {
  return proxies.map((oneProxy) => {
    if (typeof oneProxy === 'string') {
      const proxyObject = splitProxy(oneProxy);
      return {
        host: proxyObject.ipAddress,
        port: Number(proxyObject.port),
        proxyAuth: proxyObject.login + ':' + proxyObject.password
      };
    } else {
      return oneProxy;
    }
  });
}
