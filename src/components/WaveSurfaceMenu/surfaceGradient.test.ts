import { getGradientColors } from './surfaceGradient'
import type { RGB } from './waveGeometry'

const nature: RGB = [218, 238, 235]
const channelDistance = (a: RGB, b: RGB) =>
  Math.max(...a.map((value, i) => Math.abs(value - b[i])))

describe('getGradientColors', () => {
  it('stays close to the base color, so the gradient stays tasteful', () => {
    for (const drift of [0, 1, 3, 10]) {
      for (const color of getGradientColors(nature, drift)) {
        expect(channelDistance(color, nature)).toBeLessThan(60)
      }
    }
  })

  it('returns valid channel values', () => {
    for (const rgb of [
      nature,
      [255, 255, 255],
      [0, 0, 0],
      [246, 227, 220],
    ] as RGB[]) {
      for (const channel of getGradientColors(rgb, 2).flat()) {
        expect(channel).toBeGreaterThanOrEqual(0)
        expect(channel).toBeLessThanOrEqual(255.0001)
      }
    }
  })

  it('shifts over time and differs between the two stops', () => {
    const [from, to] = getGradientColors(nature, 0)
    expect(from).not.toEqual(to)
    expect(getGradientColors(nature, 3)[0]).not.toEqual(from)
  })
})
