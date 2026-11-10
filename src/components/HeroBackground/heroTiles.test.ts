import { MOSAIC_CELL } from '../PixelMosaic/mosaicTiles';
import {
  calmness,
  drawHeroMosaic,
  HERO_CELL,
  heroCellSize,
  heroRowCount,
  heroTileAlpha,
  heroTileColor,
  isAbovePill,
  isDarkened,
  isHighlighted,
  isLightened,
  isPinkRemoved,
  isQuiet,
  MAX_TRAIL_ROWS,
  MOBILE_CELL,
  phoneButtonsDimming,
  REACH_BELOW_HERO_ROWS,
  tileOpacity,
  trailRows,
} from './heroTiles';

const channels = (colour: readonly number[]) => colour.map((n) => Math.round(n));

describe('heroTiles', () => {
  it('uses tiles twice as big as the AI engineering card', () => {
    expect(HERO_CELL).toBe(MOSAIC_CELL * 2);
  });

  describe('heroTileColor', () => {
    it('is the same on every call, so the mosaic never changes between renders', () => {
      expect(heroTileColor('light', 5, 7, 36, 14.5)).toEqual(
        heroTileColor('light', 5, 7, 36, 14.5),
      );
    });

    it('is rose at the top left and blue at the left and at the bottom, in the light theme', () => {
      const [r1, , b1] = channels(heroTileColor('light', 6, 1, 36, 14.5));
      expect(r1).toBeGreaterThan(b1 - 1); // warmer than the page's blue-grey
      const [r2, g2, b2] = channels(heroTileColor('light', 0, 10, 36, 14.5));
      expect(b2).toBeGreaterThan(r2 + 10); // clearly blue
      expect(b2).toBeGreaterThanOrEqual(g2);
      const [r3, g3, b3] = channels(heroTileColor('light', 15, 12, 36, 14.5));
      // the bottom used to be lavender and is blue now, borrowing the blue of the call to action
      expect(b3).toBeGreaterThan(r3 + 15);
      expect(b3).toBeGreaterThan(g3);
    });

    it('keeps the pastels light in the light theme and deep in the dark theme', () => {
      const lightest = (theme: 'light' | 'dark') => {
        let min = 255;
        for (let y = 0; y < 20; y++)
          for (let x = 0; x < 36; x++) min = Math.min(min, ...heroTileColor(theme, x, y, 36, 14.5));
        return min;
      };
      // a few tiles on the left are deliberately darker, but nothing leaves the pastel range
      expect(lightest('light')).toBeGreaterThan(150);
      const darkTiles = [] as number[];
      for (let y = 0; y < 20; y++)
        for (let x = 0; x < 36; x++)
          darkTiles.push(Math.max(...heroTileColor('dark', x, y, 36, 20)));
      expect(Math.max(...darkTiles)).toBeLessThan(120);
    });
  });

  describe('heroTileAlpha', () => {
    const rows = 30;
    const fadeStartRow = 14.5;

    it('keeps every tile down to the buttons fully visible', () => {
      for (let y = 0; y < 14; y++) expect(heroTileAlpha(3, y, rows, fadeStartRow)).toBe(1);
    });

    it('fades the tiles out below the buttons, and the last row is gone', () => {
      const alphas = Array.from({ length: rows - 14 }, (_, i) => {
        let sum = 0;
        for (let x = 0; x < 36; x++) sum += heroTileAlpha(x, 14 + i, rows, fadeStartRow);
        return sum / 36;
      });
      alphas.slice(1).forEach((alpha, i) => expect(alpha).toBeLessThan(alphas[i] + 0.05));
      expect(alphas[0]).toBeGreaterThan(0.85);
      expect(alphas.at(-1)).toBeLessThan(0.02);
      for (let x = 0; x < 36; x++) expect(heroTileAlpha(x, rows - 1, rows, fadeStartRow)).toBe(0);
    });

    it('never leaves the 0 to 1 range', () => {
      for (let y = 0; y < rows; y++)
        for (let x = 0; x < 36; x++) {
          const alpha = heroTileAlpha(x, y, rows, fadeStartRow);
          expect(alpha).toBeGreaterThanOrEqual(0);
          expect(alpha).toBeLessThanOrEqual(1);
        }
    });
  });

  describe('drawHeroMosaic', () => {
    it('paints one canvas pixel per visible tile and nothing in the last, faded-out row', () => {
      const fillRect = vi.fn();
      const clearRect = vi.fn();
      const ctx = { fillRect, clearRect, fillStyle: '' } as unknown as CanvasRenderingContext2D;

      drawHeroMosaic(ctx, 'light', 10, 14, 4.5);

      expect(clearRect).toHaveBeenCalledWith(0, 0, 10, 14);
      const rowsPainted = new Set(fillRect.mock.calls.map(([, y]) => y));
      expect(rowsPainted.has(0)).toBe(true);
      expect(rowsPainted.has(13)).toBe(false);
      fillRect.mock.calls.forEach((call) => expect(call.slice(2)).toEqual([1, 1]));
    });
  });

  describe('heroRowCount', () => {
    it('reaches about 100px below the hero, with room for the trailing columns', () => {
      const withoutReach = Math.round(720 / HERO_CELL);
      expect(heroRowCount(300, 720)).toBe(withoutReach + REACH_BELOW_HERO_ROWS + MAX_TRAIL_ROWS);
      expect(REACH_BELOW_HERO_ROWS * HERO_CELL).toBeGreaterThanOrEqual(90);
      expect(REACH_BELOW_HERO_ROWS * HERO_CELL).toBeLessThanOrEqual(110);
    });

    it('keeps at least a few rows of fade under the buttons when the hero ends right below them', () => {
      expect(heroRowCount(300, 310)).toBeGreaterThanOrEqual(
        Math.ceil(300 / HERO_CELL) + 3 + REACH_BELOW_HERO_ROWS + MAX_TRAIL_ROWS,
      );
    });
  });

  describe('trailing columns', () => {
    const trailing = Array.from({ length: 60 }, (_, x) => trailRows(x)).filter((rows) => rows > 0);

    it('are only some of the columns, each reaching a different number of rows further', () => {
      expect(trailing.length).toBeGreaterThanOrEqual(6);
      expect(trailing.length).toBeLessThanOrEqual(16);
      expect(new Set(trailing).size).toBeGreaterThanOrEqual(4);
      trailing.forEach((rows) => {
        expect(rows).toBeGreaterThanOrEqual(2);
        expect(rows).toBeLessThanOrEqual(MAX_TRAIL_ROWS);
      });
    });

    it('include at least one on a phone-sized grid of 12 columns', () => {
      expect(Array.from({ length: 12 }, (_, x) => trailRows(x)).some((rows) => rows > 0)).toBe(
        true,
      );
    });

    it('stay visible lower down than the other columns', () => {
      const rows = heroRowCount(300, 720);
      const fadeStartRow = 300 / HERO_CELL;
      const trailingColumn = Array.from({ length: 60 }, (_, x) => x).find((x) => trailRows(x) > 0)!;
      const plainColumn = Array.from({ length: 60 }, (_, x) => x).find((x) => trailRows(x) === 0)!;
      const row = rows - MAX_TRAIL_ROWS - 2;

      expect(heroTileAlpha(trailingColumn, row, rows, fadeStartRow)).toBeGreaterThan(
        heroTileAlpha(plainColumn, row, rows, fadeStartRow),
      );
    });
  });

  describe('isHighlighted', () => {
    const blue = [210, 226, 246] as [number, number, number];
    const rose = [240, 215, 223] as [number, number, number];
    const share = (colour: [number, number, number]) => {
      let count = 0;
      for (let y = 0; y < 40; y++)
        for (let x = 0; x < 40; x++) if (isHighlighted(x, y, colour)) count++;
      return count / 1600;
    };

    it('highlights only a few tiles, the same ones on every call', () => {
      expect(isHighlighted(4, 9, blue)).toBe(isHighlighted(4, 9, blue));
      expect(share(blue)).toBeLessThan(0.35);
      expect(share(rose)).toBeLessThan(0.15);
    });

    it('prefers the blue tiles, but not exclusively', () => {
      expect(share(blue)).toBeGreaterThan(share(rose) * 1.5);
      expect(share(rose)).toBeGreaterThan(0);
    });
  });

  describe('isDarkened', () => {
    const share = (x0: number, x1: number, cols = 36) => {
      let count = 0;
      let total = 0;
      for (let y = 0; y < 30; y++)
        for (let x = x0; x < x1; x++) {
          total++;
          if (isDarkened(x, y, cols)) count++;
        }
      return count / total;
    };

    it('darkens random tiles on the left, more of them the nearer the edge', () => {
      expect(isDarkened(2, 5, 36)).toBe(isDarkened(2, 5, 36));
      expect(share(0, 4)).toBeGreaterThan(0.2);
      expect(share(0, 4)).toBeGreaterThan(share(6, 10));
    });

    it('has fewer darker tiles next to the text than further out on the left', () => {
      // columns 6 to 9 of 36 sit right beside the hero text
      expect(share(6, 10)).toBeLessThan(share(0, 4) * 0.5);
      expect(share(6, 10)).toBeGreaterThan(0);
    });

    it('leaves the right side and the middle alone', () => {
      expect(share(16, 36)).toBe(0);
    });

    it('makes the darkened tiles darker in both themes', () => {
      const brightness = (colour: readonly number[]) => colour[0] + colour[1] + colour[2];
      (['light', 'dark'] as const).forEach((theme) => {
        const dark: number[] = [];
        const normal: number[] = [];
        for (let y = 0; y < 14; y++)
          for (let x = 0; x < 4; x++)
            (isDarkened(x, y, 36) ? dark : normal).push(
              brightness(heroTileColor(theme, x, y, 36, 14.5)),
            );
        const mean = (list: number[]) => list.reduce((a, b) => a + b, 0) / list.length;
        expect(mean(dark)).toBeLessThan(mean(normal));
      });
    });
  });

  describe('isLightened', () => {
    const share = (x0: number, x1: number) => {
      let count = 0;
      let total = 0;
      for (let y = 0; y < 30; y++)
        for (let x = x0; x < x1; x++) {
          total++;
          if (isLightened(x, y, 36)) count++;
        }
      return count / total;
    };

    it('lightens some random tiles beside the text, and none at the edge or far from it', () => {
      expect(isLightened(7, 4, 36)).toBe(isLightened(7, 4, 36));
      expect(share(5, 11)).toBeGreaterThan(0.1);
      expect(share(0, 2)).toBe(0);
      expect(share(14, 36)).toBe(0);
    });
  });

  describe('isPinkRemoved', () => {
    const rose = [241, 215, 223] as [number, number, number];
    const blue = [210, 226, 246] as [number, number, number];
    const share = (colour: [number, number, number]) => {
      let count = 0;
      for (let y = 0; y < 40; y++)
        for (let x = 0; x < 40; x++) if (isPinkRemoved(x, y, colour)) count++;
      return count / 1600;
    };

    it('removes a few of the pink tiles and none of the blue ones', () => {
      expect(share(rose)).toBeGreaterThan(0.15);
      expect(share(rose)).toBeLessThan(0.5);
      expect(share(blue)).toBe(0);
    });
  });

  describe('quieter mosaic', () => {
    it('makes a share of the tiles more transparent, the same ones every time', () => {
      let quiet = 0;
      for (let y = 0; y < 40; y++) for (let x = 0; x < 40; x++) if (isQuiet(x, y)) quiet++;
      expect(quiet / 1600).toBeGreaterThan(0.18);
      expect(quiet / 1600).toBeLessThan(0.34);
      expect(isQuiet(3, 4)).toBe(isQuiet(3, 4));
    });

    it('keeps those tiles visible, just fainter', () => {
      const opacities = new Set<number>();
      for (let y = 0; y < 20; y++) for (let x = 0; x < 20; x++) opacities.add(tileOpacity(x, y));
      expect([...opacities].sort()).toEqual([expect.any(Number), 1]);
      expect(Math.min(...opacities)).toBeGreaterThan(0.2);
      expect(Math.min(...opacities)).toBeLessThan(0.6);
    });

    it('paints the faint tiles too, with a lower opacity', () => {
      const fills: string[] = [];
      const ctx = {
        fillRect: vi.fn(),
        clearRect: vi.fn(),
        set fillStyle(value: string) {
          fills.push(value);
        },
      } as unknown as CanvasRenderingContext2D;

      drawHeroMosaic(ctx, 'light', 20, 14, 8);

      const opacities = fills.map((fill) => Number(fill.split('/')[1].replace(')', '')));
      expect(opacities.some((opacity) => opacity > 0.2 && opacity < 0.5)).toBe(true);
    });

    it('is calmest in the middle of the screen, with less variation between tiles', () => {
      expect(calmness(10, 21)).toBeGreaterThan(0.95);
      expect(calmness(0, 21)).toBe(0);
      expect(calmness(20, 21)).toBe(0);
      // the difference between neighbouring tiles, which the colour patches hardly change
      const restlessness = (x0: number, x1: number) => {
        let sum = 0;
        let count = 0;
        for (let y = 0; y < 14; y++)
          for (let x = x0; x < x1; x++) {
            const here = heroTileColor('light', x, y, 21, 14.5).reduce((a, b) => a + b, 0);
            const next = heroTileColor('light', x + 1, y, 21, 14.5).reduce((a, b) => a + b, 0);
            sum += Math.abs(here - next);
            count++;
          }
        return sum / count;
      };
      expect(restlessness(8, 12)).toBeLessThan(restlessness(14, 19) * 0.6);
    });
  });

  describe('heroCellSize', () => {
    it('uses smaller tiles on a phone, and the full size above it', () => {
      expect(heroCellSize(390)).toBe(MOBILE_CELL);
      expect(heroCellSize(640)).toBe(MOBILE_CELL);
      expect(heroCellSize(641)).toBe(HERO_CELL);
      expect(heroCellSize(1720)).toBe(HERO_CELL);
      expect(MOBILE_CELL).toBeLessThan(HERO_CELL);
    });
  });

  describe('tiles above the Experience pill', () => {
    const cols = 30;
    const rows = heroRowCount(600, 800);
    const heroBottomRow = rows - MAX_TRAIL_ROWS - REACH_BELOW_HERO_ROWS;
    const share = (x0: number, x1: number, y0: number, y1: number) => {
      let count = 0;
      let total = 0;
      for (let y = y0; y <= y1; y++)
        for (let x = x0; x < x1; x++) {
          total++;
          if (isAbovePill(x, y, cols, rows)) count++;
        }
      return count / total;
    };

    it('makes a few tiles just above the pill more transparent, more of them in the middle', () => {
      const above = [heroBottomRow - 3, heroBottomRow] as const;
      expect(share(12, 18, ...above)).toBeGreaterThan(0.3);
      expect(share(0, 4, ...above)).toBeLessThan(share(12, 18, ...above));
      expect(share(0, 4, ...above)).toBeGreaterThan(0);
    });

    it('leaves the rest of the mosaic alone', () => {
      expect(share(0, cols, 0, heroBottomRow - 4)).toBe(0);
      expect(share(0, cols, heroBottomRow + 1, rows - 1)).toBe(0);
    });

    it('lowers their opacity but keeps them visible', () => {
      const x = Array.from({ length: cols }, (_, i) => i).find((i) =>
        isAbovePill(i, heroBottomRow, cols, rows),
      )!;
      expect(tileOpacity(x, heroBottomRow, cols, rows)).toBeLessThan(0.5);
      expect(tileOpacity(x, heroBottomRow, cols, rows)).toBeGreaterThan(0.1);
    });
  });

  describe('phoneButtonsDimming', () => {
    const cols = 12;
    const fadeStartRow = 18;

    it('halves the visibility of the tiles at the left edge beside the buttons', () => {
      expect(phoneButtonsDimming(0, 16, cols, fadeStartRow)).toBeLessThan(0.58);
      expect(phoneButtonsDimming(0, 16, cols, fadeStartRow)).toBeGreaterThan(0.45);
    });

    it('eases out towards the middle, and leaves the right side and other rows alone', () => {
      expect(phoneButtonsDimming(3, 16, cols, fadeStartRow)).toBeGreaterThan(
        phoneButtonsDimming(0, 16, cols, fadeStartRow),
      );
      expect(phoneButtonsDimming(8, 16, cols, fadeStartRow)).toBe(1);
      expect(phoneButtonsDimming(0, 2, cols, fadeStartRow)).toBe(1);
      expect(phoneButtonsDimming(0, 26, cols, fadeStartRow)).toBe(1);
    });

    it('is only applied when drawing for a phone', () => {
      const alphaOf = (phone: boolean) => {
        const fills: string[] = [];
        const ctx = {
          fillRect: vi.fn(),
          clearRect: vi.fn(),
          set fillStyle(value: string) {
            fills.push(value);
          },
        } as unknown as CanvasRenderingContext2D;
        drawHeroMosaic(ctx, 'light', cols, 30, fadeStartRow, phone);
        return fills.map((fill) => Number(fill.split('/')[1].replace(')', '')));
      };
      const total = (list: number[]) => list.reduce((a, b) => a + b, 0);

      expect(total(alphaOf(true))).toBeLessThan(total(alphaOf(false)));
    });
  });
});
