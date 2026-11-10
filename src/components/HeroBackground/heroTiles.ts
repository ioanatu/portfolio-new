import type { Theme } from '../../types';
import { hex, jitter, mix, type Rgb, shade } from '../PixelMosaic/mosaicTiles';

const smooth = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** Tile size in CSS pixels: twice that of the AI engineering card (`MOSAIC_CELL`). */
export const HERO_CELL = 48;

/** Tile size on narrow screens, where 48px tiles would be only a handful across. */
export const MOBILE_CELL = 32;
const MOBILE_MAX_WIDTH = 640;

/** The tile size for a hero that is `widthPx` wide. */
export const heroCellSize = (widthPx: number) =>
  widthPx <= MOBILE_MAX_WIDTH ? MOBILE_CELL : HERO_CELL;

/** Share of the tiles that are made more transparent, so that the mosaic is quieter. */
const QUIET_SHARE = 0.26;
/** How much of those tiles stays visible. */
const QUIET_OPACITY = 0.38;

/** How calm the middle of the screen is: 1 right in the middle, falling to 0 towards the sides. */
export const calmness = (x: number, cols: number) => {
  const u = (x + 0.5) / cols;
  return smooth(clamp01(1 - Math.abs(u - 0.5) / 0.3));
};

/** Whether the tile at (x, y) is one of the random ones that are made more transparent. */
export const isQuiet = (x: number, y: number) => jitter(x + 97, y + 43) + 0.5 < QUIET_SHARE;

/** Rows above the bottom of the hero, where the "Experience" pill of the next section sits. */
const PILL_ROWS_ABOVE = 3;
/** How much of a tile there stays visible. */
const PILL_OPACITY = 0.4;

/**
 * Whether the tile at (x, y) is one of the few random ones just above the "Experience" pill that
 * are made more transparent, so that the pill and its heading sit on calmer ground. They are more
 * likely in the middle, where the pill is.
 */
export const isAbovePill = (x: number, y: number, cols: number, rows: number) => {
  const heroBottomRow = rows - MAX_TRAIL_ROWS - REACH_BELOW_HERO_ROWS;
  if (y < heroBottomRow - PILL_ROWS_ABOVE || y > heroBottomRow) return false;
  return jitter(x + 53, y + 31) + 0.5 < 0.2 + 0.5 * calmness(x, cols);
};

/** The tile's opacity before any fade: 1, or a lower value for a quiet tile. */
export const tileOpacity = (x: number, y: number, cols = 0, rows = 0) =>
  (isQuiet(x, y) ? QUIET_OPACITY : 1) *
  (cols > 0 && isAbovePill(x, y, cols, rows) ? PILL_OPACITY : 1);

/** The fade below the buttons always spans at least this many rows of tiles. */
export const MIN_FADE_ROWS = 3;

/** The mosaic reaches this many rows (about 100px) below the bottom edge of the hero. */
export const REACH_BELOW_HERO_ROWS = 2;

/** Where the bottom of the buttons sits, as a fraction of the height the patches are placed in. */
const BUTTONS_AT = 0.78;

/** The most rows a trailing column can reach beyond the rest of the fade. */
export const MAX_TRAIL_ROWS = 7;

/** A soft patch of colour, placed and sized as fractions of the mosaic. */
type Blob = { x: number; y: number; rx: number; ry: number; color: string };

type HeroPalette = {
  /** The page colour the tiles settle into away from the patches */
  base: string;
  blobs: readonly Blob[];
  /** Per-tile lightness jitter as a fraction toward white or black */
  jitter: number;
  /**
   * Per-tile lightness jitter in colour levels, as an alternative to `jitter`. Every channel moves
   * by the same amount, so a tile keeps its colour: mixing toward white or black washes it out
   * and turns the mosaic grey. Darker tiles even get a touch more saturated.
   */
  levels?: number;
  /** Shifts the jitter toward white (positive) so that pastels do not turn grey */
  lift: number;
};

// Light: the colours of the old hero gradient, read from a screenshot of it: rose at the top
// left, blue down the left side, lavender at the bottom and a pale blue on the right.
// Dark: the same patches, deep and muted.
const PALETTES: Record<Theme, HeroPalette> = {
  light: {
    base: '#eef0f3',
    jitter: 0.077,
    levels: 19.8,
    lift: 0.12,
    blobs: [
      { x: 0.62, y: 0.1, rx: 0.3, ry: 0.22, color: '#f6f6f9' },
      { x: 0.9, y: 0.5, rx: 0.4, ry: 0.55, color: '#dbe8f7' },
      { x: 0.18, y: 0.1, rx: 0.34, ry: 0.3, color: '#f1d7df' },
      { x: 0.03, y: 0.7, rx: 0.32, ry: 0.4, color: '#d2e2f6' },
      { x: 0.45, y: 0.8, rx: 0.36, ry: 0.28, color: '#cdd8fa' },
    ],
  },
  dark: {
    base: '#10121c',
    jitter: 0.066,
    lift: 0,
    blobs: [
      { x: 0.92, y: 0.55, rx: 0.34, ry: 0.55, color: '#1c2a3f' },
      { x: 0.17, y: 0.08, rx: 0.32, ry: 0.3, color: '#3c1f2b' },
      { x: 0.03, y: 0.72, rx: 0.3, ry: 0.34, color: '#223757' },
      { x: 0.42, y: 0.84, rx: 0.34, ry: 0.3, color: '#2b3774' },
    ],
  },
};

