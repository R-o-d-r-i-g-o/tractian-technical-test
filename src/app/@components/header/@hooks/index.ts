'use client';

import { getAvaiableUnits } from '@/services';
import { unit } from '@/store/units';

import { useQuery } from '@tanstack/react-query';

const useHeaderOption = () => {
  const selectedID = unit()?.id;

  const queryProps = useQuery({
    queryKey: ['repoData'],
    queryFn: () => getAvaiableUnits(),
  });

  return { ...queryProps, selectedID, setState: unit.setState };
};

export { useHeaderOption }