import type { SurfaceLayout } from './waveGeometry'

// Soft peach, pink, lavender and periwinkle, after the hover glow on AWS certification cards
const STOPS: readonly (readonly [position: number, rgb: string])[] = [
  [0, '255, 192, 173'],
  [0.38, '248, 199, 255'],
  [0.76, '210, 204, 255'],
  [1, '194, 209, 255'],
]
const ANGLE_DEG = 97
const ALPHA = 0.15
const SLIDE = 0.15
const SLIDE_SPEED = 0.4

/** A faint multi-hue gradient to lay over the surface; it slides slowly with `drift`. */
export function createPastelSweep(
  ctx: CanvasRenderingContext2D,
  { width, height }: Pick<SurfaceLayout, 'width' | 'height'>,
  drift: number,
): CanvasGradient {
  const angle = (ANGLE_DEG * Math.PI) / 180
  const [dx, dy] = [Math.sin(angle), -Math.cos(angle)]
  // Length of the gradient line that spans the whole canvas, as in CSS
  const length = Math.abs(width * dx) + Math.abs(height * dy)
  const slide = Math.sin(drift * SLIDE_SPEED) * SLIDE * length
  const [cx, cy] = [width / 2 + dx * slide, height / 2 + dy * slide]

  const gradient = ctx.createLinearGradient(
    cx - (dx * length) / 2,
    cy - (dy * length) / 2,
    cx + (dx * length) / 2,
    cy + (dy * length) / 2,
  )
  for (const [position, rgb] of STOPS)
    gradient.addColorStop(position, `rgba(${rgb}, ${ALPHA})`)
  return gradient
}
