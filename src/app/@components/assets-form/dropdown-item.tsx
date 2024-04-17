'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { FaAngleDown, FaAngleRight } from 'react-icons/fa6';

import { useQuery } from '@tanstack/react-query';
import { getPaginatedAssets } from '@/services';

import { unit } from '@/store/units';
import { asset } from '@/store/assets';

import * as t from './@types';
import { handleIconDisplay, FormatIcon } from './@utils';

const DropdownItem = ({ id, name, sensorType, type }: t.DropdownItemProps) => {
  const [showItems, setShowItems] = useState(false);

  // Note: a way to remove obeserver
  const unitName = unit.getState()?.name ?? '';
  const disableSubitens = !sensorType;

  const { data: subitems, refetch } = useQuery({
    enabled: false,
    queryKey: ['dropdown-list', id],
    queryFn: () => getPaginatedAssets({ unitName, code: id }),
  });

  const handleShowDetails = async () => {
    asset.setState({ name, id, parentId: '12312' });
  };

  const showSubItens = async () => {
    setShowItems(!showItems);

    if (!showItems) return;
    await refetch();
  };

  const buttonIcon = (
    <FormatIcon size={12}>{showItems ? FaAngleDown : FaAngleRight}</FormatIcon>
  );

  return (
    <div className={`cursor-pointer text-sm ${disableSubitens ? '' : 'ml-5'}`}>
      <div
        onClick={!disableSubitens ? handleShowDetails : showSubItens}
        className="flex gap-2 items-center"
      >
        {disableSubitens && buttonIcon}
        <Image
          src={handleIconDisplay(type, sensorType) || ''}
          alt={`${name}-image`}
          height={14}
          width={14}
        />
        {name}
      </div>
      {showItems && (
        <div className="min-h-min ml-5">
          {subitems?.assets.map((item) => (
            <DropdownItem key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownItem;
