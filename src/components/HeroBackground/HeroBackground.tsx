import { type RefObject, useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';
import styles from './HeroBackground.module.css';
import { drawHeroMosaic, heroCellSize, heroRowCount, MOBILE_CELL } from './heroTiles';

type HeroBackgroundProps = {
  /** The element the tiles start to fade out below: the action buttons. */
  fadeAfter: RefObject<HTMLElement | null>;
};

/**
 * A pastel mosaic of large pixels behind the hero. It is drawn once, as one canvas pixel per
 * tile that CSS scales up crisply, so it costs nothing while the page sits still. The tiles fade
 * out from the bottom of the buttons and are gone by the bottom edge of the hero.
 */
export const HeroBackground = ({ fadeAfter }: HeroBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    const buttons = fadeAfter.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !hero || !buttons || !ctx) return;

    let drawn = '';
    const draw = () => {
      // The first row of tiles starts at the very top of the page, so that the pattern begins in
      // the top left corner instead of being cropped behind the navbar
      const heroTop = hero.getBoundingClientRect().top + window.scrollY;
      canvas.style.top = `${-heroTop}px`;
      const top = canvas.getBoundingClientRect().top;
      const fadeStart = buttons.getBoundingClientRect().bottom - top;
      const heroBottom = hero.getBoundingClientRect().bottom - top;
      const cell = heroCellSize(canvas.clientWidth);
      const cols = Math.max(1, Math.round(canvas.clientWidth / cell));
      const rows = heroRowCount(fadeStart, heroBottom, cell);
      const fadeStartRow = fadeStart / cell;

      // Redraw only when something that shows has changed, not on every pixel of a resize
      const key = `${theme}|${cell}|${cols}|${rows}|${fadeStartRow.toFixed(2)}|${heroTop.toFixed(1)}`;
      if (key === drawn) return;
      drawn = key;
      canvas.width = cols;
      canvas.height = rows;
      canvas.style.height = `${rows * cell}px`;
      drawHeroMosaic(ctx, theme, cols, rows, fadeStartRow, cell === MOBILE_CELL);
    };

    draw();
    const resizeObserver = new ResizeObserver(draw);
    resizeObserver.observe(hero);
    resizeObserver.observe(buttons);
    // The buttons move a little once the web fonts are in
    void document.fonts?.ready.then(draw);
    return () => resizeObserver.disconnect();
  }, [theme, fadeAfter]);

  return <canvas ref={canvasRef} className={styles.heroBackground} aria-hidden="true" />;
};
