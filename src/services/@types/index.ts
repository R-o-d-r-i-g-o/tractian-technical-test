import { asset as assetType } from '@prisma/client';

export type AssetType = 'location' | 'asset';

export type SensorType = 'vibration' | 'energy' | null;

export type ElementNode = assetType & {
  type: AssetType,
  sensorType: SensorType,
}

export type PaginatedAssets = {
  total: number;
  assets: ElementNode[];
}

export type PaginationFilters = {
  unitName: string; // this property is unique in database, no worries.
  search?: string
  code?: string
  page?: number
  size?: number
}

export type UnitList = Array<{
  text: string;
  icon: string;
  id: string;
  alt: string;
}>;