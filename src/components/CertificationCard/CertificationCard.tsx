import clsx from 'clsx';
// import { ArrowUpRight } from 'lucide-react';
import type { Certification } from '../../content/certifications';
import styles from './CertificationCard.module.css';

type CertificationCardProps = {
  certification: Certification;
  className?: string;
};

export const CertificationCard = ({
  certification: { name, badge, credentialUrl, issued, expected },
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
      <h3>
        {credentialUrl ? (
          <a
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cardLink}
            aria-label={`Show credential: ${name}`}
          >
            {name}
          </a>
        ) : (
          name
        )}
      </h3>
      {pending ? (
        <p>
          Currently learning for the DVA-C03. <br />
          Expected in {expected}
        </p>
      ) : (
        issued && (
          <p>
            {issued.month} <b>{issued.year}</b>
          </p>
        )
      )}
      {/*
      {credentialUrl && (
        <a
          href={credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.credential}
          aria-label={`Show credential: ${name}`}
        >
          <span className={styles.credentialLabel}>Show credential</span>
          <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
        </a>
      )}
      */}
    </article>
  );
};
