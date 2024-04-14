"use client"

import { useState, useEffect, FC } from 'react'

import { unit } from '@/store/units'

import Image from 'next/image';
import navOptions from '../../../public/mock/header-options.json'

type NavOption = {
  text: string;
  icon: string;
  alt: string;
  onSelect: () => void;
  selected: boolean;
};

const NavButton: FC<NavOption> = ({ text, icon, alt, onSelect, selected = false }) => {
   return (
    <button
      onClick={onSelect}
      className={`flex flex-grow gap-1 text-white items-center justify-around ${selected ? "bg-selection" : "bg-secondary"} py-1 px-2 rounded-sm hover:bg-selection active:bg-selection`}
    >
      <Image src={icon} alt={alt} height={12} width={12} />
      {text}
    </button>
  );
}

const Header = () => {
  const [selected, setSelected] = useState(navOptions[0])

  useEffect(() => {
    unit.setState({
      ...selected
    })
  }, [selected])

  return (
    <header className="bg-primary flex items-center justify-between px-4 py-3">
      <Image src='/tractian-logo.svg' alt='traction-logo' width={102.95} height={14}/>
      <div className='flex align-middle min-w-min text-xs h-6 gap-[10px]'>
      {navOptions.map((item) => (
        <NavButton
          key={item.id}
          text={item.text}
          icon={item.icon}
          alt={item.alt}
          onSelect={() => setSelected(item)}
          selected={selected.id === item.id}
        />
      ))}
      </div>
    </header>
  );
}

export default Header;

