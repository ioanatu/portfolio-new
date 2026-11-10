import clsx from 'clsx';
import { type ReactNode, useRef, useState } from 'react';
import { HERO_HOT_WORD, HERO_LEDE, HERO_LINES, HERO_NAME } from '../../content/hero';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { Container } from '../Container/Container';
import { HeroBackground } from '../HeroBackground/HeroBackground';
import { NamePronunciation, PronunciationButton } from '../NamePronunciation/NamePronunciation';
import { SectionButton } from '../SectionButton/SectionButton';
import { TypewriterHeading } from '../TypewriterHeading/TypewriterHeading';
import styles from './Hero.module.css';

const decorateHeroWord = (word: string, element: ReactNode) =>
  HERO_NAME.test(word) ? <NamePronunciation>{element}</NamePronunciation> : element;

export const Hero = () => {
  const reducedMotion = usePrefersReducedMotion();
  const [headingSettled, setHeadingSettled] = useState(false);
  const waiting = !reducedMotion && !headingSettled;
  const actionsRef = useRef<HTMLDivElement>(null);

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <HeroBackground fadeAfter={actionsRef} />
      <Container>
        <div className={styles.intro}>
          <TypewriterHeading
            id="hero-title"
            className={styles.title}
            lines={HERO_LINES}
            hotWord={HERO_HOT_WORD}
            boldWord={HERO_NAME}
            decorateWord={decorateHeroWord}
            onSettle={() => setHeadingSettled(true)}
          />
          <PronunciationButton className={styles.pronounce} />
          <p className={clsx(styles.rise, styles.lede, { [styles.waiting]: waiting })}>
            {HERO_LEDE}
          </p>
          <div
            ref={actionsRef}
            className={clsx(styles.rise, styles.actions, { [styles.waiting]: waiting })}
          >
            <SectionButton sectionId="skills" label="Check out my skills" variant="accent" />
            <SectionButton
              sectionId="certifications"
              label="AWS Certifications"
              variant="primary"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
