import { getAvaiableUnits } from '@/services';
import { unit } from '@/store/units';

import { useQuery } from '@tanstack/react-query';

const useHeader = () => {
  const queryProps = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => await getAvaiableUnits(),
  });

  return queryProps
}

const useHeaderOption = () => {
  const selectedID = unit()?.id;

  return { selectedID, setState: unit.setState };
};

export { useHeader, useHeaderOption }