import clsx from 'clsx';
import type { Certification } from '../../content/certifications';
import styles from './CertificationCard.module.css';

type CertificationCardProps = {
  certification: Certification;
  className?: string;
};

export const CertificationCard = ({
  certification: { name, badge, issued, expected },
  className,
}: CertificationCardProps) => {
  const pending = Boolean(expected);

  return (
    <article
      className={clsx(styles.certificationCard, { [styles.pending]: pending }, className)}
      aria-label={pending ? `In progress: ${name}, expected ${expected}` : undefined}
    >
      <img
        className={styles.badge}
        src={badge}
        alt=""
        width={104}
        height={104}
        loading="lazy"
        decoding="async"
      />
      <h3>{name}</h3>
      {pending ? (
        <p>Expected {expected}</p>
      ) : (
        issued && (
          <p>
            {issued.month} <b>{issued.year}</b>
          </p>
        )
      )}
    </article>
  );
};
