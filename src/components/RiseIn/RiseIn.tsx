import type { ReactNode } from 'react'
import styles from './RiseIn.module.css'

/** Rises from the bottom of the viewport on mount. */
export function RiseIn({ children }: { children: ReactNode }) {
  return <div className={styles.rise}>{children}</div>
}
