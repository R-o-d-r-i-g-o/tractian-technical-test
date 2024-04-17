import { unit } from '@/store/units';
import { asset } from '@/store/assets';

import swal from 'sweetalert2';

const useMainPage = () => {
  const unitId = unit((state) => state?.id);
  const selectedAsset = asset();

  return { selectedAsset, unitId}
}

const useButtonRange = () => {
  const [unitId, unitName] = unit((state) => [state?.id, state?.text]);

  const handleButtonClick = () =>
    swal.fire({
      title: 'O que achou?',
      text: 'Posso ir para o próximo step?',
      icon: 'question',
      showCloseButton: true,
      confirmButtonText: 'Sim!',
      showCancelButton: true,
      cancelButtonText: 'Mais é claro que sim!',
    });

  return { unitId, unitName, handleButtonClick }
}

export { useMainPage, useButtonRange };