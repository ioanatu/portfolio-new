import type { WaveShape } from './types'

export type Point = readonly [x: number, y: number]
export type RGB = readonly [r: number, g: number, b: number]

export interface SurfaceLayout {
  width: number
  height: number
  portrait: boolean
  menuLeft: number
  menuTop: number
}

const SAMPLE_COUNT = 72
const SMOOTHING_PASSES = 4
const TAU = Math.PI * 2

export function hexToRgb(hex: string): RGB {
  const [r, g, b] = [1, 3, 5].map((offset) =>
    parseInt(hex.slice(offset, offset + 2), 16),
  )
  return [r, g, b]
}

export function toCssRgb([r, g, b]: RGB, alpha = 1): string {
  const channels = `${Math.round(r)},${Math.round(g)},${Math.round(b)}`
  return alpha === 1 ? `rgb(${channels})` : `rgba(${channels},${alpha})`
}

export function cubicBezier(
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  t: number,
): Point {
  const u = 1 - t
  const [a, b, c, d] = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t]
  return [
    a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0],
    a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1],
  ]
}

export function cubicBezierTangent(
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point,
  t: number,
): Point {
  const u = 1 - t
  const [a, b, c] = [3 * u * u, 6 * u * t, 3 * t * t]
  return [
    a * (p1[0] - p0[0]) + b * (p2[0] - p1[0]) + c * (p3[0] - p2[0]),
    a * (p1[1] - p0[1]) + b * (p2[1] - p1[1]) + c * (p3[1] - p2[1]),
  ]
}

function getSpine(
  bulge: number,
  { width: W, height: H, portrait, menuLeft, menuTop }: SurfaceLayout,
) {
  if (portrait) {
    const y = menuTop - Math.max(48, H * 0.07)
    return {
      points: [
        [-0.08 * W, y],
        [0.3 * W, y + bulge * H],
        [0.7 * W, y - bulge * H],
        [1.08 * W, y],
      ] as const,
      scale: Math.min(W, H) * 0.55,
    }
  }
  const cx = menuLeft - W * 0.07
  const cy = H * 0.74
  return {
    points: [
      [-0.08 * W, cy],
      [cx - 0.1 * W + bulge * W, cy + bulge * H],
      [cx + bulge * W, cy - 0.16 * H + bulge * H],
      [cx + 0.05 * W, -0.08 * H],
    ] as const,
    scale: Math.min(W, H),
  }
}

/** Relax the edge a few times so tight spots stay round instead of pointy. */
function smooth(points: Point[]): Point[] {
  let result = points
  for (let pass = 0; pass < SMOOTHING_PASSES; pass++) {
    result = result.map((point, i) => {
      if (i === 0 || i === result.length - 1) return point
      const [prev, next] = [result[i - 1], result[i + 1]]
      return [
        (prev[0] + point[0] * 2 + next[0]) / 4,
        (prev[1] + point[1] * 2 + next[1]) / 4,
      ]
    })
  }
  return result
}

/**
 * Sample the wavy edge as a polyline.
 * `drift` is the accumulated idle movement, added to the shape's phase.
 */
export function getEdgePoints(
  shape: WaveShape,
  drift: number,
  layout: SurfaceLayout,
): Point[] {
  const {
    points: [p0, p1, p2, p3],
    scale,
  } = getSpine(shape.bulge, layout)
  const phase = shape.phase + drift

  const points = Array.from({ length: SAMPLE_COUNT + 1 }, (_, i): Point => {
    const t = i / SAMPLE_COUNT
    const [x, y] = cubicBezier(p0, p1, p2, p3, t)
    const [tx, ty] = cubicBezierTangent(p0, p1, p2, p3, t)
    const length = Math.hypot(tx, ty) || 1
    const offset =
      shape.amp *
      scale *
      (Math.sin(t * shape.freq * TAU + phase) * 0.65 +
        Math.sin(t * shape.freq * 0.55 * TAU - phase * 0.8 + 1.1) * 0.35)
    return [x + (-ty / length) * offset, y + (tx / length) * offset]
  })
  return smooth(points)
}
