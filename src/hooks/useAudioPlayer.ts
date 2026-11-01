import { useEffect, useRef, useState } from 'react';

export const useAudioPlayer = (src: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => () => audioRef.current?.pause(), []);

  const play = () => {
    if (!audioRef.current) {
      const audio = new Audio(src);
      audio.addEventListener('play', () => setPlaying(true));
      audio.addEventListener('pause', () => setPlaying(false));
      audio.addEventListener('ended', () => setPlaying(false));
      audioRef.current = audio;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => setPlaying(false));
  };

  return { play, playing };
};
