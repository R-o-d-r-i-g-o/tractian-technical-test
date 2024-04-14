import { create } from 'zustand'
import { Assets } from './@types/assets'

export const asset = create<Assets | null>()(
  (set) => null
);
