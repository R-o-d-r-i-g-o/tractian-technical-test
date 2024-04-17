import { asset } from '@prisma/client'

export type Status = 'alert' | 'operating' | null

export type AssetType = 'location' | 'asset';

export type SensorType = 'vibration' | 'energy' | null;

export type Assets = asset & {
  status: Status;
  type: AssetType;
  sensorType: SensorType;
}
