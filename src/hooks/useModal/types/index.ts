import { ReactNode } from 'react';

export interface ModalProps {
  name: string;
  children: ReactNode;
  classNameModal?: string;
  classNameLayout?: string;
}
