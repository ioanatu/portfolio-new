import clsx from 'clsx';
import styles from './Button.module.css';

type ButtonStyleOptions = {
  variant?: 'primary' | 'secondary' | 'glass';
  size?: 'medium' | 'small';
  className?: string;
};

export const buttonClassName = ({
  variant = 'primary',
  size = 'medium',
  className,
}: ButtonStyleOptions = {}) =>
  clsx(styles.button, styles[variant], { [styles.small]: size === 'small' }, className);
