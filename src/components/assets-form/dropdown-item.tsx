'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import { FaAngleDown, FaAngleRight } from 'react-icons/fa6';

import { unit } from '@/store/units';
import { asset } from '@/store/assets';

import * as t from './@types';
import { handleIconDisplay, FormatIcon } from './@utils';

const DropdownItem = ({ id, name, sensorType, type }: t.DropdownItemProps) => {
  const [showItems, setShowItems] = useState(false);
  const [subitems, setSubitems] = useState<t.ElementNode[]>([]);

  // Note: a way to remove obeserver
  const unitName = unit.getState()?.name;

  const handleShowDetails = async () => {
    setShowItems(!showItems);

    if (showItems) return;
    asset.setState({ name: 'test', parentId: '12312', id: '123131' });

    const query = new URLSearchParams({
      code: id,
      page: '1',
      size: '50',
    }).toString();

    const res = await fetch(`api/${unitName}/assets?${query}`);

    const { total, assets } = (await res.json()) as any;

    setSubitems(assets);
  };

  const buttonIcon = (
    <FormatIcon size={12}>{showItems ? FaAngleDown : FaAngleRight}</FormatIcon>
  );

  return (
    <div className="cursor-pointer text-sm">
      <div onClick={handleShowDetails} className="flex gap-2 items-center">
        {buttonIcon}
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
          {subitems?.map((item) => (
            <DropdownItem
              key={item.id}
              {...item}
              sensorType={item.sensorType}
              type={item.type}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownItem;
