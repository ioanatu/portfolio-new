import {
  EXPERIENCE_INTRO,
  EXPERIENCE_TITLE,
  JOBS,
  RESUME_DOWNLOAD_LABEL,
  RESUME_DOWNLOADS,
} from '../../content/experience';
import { Container } from '../Container/Container';
import { ExperienceItem } from '../ExperienceItem/ExperienceItem';
import { ResumeDownload } from '../ResumeDownload/ResumeDownload';
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
        {JOBS.map((job) => (
          <ExperienceItem key={`${job.company}-${job.dates}`} job={job} />
        ))}
      </div>
      <ResumeDownload label={RESUME_DOWNLOAD_LABEL} links={RESUME_DOWNLOADS} />
    </Container>
  </section>
);
