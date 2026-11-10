import { useRef } from 'react';
import { useSteppedAnimations } from '../../hooks/useSteppedAnimations';
import styles from './HeroBackground.module.css';

/**
 * The blobs drift so slowly and softly that 12 frames a second look just as smooth as 60, and cost
 * about a quarter of the processor time (see `useSteppedAnimations`).
 */
const FRAMES_PER_SECOND = 12;

export const HeroBackground = () => {
  const ref = useRef<HTMLDivElement>(null);
  useSteppedAnimations(ref, FRAMES_PER_SECOND);

  return (
    <div ref={ref} className={styles.heroBackground} aria-hidden="true">
      <i className={styles.b1} />
      <i className={styles.b2} />
      <i className={styles.b3} />
      <i className={styles.b4} />
      <i className={styles.b5} />
    </div>
  );
};
