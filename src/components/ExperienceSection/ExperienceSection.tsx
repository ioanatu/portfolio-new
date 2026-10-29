import { EXPERIENCE_INTRO, EXPERIENCE_TITLE, JOBS } from '../../content/experience';
import { Container } from '../Container/Container';
import { ExperienceItem } from '../ExperienceItem/ExperienceItem';
import { SectionHead } from '../SectionHead/SectionHead';
import styles from './ExperienceSection.module.css';

export const ExperienceSection = () => (
  <section id="experience" className={styles.section} aria-labelledby="experience-title">
    <Container>
      <SectionHead
        tag="Experience"
        title={EXPERIENCE_TITLE}
        titleId="experience-title"
        intro={EXPERIENCE_INTRO}
      />
      <div className={styles.jobs}>
        {JOBS.map((job, index) => (
          <ExperienceItem key={`${job.company}-${job.dates}`} job={job} defaultOpen={index === 0} />
        ))}
      </div>
    </Container>
  </section>
);
