import clsx from 'clsx';
import { Plus } from 'lucide-react';
import type { Job } from '../../content/experience';
import styles from './ExperienceItem.module.css';

type ExperienceItemProps = {
  job: Job;
  defaultOpen?: boolean;
};

export const ExperienceItem = ({
  job: { company, role, dates, highlights },
  defaultOpen = false,
}: ExperienceItemProps) => (
  <details className={clsx(styles.experienceItem)} open={defaultOpen}>
    <summary>
      <div>
        <h3>{company}</h3>
        <p className={styles.role}>{role}</p>
      </div>
      <span className={styles.dates}>{dates}</span>
      <span className={styles.plus} aria-hidden="true">
        <Plus size={22} strokeWidth={1.8} aria-hidden="true" />
      </span>
    </summary>
    <ul>
      {highlights.map((highlight) => (
        <li key={highlight}>{highlight}</li>
      ))}
    </ul>
  </details>
);
