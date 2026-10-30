import {
  EDUCATION_INTRO,
  EDUCATION_TITLE,
  LANGUAGES,
  LANGUAGES_TITLE,
  STUDIES,
  STUDIES_TITLE,
} from '../../content/education';
import { Container } from '../Container/Container';
import { GlassPanel } from '../GlassPanel/GlassPanel';
import { LanguageItem } from '../LanguageItem/LanguageItem';
import { PlanetaryBackground } from '../PlanetaryBackground/PlanetaryBackground';
import { SectionHead } from '../SectionHead/SectionHead';
import { StudyRow } from '../StudyRow/StudyRow';
import styles from './EducationSection.module.css';

export const EducationSection = () => (
  <section id="education" className={styles.section} aria-labelledby="education-title">
    <PlanetaryBackground />
    <Container>
      <SectionHead
        tag="Education"
        title={EDUCATION_TITLE}
        titleId="education-title"
        intro={EDUCATION_INTRO}
      />
      <div className={styles.layout}>
        <GlassPanel title={STUDIES_TITLE} titleId="studies-title">
          <ol className={styles.studies}>
            {STUDIES.map((study) => (
              <StudyRow key={study.institution} study={study} />
            ))}
          </ol>
        </GlassPanel>
        <GlassPanel title={LANGUAGES_TITLE} titleId="languages-title">
          <ul className={styles.languages}>
            {LANGUAGES.map((language) => (
              <LanguageItem key={language.name} language={language} />
            ))}
          </ul>
        </GlassPanel>
      </div>
    </Container>
  </section>
);
