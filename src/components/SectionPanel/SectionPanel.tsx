import { useId, type ReactNode } from 'react'
import styles from './SectionPanel.module.css'

interface SectionPanelProps {
  title: string
  children: ReactNode
}

/**
 * Content section on the left of the screen. It rises from the bottom of the
 * viewport on mount; give it a `key` to replay the animation for new content.
 */
export function SectionPanel({ title, children }: SectionPanelProps) {
  const headingId = useId()
  return (
    <section className={styles.panel} aria-labelledby={headingId}>
      <h1 id={headingId} className={styles.title}>
        {title}
      </h1>
      {children}
    </section>
  )
}
