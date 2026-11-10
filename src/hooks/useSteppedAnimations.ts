import { type RefObject, useEffect } from 'react';

/**
 * Plays the CSS animations inside an element at a lower frame rate.
 *
 * A running CSS animation makes the browser draw a new frame on every screen refresh, 60 or even
 * 120 times a second, even when the motion is so slow and soft that most frames look the same. For
 * a large, layered background that is a lot of work for the processor and the graphics chip. Here
 * the animations are paused and their clock is moved on `fps` times a second instead, so the
 * browser only draws that often. The keyframes and the timing stay in the CSS. Nothing runs while
 * the element is off screen.
 */
export const useSteppedAnimations = (ref: RefObject<Element | null>, fps: number) => {
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof element.getAnimations !== 'function') return;
    const animations = element.getAnimations({ subtree: true });
    if (animations.length === 0) return;

    const startTimes = animations.map((animation) => Number(animation.currentTime ?? 0));
    animations.forEach((animation) => animation.pause());

    let elapsed = 0;
    let lastTick = performance.now();
    let timer: number | undefined;

    const tick = () => {
      const now = performance.now();
      elapsed += now - lastTick;
      lastTick = now;
      animations.forEach((animation, index) => {
        animation.currentTime = startTimes[index] + elapsed;
      });
    };
    const start = () => {
      if (timer !== undefined) return;
      lastTick = performance.now();
      timer = window.setInterval(tick, 1000 / fps);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = undefined;
    };

    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver === 'function') {
      observer = new IntersectionObserver(([entry]) => (entry?.isIntersecting ? start() : stop()));
      observer.observe(element);
    } else {
      start();
    }

    return () => {
      stop();
      observer?.disconnect();
      animations.forEach((animation) => animation.play());
    };
  }, [ref, fps]);
};
