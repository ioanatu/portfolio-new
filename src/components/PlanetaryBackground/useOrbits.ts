import { type RefObject, useEffect, useRef } from 'react';
import type { Theme } from '../../types';
import { drawOrbits } from './orbits';

/** Extra pixels beyond 1x are costly on a full-section canvas and invisible on thin lines. */
const MAX_PIXEL_RATIO = 1.5;

/**
 * Animates the planetary system on a canvas. The loop only runs while the canvas is on
 * screen and motion is allowed; otherwise it draws a single still frame.
 */
export const useOrbits = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  theme: Theme,
  animate: boolean,
) => {
  // Read inside the frame callback, so a theme switch never restarts the loop
  const themeRef = useRef(theme);
  const redrawRef = useRef<() => void>(() => {});

  useEffect(() => {
    themeRef.current = theme;
    redrawRef.current();
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    const startedAt = performance.now();
    let width = 0;
    let height = 0;
    let frame = 0;

    const draw = (now: number) => {
      if (!width || !height) return;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      drawOrbits(ctx, width, height, (now - startedAt) / 1000, themeRef.current);
    };

    const loop = (now: number) => {
      draw(now);
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      draw(performance.now());
    };

    redrawRef.current = () => {
      if (!frame) draw(performance.now());
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    let visibilityObserver: IntersectionObserver | undefined;
    if (animate) {
      visibilityObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !frame) frame = requestAnimationFrame(loop);
        else if (!entry.isIntersecting) stop();
      });
      visibilityObserver.observe(canvas);
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver?.disconnect();
      redrawRef.current = () => {};
    };
  }, [canvasRef, animate]);
};
