interface AgentObject {
  host: string;
  port?: number;
  proxyAuth?: string;
}

interface UrlBodyObject {
  url: string;
  dowDate: Date;
  body: string;
}

interface PeriodicCrawlerOptionsProxy {
  useProxy: boolean;
  filterProxy: boolean;
  proxies: string[];
  urlForTest: string;
  proxySimpleTestOptions: string | object;
}

interface PeriodicCrawlerOptions {
  proxy: PeriodicCrawlerOptionsProxy;
  settings: {
    pauseMin: number;
    pauseMax: number;
    maxWhileNumber: number;
  };
  gotOptions: Record<string, any>;
}
