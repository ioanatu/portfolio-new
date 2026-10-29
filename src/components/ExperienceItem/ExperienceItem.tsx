import clsx from 'clsx';
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
        <svg
          viewBox="0 0 16 16"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M8 2v12M2 8h12" />
        </svg>
      </span>
    </summary>
    <ul>
      {highlights.map((highlight) => (
        <li key={highlight}>{highlight}</li>
      ))}
    </ul>
  </details>
);
