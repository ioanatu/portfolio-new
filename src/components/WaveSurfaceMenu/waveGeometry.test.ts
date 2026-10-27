import { DEFAULT_PRESETS } from './presets'
import { createWaveState, stepWaveState } from './waveAnimation'
import {
  getEdgePoints,
  hexToRgb,
  toCssRgb,
  type SurfaceLayout,
} from './waveGeometry'

const layout: SurfaceLayout = {
  width: 1200,
  height: 800,
  portrait: false,
  menuLeft: 900,
  menuTop: 200,
}

describe('colors', () => {
  it('converts hex to rgb and back to css', () => {
    expect(hexToRgb('#DAEEEB')).toEqual([218, 238, 235])
    expect(toCssRgb([218.4, 237.6, 235])).toBe('rgb(218,238,235)')
  })
})

describe('getEdgePoints', () => {
  it.each([false, true])(
    'returns a finite polyline (portrait: %s)',
    (portrait) => {
      const points = getEdgePoints(DEFAULT_PRESETS[1], 0, {
        ...layout,
        portrait,
      })
      expect(points).toHaveLength(73)
      expect(points.flat().every(Number.isFinite)).toBe(true)
    },
  )

  it('changes with drift', () => {
    const a = getEdgePoints(DEFAULT_PRESETS[0], 0, layout)
    const b = getEdgePoints(DEFAULT_PRESETS[0], 1, layout)
    expect(b).not.toEqual(a)
  })
})

describe('stepWaveState', () => {
  const [from, to] = DEFAULT_PRESETS

  it('eases toward the target', () => {
    let state = createWaveState(from)
    for (let i = 0; i < 600; i++) state = stepWaveState(state, to, 0.05, true)
    expect(state.shape.amp).toBeCloseTo(to.amp)
    expect(state.rgb.map(Math.round)).toEqual(hexToRgb(to.color))
  })

  it('only drifts when motion is allowed', () => {
    const state = createWaveState(from)
    expect(stepWaveState(state, from, 0.05, true).drift).toBe(0)
    expect(stepWaveState(state, from, 0.05, false).drift).toBeGreaterThan(0)
  })
})
