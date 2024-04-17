'use client';

import menuButtons from '../../../../public/mock/menu-button.json';

import { useButtonRange } from '../../@hooks';
import { Button, ButtonImage } from '@/components/button';

const NavigationBar = () => {
  const nav = useButtonRange();

  return (
    <div className="flex justify-between items-center w-full min-h-min mb-3">
      <span className="text-sm text-dark_gray">
        <span className="font-semibold text-xl text-primary">Ativos</span>
        {nav.unitName && ` / ${nav.unitName}`}
      </span>
      <div className="flex gap-2">
        {menuButtons.map((item, i) => (
          <Button
            key={i}
            displayText={item.lable}
            onClick={nav.handleButtonClick}
            leftIcon={<ButtonImage src={item.icon} />}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default NavigationBar;
