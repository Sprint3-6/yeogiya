import { forwardRef } from 'react';
import './style.scss';
import { Props } from './types/buttonType';

const Button = forwardRef<HTMLButtonElement, Props>(function ({ className, onClick, children, type = 'button' }, ref) {
  return (
    <button className={`button ${className}`} onClick={onClick} ref={ref} type={type}>
      {children}
    </button>
  );
});

export default Button;
