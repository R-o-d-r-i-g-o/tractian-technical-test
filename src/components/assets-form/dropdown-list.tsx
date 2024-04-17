'use client';

import { memo, useEffect, FC } from 'react';

import { useQuery } from '@tanstack/react-query';

import DropdownItem from './dropdown-item';
import { unit } from '@/store/units';

import { getPaginatedAssets } from '@/services';

import * as t from './@types';

const Dropdown: FC<t.DropdownListProps> = ({ search, onLoaded }) => {
  const unitName = unit((state) => state?.name) ?? '';

  const { isLoading, data, refetch } = useQuery<t.PaginatedAssets | null>({
    enabled: false,
    queryKey: ['dropdown-list'],
    queryFn: () => getPaginatedAssets({ unitName, search }),
  });

  useEffect(() => {
    const handleData = async () => {
      await refetch();

      if (!isLoading && onLoaded) onLoaded();
    };

    handleData();
  }, [unitName]);

  return (
    <>
      {data?.assets.map((item) => (
        <DropdownItem key={item.id} {...item} />
      ))}
    </>
  );
};

export default memo(Dropdown);
