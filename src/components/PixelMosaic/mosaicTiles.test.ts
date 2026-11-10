import { mosaicTileColor, mosaicTopColor } from './mosaicTiles';

const rgb = (color: string) => color.match(/\d+/g)!.map(Number);
const hexRgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const distance = (a: number[], b: number[]) => Math.max(...a.map((v, i) => Math.abs(v - b[i])));
const brightness = (color: string) => rgb(color).reduce((sum, v) => sum + v, 0) / 3;
const spread = (values: number[]) => Math.max(...values) - Math.min(...values);

describe('mosaicTileColor', () => {
  it('gives the same tile the same colour on every call', () => {
    expect(mosaicTileColor('dark', 3, 7, 20, 20)).toBe(mosaicTileColor('dark', 3, 7, 20, 20));
  });

  it.each(['light', 'dark'] as const)(
    'settles into the flat top colour at the top edge in %s mode',
    (theme) => {
      const top = hexRgb(mosaicTopColor(theme));
      for (let x = 0; x < 20; x++) {
        expect(distance(rgb(mosaicTileColor(theme, x, 0, 20, 20)), top)).toBeLessThan(8);
      }
    },
  );

  it.each(['light', 'dark'] as const)(
    'rises into colour at the bottom edge in %s mode',
    (theme) => {
      const top = hexRgb(mosaicTopColor(theme));
      expect(distance(rgb(mosaicTileColor(theme, 10, 19, 20, 20)), top)).toBeGreaterThan(30);
    },
  );

  it('varies neighbouring tiles so the mosaic reads as pixels', () => {
    const bottomRow = Array.from({ length: 20 }, (_, x) =>
      brightness(mosaicTileColor('dark', x, 19, 20, 20)),
    );
    expect(spread(bottomRow)).toBeGreaterThan(10);
  });

  it('makes tiles livelier in vivid mode, for small surfaces with few rows', () => {
    const middleRow = (vivid: boolean) =>
      Array.from({ length: 30 }, (_, x) => brightness(mosaicTileColor('dark', x, 1, 30, 4, vivid)));
    expect(spread(middleRow(true))).toBeGreaterThan(spread(middleRow(false)));
  });
});
