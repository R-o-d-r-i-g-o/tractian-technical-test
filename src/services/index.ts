import axios from 'axios';

import { cacheOperations } from './cache-storage'
import { setupCache, buildStorage } from 'axios-cache-interceptor';

import * as t from './@types'

const _60_SECS = 1000 * 60;
const _15_MINS = 1000 * 60 * 15;

// TODO: when react-query new version lib gives a better suport to cache, use it directly.

const api = axios.create({
  timeout: _60_SECS,
  headers: { 'Content-Type': 'application/json' }
});

// Note: remove browser inversion with property "interpretHeader".
const cachedApi = setupCache(api, {
  ttl: _15_MINS,
  interpretHeader: false,
  storage: buildStorage(cacheOperations),
})

let searchedChildren: t.ElementNode[] | null = null;

// TODO: add an anti-corruption layer when its finished.

const getPaginatedAssets = async (filters: t.PaginationFilters) => {
  const { data } = await cachedApi.get<t.PaginatedAssets>(`api/${filters.unitName}/assets`, {
    params: filters,
  })
  searchedChildren = data?.assets ?? []
  return data
}

const getAvaiableUnits = async () => {
  const { data } = await cachedApi.get<t.UnitList>('/api/units')
  return data
}

export { getPaginatedAssets, getAvaiableUnits, searchedChildren }


