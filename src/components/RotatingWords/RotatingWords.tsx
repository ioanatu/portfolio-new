import { type CSSProperties, useLayoutEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './RotatingWords.module.css';

const WORD_SLOT_MS = 3000;
const VISIBLE_MS = 2340;
const SWAP_OUT_END_MS = 2970;
const SWAP_IN_START_MS = 3060;
const SWAP_IN_DURATION_MS = 630;
const EASING = 'cubic-bezier(0.6, 0, 0.3, 1)';

type RotatingWordsProps = {
  words: string[];
  label: string;
};

const swapKeyframes = (cycleMs: number): Keyframe[] => {
  const at = (ms: number) => ms / cycleMs;
  return [
    { offset: 0, transform: 'none', opacity: 1, easing: EASING },
    { offset: at(VISIBLE_MS), transform: 'none', opacity: 1, easing: EASING },
    { offset: at(SWAP_OUT_END_MS), transform: 'translateY(0.8em)', opacity: 0, easing: EASING },
    { offset: at(SWAP_IN_START_MS), transform: 'translateY(-0.8em)', opacity: 0, easing: EASING },
    {
      offset: at(cycleMs - SWAP_IN_DURATION_MS),
      transform: 'translateY(-0.8em)',
      opacity: 0,
      easing: EASING,
    },
    { offset: 1, transform: 'none', opacity: 1 },
  ];
};

export const RotatingWords = ({ words, label }: RotatingWordsProps) => {
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const cycleMs = words.length * WORD_SLOT_MS;
    const animations = wordRefs.current.flatMap((element, index) =>
      element && typeof element.animate === 'function'
        ? [
            element.animate(swapKeyframes(cycleMs), {
              duration: cycleMs,
              delay: -(words.length - index) * WORD_SLOT_MS,
              iterations: Infinity,
            }),
          ]
        : [],
    );
    return () => animations.forEach((animation) => animation.cancel());
  }, [words, reducedMotion]);

  return (
    <span className={styles.rotatingWords}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {words.map((word, index) => (
        <span
          key={word}
          ref={(element) => {
            wordRefs.current[index] = element;
          }}
          className={styles.word}
          aria-hidden="true"
          style={
            { '--hue-delay': `${((-index * 10) / words.length).toFixed(1)}s` } as CSSProperties
          }
        >
          {word}
        </span>
      ))}
    </span>
  );
};
