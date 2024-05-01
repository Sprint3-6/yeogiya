import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export interface Props extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}
