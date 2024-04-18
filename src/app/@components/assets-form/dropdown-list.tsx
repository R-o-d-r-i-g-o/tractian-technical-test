'use client';

import { memo, FC } from 'react';

import DropdownItem from './dropdown-item';
import * as t from './@types';

import { useDropdownList } from './@hooks';

// TODO: implementar o infinit scroll aqui.

const Dropdown: FC<t.DropdownListProps> = (props) => {
  const list = useDropdownList(props);

  return (
    <>
      {list.data?.assets.map((item) => (
        <DropdownItem
          shouldListAll={list.shouldListAll}
          key={item.id}
          {...item}
        />
      ))}
    </>
  );
};

export default memo(Dropdown);
