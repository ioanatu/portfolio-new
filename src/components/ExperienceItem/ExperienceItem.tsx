import clsx from 'clsx';
import { Plus } from 'lucide-react';
import type { Job } from '../../content/experience';
import { ExperienceDetail } from '../ExperienceDetail/ExperienceDetail';
import styles from './ExperienceItem.module.css';

type ExperienceItemProps = {
  job: Job;
  defaultOpen?: boolean;
};

export const ExperienceItem = ({
  job: { company, role, dates, highlights, detail },
  defaultOpen = false,
}: ExperienceItemProps) => (
  <details className={clsx(styles.experienceItem)} open={defaultOpen}>
    <summary>
      <div className={styles.heading}>
        {detail && <img className={styles.logo} src={detail.logo} alt="" width={56} height={56} />}
        <div>
          <h3>{detail?.heading ?? company}</h3>
          <p className={styles.role}>{role}</p>
        </div>
      </div>
      <span className={styles.dates}>{dates}</span>
      <span className={styles.plus} aria-hidden="true">
        <Plus size={22} strokeWidth={1.8} aria-hidden="true" />
      </span>
    </summary>
    {detail ? (
      <ExperienceDetail detail={detail} />
    ) : (
      <ul>
        {highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    )}
  </details>
);
