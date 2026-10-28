import clsx from 'clsx';
import styles from './CertificationCard.module.css';

export const CertificationCardSkeleton = ({ className }: { className?: string }) => (
  <article
    className={clsx(styles.certificationCard, styles.skeleton, className)}
    aria-hidden="true"
  >
    <span className={styles.badge} />
    <span className={styles.line} />
    <span className={clsx(styles.line, styles.short)} />
  </article>
);
