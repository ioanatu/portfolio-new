import type { RGB } from './waveGeometry'

const HUE_SWING_DEG = 16
const SWING_SPEED = 0.5

type HSL = readonly [h: number, s: number, l: number]

function rgbToHsl([r, g, b]: RGB): HSL {
  const [rn, gn, bn] = [r / 255, g / 255, b / 255]
  const max = Math.max(rn, gn, bn)
  const min = Math.min(rn, gn, bn)
  const l = (max + min) / 2
  if (max === min) return [0, 0, l]

  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  const h =
    max === rn
      ? (gn - bn) / d + (gn < bn ? 6 : 0)
      : max === gn
        ? (bn - rn) / d + 2
        : (rn - gn) / d + 4
  return [h * 60, s, l]
}

function hslToRgb([h, s, l]: HSL): RGB {
  const a = s * Math.min(l, 1 - l)
  const channel = (n: number) => {
    const k = (n + h / 30) % 12
    return (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))) * 255
  }
  return [channel(0), channel(8), channel(4)]
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))

/**
 * Two stops for a gradient around `rgb`: one lighter, one
 * deeper, with hues that sway in opposite directions as `drift` grows.
 */
export function getGradientColors(
  rgb: RGB,
  drift: number,
): readonly [RGB, RGB] {
  const [h, s, l] = rgbToHsl(rgb)
  const swing = Math.sin(drift * SWING_SPEED) * HUE_SWING_DEG
  return [
    hslToRgb([h + swing, s, clamp01(l + 0.045)]),
    hslToRgb([h - swing, clamp01(s + 0.075), clamp01(l - 0.065)]),
  ]
}
