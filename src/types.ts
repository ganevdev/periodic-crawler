interface AgentObject {
  host: string;
  port?: number;
  proxyAuth?: string;
}

interface AgentFun {
  proxy: { host: string; port?: string; proxyAuth?: string };
}

interface UrlBodyObject {
  url: string;
  dowDate: Date;
  body: string;
}

interface PeriodicCrawlerOptions {
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
  gotOptions: Record<string, any>;
}
