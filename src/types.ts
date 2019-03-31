export interface AgentObject {
  host: string;
  port?: number;
  proxyAuth?: string;
}

export interface UrlBodyObject {
  url: string;
  dowDate: Date;
  body: string;
}

export interface PeriodicCrawlerOptionsProxy {
  useProxy: boolean;
  filterProxy: boolean;
  proxies: string[];
  urlForTest: string;
  proxySimpleTestOptions: string | object;
}

export interface PeriodicCrawlerOptions {
  proxy: PeriodicCrawlerOptionsProxy;
  settings: {
    pauseMin: number;
    pauseMax: number;
    maxWhileNumber: number;
  };
  gotOptions: Record<string, any>;
}
