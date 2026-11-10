import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import { useId } from 'react';
import type { Recommendation } from '../../content/recommendations';
import { buttonClassName } from '../Button/buttonClassName';
import styles from './RecommendationCard.module.css';
import { contentTransitionName } from './transitionNames';

const MORE_LABEL = 'Read more';
const LESS_LABEL = 'Show less';

type RecommendationCardProps = {
  recommendation: Recommendation;
  /** Name under which the card and its text take part in view transitions */
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
        <button
          type="button"
          className={buttonClassName({
            variant: 'secondary',
            size: 'small',
            className: styles.more,
          })}
          aria-expanded={expanded}
          aria-controls={fullTextId}
          aria-label={`${label}: recommendation from ${author}`}
          onClick={onToggle}
        >
          {label}
          <ChevronDown
            className={clsx(styles.chevron, expanded && styles.open)}
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
          />
        </button>
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
