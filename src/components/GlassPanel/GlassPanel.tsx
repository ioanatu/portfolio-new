import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import styles from './GlassPanel.module.css';

type GlassPanelProps = {
  title: string;
  titleId: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'title'>;

export const GlassPanel = ({ title, titleId, className, children, ...props }: GlassPanelProps) => (
  <div
    role="group"
    aria-labelledby={titleId}
    className={clsx(styles.glassPanel, className)}
    {...props}
  >
    <h3 id={titleId} className={styles.title}>
      {title}
    </h3>
    {children}
  </div>
);
