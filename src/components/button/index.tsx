import { FC } from 'react';
import * as t from './@types';

import Image from 'next/image';

const Button: FC<t.ButtonProps> = ({
  displayText,
  leftIcon,
  rightIcon,
  className,
  ...rest
}) => (
  <button
    {...rest}
    className={
      className ??
      'flex gap-2 items-center font-semibold text-dark_gray text-sm py-2 px-4 border border-border rounded'
    }
  >
    {leftIcon}
    {displayText}
    {rightIcon}
  </button>
);

const ButtonImage: FC<t.ButtonImageProps> = ({
  height = 14,
  width = 14,
  ...rest
}) => <Image {...rest} width={width} height={height} alt="button-icon-image" />;

export { Button, ButtonImage };
