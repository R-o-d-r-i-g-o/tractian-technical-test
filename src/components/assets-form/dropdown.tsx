"use client"

import Image from "next/image";
import React, { memo, useState, useEffect } from 'react';

import { FaAngleDown } from "react-icons/fa6";

import ApexAssets from '../../../public/mock/apex-unit/assets.json'
import ApexLocations from '../../../public/mock/apex-unit/locations.json'

type Props = {
    search: string;
}

const getLocations = (search: string) => {
  search = search?.toLowerCase()

  return ApexLocations.filter(
    item => item.parentId == null
    && (search === "" || item.name.toLowerCase().includes(search))
  )
}

const Dropdown = ({ search }: Props) => {
  const [data, setData] = useState<typeof ApexLocations>([])

  useEffect(() => {
    setData(getLocations(search))
  }, [])

  return (
    <>
      {data.map((item) =>
        <div
          key={item.id}
          className='flex gap-2 items-center text-sm'
        >
          <FaAngleDown size={12} />
          <Image src='/icons/location.svg' alt='' height={14} width={14} />
          {item.name}
        </div>
      )}
    </>
  );
} 

export default memo(Dropdown);
