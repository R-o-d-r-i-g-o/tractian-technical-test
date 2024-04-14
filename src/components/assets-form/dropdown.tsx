"use client"

import Image from "next/image";
import React, { memo, useState, useEffect } from 'react';

import { FaAngleDown, FaAngleRight } from "react-icons/fa6";

import { asset } from '@/store/assets'

import ApexAssets from '../../../public/mock/apex-unit/assets.json'
import ApexLocations from '../../../public/mock/apex-unit/locations.json'

const content = ApexLocations // ApexAssets.concat(ApexLocations)

type Props = {
    search: string;
    onLoaded?: () => void;
}

const getLocations = (search: string) => {
  search = search?.toLowerCase()

  return content.filter(
    item => item.parentId == null // && item.
    && (search === "" || item.name.toLowerCase().includes(search))
  )
}

const getAssociatedLocations = (id: string) => {

  return content.filter(item => {

    return item.parentId == "60fc487b07a5ec001e8cc360"
  })
}

const Dropdown = ({ search, onLoaded }: Props) => {
  const [data, setData] = useState<typeof ApexLocations>([])

  useEffect(() => {
    setData(getLocations(search))
    if (onLoaded) onLoaded()
  }, [])

  return (
    <>
      {data.map((item) =>
        <DropdownItem key={item.id} {...item} />
      )}
    </>
  );
}

type DropdownItemProps = {
  id: string;
  name: string;
}

const DropdownItem = ({ id, name }: DropdownItemProps) => {
  const [showItems, setShowItems] = useState(false)
  const [subitems, setSubitems] = useState<typeof ApexLocations>([])

  const handleShowDetails = () => {
    setShowItems(!showItems)

    if (showItems) return;
    asset.setState({ name: "test", parentId: "12312",  id: "123131" })
    setSubitems(getAssociatedLocations(id))
  }

  const buttonIcon = showItems
    ? <FaAngleDown size={12} />
    : <FaAngleRight size={12} />

  return (
    <div className='cursor-pointer text-sm' >
      <div
        onClick={handleShowDetails}
        className='flex gap-2 items-center'
      >
        {buttonIcon}
        <Image src='/icons/location.svg' alt='' height={14} width={14} />
        {name}
      </div>
      {showItems &&
        <div className='min-h-min ml-4'>
          {subitems.map((item) =>
            <DropdownItem key={item.id} {...item} />
          )}
        </div>
      }
    </div>
  )
}

export default memo(Dropdown);
