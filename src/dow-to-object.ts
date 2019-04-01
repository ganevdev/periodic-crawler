import _ from 'lodash/fp';
import sleep from 'sleep';
import tunnel from 'tunnel';

import {
  AgentObject,
  PeriodicCrawlerOptionsSettings,
  UrlBodyObject
} from './types';

// urls in, objects wish body out

function makeGotOptions(proxyToUse: AgentObject): unknown {
  if (proxyToUse.host === 'localhost') {
    return {
      timeout: 10000
    };
  } else {
    return {
      agent: tunnel.httpOverHttp({
        proxy: proxyToUse
      }),
      timeout: 10000
    };
  }
}

async function dowToObjectMap(
  { pauseMin, pauseMax }: PeriodicCrawlerOptionsSettings,
  proxyAgents: AgentObject[],
  gotOptions: Record<string, any>,
  gotLibrary,
  arrayUrls: string[]
): Promise<UrlBodyObject[]> {
  const arrayUrlsObjects = await Promise.all(
    arrayUrls.map(async (url) => {
      try {
        const proxyToUse = proxyAgents[_.random(0, proxyAgents.length - 1)];
        const request = await gotLibrary.get(
          url,
          _.assign(makeGotOptions(proxyToUse), gotOptions)
        );
        sleep.sleep(_.random(pauseMin, pauseMax));
        if (request.statusCode === 200) {
          return { url: url, dowDate: new Date(), body: request.body };
        } else {
          return '';
        }
      } catch (error) {
        // console.warn(url);
        // console.error(error);
        return '';
      }
    })
  );
  return _.compact(arrayUrlsObjects);
}

function onlyUrl(
  array: { url: string; dowDate: Date; body: string }[]
): string[] {
  const arrayNew = array.map((object) => {
    if (object && object.url) {
      return object.url;
    } else {
      return '';
    }
  });
  return _.compact(arrayNew);
}

/* eslint-disable fp/no-loops */
/* eslint-disable fp/no-mutation */
const dowToObject = _.curry(
  async (
    { pauseMin, pauseMax, maxWhileNumber }: PeriodicCrawlerOptionsSettings,
    proxyAgents: AgentObject[],
    gotOptions: Record<string, any>,
    gotLibrary: any,
    arrayUrls: string[]
  ): Promise<UrlBodyObject[]> => {
    let whileGo = true;
    let whileGoNumber = 0;
    let arrayUrlsToDow = arrayUrls;
    const baseArray: UrlBodyObject = {
      url: 'string',
      dowDate: new Date(),
      body: 'string'
    };
    let arrayWishObjects: UrlBodyObject[] = [baseArray];
    let arrayWishObjectsNew: UrlBodyObject[] = [baseArray];
    do {
      whileGoNumber = whileGoNumber + 1;
      if (whileGoNumber >= maxWhileNumber) {
        console.warn(maxWhileNumber + ' reached!');
        whileGo = false;
      }
      arrayWishObjectsNew = await dowToObjectMap(
        { pauseMin, pauseMax, maxWhileNumber },
        proxyAgents,
        gotOptions,
        gotLibrary,
        arrayUrlsToDow
      );
      arrayWishObjects = [...arrayWishObjects, ...arrayWishObjectsNew];
      if (arrayWishObjects.length >= arrayUrlsToDow.length) {
        whileGo = false;
        // return arrayWishObjects;
      } else {
        arrayUrlsToDow = _.difference(
          onlyUrl(arrayWishObjects),
          arrayUrlsToDow
        );
      }
    } while (whileGo);
    //
    return _.flow(
      _.without([baseArray]),
      _.compact,
      _.uniq
    )(arrayWishObjects);
  }
);
/* eslint-enable fp/no-loops */
/* eslint-enable fp/no-mutation */

export default dowToObject;
