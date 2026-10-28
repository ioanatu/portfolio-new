import type { ReactNode } from 'react';
import styles from './VisuallyHidden.module.css';

type VisuallyHiddenProps = {
  children: ReactNode;
};

export const VisuallyHidden = ({ children }: VisuallyHiddenProps) => (
  <span className={styles.visuallyHidden}>{children}</span>
);
