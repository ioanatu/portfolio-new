import clsx from 'clsx';
import type { ReactNode, Ref } from 'react';
import styles from './IconButton.module.css';

type IconButtonProps = {
  /** Accessible name; the icon itself is decorative. */
  label: string;
  onClick: () => void;
  children: ReactNode;
  /** For buttons that open something: whether it is open. */
  expanded?: boolean;
  /** Id of the element the button opens. */
  controls?: string;
  className?: string;
  ref?: Ref<HTMLButtonElement>;
};

export const IconButton = ({
  label,
  onClick,
  children,
  expanded,
  controls,
  className,
  ref,
}: IconButtonProps) => (
  <button
    ref={ref}
    type="button"
    className={clsx(styles.iconButton, className)}
    aria-label={label}
    aria-expanded={expanded}
    aria-controls={controls}
    onClick={onClick}
  >
    {children}
  </button>
);
