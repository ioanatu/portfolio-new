import { useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useTheme } from '../../hooks/useTheme';
import styles from './PlanetaryBackground.module.css';
import { useOrbits } from './useOrbits';

/** Soft drifting colour behind a canvas that draws a slowly turning planetary system. */
export const PlanetaryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const reducedMotion = usePrefersReducedMotion();

  useOrbits(canvasRef, theme, !reducedMotion);

  return (
    <div className={styles.planetaryBackground} aria-hidden="true">
      <i className={styles.x1} />
      <i className={styles.x2} />
      <i className={styles.x3} />
      <i className={styles.x4} />
      <i className={styles.x5} />
      <i className={styles.x6} />
      <canvas ref={canvasRef} className={styles.orbits} />
    </div>
  );
};
