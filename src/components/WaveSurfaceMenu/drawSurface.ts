import type { Point, SurfaceLayout } from './waveGeometry'

const BLEED = 40

export function drawSurface(
  ctx: CanvasRenderingContext2D,
  points: readonly Point[],
  layout: Pick<SurfaceLayout, 'width' | 'height' | 'portrait'>,
  fillStyle: string,
) {
  const { width, height, portrait } = layout
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = fillStyle
  ctx.beginPath()
  ctx.moveTo(...points[0])

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
  ctx.fill()
}
