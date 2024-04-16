'use client';

import Image from 'next/image';
import React, { memo, useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { IconType } from 'react-icons';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa6';

import { asset } from '@/store/assets';
import { unit } from '@/store/units';

import ApexAssets from '../../../public/mock/apex-unit/_assets.json';
import ApexLocations from '../../../public/mock/apex-unit/_locations.json';

const content = ApexLocations; // ApexAssets.concat(ApexLocations)

type Props = {
  search: string;
  onLoaded?: () => void;
};

const getLocations = (search: string) => {
  search = search?.trim().toLowerCase();

  return content.filter(
    (item) =>
      item.parentId == null &&
      (search === '' || item.name.toLowerCase().includes(search))
  );
};

const getAssociatedLocations = (id: string) => {
  return content.filter((item) => {
    return item.parentId == id;
  });
};

const Dropdown = ({ search, onLoaded }: Props) => {
  const [data, setData] = useState<typeof ApexLocations>([]);
  const unitName = unit((state) => state?.name);

  const handleData = async () => {
    const res = await fetch(`api/${unitName}/assets?page=1`);

    const { total, assets } = (await res.json()) as any;
    setData(assets);
  };

  useEffect(() => {
    handleData();
    if (onLoaded) onLoaded();
  }, []);

  return (
    <>
      {data.map((item) => (
        <DropdownItem key={item.id} {...item} />
      ))}
    </>
  );
};

type DropdownItemProps = {
  id: string;
  name: string;
};

type FormatIconProps = {
  size: number;
  children: IconType;
};

const FormatIcon = ({ children, size }: FormatIconProps) => {
  const IconComponent = children;
  return <IconComponent size={size} />;
};

const DropdownItem = ({ id, name }: DropdownItemProps) => {
  const [showItems, setShowItems] = useState(false);
  const [subitems, setSubitems] = useState<typeof ApexLocations>([]);
  const unitName = unit((state) => state?.name);

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
        <Image src="/icons/location.svg" alt="" height={14} width={14} />
        {name}
      </div>
      {showItems && (
        <div className="min-h-min ml-4">
          {subitems?.map((item) => (
            <DropdownItem key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(Dropdown);
