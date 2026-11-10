import { type RefObject, useCallback, useLayoutEffect, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export const REARRANGE_DURATION_MS = 520;
const EASING = 'cubic-bezier(0.2, 0.7, 0.2, 1)';
const SIZE_TOLERANCE_PX = 1;

/**
 * Animates the children of a list from where they were to where they are after a layout change,
 * so that cards seem to rearrange themselves (the FLIP technique).
 *
 * Call the returned function right before the state change that rearranges the list. The change
 * is detected through `trigger`, which should change with that state.
 */
export const useRearrangeAnimation = (listRef: RefObject<HTMLElement | null>, trigger: unknown) => {
  const before = useRef<Map<Element, DOMRect> | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const captureLayout = useCallback(() => {
    const list = listRef.current;
    before.current = list
      ? new Map(Array.from(list.children, (child) => [child, child.getBoundingClientRect()]))
      : null;
  }, [listRef]);

  useLayoutEffect(() => {
    const previous = before.current;
    before.current = null;
    const list = listRef.current;
    if (!previous || !list || reducedMotion) return;

    const children = Array.from(list.children);
    // Measure the final layout, free of any animation that is still running
    children.forEach((child) => child.getAnimations?.().forEach((animation) => animation.cancel()));

    children.forEach((child) => {
      const from = previous.get(child);
      if (!from || typeof child.animate !== 'function') return;
      const to = child.getBoundingClientRect();
      const resized =
        Math.abs(from.width - to.width) > SIZE_TOLERANCE_PX ||
        Math.abs(from.height - to.height) > SIZE_TOLERANCE_PX;
      const dx = from.left - to.left;
      const dy = from.top - to.top;
      if (!resized && !dx && !dy) return;

      // Flex items ignore `width` while they have a flex-basis, so the size is pinned through flex
      const frame = (transform: string, rect: DOMRect): Keyframe => ({
        transform,
        ...(resized && {
          flex: `0 0 ${rect.width}px`,
          minWidth: `${rect.width}px`,
          maxWidth: `${rect.width}px`,
          height: `${rect.height}px`,
          overflow: 'hidden',
        }),
      });
      child.animate([frame(`translate(${dx}px, ${dy}px)`, from), frame('none', to)], {
        duration: REARRANGE_DURATION_MS,
        easing: EASING,
      });
    });
  }, [trigger, listRef, reducedMotion]);

  return captureLayout;
};
