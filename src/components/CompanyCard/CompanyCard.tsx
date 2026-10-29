import { ArrowUpRight } from 'lucide-react';
import { buttonClassName } from '../Button/buttonClassName';
import styles from './CompanyCard.module.css';

type CompanyCardProps = {
  description: string;
  website: { href: string; label: string };
};

/** A short description of an employer, with a button to its website. */
export const CompanyCard = ({ description, website: { href, label } }: CompanyCardProps) => (
  <aside className={styles.companyCard}>
    <div className={styles.top}>
      <span className={styles.tag}>About the company</span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClassName({ variant: 'secondary', size: 'small' })}
        aria-label={`Visit ${label}, opens in a new tab`}
      >
        <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
      </a>
    </div>
    <p>{description}</p>
  </aside>
);
