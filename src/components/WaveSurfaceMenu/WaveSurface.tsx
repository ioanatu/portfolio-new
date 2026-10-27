import { useEffect, useRef, type RefObject } from 'react'
import styles from './WaveSurface.module.css'
import { drawSurface } from './drawSurface'
import type { WavePreset } from './types'
import { createWaveState, stepWaveState } from './waveAnimation'
import { getGradientColors } from './surfaceGradient'
import { getEdgePoints, toCssRgb, type SurfaceLayout } from './waveGeometry'

/** Keep in sync with the media queries in the CSS modules. */
export const PORTRAIT_QUERY = '(max-width: 820px), (orientation: portrait)'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const MAX_PIXEL_RATIO = 2
const MAX_FRAME_SECONDS = 0.05

interface WaveSurfaceProps {
  preset: WavePreset
  menuRef: RefObject<HTMLElement | null>
}

export function WaveSurface({ preset, menuRef }: WaveSurfaceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const presetRef = useRef(preset)

  useEffect(() => {
    presetRef.current = preset
  }, [preset])

  useEffect(() => {
    const canvas = canvasRef.current
    const menu = menuRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !menu || !ctx) return

    const portraitQuery = matchMedia(PORTRAIT_QUERY)
    const reduceMotion = matchMedia(REDUCED_MOTION_QUERY).matches

    let state = createWaveState(presetRef.current)
    let pixelRatio = 1
    let layout: SurfaceLayout = {
      width: 0,
      height: 0,
      portrait: false,
      menuLeft: 0,
      menuTop: 0,
    }

    const measure = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO)
      const { innerWidth: width, innerHeight: height } = window
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      const { left, top } = menu.getBoundingClientRect()
      layout = {
        width,
        height,
        portrait: portraitQuery.matches,
        menuLeft: left,
        menuTop: top,
      }
    }

    let frameId = 0
    let lastTime = performance.now()
    const frame = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, MAX_FRAME_SECONDS)
      lastTime = now
      state = stepWaveState(state, presetRef.current, dt, reduceMotion)
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      const [from, to] = getGradientColors(state.rgb, state.drift)
      drawSurface(
        ctx,
        getEdgePoints(state.shape, state.drift, layout),
        layout,
        [toCssRgb(from), toCssRgb(to)],
      )
      frameId = requestAnimationFrame(frame)
    }

    // The menu moves with the layout and with font loading, so watch it too
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(menu)
    window.addEventListener('resize', measure)
    portraitQuery.addEventListener('change', measure)

    measure()
    frameId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      window.removeEventListener('resize', measure)
      portraitQuery.removeEventListener('change', measure)
    }
  }, [menuRef])

  return (
    <canvas ref={canvasRef} className={styles.surface} aria-hidden="true" />
  )
}
