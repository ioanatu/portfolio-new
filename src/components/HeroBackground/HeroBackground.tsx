import styles from './HeroBackground.module.css';

export const HeroBackground = () => (
  <div className={styles.heroBackground} aria-hidden="true">
    <i className={styles.b1} />
    <i className={styles.b2} />
    <i className={styles.b3} />
    <i className={styles.b4} />
    <i className={styles.b5} />
  </div>
);
