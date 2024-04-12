import { FC } from 'react'
import Image from 'next/image';

import navOptions from '../../../public/mock/header-options.json'

type NavOption = {
  text: string;
  icon: string;
};

const NavButton: FC<NavOption> = ({ text, icon }) => (
  <button className='flex flex-grow items-center justify-around bg-secondary py-[2px] px-[4px]'>
    <Image src={icon} alt='unit-simble' height={12} width={12} />
    {text}
  </button>
)

const Header = () => (
  <header className="bg-primary flex items-center justify-between px-4 h-[42px]">
    <Image src='/tractian-logo.svg' alt='traction-logo' width={102.95} height={14}/>
    <div className='flex align-middle w-[300px] text-xs h-6 gap-[10px]'>
      {navOptions.map((item, i) => <NavButton key={i} {...item} />)}
    </div>
  </header>
)

export default Header;

