import clsx from 'clsx';
import styles from './CertificationCard.module.css';

type CertificationCardSkeletonProps = {
  shimmer?: boolean;
  className?: string;
};

export const CertificationCardSkeleton = ({
  shimmer = false,
  className,
}: CertificationCardSkeletonProps) => (
  <article
    className={clsx(
      styles.certificationCard,
      styles.skeleton,
      shimmer && styles.shimmer,
      className,
    )}
    aria-hidden="true"
  >
    <span className={styles.badge} />
    <span className={styles.line} />
    <span className={clsx(styles.line, styles.short)} />
  </article>
);
