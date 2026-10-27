export interface WaveShape {
  /** Wave height, relative to the viewport. */
  amp: number
  /** Number of waves along the edge. */
  freq: number
  /** Where the bumps sit along the edge (radians). */
  phase: number
  /** How far the corner pushes into the page. */
  bulge: number
  /** Speed of the slow idle movement. */
  drift: number
}

export interface WavePreset extends WaveShape {
  id: string
  label: string
  color: string
}
