interface AgentObject {
  host: string;
  port: number;
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
