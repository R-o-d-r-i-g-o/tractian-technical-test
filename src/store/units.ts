import { create } from 'zustand'
import { Unit } from './@types/units'

export const unit = create<Omit<Unit, 'alt'> | null>()(
  (set) => null
);
