import clsx from 'clsx';
import styles from './Button.module.css';

type ButtonStyleOptions = {
  variant?: 'primary' | 'secondary';
  size?: 'medium' | 'small';
  className?: string;
};

export const buttonClassName = ({
  variant = 'primary',
  size = 'medium',
  className,
}: ButtonStyleOptions = {}) =>
  clsx(
    styles.button,
    variant === 'primary' ? styles.primary : styles.secondary,
    { [styles.small]: size === 'small' },
    className,
  );
