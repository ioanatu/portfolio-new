import clsx from 'clsx';
import type { Study } from '../../content/education';
import styles from './StudyRow.module.css';

type StudyRowProps = {
  study: Study;
};

export const StudyRow = ({
  study: { institution, years, title, logo, logoFills },
}: StudyRowProps) => (
  <li className={styles.studyRow}>
    <span className={clsx(styles.logo, { [styles.fills]: logoFills })}>
      <img src={logo} alt="" width={56} height={56} loading="lazy" decoding="async" />
    </span>
    <div>
      <div className={styles.top}>
        <span className={styles.institution}>{institution}</span>
        <span className={styles.years}>{years}</span>
      </div>
      <h4 className={styles.heading}>{title}</h4>
    </div>
  </li>
);
