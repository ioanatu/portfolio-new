import { render } from '@testing-library/react';
import { PixelMosaic } from './PixelMosaic';

const sizeCanvas = (width: number, height: number) => {
  vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(width);
  vi.spyOn(HTMLElement.prototype, 'clientHeight', 'get').mockReturnValue(height);
};

const fakeContext = () => {
  const fillRect = vi.fn();
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
    fillRect,
    fillStyle: '',
  } as unknown as CanvasRenderingContext2D);
  return fillRect;
};

describe('PixelMosaic', () => {
  afterEach(() => vi.restoreAllMocks());

  it('is decorative, so it stays out of the accessibility tree', () => {
    const { container } = render(<PixelMosaic />);

    expect(container.querySelector('canvas')).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders without drawing when the browser has no 2D canvas', () => {
    const { container } = render(<PixelMosaic />);

    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('paints one canvas pixel per tile, with whole tiles filling the parent', () => {
    sizeCanvas(240, 96);
    const fillRect = fakeContext();

    const { container } = render(<PixelMosaic cell={24} />);
    const canvas = container.querySelector('canvas')!;

    expect(canvas.width).toBe(10);
    expect(canvas.height).toBe(4);
    expect(fillRect).toHaveBeenCalledTimes(40);
  });

  it('rounds to the nearest whole tile count when the size is not a multiple of the tile', () => {
    sizeCanvas(385, 48);
    fakeContext();

    const { container } = render(<PixelMosaic cell={12} />);
    const canvas = container.querySelector('canvas')!;

    expect(canvas.width).toBe(32);
    expect(canvas.height).toBe(4);
  });

  it('starts from the flat top colour of a fixed theme before its first draw', () => {
    const { container } = render(<PixelMosaic theme="dark" />);

    expect(container.querySelector('canvas')).toHaveStyle({ backgroundColor: '#131830' });
  });
});
