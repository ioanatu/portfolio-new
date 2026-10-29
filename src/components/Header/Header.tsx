import { useRouterState } from '@tanstack/react-router';
import clsx from 'clsx';
import { Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { CV_LINKS, SECTION_IDS, SECTION_NAV_ITEMS } from '../../content/navigation';
import { useResponsiveNav } from '../../hooks/useResponsiveNav';
import { useScrolledPast } from '../../hooks/useScrolledPast';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { Brand } from '../Brand/Brand';
import { Container } from '../Container/Container';
import { DownloadCvMenu } from '../DownloadCvMenu/DownloadCvMenu';
import { IconButton } from '../IconButton/IconButton';
import { MobileMenu } from '../MobileMenu/MobileMenu';
import { SectionLink } from '../SectionLink/SectionLink';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

const MOBILE_MENU_ID = 'mobile-menu';
const GLASS_SCROLL_PX = 8;

export const Header = () => {
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const scrolled = useScrolledPast(GLASS_SCROLL_PX);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const activeSectionId = useScrollSpy(SECTION_IDS, pathname);

  useResponsiveNav(navRef, (fits) => {
    if (fits) setMenuOpen(false);
    else setCvOpen(false);
  });

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className={clsx(styles.header, { [styles.isScrolled]: scrolled })}>
      <Container className={styles.container}>
        <nav ref={navRef} className={styles.nav} aria-label="Main">
          <Brand className={styles.brand} />
          <ul className={styles.links}>
            {SECTION_NAV_ITEMS.map(({ label, sectionId }) => (
              <li key={sectionId}>
                <SectionLink sectionId={sectionId} current={sectionId === activeSectionId}>
                  {label}
                </SectionLink>
              </li>
            ))}
            {/* <li>
              <Link to="/projects">Projects</Link>
            </li> */}
          </ul>
          <div className={styles.actions}>
            <DownloadCvMenu
              links={CV_LINKS}
              open={cvOpen}
              onOpenChange={setCvOpen}
              className={styles.cvMenu}
            />
            <ThemeToggle />

            <IconButton
              label={menuOpen ? 'Close menu' : 'Open menu'}
              expanded={menuOpen}
              controls={MOBILE_MENU_ID}
              onClick={() => setMenuOpen((open) => !open)}
              className={styles.menuButton}
              ref={menuButtonRef}
            >
              <Menu size={24} strokeWidth={1.8} aria-hidden="true" />
            </IconButton>
          </div>
        </nav>

        {menuOpen && (
          <MobileMenu
            id={MOBILE_MENU_ID}
            sections={SECTION_NAV_ITEMS}
            activeSectionId={activeSectionId}
            cvLinks={CV_LINKS}
            onNavigate={() => setMenuOpen(false)}
          />
        )}
      </Container>
    </header>
  );
};
