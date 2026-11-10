import { watchUserScroll } from './watchUserScroll';

describe('watchUserScroll', () => {
  it('reacts to the wheel, to touch, to a click and to scroll keys', () => {
    const onScroll = vi.fn();
    const stop = watchUserScroll(onScroll);

    window.dispatchEvent(new Event('wheel'));
    window.dispatchEvent(new Event('touchmove'));
    window.dispatchEvent(new Event('pointerdown'));
    ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].forEach((key) =>
      window.dispatchEvent(new KeyboardEvent('keydown', { key })),
    );

    expect(onScroll).toHaveBeenCalledTimes(3 + 7);
    stop();
  });

  it('ignores keys that do not scroll', () => {
    const onScroll = vi.fn();
    const stop = watchUserScroll(onScroll);

    ['Enter', 'a', 'Tab', 'Escape'].forEach((key) =>
      window.dispatchEvent(new KeyboardEvent('keydown', { key })),
    );
    window.dispatchEvent(new Event('pointermove'));
    window.dispatchEvent(new Event('scroll'));

    expect(onScroll).not.toHaveBeenCalled();
    stop();
  });

  it('stops reacting once it has been stopped', () => {
    const onScroll = vi.fn();
    const stop = watchUserScroll(onScroll);
    stop();

    window.dispatchEvent(new Event('wheel'));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageDown' }));

    expect(onScroll).not.toHaveBeenCalled();
  });
});
