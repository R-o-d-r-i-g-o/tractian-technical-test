"use client"

import React from 'react';
import Image from "next/image";

import { FaAngleDown } from "react-icons/fa6";

import ApexAssets from '../../public/mock/apex-unit/assets.json'
import ApexLocations from '../../public/mock/apex-unit/locations.json'

const getLocations = () => {
  return ApexLocations.filter(item => item.parentId == null)
}

const Dropdown = () => {
  const handleOptionClick = () => { };

  return (
    <>
      {getLocations().map((item) =>
        <div
          key={item.id}
          onClick={handleOptionClick}
          className='flex gap-2 items-center text-sm'
        >
          <FaAngleDown size={12} />
          <Image src='/icons/location.svg' alt='' height={14} width={14} />
          {item.name}
        </div>
      )}
    </>
  );
};

export default Dropdown;
