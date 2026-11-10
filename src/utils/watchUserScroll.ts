const SCROLL_KEYS = new Set([' ', 'PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown']);

/**
 * Calls `onScroll` when the visitor tries to scroll the page with the wheel, a touch, a scroll
 * key or the scrollbar. Scrolling done by the page itself does not count. Returns a function that
 * stops watching.
 */
export const watchUserScroll = (onScroll: () => void) => {
  const onKeyDown = (event: KeyboardEvent) => {
    if (SCROLL_KEYS.has(event.key)) onScroll();
  };
  const options = { passive: true } as const;
  window.addEventListener('wheel', onScroll, options);
  window.addEventListener('touchmove', onScroll, options);
  window.addEventListener('pointerdown', onScroll, options);
  window.addEventListener('keydown', onKeyDown, options);
  return () => {
    window.removeEventListener('wheel', onScroll);
    window.removeEventListener('touchmove', onScroll);
    window.removeEventListener('pointerdown', onScroll);
    window.removeEventListener('keydown', onKeyDown);
  };
};
