import type { CSSProperties } from 'react';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './RotatingWords.module.css';

type RotatingWordsProps = {
  words: readonly [string, string, string];
  // Everything the words say together, for screen readers.
  label: string;
};

export const RotatingWords = ({ words, label }: RotatingWordsProps) => (
  <span className={styles.rotatingWords}>
    <VisuallyHidden>{label}</VisuallyHidden>
    {words.map((word, index) => (
      <span
        key={word}
        className={styles.word}
        aria-hidden="true"
        style={
          {
            '--swap-delay': `${-(words.length - index) * 3}s`,
            '--hue-delay': `${((-index * 10) / words.length).toFixed(1)}s`,
          } as CSSProperties
        }
      >
        {word}
      </span>
    ))}
  </span>
);
