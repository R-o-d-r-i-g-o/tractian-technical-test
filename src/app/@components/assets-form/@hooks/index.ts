
import { useQuery } from '@tanstack/react-query';
import { getPaginatedAssets } from '@/services';

import { unit } from '@/store/units';
import { asset } from '@/store/assets';
import { useEffect, useState } from 'react';

import useToast from '@/hooks/useToast';

import * as t from '../@types'

const useDropdownItem = ({ sensorType, status, id, name }: t.DropdownItemHookProps) => {
  const { failure, warning } = useToast();

  const [disableSubitens] = useState(!!sensorType)
  const [showItems, setShowItems] = useState(false);

  // Note: a way to remove obeserver
  const unitName = unit.getState()?.name ?? '';

  const query = useQuery({
    enabled: false,
    queryKey: ['dropdown-list', id],
    queryFn: async () => await getPaginatedAssets({ unitName, code: id }),
  });

  if (query.isError || query.error) {
    failure(query.error?.toString() ?? 'Erro ao listar os ativos');
  }

  if (query.data?.assets && query.data?.assets.length < 1) {
    warning("Esse elemento não possúi itens vinculados")
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
  const unitName = unit((state) => state?.name) ?? '';

  const { isLoading, data, isError, error, refetch } =
    useQuery<t.PaginatedAssets | null>({
      enabled: false,
      queryKey: ['dropdown-list'],
      queryFn: async () => await getPaginatedAssets({ unitName, search }),
    });

  if (isError || error) {
    failure(error?.toString() ?? 'Erro ao listar os ativos');
  }

  useEffect(() => {
    const handleData = async () => {
      await refetch();

      if (!isLoading && onLoaded) onLoaded();
    };

    handleData();
  }, [unitName]);

  return { data }
}

export { useDropdownItem, useDropdownList };