'use client';

import { FC } from 'react';

import { getAvaiableUnits } from '@/services';
import { unit } from '@/store/units';

import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/loading';

import Image from 'next/image';

type NavOption = {
  text: string;
  icon: string;
  alt: string;
  onSelect: () => void;
  selected: boolean;
};

const NavButton: FC<NavOption> = ({
  text,
  icon,
  alt,
  onSelect,
  selected = false,
}) => (
  <button
    onClick={onSelect}
    className={`flex flex-grow gap-1 text-white items-center justify-around ${
      selected ? 'bg-selection' : 'bg-secondary'
    } py-1 px-2 rounded-sm hover:bg-selection active:bg-selection`}
  >
    <Image src={icon} alt={alt} height={12} width={12} />
    {text}
  </button>
);

const Header = () => {
  const selectedID = unit()?.id;

  const { isLoading, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => getAvaiableUnits(),
  });

  return (
    <header className="bg-primary flex items-center justify-between px-4 py-3">
      <Image
        src="/tractian-logo.svg"
        alt="traction-logo"
        width={102.95}
        height={14}
      />
      <div className="flex align-middle min-w-min text-xs h-6 gap-[10px]">
        {isLoading ? (
          <Spinner removePadding />
        ) : (
          data?.map((item) => (
            <NavButton
              key={item.id}
              text={item.text}
              icon={item.icon}
              alt={item.alt}
              onSelect={() => unit.setState({ ...item })}
              selected={selectedID === item.id}
            />
          ))
        )}
      </div>
    </header>
  );
};

export default Header;
