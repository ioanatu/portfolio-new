import { ArrowUpRight } from 'lucide-react';
import { buttonClassName } from '../Button/buttonClassName';
import { ChipList } from '../ChipList/ChipList';
import styles from './AiPanel.module.css';

type AiPanelProps = {
  title: string;
  titleId: string;
  description: string;
  skillsTitle: string;
  skills: readonly string[];
  coursesTitle: string;
  courses: readonly { name: string; credentialUrl: string }[];
};

export const AiPanel = ({
  title,
  titleId,
  description,
  skillsTitle,
  skills,
  coursesTitle,
  courses,
}: AiPanelProps) => (
  <aside aria-labelledby={titleId} className={styles.aiPanel}>
    <h3 id={titleId} className={styles.title}>
      {title}
    </h3>
    <p className={styles.description}>{description}</p>
    <div>
      <h4 className={styles.skillsTitle}>{skillsTitle}</h4>
      <ChipList items={skills} className={styles.chips} />
    </div>
    <div>
      <h4 className={styles.skillsTitle}>{coursesTitle}</h4>
      <ul className={styles.courses}>
        {courses.map(({ name, credentialUrl }) => (
          <li key={name}>
            <a
              href={credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClassName({ variant: 'glass', size: 'small' })}
              aria-label={`Show credential: ${name}`}
            >
              {name}
              <ArrowUpRight size={20} strokeWidth={1.75} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  </aside>
);
