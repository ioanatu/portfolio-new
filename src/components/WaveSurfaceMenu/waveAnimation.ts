import type { WavePreset, WaveShape } from './types'
import { hexToRgb, type RGB } from './waveGeometry'

export interface WaveState {
  shape: WaveShape
  rgb: RGB
  drift: number
}

const SHAPE_KEYS = ['amp', 'freq', 'phase', 'bulge', 'drift'] as const
const EASE_RATE = 2.4
const DRIFT_SPEED = 0.35

export function createWaveState(preset: WavePreset): WaveState {
  const { amp, freq, phase, bulge, drift } = preset
  return {
    shape: { amp, freq, phase, bulge, drift },
    rgb: hexToRgb(preset.color),
    drift: 0,
  }
}

export function stepWaveState(
  state: WaveState,
  target: WavePreset,
  dt: number,
  reduceMotion: boolean,
): WaveState {
  const ease = 1 - Math.exp(-dt * EASE_RATE)
  const toward = (from: number, to: number) => from + (to - from) * ease

  const shape = { ...state.shape }
  for (const key of SHAPE_KEYS) shape[key] = toward(shape[key], target[key])

  const targetRgb = hexToRgb(target.color)
  const rgb = state.rgb.map((c, i) => toward(c, targetRgb[i])) as unknown as RGB

  const drift = reduceMotion
    ? state.drift
    : state.drift + dt * shape.drift * DRIFT_SPEED
  return { shape, rgb, drift }
}
