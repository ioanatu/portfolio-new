import type { Language } from '../../content/education';
import styles from './LanguageItem.module.css';

type LanguageItemProps = {
  language: Language;
};

export const LanguageItem = ({ language: { name, level, certificates } }: LanguageItemProps) => (
  <li className={styles.languageItem}>
    <div className={styles.top}>
      <span className={styles.name}>{name}</span>
      <span className={styles.level}>{level}</span>
    </div>
    {certificates && (
      <ul className={styles.certificates}>
        {certificates.map(({ name: certificate, year }) => (
          <li key={certificate}>
            {certificate} <b>{year}</b>
          </li>
        ))}
      </ul>
    )}
  </li>
);
