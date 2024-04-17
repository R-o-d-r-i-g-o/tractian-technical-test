'use client';

import { useState, ChangeEvent } from 'react';

import DropdownList from './dropdown-list';
import { Spinner } from '@/components/loading';

import { useDebounce } from '@uidotdev/usehooks';
import { IoSearchOutline } from 'react-icons/io5';

const AssetsForm = () => {
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const defSearch = useDebounce(search, 500);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setLoading(true);
  };

  return (
    <>
      <div className="h-11 border-b border-border flex items-center">
        <input
          type="text"
          onChange={handleInputChange}
          placeholder="Buscar Ativo ou Local"
          className="py-2 px-3 flex-1 text-sm outline-none"
        />
        <IoSearchOutline size={16} className="mr-4" />
      </div>
      {loading && <Spinner />}
      <div
        className={`flex flex-col gap-1 w-full min-h-min p-2 pt-3 ${
          loading && 'hidden'
        }`}
      >
        <DropdownList
          key={defSearch}
          search={defSearch}
          onLoaded={() => setLoading(false)}
        />
      </div>
    </>
  );
};

export default AssetsForm;
