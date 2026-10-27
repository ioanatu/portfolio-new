import styles from './CertificationBadges.module.css'

export interface Certification {
  name: string
  image: string
  /** Issue month, `YYYY-MM`. */
  issued: string
}

const formatMonth = (month: string) =>
  new Date(month).toLocaleDateString('en', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })

/** Certification badges on a single line, each with its issue date. */
export function CertificationBadges({
  certifications,
}: {
  certifications: readonly Certification[]
}) {
  return (
    <ul className={styles.list}>
      {certifications.map(({ name, image, issued }) => (
        <li key={name} className={styles.item}>
          <figure className={styles.figure}>
            <img src={image} alt={name} className={styles.badge} />
            <figcaption className={styles.date}>
              <time dateTime={issued}>{formatMonth(issued)}</time>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  )
}
