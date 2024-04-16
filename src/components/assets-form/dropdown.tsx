'use client';

import Image from 'next/image';
import React, { memo, useState, useEffect } from 'react';

import { IconType } from 'react-icons';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa6';

import { asset } from '@/store/assets';

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

  useEffect(() => {
    setData(getLocations(search));
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

  const handleShowDetails = () => {
    setShowItems(!showItems);

    if (showItems) return;
    asset.setState({ name: 'test', parentId: '12312', id: '123131' });
    setSubitems(getAssociatedLocations(id));
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
          {subitems.map((item) => (
            <DropdownItem key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(Dropdown);
