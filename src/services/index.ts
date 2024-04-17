import axios from 'axios';
import * as t from './@types'

const _60_SECS = 10 * 60;

const api = axios.create({
  timeout: _60_SECS,
  headers: { 'Content-Type': 'application/json' }
});

// TODO: add an anti-corruption layer when its finished.

const getPaginatedAssets = async (filters: t.PaginationFilters) => {
  const { data } = await api.get<t.PaginatedAssets>(`api/${filters.unitName}/assets`, {
    params: filters,
  })
  return data
}

const getAvaiableUnits = async () => {
  const { data } = await api.get<t.UnitList>('/api/units')
  return data
}

export { getPaginatedAssets, getAvaiableUnits }


