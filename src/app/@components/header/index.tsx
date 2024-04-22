'use client';

import Image from 'next/image';

import * as t from './@types';

import { Actions } from './action';
import { useHeader } from './@hooks';

// TODO: when its not in preview option anymore, use "Async" server component here then remove "use-client".

const Header = ({ children }: { children: t.ActionProps }) => {
  const header = useHeader();
  const ChildComponent = children;

  return (
    <header className="bg-primary flex items-center justify-between px-4 py-3">
      <Image
        src="/tractian-logo.svg"
        alt="traction-logo"
        width={102.95}
        height={14}
      />
      <ChildComponent menuOptions={header?.data} />
    </header>
  );
};

export { Header as Component, Actions };
