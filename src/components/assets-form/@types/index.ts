import { IconType } from 'react-icons';

import { asset as assetType } from '@prisma/client';

export type AssetType = 'location' | 'asset';

export type SensorType = 'vibration' | 'energy' | null;

export type DropdownListProps = {
  search: string;
  onLoaded?: () => void;
};

export type DropdownItemProps = {
  id: string;
  name: string;
  sensorType: SensorType;
  type: AssetType;
};

export type FormatIconProps = {
  size: number;
  children: IconType;
};

export type ElementNode = assetType & {
    sensorType: SensorType,
    type: AssetType,
}

export { type IconType };