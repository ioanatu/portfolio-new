import { useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';
import type { Theme } from '../../types';
import { drawMosaic, MOSAIC_CELL, mosaicTopColor } from './mosaicTiles';
import styles from './PixelMosaic.module.css';

type PixelMosaicProps = {
  /** Tile size in CSS pixels */
  cell?: number;
  /** Fixed palette for surfaces that look the same in both themes; defaults to the site theme */
  theme?: Theme;
  /** Livelier tiles and a taller gradient, for small surfaces with only a few rows */
  vivid?: boolean;
};

/**
 * Pixel-art backdrop for its parent, in the style of the favicon. The canvas holds one
 * pixel per tile and is stretched to the parent's size, so whole tiles always fill it.
 */
export const PixelMosaic = ({
  cell = MOSAIC_CELL,
  theme: fixedTheme,
  vivid = false,
}: PixelMosaicProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme: siteTheme } = useTheme();
  const theme = fixedTheme ?? siteTheme;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let cols = 0;
    let rows = 0;
    const resize = () => {
      const { clientWidth: width, clientHeight: height } = canvas;
      const nextCols = Math.max(1, Math.round(width / cell));
      const nextRows = Math.max(1, Math.round(height / cell));
      // Redraw only when the tile count changes, not on every pixel of a resize
      if (nextCols === cols && nextRows === rows) return;
      cols = nextCols;
      rows = nextRows;
      canvas.width = cols;
      canvas.height = rows;
      drawMosaic(ctx, theme, cols, rows, vivid);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    return () => resizeObserver.disconnect();
  }, [theme, cell, vivid]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.mosaic}
      style={{ backgroundColor: mosaicTopColor(theme) }}
      aria-hidden="true"
    />
  );
};
