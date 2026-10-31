import clsx from 'clsx';
import { useState } from 'react';
import {
  HERO_HOT_WORD,
  HERO_LEDE,
  HERO_LINES,
  HERO_NAME,
  STATUS_PLACES,
  STATUS_PLACES_LABEL,
  STATUS_TEXT,
} from '../../content/hero';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { buttonClassName } from '../Button/buttonClassName';
import { Container } from '../Container/Container';
import { HeroBackground } from '../HeroBackground/HeroBackground';
import { RotatingWords } from '../RotatingWords/RotatingWords';
import { SectionLink } from '../SectionLink/SectionLink';
import { StatusPill } from '../StatusPill/StatusPill';
import { TypewriterHeading } from '../TypewriterHeading/TypewriterHeading';
import styles from './Hero.module.css';

export const Hero = () => {
  const reducedMotion = usePrefersReducedMotion();
  const [headingSettled, setHeadingSettled] = useState(false);
  const waiting = !reducedMotion && !headingSettled;

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <HeroBackground />
      <Container>
        <div className={styles.intro}>
          <StatusPill className={styles.rise}>
            {STATUS_TEXT} <RotatingWords words={STATUS_PLACES} label={STATUS_PLACES_LABEL} />
          </StatusPill>
          <TypewriterHeading
            id="hero-title"
            className={styles.title}
            lines={HERO_LINES}
            hotWord={HERO_HOT_WORD}
            boldWord={HERO_NAME}
            onSettle={() => setHeadingSettled(true)}
          />
          <p className={clsx(styles.rise, styles.lede, { [styles.waiting]: waiting })}>
            {HERO_LEDE}
          </p>
          <div className={clsx(styles.rise, styles.actions, { [styles.waiting]: waiting })}>
            <SectionLink
              sectionId="skills"
              current={false}
              className={buttonClassName({ variant: 'glass' })}
            >
              Check out my skills
            </SectionLink>
            <SectionLink
              sectionId="certifications"
              current={false}
              className={buttonClassName({ variant: 'secondary' })}
            >
              AWS Certifications
            </SectionLink>
          </div>
        </div>
      </Container>
    </section>
  );
};
