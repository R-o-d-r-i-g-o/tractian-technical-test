import { ReactNode } from 'react'
import { HtmlHTMLAttributes } from 'react';

import { ImageProps } from 'next/image';

export type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement> & {
  displayText: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export type ButtonImageProps = Omit<ImageProps, 'alt'> & {
  height?: number;
  width?: number;
}