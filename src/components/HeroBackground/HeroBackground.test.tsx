import { render } from '@testing-library/react';
import { createRef } from 'react';
import { HeroBackground } from './HeroBackground';
import { HERO_CELL, heroRowCount, MOBILE_CELL } from './heroTiles';

const fakeContext = () => {
  const fillRect = vi.fn();
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
    fillRect,
    clearRect: vi.fn(),
    fillStyle: '',
  } as unknown as CanvasRenderingContext2D);
  return fillRect;
};

/** The canvas starts at the top of the page; the buttons end `buttonsBottom` below it. */
const layOut = ({ width, buttonsBottom, heroBottom }: Record<string, number>) => {
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(width);
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (this: Element) {
    const bottom =
      this.tagName === 'CANVAS' ? 0 : this.id === 'buttons' ? buttonsBottom : heroBottom;
    return { top: 0, bottom, left: 0, right: width, width, height: bottom } as DOMRect;
  });
};

const renderHero = () => {
  const buttons = createRef<HTMLDivElement>();
  const view = render(
    <section>
      <HeroBackground fadeAfter={buttons} />
      <div ref={buttons} id="buttons" />
    </section>,
  );
  return view;
};

describe('HeroBackground', () => {
  afterEach(() => vi.restoreAllMocks());

  it('is decorative, so it stays out of the accessibility tree', () => {
    const { container } = renderHero();

    expect(container.querySelector('canvas')).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders without drawing when the browser has no 2D canvas', () => {
    const { container } = renderHero();

    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('paints whole tiles, with the fade starting at the bottom of the buttons', () => {
    layOut({ width: 960, buttonsBottom: 300, heroBottom: 400 });
    const fillRect = fakeContext();

    const { container } = renderHero();
    const canvas = container.querySelector('canvas')!;

    expect(canvas.width).toBe(20);
    expect(canvas.height).toBe(heroRowCount(300, 400));
    expect(canvas.style.height).toBe(`${canvas.height * HERO_CELL}px`);
    const rowsPainted = new Set(fillRect.mock.calls.map(([, y]) => y));
    expect(rowsPainted.has(0)).toBe(true);
    expect(rowsPainted.has(canvas.height - 1)).toBe(false);
  });

  it('reaches below the bottom of the hero', () => {
    layOut({ width: 960, buttonsBottom: 300, heroBottom: 720 });
    fakeContext();

    const { container } = renderHero();
    const rows = container.querySelector('canvas')!.height;

    expect(rows).toBe(heroRowCount(300, 720));
    expect(rows * HERO_CELL).toBeGreaterThan(720 + 90);
  });

  it('uses smaller tiles on a narrow screen', () => {
    layOut({ width: 390, buttonsBottom: 300, heroBottom: 720 });
    fakeContext();

    const { container } = renderHero();
    const canvas = container.querySelector('canvas')!;

    expect(canvas.width).toBe(Math.round(390 / MOBILE_CELL));
    expect(canvas.height).toBe(heroRowCount(300, 720, MOBILE_CELL));
    expect(canvas.style.height).toBe(`${canvas.height * MOBILE_CELL}px`);
  });

  it('starts the first row of tiles at the very top of the page', () => {
    layOut({ width: 960, buttonsBottom: 300, heroBottom: 400 });
    fakeContext();
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(0);

    const { container } = renderHero();

    // the hero is 0px from the top in this layout, so the canvas needs no offset
    expect(parseFloat(container.querySelector('canvas')!.style.top)).toBeCloseTo(0);
  });
});
