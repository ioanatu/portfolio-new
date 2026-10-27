import { useId, type ReactNode } from 'react'
import { RiseIn } from '../RiseIn'
import styles from './SectionPanel.module.css'

interface SectionPanelProps {
  title: string
  children: ReactNode
  /** Rise the title and content in from the bottom. Turn off to animate parts of the content yourself. */
  rise?: boolean
  /** Wider panel, for content that needs more room. */
  wide?: boolean
}

/** Content section on the left of the screen. Give it a `key` to replay the animation for new content. */
export function SectionPanel({
  title,
  children,
  rise = true,
  wide = false,
}: SectionPanelProps) {
  const headingId = useId()
  const content = (
    <>
      <h1 id={headingId} className={styles.title}>
        {title}
      </h1>
      {children}
    </>
  )

  return (
    <section
      className={wide ? `${styles.panel} ${styles.wide}` : styles.panel}
      aria-labelledby={headingId}
    >
      {rise ? <RiseIn>{content}</RiseIn> : content}
    </section>
  )
}
