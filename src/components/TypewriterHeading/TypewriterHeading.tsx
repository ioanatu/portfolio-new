import clsx from 'clsx';
import { type CSSProperties, Fragment, useEffect, useEffectEvent, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './TypewriterHeading.module.css';

const START_DELAY_MS = 300;
const WORD_STAGGER_MS = 75;
const WORD_DURATION_MS = 1000;
const SETTLE_LEAD_MS = 350;
const SETTLED_AFTER_MS = 30;

type Phase = 'waiting' | 'rising' | 'settled';

type TypewriterHeadingProps = {
  id: string;
  lines: readonly string[];
  className?: string;
  hotWord?: RegExp;
  boldWord?: RegExp;
  onSettle?: () => void;
};

/** Heading whose words rise in one after another. Screen readers get the plain text. */
export const TypewriterHeading = ({
  id,
  lines,
  className,
  hotWord,
  boldWord,
  onSettle,
}: TypewriterHeadingProps) => {
  const reducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>('waiting');
  const notifySettle = useEffectEvent(() => onSettle?.());

  const wordsByLine = lines.map((line) => line.split(' '));
  const firstWordIndex = wordsByLine.map((_, lineIndex) =>
    wordsByLine.slice(0, lineIndex).reduce((count, words) => count + words.length, 0),
  );
  const wordCount = wordsByLine.reduce((count, words) => count + words.length, 0);

  useEffect(() => {
    if (reducedMotion) {
      notifySettle();
      return;
    }
    const total = (wordCount - 1) * WORD_STAGGER_MS + WORD_DURATION_MS;
    const timers = [
      setTimeout(() => setPhase('rising'), START_DELAY_MS),
      setTimeout(notifySettle, START_DELAY_MS + total - SETTLE_LEAD_MS),
      setTimeout(() => setPhase('settled'), START_DELAY_MS + total + SETTLED_AFTER_MS),
    ];
    return () => timers.forEach(clearTimeout);
  }, [reducedMotion, wordCount]);

  const currentPhase = reducedMotion ? 'settled' : phase;

  return (
    <h1 id={id} className={clsx(styles.typewriterHeading, styles[currentPhase], className)}>
      <VisuallyHidden>{lines.join(' ')}</VisuallyHidden>
      <span aria-hidden="true">
        {wordsByLine.map((words, lineIndex) => (
          <Fragment key={lines[lineIndex]}>
            {lineIndex > 0 && ' '}
            <span className={styles.line}>
              {words.map((word, position) => {
                const index = firstWordIndex[lineIndex] + position;
                return (
                  <Fragment key={index}>
                    {position > 0 && ' '}
                    <span className={styles.word}>
                      <span
                        className={clsx(styles.inner, {
                          [styles.hot]: hotWord?.test(word),
                          [styles.bold]: boldWord?.test(word),
                        })}
                        style={{ '--i': index } as CSSProperties}
                      >
                        {word}
                      </span>
                    </span>
                  </Fragment>
                );
              })}
            </span>
          </Fragment>
        ))}
      </span>
    </h1>
  );
};
