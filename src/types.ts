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

export interface PeriodicCrawlerOptionsSettings {
  pauseMin: number;
  pauseMax: number;
  maxWhileNumber: number;
}

export interface PeriodicCrawlerOptionsDefaults {
  proxy: PeriodicCrawlerOptionsProxy;
  settings: PeriodicCrawlerOptionsSettings;
  gotOptions: Record<string, any>;
}
