import clsx from 'clsx';
import { CertificationsSection } from '../../components/CertificationsSection/CertificationsSection';
import { Container } from '../../components/Container/Container';
import { ExperienceSection } from '../../components/ExperienceSection/ExperienceSection';
import { Hero } from '../../components/Hero/Hero';
import { SectionHead } from '../../components/SectionHead/SectionHead';
import { CERTIFICATIONS_INTRO } from '../../content/certifications';
import styles from './HomePage.module.css';

export const EducationSection = () => {
  return (
    <section id="education" className={styles.placeholder} aria-labelledby="education-title">
      <Container>
        <SectionHead
          tag="Education"
          title={'Education'}
          titleId="education-title"
          intro={CERTIFICATIONS_INTRO}
        />
      </Container>
    </section>
  );
};
export const SkillsSection = () => {
  return (
    <section
      id="skills"
      className={clsx(styles.placeholder, styles.skills)}
      aria-labelledby="skills-title"
    >
      <Container>
        <SectionHead
          tag="Skills"
          title={'Skills & Tech Stack'}
          titleId="skills-title"
          intro={CERTIFICATIONS_INTRO}
        />
      </Container>
    </section>
  );
};
export const HomePage = () => {
  return (
    <main id="top">
      <Hero />
      <ExperienceSection />
      <SkillsSection />
      <CertificationsSection />
      <EducationSection />
    </main>
  );
};
