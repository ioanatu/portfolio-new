import {
  CERTIFICATIONS_INTRO,
  CERTIFICATIONS_TITLE,
  CREDLY_BADGE_COUNT,
  IN_PROGRESS_CERTIFICATION,
} from '../../content/certifications';
import { useCredlyBadges } from '../../hooks/useCredlyBadges';
import { BadgeSourceCard } from '../BadgeSourceCard/BadgeSourceCard';
import { CertificationCard } from '../CertificationCard/CertificationCard';
import { CertificationCardSkeleton } from '../CertificationCard/CertificationCardSkeleton';
import { Container } from '../Container/Container';
import { SectionHead } from '../SectionHead/SectionHead';
import styles from './CertificationsSection.module.css';

export const CertificationsSection = () => {
  const { data: earned, isPending, isError } = useCredlyBadges();

  return (
    <section id="certifications" className={styles.section} aria-labelledby="certifications-title">
      <Container>
        <SectionHead
          tag="Certifications"
          title={CERTIFICATIONS_TITLE}
          titleId="certifications-title"
          intro={CERTIFICATIONS_INTRO}
        />
        <div className={styles.grid} aria-busy={isPending}>
          {isPending &&
            Array.from({ length: CREDLY_BADGE_COUNT }, (_, i) => (
              <CertificationCardSkeleton key={i} />
            ))}
          {earned?.map((certification) => (
            <CertificationCard key={certification.name} certification={certification} />
          ))}
          <BadgeSourceCard />
          <CertificationCard
            key={IN_PROGRESS_CERTIFICATION.name}
            certification={IN_PROGRESS_CERTIFICATION}
            className={styles.inProgress}
          />
        </div>
        {isError && (
          <p role="alert" className={styles.error}>
            Could not load the earned badges right now.
          </p>
        )}
      </Container>
    </section>
  );
};
