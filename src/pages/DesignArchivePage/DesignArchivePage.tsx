import { Link } from '@tanstack/react-router';
import { buttonClassName } from '../../components/Button/buttonClassName';
import { Container } from '../../components/Container/Container';
import { VisuallyHidden } from '../../components/VisuallyHidden/VisuallyHidden';
import {
  DESIGN_ARCHIVE_BACK_LABEL,
  DESIGN_ARCHIVE_LINK,
  DESIGN_ARCHIVE_TEXT_BEFORE_LINK,
  DESIGN_ARCHIVE_TITLE,
} from '../../content/designArchive';
import styles from './DesignArchivePage.module.css';

export const DesignArchivePage = () => (
  <main id="top" className={styles.page}>
    <Container>
      <h1>
        <VisuallyHidden>{DESIGN_ARCHIVE_TITLE}</VisuallyHidden>
      </h1>
      <p className={styles.message}>
        {DESIGN_ARCHIVE_TEXT_BEFORE_LINK}{' '}
        <a href={DESIGN_ARCHIVE_LINK.href} target="_blank" rel="noopener noreferrer">
          {DESIGN_ARCHIVE_LINK.label}
        </a>
        .
      </p>
      <Link to="/" className={buttonClassName({ variant: 'secondary' })}>
        {DESIGN_ARCHIVE_BACK_LABEL}
      </Link>
    </Container>
  </main>
);
