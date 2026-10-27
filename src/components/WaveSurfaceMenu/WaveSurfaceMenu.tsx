import { useRef, type ReactNode } from 'react'
import { CategoryMenu, type CategoryMenuItem } from './CategoryMenu'
import { DEFAULT_PRESETS } from './presets'
import type { WavePreset } from './types'
import { WaveSurface } from './WaveSurface'
import styles from './WaveSurfaceMenu.module.css'

interface WaveSurfaceMenuProps {
  presets?: readonly WavePreset[]
  surfaceIndex?: number
  renderItem: (item: CategoryMenuItem, className: string) => ReactNode
  menuLabel?: string
  children?: ReactNode
}

export function WaveSurfaceMenu({
  presets = DEFAULT_PRESETS,
  surfaceIndex = 0,
  renderItem,
  menuLabel,
  children,
}: WaveSurfaceMenuProps) {
  const menuRef = useRef<HTMLElement>(null)

  return (
    <div className={styles.root}>
      <WaveSurface preset={presets[surfaceIndex]} menuRef={menuRef} />
      <CategoryMenu
        ref={menuRef}
        items={presets}
        renderItem={renderItem}
        ariaLabel={menuLabel}
      />
      {children}
    </div>
  )
}
