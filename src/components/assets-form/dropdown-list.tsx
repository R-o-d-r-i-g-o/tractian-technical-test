'use client';

import React, { memo, useState, useEffect, FC } from 'react';

import { unit } from '@/store/units';
import DropdownItem from './dropdown-item';

import * as t from './@types';

const Dropdown: FC<t.DropdownListProps> = ({ search, onLoaded }) => {
  const [data, setData] = useState<t.ElementNode[]>([]);
  const unitName = unit((state) => state?.name);

  const handleData = async () => {
    const res = await fetch(`api/${unitName}/assets?page=1`);

    const { total, assets } = (await res.json()) as any;
    setData(assets);
  };

  useEffect(() => {
    handleData();
    if (onLoaded) onLoaded();
  }, [unitName]);

  return (
    <>
      {data?.map((item) => (
        <DropdownItem
          key={item.id}
          {...item}
          sensorType={item.sensorType as t.SensorType}
          type={item.type as t.AssetType}
        />
      ))}
    </>
  );
};

export default memo(Dropdown);
