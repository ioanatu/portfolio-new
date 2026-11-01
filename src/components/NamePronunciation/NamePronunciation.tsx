import clsx from 'clsx';
import { Volume2 } from 'lucide-react';
import type { ReactNode } from 'react';
import nameAudio from '../../assets/name.ogg';
import { PRONUNCIATION_LABEL } from '../../content/hero';
import { useAudioPlayer } from '../../hooks/useAudioPlayer';
import styles from './NamePronunciation.module.css';

type NamePronunciationProps = {
  children: ReactNode;
};

export const NamePronunciation = ({ children }: NamePronunciationProps) => {
  const { play, playing } = useAudioPlayer(nameAudio);

  return (
    <span className={styles.namePronunciation}>
      {children}
      <span className={styles.tooltip}>
        <span className={styles.bubble}>
          <span className={styles.label}>{PRONUNCIATION_LABEL}</span>
          <button
            type="button"
            tabIndex={-1}
            className={clsx(styles.play, { [styles.playing]: playing })}
            aria-label={PRONUNCIATION_LABEL}
            onClick={play}
          >
            <Volume2 size={18} strokeWidth={1.8} aria-hidden="true" />
          </button>
        </span>
      </span>
    </span>
  );
};

type PronunciationButtonProps = {
  className?: string;
};

export const PronunciationButton = ({ className }: PronunciationButtonProps) => {
  const { play, playing } = useAudioPlayer(nameAudio);

  return (
    <button
      type="button"
      className={clsx(styles.keyboardButton, { [styles.playing]: playing }, className)}
      onClick={play}
    >
      <Volume2 size={18} strokeWidth={1.8} aria-hidden="true" />
      {PRONUNCIATION_LABEL}
    </button>
  );
};
