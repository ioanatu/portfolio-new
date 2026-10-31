import type { Theme } from '../../types';

type Planet = {
  /** Orbit size as a fraction of the canvas width. */
  radius: number;
  /** Planet radius in px. */
  size: number;
  /** Starting angle in radians. */
  phase: number;
  /** Planets sharing an orbit draw its line only once. */
  noLine?: boolean;
  /** Multiplies the speed its orbit would give it; below 1 drifts slower than the rest. */
  speed?: number;
};

const PLANETS: readonly Planet[] = [
  { radius: 0.16, size: 6, phase: 2.2 },
  { radius: 0.224, size: 8, phase: 4.1 },
  { radius: 0.288, size: 7, phase: 1.0 },
  { radius: 0.352, size: 10, phase: 3.4 },
  { radius: 0.424, size: 9, phase: 0.8 },
  { radius: 0.424, size: 7, phase: 3.0, noLine: true },
  { radius: 0.424, size: 10, phase: 5.1, noLine: true },
  { radius: 0.504, size: 17, phase: 5.0 },
  { radius: 0.592, size: 14, phase: 2.6 },
  { radius: 0.68, size: 12, phase: 0.6 },
  { radius: 0.76, size: 11, phase: 4.6 },
  { radius: 0.84, size: 13, phase: 1.8 },
  { radius: 0.84, size: 12, phase: 4.9, noLine: true },
  { radius: 0.76, size: 28, phase: 1.2, noLine: true, speed: 0.2 },
];

const TILT = (-9 * Math.PI) / 180;
const COS_TILT = Math.cos(TILT);
const SIN_TILT = Math.sin(TILT);
const FULL_TURN = Math.PI * 2;

const PALETTE = {
  light: {
    line: 'rgba(27, 31, 59, 0.14)',
    planetFill: 'rgba(228, 230, 236, 0.704)',
    planetStroke: 'rgba(27, 31, 59, 0.18)',
  },
  dark: {
    line: 'rgba(236, 237, 245, 0.096)',
    planetFill: 'rgba(25, 28, 42, 0.704)',
    planetStroke: 'rgba(236, 237, 245, 0.2304)',
  },
} satisfies Record<Theme, Record<string, string>>;

/** Outer planets move slower (Kepler-ish), in radians per second. */
const angularSpeed = (radius: number) => 0.01152 * Math.pow(radius, -1.5);

/**
 * Draws the system into a context that is already scaled to CSS pixels.
 * Only `seconds` changes between frames, so everything else is cheap arithmetic.
 */
export const drawOrbits = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  seconds: number,
  theme: Theme,
) => {
  const colors = PALETTE[theme];
  const centerX = width * 0.26;
  const centerY = height * 0.6;
  const scale = Math.max(width, height * 1.6) * 0.75;

  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 1;
  ctx.strokeStyle = colors.line;

  // Orbit lines first, so a single stroke style serves all of them
  ctx.beginPath();
  const radii = PLANETS.map(({ radius }) => scale * (0.16 + (radius - 0.16) * 1.1));
  PLANETS.forEach(({ noLine }, i) => {
    if (noLine) return;
    ctx.moveTo(centerX + radii[i] * COS_TILT, centerY + radii[i] * SIN_TILT);
    ctx.ellipse(centerX, centerY, radii[i], radii[i] * 0.42, TILT, 0, FULL_TURN);
  });
  ctx.stroke();

  ctx.fillStyle = colors.planetFill;
  ctx.strokeStyle = colors.planetStroke;
  PLANETS.forEach(({ radius, size, phase, speed = 1 }, i) => {
    const angle = phase + seconds * angularSpeed(radius) * speed;
    const x = radii[i] * Math.cos(angle);
    const y = radii[i] * 0.42 * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(
      centerX + x * COS_TILT - y * SIN_TILT,
      centerY + x * SIN_TILT + y * COS_TILT,
      size,
      0,
      FULL_TURN,
    );
    ctx.fill();
    ctx.stroke();
  });
};
