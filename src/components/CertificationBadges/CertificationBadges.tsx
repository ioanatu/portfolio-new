import { RiseIn } from '../RiseIn'
import styles from './CertificationBadges.module.css'

export interface Certification {
  name: string
  image: string
  /** Issue month, `YYYY-MM`. */
  issued?: string
  /** Expected issue month, `YYYY-MM`. Shows the badge greyed out. */
  expected?: string
}

const formatMonth = (month: string, monthStyle: 'short' | 'long') =>
  new Date(month).toLocaleDateString('en', {
    month: monthStyle,
    year: 'numeric',
    timeZone: 'UTC',
  })

function CertificationBadge({ name, image, issued, expected }: Certification) {
  return (
    <li className={styles.item}>
      <figure className={styles.figure}>
        <img
          src={image}
          alt={name}
          className={
            expected ? `${styles.badge} ${styles.pending}` : styles.badge
          }
        />
        <figcaption className={styles.date}>
          {issued && (
            <time dateTime={issued}>{formatMonth(issued, 'short')}</time>
          )}
          {expected && (
            <>
              <div>Expected </div>
              <time dateTime={expected}>{formatMonth(expected, 'short')}</time>
            </>
          )}
        </figcaption>
      </figure>
    </li>
  )
}

/** Certification badges on a single line, rising in from the bottom. */
export function CertificationBadges({
  certifications,
}: {
  certifications: readonly Certification[]
}) {
  return (
    <RiseIn>
      <ul className={styles.list}>
        {certifications.map((certification) => (
          <CertificationBadge key={certification.name} {...certification} />
        ))}
      </ul>
    </RiseIn>
  )
}
