import clsx from 'clsx';
import { CERTIFICATIONS_SOURCE_NOTES } from '../../content/certifications';
import styles from './BadgeSourceCard.module.css';

type BadgeSourceCardProps = {
  className?: string;
};

export const BadgeSourceCard = ({ className }: BadgeSourceCardProps) => (
  <aside className={clsx(styles.badgeSourceCard, className)} aria-labelledby="badge-source-title">
    {CERTIFICATIONS_SOURCE_NOTES.map((note, index) => (
      <p key={index}>{note}</p>
    ))}
  </aside>
);
