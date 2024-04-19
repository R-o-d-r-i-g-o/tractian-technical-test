import * as t from './@types';
import { BuildStorage } from 'axios-cache-interceptor';

// TODO: When application grows, integrate redis or firebase this case.
// Do not use native next-cache for this purpose.

// Define the cache storage object
const storageCache: t.CacheStorage = {};

// Define the cache operation methods
const cacheOperations: BuildStorage = {
  find: async (key: string) => storageCache[key],
  set: async (key: string, value: any) => {
    storageCache[key] = value;
  },
  remove: async (key: string) => {
    delete storageCache[key];
  },
};

export { storageCache, cacheOperations };
