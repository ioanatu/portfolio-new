import { renderHook } from '@testing-library/react';
import { useSteppedAnimations } from './useSteppedAnimations';

type FakeAnimation = {
  currentTime: number;
  pause: ReturnType<typeof vi.fn>;
  play: ReturnType<typeof vi.fn>;
};

const fakeAnimation = (currentTime: number): FakeAnimation => {
  let time = currentTime;
  const writes = vi.fn();
  return {
    get currentTime() {
      return time;
    },
    set currentTime(value: number) {
      time = value;
      writes(value);
    },
    pause: vi.fn(),
    play: vi.fn(),
    writes,
  } as unknown as FakeAnimation;
};

const elementWith = (animations: FakeAnimation[]) => {
  const element = document.createElement('div');
  element.getAnimations = vi.fn(() => animations as unknown as Animation[]);
  return { current: element };
};

type ObserverCallback = (entries: { isIntersecting: boolean }[]) => void;

const stubIntersectionObserver = () => {
  let callback: ObserverCallback | undefined;
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(onChange: ObserverCallback) {
        callback = onChange;
      }
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  );
  return (isIntersecting: boolean) => callback?.([{ isIntersecting }]);
};

describe('useSteppedAnimations', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'performance'] });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('pauses the animations and moves their clock on at the given frame rate', () => {
    const animation = fakeAnimation(500);
    const ref = elementWith([animation]);
    const setVisible = stubIntersectionObserver();
    renderHook(() => useSteppedAnimations(ref, 10));
    setVisible(true);

    expect(animation.pause).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(1000);

    expect(
      (animation as unknown as { writes: { mock: { calls: unknown[] } } }).writes.mock.calls,
    ).toHaveLength(10);
    expect(animation.currentTime).toBeCloseTo(500 + 1000, -1);
  });

  it('does nothing while the element is off screen, and carries on without a jump', () => {
    const animation = fakeAnimation(0);
    const ref = elementWith([animation]);
    const setVisible = stubIntersectionObserver();
    renderHook(() => useSteppedAnimations(ref, 10));

    setVisible(true);
    vi.advanceTimersByTime(1000);
    const before = animation.currentTime;

    setVisible(false);
    vi.advanceTimersByTime(60_000);
    expect(animation.currentTime).toBe(before);

    setVisible(true);
    vi.advanceTimersByTime(1000);
    expect(animation.currentTime).toBeCloseTo(before + 1000, -1);
  });

  it('plays the animations again and stops its timer when it is removed', () => {
    const animation = fakeAnimation(0);
    const ref = elementWith([animation]);
    const setVisible = stubIntersectionObserver();
    const { unmount } = renderHook(() => useSteppedAnimations(ref, 10));
    setVisible(true);
    vi.advanceTimersByTime(300);

    unmount();
    const stoppedAt = animation.currentTime;
    vi.advanceTimersByTime(5000);

    expect(animation.play).toHaveBeenCalledTimes(1);
    expect(animation.currentTime).toBe(stoppedAt);
  });

  it('leaves everything alone when there is nothing to animate or no support for it', () => {
    const withoutSupport = { current: document.createElement('div') };
    Object.defineProperty(withoutSupport.current, 'getAnimations', { value: undefined });
    expect(() => renderHook(() => useSteppedAnimations(withoutSupport, 10))).not.toThrow();

    const nothingToAnimate = elementWith([]);
    expect(() => renderHook(() => useSteppedAnimations(nothingToAnimate, 10))).not.toThrow();
  });
});
