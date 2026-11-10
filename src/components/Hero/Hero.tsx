import clsx from 'clsx';
import { type ReactNode, useState } from 'react';
import { HERO_HOT_WORD, HERO_LEDE, HERO_LINES, HERO_NAME } from '../../content/hero';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { buttonClassName } from '../Button/buttonClassName';
import { Container } from '../Container/Container';
import { HeroBackground } from '../HeroBackground/HeroBackground';
import { NamePronunciation, PronunciationButton } from '../NamePronunciation/NamePronunciation';
import { PixelMosaic } from '../PixelMosaic/PixelMosaic';
import { SectionLink } from '../SectionLink/SectionLink';
import { TypewriterHeading } from '../TypewriterHeading/TypewriterHeading';
import styles from './Hero.module.css';

const decorateHeroWord = (word: string, element: ReactNode) =>
  HERO_NAME.test(word) ? <NamePronunciation>{element}</NamePronunciation> : element;

export const Hero = () => {
  const reducedMotion = usePrefersReducedMotion();
  const [headingSettled, setHeadingSettled] = useState(false);
  const waiting = !reducedMotion && !headingSettled;

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <HeroBackground />
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
          <div className={clsx(styles.rise, styles.actions, { [styles.waiting]: waiting })}>
            <SectionLink
              sectionId="skills"
              current={false}
              className={buttonClassName({ variant: 'glass', className: styles.pixelButton })}
            >
              {/* dark in both themes, like the glass button it replaces */}
              <PixelMosaic cell={12} theme="dark" vivid />
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
