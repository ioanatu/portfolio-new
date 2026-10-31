import type { PageNavItem, SectionNavItem } from '../../content/navigation';
import { PageLink } from '../PageLink/PageLink';
import { SectionLink } from '../SectionLink/SectionLink';
import styles from './MobileMenu.module.css';

type MobileMenuProps = {
  id: string;
  sections: readonly SectionNavItem[];
  pages: readonly PageNavItem[];
  activeSectionId: string | null;
  cvLinks: readonly { label: string; href: string }[];
  onNavigate: () => void;
};

export const MobileMenu = ({
  id,
  sections,
  pages,
  activeSectionId,
  cvLinks,
  onNavigate,
}: MobileMenuProps) => (
  <div id={id} className={styles.mobileMenu}>
    <ul>
      {sections.map(({ label, sectionId }) => (
        <li key={sectionId}>
          <SectionLink
            sectionId={sectionId}
            current={sectionId === activeSectionId}
            onClick={onNavigate}
          >
            {label}
          </SectionLink>
        </li>
      ))}
      {pages.map(({ label, to }) => (
        <li key={to}>
          <PageLink to={to} onClick={onNavigate}>
            {label}
          </PageLink>
        </li>
      ))}
      <li className={styles.separator} aria-hidden="true" />
      <li>
        <span className={styles.label} id="mobile-cv-label">
          Resume
        </span>
        <div className={styles.cv} role="group" aria-labelledby="mobile-cv-label">
          {cvLinks.map(({ label, href }) => (
            <a key={href} href={href} target="_blank" rel="noopener" onClick={onNavigate}>
              {label}
            </a>
          ))}
        </div>
      </li>
    </ul>
  </div>
);