/**
 * Rows of tiles that fit the mosaic. It runs from behind the navbar to the bottom of the hero and
 * a little beyond, with room for the trailing columns.
 */
export const heroRowCount = (fadeStartPx: number, heroBottomPx: number, cell = HERO_CELL) =>
  Math.max(Math.ceil(fadeStartPx / cell) + MIN_FADE_ROWS, Math.round(heroBottomPx / cell)) +
  REACH_BELOW_HERO_ROWS +
  MAX_TRAIL_ROWS;

/** Columns whose hash is above this trail further down than the rest, about one in five. */
const TRAIL_THRESHOLD = 0.8;

/** Some random columns trail further down than the rest: how many rows further, or 0. */
export const trailRows = (x: number) => {
  const h = jitter(x + 36, 3) + 0.5;
  if (h <= TRAIL_THRESHOLD) return 0;
  const share = (h - TRAIL_THRESHOLD) / (1 - TRAIL_THRESHOLD);
  return 2 + Math.min(MAX_TRAIL_ROWS - 2, Math.floor(share * (MAX_TRAIL_ROWS - 1)));
};

/** A few random tiles stand out 50% more than the rest. */
const HIGHLIGHT_BOOST = 1.5;
/** Share of the tiles that are highlighted: mostly the blue ones, but a few of the others too. */
const HIGHLIGHT_BASE_SHARE = 0.07;
const HIGHLIGHT_BLUE_SHARE = 0.24;

/** Whether the tile at (x, y) is one of the few highlighted ones; the bluer, the likelier. */
export const isHighlighted = (x: number, y: number, [r, , b]: Rgb) => {
  const blueness = clamp01((b - r) / 28);
  return jitter(x + 71, y + 13) + 0.5 < HIGHLIGHT_BASE_SHARE + HIGHLIGHT_BLUE_SHARE * blueness;
};

/** Reach of the darker tiles from the left edge, as a share of the width. */
const DARK_REACH = 0.42;
/** Share of the tiles at the very left edge that are darker, falling to none at the reach. */
const DARK_SHARE = 0.8;
/** How much darker those tiles are, as a share of the colour levels of the normal variation. */
const DARK_DEPTH = 1.1;

/** The darker tiles thin out between these distances from the left edge, where the text begins. */
const TEXT_NEAR_FROM = 0.1;
const TEXT_NEAR_TO = 0.26;
/** Share of the darker tiles that is kept right next to the text. */
const TEXT_NEAR_KEEP = 0.12;

/** Whether the tile in column `x` of `cols` is one of the randomly darker ones on the left. */
export const isDarkened = (x: number, y: number, cols: number) => {
  const u = (x + 0.5) / cols;
  const left = clamp01(1 - u / DARK_REACH);
  // Close to the text the darker tiles are fewer, so they do not compete with it
  const nearText = smooth(clamp01((u - TEXT_NEAR_FROM) / (TEXT_NEAR_TO - TEXT_NEAR_FROM)));
  const thinning = 1 - (1 - TEXT_NEAR_KEEP) * nearText;
  return jitter(x + 19, y + 53) + 0.5 < DARK_SHARE * left * left ** 0.5 * thinning;
};

/** How much of the variation between tiles is removed right in the middle of the screen. */
const MIDDLE_CALM = 0.7;

/** Random tiles beside the text get lighter than normal, between these distances from the left. */
const LIFT_FROM = 0.1;
const LIFT_TO = 0.32;
const LIFT_SHARE = 0.28;
const LIFT_DEPTH = 0.75;

/** Whether the tile at (x, y) is one of the random ones beside the text that are made lighter. */
export const isLightened = (x: number, y: number, cols: number) => {
  const u = (x + 0.5) / cols;
  const band = Math.sin(Math.PI * clamp01((u - LIFT_FROM) / (LIFT_TO - LIFT_FROM)));
  return jitter(x + 83, y + 29) + 0.5 < LIFT_SHARE * band;
};

/** How pink a colour is: 0 for blues and greys, 1 for a clear rose. */
const pinkness = ([r, , b]: Rgb) => clamp01((r - b - 2) / 16);

/** Share of the pinkest tiles that are turned back to the page colour. */
const PINK_REMOVED_SHARE = 0.35;

/** Whether the tile at (x, y), with this colour, is one of the few pink ones that are removed. */
export const isPinkRemoved = (x: number, y: number, colour: Rgb) =>
  jitter(x + 7, y + 61) + 0.5 < PINK_REMOVED_SHARE * pinkness(colour);

/**
 * Colour of the tile at (x, y) on a grid of `cols` columns, without its fade. The patches are
 * placed relative to the buttons, `fadeStartRow` being the row they end in, so that they sit in
 * the same place however tall the mosaic is.
 */
