import type { Theme } from '../../types';

/** Default tile size in CSS pixels; the real size stretches slightly so whole tiles fill the parent. */
export const MOSAIC_CELL = 24;

type Rgb = [number, number, number];

type MosaicPalette = {
  /** Flat colour the top of the card settles into, so text there reads cleanly */
  top: string;
  /** Bottom-edge colours, left to right; the gradient rises from here */
  bottom: readonly [string, string];
  /** Per-tile lightness jitter at the bottom edge, as a fraction toward white or black */
  jitter: number;
  /** How quickly the gradient fades going up; higher keeps more of the card flat */
  ease: number;
};

// The favicon's colours and per-tile jitter, rising from the bottom edge and fading out
// toward the top, where the tiles are barely distinguishable.
const PALETTES: Record<Theme, MosaicPalette> = {
  dark: { top: '#131830', bottom: ['#2f5fae', '#4a3a9a'], jitter: 0.14, ease: 1.8 },
  light: { top: '#f8f9fe', bottom: ['#9fc3f0', '#c1b0f2'], jitter: 0.09, ease: 1.4 },
};

/** Shown on the canvas until its first draw, and the colour the top of the mosaic settles into. */
export const mosaicTopColor = (theme: Theme) => PALETTES[theme].top;

const hex = (h: string): Rgb => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)) as Rgb;
const mix = (a: Rgb, b: Rgb, t: number): Rgb => a.map((v, i) => v + (b[i] - v) * t) as Rgb;
const shade = (c: Rgb, k: number): Rgb =>
  k >= 0 ? mix(c, [255, 255, 255], k) : mix(c, [4, 5, 14], -k);
/** Deterministic noise in [-0.5, 0.5), so the mosaic is identical on every render. */
const jitter = (x: number, y: number) => {
  const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return s - Math.floor(s) - 0.5;
};

/** Colour of the tile at (x, y) on a cols × rows grid. */
/** Small surfaces (a button) have few rows, so they need livelier tiles to read as pixels. */
const VIVID = { jitter: 1.7, ease: 0.55 };

export const mosaicTileColor = (
  theme: Theme,
  x: number,
  y: number,
  cols: number,
  rows: number,
  vivid = false,
) => {
  const palette = PALETTES[theme];
  const { top, bottom } = palette;
  const amount = palette.jitter * (vivid ? VIVID.jitter : 1);
  const ease = palette.ease * (vivid ? VIVID.ease : 1);
  const u = (x + 0.5) / cols;
  // 0 at the top edge, 1 at the bottom; eased so the upper half stays calm
  const rise = ((y + 0.5) / rows) ** ease;
  let c = mix(hex(top), mix(hex(bottom[0]), hex(bottom[1]), u), rise);
  // a faint trace of texture remains at the top so the card still reads as pixelated
  c = shade(c, jitter(x + 11, y + 5) * amount * 2 * (0.1 + 0.9 * rise));
  return `rgb(${c.map((n) => Math.round(Math.max(0, Math.min(255, n)))).join(' ')})`;
};

/** Paints one canvas pixel per tile; CSS scales the canvas up with crisp edges. */
export const drawMosaic = (
  ctx: CanvasRenderingContext2D,
  theme: Theme,
  cols: number,
  rows: number,
  vivid = false,
) => {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      ctx.fillStyle = mosaicTileColor(theme, x, y, cols, rows, vivid);
      ctx.fillRect(x, y, 1, 1);
    }
  }
};
