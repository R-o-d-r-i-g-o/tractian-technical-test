
import { useQuery } from '@tanstack/react-query';
import { getPaginatedAssets, searchedChildren } from '@/services';

import { PaginationFilters, PaginatedAssets } from '@/services/@types';

import { unit } from '@/store/units';
import { asset } from '@/store/assets';
import { useEffect, useState } from 'react';

import useToast from '@/hooks/useToast';

import * as t from '../@types'


const handleListItems = async (shouldListAll: boolean, filters: PaginationFilters): Promise<PaginatedAssets> => {
  if (shouldListAll) {
    const items = (searchedChildren ?? []).filter(item => item.locationId == filters.code || item.parentId == filters.code)

    return { assets: items, total: items.length }
  }

  return await getPaginatedAssets(filters)
}

const useDropdownItem = ({ sensorType, status, id, name, shouldListAll }: t.DropdownItemHookProps) => {
  const { failure } = useToast();

  const [disableSubitens] = useState(!!sensorType)
  const [showItems, setShowItems] = useState(() => shouldListAll || false);

  // Note: a way to remove obeserver
  const unitName = unit.getState()?.name ?? '';

  const query = useQuery({
    enabled: shouldListAll,
    queryKey: ['dropdown-list', id],
    queryFn: async () => await handleListItems(shouldListAll, { unitName, code: id }),
  });

  if (query.isError || query.error) {
    failure(query.error?.toString() ?? 'Erro ao listar os ativos');
  }

  const handleShowDetails = async () => {
    const invertShowItems = !showItems

    if (disableSubitens) {
      asset.setState({ name, id, status });
      return
    }

    setShowItems(invertShowItems);

    if (!invertShowItems) return;
    await query.refetch();
  };

  return {
    handleShowDetails,
    unitName,
    showItems,
    setShowItems,
    disableSubitens,
    query,
  }
}

const useDropdownList = ({ search, onLoaded }: t.DropdownListProps) => {
  const { failure } = useToast();

  const unitName = unit((state) => state!.name);
  const shouldListAll = !!search

  const { isLoading, data, isError, error, refetch } =
    useQuery<t.PaginatedAssets | null>({
      enabled: false,
      queryKey: ['dropdown-list'],
      queryFn: async () => await getPaginatedAssets({ unitName, search }),
    });

  if (isError || error) failure(error.toString());

  useEffect(() => {
    const handleData = async () => {
      await refetch();

      if (!isLoading && onLoaded) onLoaded();
    };

    handleData();
  }, [unitName]);

  return { data, shouldListAll }
}

export {
  useDropdownList,
  useDropdownItem,
  searchedChildren,
};