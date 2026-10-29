import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { JobDetail } from '../../content/experience';
import { CompanyCard } from '../CompanyCard/CompanyCard';
import { EmphasizedText } from '../EmphasizedText/EmphasizedText';
import styles from './ExperienceDetail.module.css';
import { label } from 'three/tsl';
import { buttonClassName } from '../Button/buttonClassName';

type ExperienceDetailProps = {
  detail: JobDetail;
};

type PointsProps = {
  points: readonly string[];
  emphasized?: readonly string[];
};

const Points = ({ points, emphasized }: PointsProps) => (
  <ul>
    {points.map((point) => (
      <li key={point}>
        <ArrowRight className={styles.bullet} size={14} strokeWidth={1.8} aria-hidden="true" />
        <EmphasizedText text={point} terms={emphasized} />
      </li>
    ))}
  </ul>
);

export const ExperienceDetail = ({
  detail: { intro, website, projects, commonTitle, commonPoints },
}: ExperienceDetailProps) => (
  <div className={styles.experienceDetail}>
    <CompanyCard description={intro} website={website} />
    {projects.map(({ name, summary, link, stack, emphasized, points }) => (
      <section key={name} aria-label={name}>
        <div className={styles.head}>
          <h4>
            <b>{name}</b> — <span className={styles.summary}>{summary}</span>
            {link && (
              <a
                href={link?.href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClassName({ variant: 'secondary', size: 'small' })}
                aria-label={`Visit ${label}, opens in a new tab`}
              >
                <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
              </a>
            )}
          </h4>
        </div>
        {stack && <p className={styles.stack}>{stack}</p>}
        <Points points={points} emphasized={emphasized} />
      </section>
    ))}
    <section aria-label={commonTitle}>
      <h4>
        <b>{commonTitle}</b>
      </h4>
      <Points points={commonPoints} />
    </section>
  </div>
);
