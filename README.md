# Periodic Crawler

[![Build Status](https://travis-ci.com/Ganevru/periodic-crawler.svg?branch=master)](https://travis-ci.com/Ganevru/periodic-crawler)
[![npm](https://img.shields.io/npm/v/periodic-crawler.svg?style=flat-square)](http://npm.im/periodic-crawler)

I do NOT recommend using it in real projects.

```
npm i periodic-crawler
```

## Exsampls

```js
const periodicCrawler = require('periodic-crawler');

async () => {
  const res = await periodicCrawler(['www.example.com/'], {
    proxy: {
      useProxy: false
    },
    settings: {
      pauseMin: 1,
      pauseMax: 2
    }
  });
  console.log(res);
};

// in console:
// [
//   {
//     "url": "www.example.com/",
//     "dowDate": "2019-04-01T02:39:55.268Z",
//     "body": "<!doctype html>\n<html>\n<head></head>\n\n<body>\n<div>\n    <h1>Example Domain</h1>\n    <p>This domain is established to be used for illustrative examples in documents. You may use this\n    domain in examples without prior coordination or asking for permission.</p>\n    <p><a href=\"http://www.iana.org/domains/example\">More information...</a></p>\n</div>\n</body>\n</html>\n"
//   }
// ]
```

## TODO

- [Puppeteer](https://pptr.dev/) option for scrapping
