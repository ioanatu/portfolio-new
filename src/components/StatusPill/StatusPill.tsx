import clsx from 'clsx';
import type { ReactNode } from 'react';
import styles from './StatusPill.module.css';

type StatusPillProps = {
  children: ReactNode;
  className?: string;
};

export const StatusPill = ({ children, className }: StatusPillProps) => (
  <span className={clsx(styles.statusPill, className)}>{children}</span>
);
