'use client';

import { FC } from 'react';
import { useHeaderOption } from './@hooks';

import Image from 'next/image';

import { Button } from '@/components/button';

import * as t from './@types';

const NavButton: FC<t.ButtonOption> = ({
  text,
  icon,
  alt,
  onSelect,
  selected = false,
}) => (
  <Button
    displayText={text}
    onClick={onSelect}
    leftIcon={<Image src={icon} alt={alt} height={12} width={12} />}
    className={`flex flex-grow gap-1 text-white items-center justify-around ${
      selected ? 'bg-selection' : 'bg-secondary'
    } py-1 px-2 rounded-sm hover:bg-selection active:bg-selection`}
  />
);

const Actions = ({ menuOptions }: t.Navigation) => {
  const header = useHeaderOption();

  return (
    <div className="flex align-middle min-w-min text-xs h-6 gap-[10px]">
      {menuOptions?.map((item) => (
        <NavButton
          {...item}
          key={item.id}
          onSelect={() => header.setState({ ...item })}
          selected={header.selectedID === item.id}
        />
      ))}
    </div>
  );
};

export { Actions };
