import splitProxy from 'split-proxy';

import { AgentObject } from './types';

export default function proxyToAgent(
  proxies: (string | AgentObject)[]
): AgentObject[] {
  return proxies.map(
    (oneProxy): AgentObject => {
      if (typeof oneProxy === 'string') {
        return splitProxy(oneProxy, { mode: 'node-tunnel' });
      } else {
        return oneProxy;
      }
    }
  );
}
