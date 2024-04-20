import { PropsWithChildren } from 'react';

export interface Props extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}
