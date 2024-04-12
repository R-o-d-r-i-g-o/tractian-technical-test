import { FC } from 'react'
import Link from 'next/link';
import Image from 'next/image';

import navOptions from '../../../public/mock/header-options.json'

type NavOption = {
  text: string;
  icon: string;
  href: string;
  alt: string;
};

const NavButton: FC<NavOption> = ({ text, icon, href, alt }) => (
  <Link href={href} className='flex flex-grow text-white items-center justify-around bg-secondary py-[2px] px-[4px] rounded-sm hover:bg-selection active:bg-selection'>
    <Image src={icon} alt={alt} height={12} width={12} />
    {text}
  </Link>
);

const Header = () => (
  <header className="bg-primary flex items-center justify-between px-4 py-3">
    <Image src='/tractian-logo.svg' alt='traction-logo' width={102.95} height={14}/>
    <div className='flex align-middle w-[300px] text-xs h-6 gap-[10px]'>
      {navOptions.map((item, i) => <NavButton key={i} {...item} />)}
    </div>
  </header>
)

export default Header;

