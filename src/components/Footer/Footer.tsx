import { showConsentPreferences } from '../../consent/cookieConsent';
import { PAGE_NAV_ITEMS, SECTION_NAV_ITEMS, SOCIAL_LINKS } from '../../content/navigation';
import { Brand } from '../Brand/Brand';
import { Container } from '../Container/Container';
import { PageLink } from '../PageLink/PageLink';
import { SectionLink } from '../SectionLink/SectionLink';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          <div>
            <Brand />
            <p>
              Frontend Engineer building performant, scalable and aesthetic web products from
              Berlin. 💜
            </p>
            <div className={styles.legal}>
              <p>
                © {new Date().getFullYear()} Ioana Tatu. Built with React, TypeScript, AWS, and
                Claude Code.
              </p>
              <button type="button" className={styles.privacy} onClick={showConsentPreferences}>
                Privacy settings
              </button>
            </div>
          </div>
          <div>
            <h4>Sections</h4>
            <ul>
              {SECTION_NAV_ITEMS.map(({ label, sectionId }) => (
                <li key={sectionId}>
                  <SectionLink sectionId={sectionId} current={false}>
                    {label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Links</h4>
            <ul>
              {SOCIAL_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Pages</h4>
            <ul>
              {PAGE_NAV_ITEMS.map(({ label, to }) => (
                <li key={to}>
                  <PageLink to={to}>{label}</PageLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
};
