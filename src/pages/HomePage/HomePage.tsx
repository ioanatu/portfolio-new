import { CertificationsSection } from '../../components/CertificationsSection/CertificationsSection';
import { Container } from '../../components/Container/Container';
import { Hero } from '../../components/Hero/Hero';
import { SectionHead } from '../../components/SectionHead/SectionHead';
import { CERTIFICATIONS_INTRO } from '../../content/certifications';

export const EducationSection = () => {
  return (
    <section id="certifications" aria-labelledby="certifications-title">
      <Container>
        <SectionHead
          tag="Education"
          title={'Education'}
          titleId="certifications-title"
          intro={CERTIFICATIONS_INTRO}
        />
      </Container>
    </section>
  );
};
export const SkillsSection = () => {
  return (
    <section id="certifications" aria-labelledby="certifications-title">
      <Container>
        <SectionHead
          tag="Skills"
          title={'Skills'}
          titleId="certifications-title"
          intro={CERTIFICATIONS_INTRO}
        />
      </Container>
    </section>
  );
};
export const ExperienceSection = () => {
  return (
    <section id="certifications" aria-labelledby="certifications-title">
      <Container>
        <SectionHead
          tag="Experience"
          title={'Experience'}
          titleId="certifications-title"
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
