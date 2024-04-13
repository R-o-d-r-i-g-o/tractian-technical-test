"use client"

import { useState } from 'react'

import Dropdown from './dropdown'
import { IoSearchOutline } from "react-icons/io5";

import { useDebounce } from "@uidotdev/usehooks";

const AssetsForm = () => {
  const [search, setSearch] = useState("")
  const defSearch = useDebounce(search, 500);

  return (
    <>
      <div className="h-11 border-b border-border flex items-center">
        <input
          type="text"
          placeholder="Buscar Ativo ou Local"
          onChange={e => setSearch(e.target.value)}
          className="py-2 px-3 flex-1 text-sm outline-none"
        />
        <IoSearchOutline size={16} className="mr-4" />
      </div>
      <div className="flex flex-col gap-1 w-full min-h-min p-2 pt-3">
        <Dropdown key={defSearch} search={defSearch} />
      </div>
    </>
  )
}

export default AssetsForm;