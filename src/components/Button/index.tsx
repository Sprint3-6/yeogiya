import { forwardRef } from 'react';
import './style.scss';
import { Props } from './types/buttonType';

const Button = forwardRef<HTMLButtonElement, Props>(function ({ className, children, type = 'button', ...props }, ref) {
  return (
    <button className={`button ${className}`} ref={ref} type={type} {...props}>
      {children}
    </button>
  );
});

export default Button;
