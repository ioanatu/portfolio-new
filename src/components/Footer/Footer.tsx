import { showConsentPreferences } from '../../consent/cookieConsent';
import { SECTION_NAV_ITEMS, SOCIAL_LINKS } from '../../content/navigation';
import { Brand } from '../Brand/Brand';
import { Container } from '../Container/Container';
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
              Frontend engineer building aesthetic, scalable web products from Berlin and Paris. 💜
            </p>
            <div className={styles.legal}>
              <button type="button" className={styles.privacy} onClick={showConsentPreferences}>
                Privacy settings
              </button>
              <p>
                © {new Date().getFullYear()} Ioana Tatu. Built with React, TypeScript, AWS, and a
                dash of Claude.
              </p>
            </div>
          </div>
          <div>
            <h4>Pages</h4>
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
            <h4>Elsewhere</h4>
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
        </div>
      </Container>
    </footer>
  );
};
