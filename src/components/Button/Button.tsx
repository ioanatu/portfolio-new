import type { ButtonHTMLAttributes } from 'react';
import { buttonClassName } from './buttonClassName';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'glass';
  size?: 'medium' | 'small';
};

export const Button = ({
  variant,
  size,
  className,
  type = 'button',
  children,
  ...buttonProps
}: ButtonProps) => (
  <button type={type} className={buttonClassName({ variant, size, className })} {...buttonProps}>
    {children}
  </button>
);
