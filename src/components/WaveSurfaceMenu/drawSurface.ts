import { createPastelSweep } from './pastelSweep'
import type { Point, SurfaceLayout } from './waveGeometry'

export interface SurfaceColors {
  /** Ends of the base gradient. */
  from: string
  to: string
  /** Opaque and transparent versions of the bottom-right glow. */
  corner: readonly [opaque: string, transparent: string]
}

type DrawLayout = Pick<SurfaceLayout, 'width' | 'height' | 'portrait'>

const BLEED = 40

function traceSurface(
  ctx: CanvasRenderingContext2D,
  points: readonly Point[],
  { width, height, portrait }: DrawLayout,
) {
  ctx.beginPath()
  ctx.moveTo(...points[0])

  // Catmull-Rom through the points for a smooth, organic edge
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2
    ctx.bezierCurveTo(
      p1[0] + (p2[0] - p0[0]) / 6,
      p1[1] + (p2[1] - p0[1]) / 6,
      p2[0] - (p3[0] - p1[0]) / 6,
      p2[1] - (p3[1] - p1[1]) / 6,
      p2[0],
      p2[1],
    )
  }

  if (!portrait) ctx.lineTo(width + BLEED, -BLEED)
  ctx.lineTo(width + BLEED, height + BLEED)
  ctx.lineTo(-BLEED, height + BLEED)
  ctx.closePath()
}

/**
 * Fill the area behind the edge with a gradient and light it like a raised
 * surface: a pastel sweep, a corner glow, a soft highlight and a thin rim.
 */
export function drawSurface(
  ctx: CanvasRenderingContext2D,
  points: readonly Point[],
  layout: DrawLayout,
  { from, to, corner }: SurfaceColors,
  drift: number,
) {
  const { width, height } = layout
  ctx.clearRect(0, 0, width, height)

  const gradient = ctx.createLinearGradient(0, height, width, 0)
  gradient.addColorStop(0, from)
  gradient.addColorStop(1, to)

  traceSurface(ctx, points, layout)
  ctx.fillStyle = gradient
  ctx.fill()

  ctx.save()
  ctx.clip()

  ctx.fillStyle = createPastelSweep(ctx, layout, drift)
  ctx.fillRect(0, 0, width, height)

  // Second color source glowing in the bottom-right corner
  const glow = ctx.createRadialGradient(
    width,
    height,
    0,
    width,
    height,
    Math.hypot(width, height) * 0.5,
  )
  glow.addColorStop(0, corner[0])
  glow.addColorStop(1, corner[1])
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, width, height)

  // Soft highlight, as if lit from the upper left
  const [lightX, lightY] = [width * 0.3, height * 0.9]
  const highlight = ctx.createRadialGradient(
    lightX,
    lightY,
    0,
    lightX,
    lightY,
    Math.hypot(width, height) * 0.45,
  )
  highlight.addColorStop(0, 'rgba(255, 255, 255, 0.35)')
  highlight.addColorStop(1, 'rgba(255, 255, 255, 0)')
  ctx.fillStyle = highlight
  ctx.fillRect(0, 0, width, height)

  // Thin light rim along the edge
  ctx.lineWidth = 3
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)'
  traceSurface(ctx, points, layout)
  ctx.stroke()

  ctx.restore()
}
