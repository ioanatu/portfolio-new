import { type RefObject, useEffectEvent, useLayoutEffect } from 'react';

const BREATHING_ROOM_PX = 8;

/**
 * Switches the navbar between its full and compact layout by whether the full one fits.
 *
 * The layout is written to `data-mode` on the nav ("full" or "compact"), synchronously,
 * so it is correct before the first paint. Measuring happens with the nav briefly in
 * "measure" mode, where every part shows at its natural size.
 */
export const useResponsiveNav = (
  navRef: RefObject<HTMLElement | null>,
  onFitChange: (fits: boolean) => void,
) => {
  const notifyFitChange = useEffectEvent(onFitChange);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const container = nav?.parentElement;
    if (!nav || !container) return;

    const evaluate = () => {
      nav.dataset.mode = 'measure';
      const style = getComputedStyle(nav);
      const gap = parseFloat(style.columnGap) || 16;
      const parts = Array.from(nav.children);
      const needed =
        parts.reduce((sum, part) => sum + part.getBoundingClientRect().width, 0) +
        gap * (parts.length - 1) +
        parseFloat(style.paddingLeft) +
        parseFloat(style.paddingRight) +
        BREATHING_ROOM_PX;
      const fits = needed <= nav.getBoundingClientRect().width;
      nav.dataset.mode = fits ? 'full' : 'compact';
      notifyFitChange(fits);
    };

    let frame = 0;
    const scheduleEvaluate = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        evaluate();
      });
    };

    const resizeObserver = new ResizeObserver(scheduleEvaluate);
    resizeObserver.observe(container);
    // Web fonts change the width of the links once they load
    void document.fonts?.ready.then(scheduleEvaluate);
    evaluate();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [navRef]);
};
