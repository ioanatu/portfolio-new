import clsx from 'clsx';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useScrolledPast } from '../../hooks/useScrolledPast';
import styles from './BackToTop.module.css';

/** Scroll distance after which the button appears. */
const SHOW_AFTER_PX = 600;

export const BackToTop = () => {
  const visible = useScrolledPast(SHOW_AFTER_PX);
  const reducedMotion = usePrefersReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    document.querySelector<HTMLElement>('header a')?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      className={clsx(styles.backToTop, { [styles.show]: visible })}
      aria-label="Back to top"
      onClick={scrollToTop}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M5.5 11.5L12 5l6.5 6.5" />
      </svg>
    </button>
  );
};
