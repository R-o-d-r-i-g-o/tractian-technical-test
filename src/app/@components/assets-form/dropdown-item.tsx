'use client';

import Image from 'next/image';

import StatusView from '@/components/status-view';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa6';

import * as t from './@types';
import { handleIconDisplay, FormatIcon } from './@utils';

import { useDropdownItem } from './@hooks';

const DropdownItem = ({
  id,
  name,
  sensorType,
  status,
  type,
}: t.DropdownItemProps) => {
  const item = useDropdownItem({ name, id, status, sensorType });

  const buttonIcon = (
    <FormatIcon size={12}>
      {item.showItems ? FaAngleDown : FaAngleRight}
    </FormatIcon>
  );

  return (
    <div
      className={`cursor-pointer text-sm ${item.disableSubitens ? 'ml-5' : ''}`}
    >
      <div onClick={item.handleShowDetails} className="flex gap-2 items-center">
        {!item.disableSubitens && buttonIcon}
        <Image
          src={handleIconDisplay(type, sensorType) || ''}
          alt={`${name}-image`}
          height={14}
          width={14}
        />
        {name}
        {item.disableSubitens && <StatusView status={status} />}
      </div>
      {item.showItems && (
        <div className="min-h-min ml-5">
          {item.query.data?.assets.map((item) => (
            <DropdownItem key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownItem;
