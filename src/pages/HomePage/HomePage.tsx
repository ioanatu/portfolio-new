import { CertificationsSection } from '../../components/CertificationsSection/CertificationsSection';
import { EducationSection } from '../../components/EducationSection/EducationSection';
import { ExperienceSection } from '../../components/ExperienceSection/ExperienceSection';
import { Hero } from '../../components/Hero/Hero';
import { SkillsSection } from '../../components/SkillsSection/SkillsSection';

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