export const heroTileColor = (
  theme: Theme,
  x: number,
  y: number,
  cols: number,
  fadeStartRow: number,
) => {
  const palette = PALETTES[theme];
  const u = (x + 0.5) / cols;
  const v = ((y + 0.5) / fadeStartRow) * BUTTONS_AT;
  let colour: Rgb = hex(palette.base);
  let presence = 0;
  for (const blob of palette.blobs) {
    const distance = Math.hypot((u - blob.x) / blob.rx, (v - blob.y) / blob.ry);
    const weight = smooth(clamp01(1 - distance));
    colour = mix(colour, hex(blob.color), weight);
    presence = Math.max(presence, weight);
  }
  // A few of the pink tiles go back to the page colour, so the rose is less solid
  if (isPinkRemoved(x, y, colour)) colour = mix(colour, hex(palette.base), 0.85);
  // Every tile gets a little jitter, the coloured parts more, so the whole reads as pixels
  const noise = jitter(x + 3, y + 17) + palette.lift;
  // Random tiles on the left are darker, more of them the nearer the edge
  // and some beside the text are lighter, so that the text has calm tiles around it
  const darker =
    (isDarkened(x, y, cols) ? DARK_DEPTH : 0) - (isLightened(x, y, cols) ? LIFT_DEPTH : 0);
  // In the middle of the screen, behind the text, the variation is much smaller and nothing is
  // highlighted, so that the pattern is quiet there
  const calm = calmness(x, cols);
  const boost = isHighlighted(x, y, colour) ? 1 + (HIGHLIGHT_BOOST - 1) * (1 - calm) : 1;
  const strength = (0.35 + 0.65 * presence) * boost * (1 - MIDDLE_CALM * calm);
  if (palette.levels === undefined) {
    return shade(colour, noise * palette.jitter * 2 * strength - darker * palette.jitter * 2);
  }
  const delta = noise * palette.levels * strength - darker * palette.levels;
  const shifted = colour.map((v) => v + delta) as Rgb;
  if (delta >= 0) return shifted;
  // darker tiles move away from grey, in proportion to how much darker they are
  const grey = (shifted[0] + shifted[1] + shifted[2]) / 3;
  return shifted.map((v) => v + (v - grey) * -delta * 0.05) as Rgb;
};

/**
 * How visible the tile in row `y` is. Everything down to the buttons is fully visible; from
 * there the tiles fade out, with a little noise so they dissolve rather than form flat bands,
 * and the last row is gone. `fadeStartRow` may be fractional: the row the buttons end in.
 */
export const heroTileAlpha = (x: number, y: number, rows: number, fadeStartRow: number) => {
  // The last row of the fade; a trailing column fades out over more rows, so it reaches lower
  const lastRow = rows - MAX_TRAIL_ROWS - 0.5 + trailRows(x);
  if (lastRow <= fadeStartRow) return 1;
  const t = clamp01((y + 0.5 - fadeStartRow) / (lastRow - fadeStartRow));
  const noise = jitter(x + 29, y + 7) * 0.45 * 4 * t * (1 - t);
  const trailing = trailRows(x) > 0;
  // A trailing column keeps more of its colour on the way down, so it reads as a deliberate streak
  return clamp01((trailing ? (1 - smooth(t)) ** 0.55 : 1 - smooth(t)) + noise);
};

/** On a phone, the left tiles beside the buttons keep only this share of their opacity. */
const PHONE_BUTTONS_OPACITY = 0.5;

/**
 * On a phone the buttons stack and sit close to the left edge's strong tiles, which compete with
 * them. The tiles to the left of the buttons, from a few rows above them to just below, are made
 * fainter, most of all at the edge and easing out towards the middle and the surrounding rows.
 */
export const phoneButtonsDimming = (x: number, y: number, cols: number, fadeStartRow: number) => {
  const left = smooth(clamp01(1 - (x + 0.5) / cols / 0.55));
  const above = smooth(clamp01((y + 0.5 - (fadeStartRow - 7)) / 3));
  const below = smooth(clamp01((fadeStartRow + 2 - (y + 0.5)) / 2));
  return 1 - (1 - PHONE_BUTTONS_OPACITY) * left * above * below;
};

/** Paints one canvas pixel per tile, with alpha for the fade; CSS scales the canvas up. */
export const drawHeroMosaic = (
  ctx: CanvasRenderingContext2D,
  theme: Theme,
  cols: number,
  rows: number,
  fadeStartRow: number,
  phone = false,
) => {
  ctx.clearRect(0, 0, cols, rows);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const alpha = heroTileAlpha(x, y, rows, fadeStartRow);
      const dimming = phone ? phoneButtonsDimming(x, y, cols, fadeStartRow) : 1;
      const opacity = alpha * tileOpacity(x, y, cols, rows) * dimming;
      if (opacity <= 0.01) continue;
      const [r, g, b] = heroTileColor(theme, x, y, cols, fadeStartRow).map((n) =>
        Math.round(Math.max(0, Math.min(255, n))),
      );
      ctx.fillStyle = `rgb(${r} ${g} ${b} / ${opacity.toFixed(3)})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }
};
