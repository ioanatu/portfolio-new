import { Button } from '@ioanatu/component-library';
import clsx from 'clsx';
import { useEffect, useId, useRef } from 'react';
import type { Recommendation } from '../../content/recommendations';
import styles from './RecommendationCard.module.css';
import { contentTransitionName } from './transitionNames';

const MORE_LABEL = 'Read more ...';
const LESS_LABEL = 'Show less';

type RecommendationCardProps = {
  recommendation: Recommendation;
  transitionName: string;
  expanded: boolean;
  onToggle: () => void;
};

export const RecommendationCard = ({
  recommendation: { author, role, highlight, description, featured },
  transitionName,
  expanded,
  onToggle,
}: RecommendationCardProps) => {
  const fullTextId = useId();
  const label = expanded ? LESS_LABEL : MORE_LABEL;
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;
    button.setAttribute('aria-expanded', String(expanded));
    button.setAttribute('aria-controls', fullTextId);
    button.setAttribute('aria-label', `${label}: recommendation from ${author}`);
  }, [expanded, fullTextId, label, author]);

  return (
    <article className={clsx(styles.recommendationCard, featured && styles.featured)}>
      <div
        className={styles.content}
        data-card-content
        style={{
          viewTransitionName: contentTransitionName(transitionName),
          viewTransitionClass: 'recommendation-content',
        }}
      >
        <blockquote className={styles.highlight}>
          <span className={styles.mark} aria-hidden="true">
            “
          </span>
          <p>{highlight}</p>
        </blockquote>
        <Button
          ref={buttonRef}
          variant="primary"
          size="md"
          label={label}
          className={styles.more}
          onClick={onToggle}
        />
        <div id={fullTextId} className={styles.fullText} hidden={!expanded}>
          {description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className={styles.attribution}>
          <h3 className={styles.author}>{author}</h3>
          <p className={styles.role}>{role}</p>
        </div>
      </div>
    </article>
  );
};
