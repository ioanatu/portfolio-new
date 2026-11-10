import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import {
  RECOMMENDATIONS,
  RECOMMENDATIONS_INTRO,
  RECOMMENDATIONS_TITLE,
} from '../../content/recommendations';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { REARRANGE_DURATION_MS, useRearrangeAnimation } from '../../hooks/useRearrangeAnimation';
import { watchUserScroll } from '../../utils/watchUserScroll';
import { Container } from '../Container/Container';
import { RecommendationCard } from '../RecommendationCard/RecommendationCard';
import { cardTransitionName, contentTransitionName } from '../RecommendationCard/transitionNames';
import { SectionHead } from '../SectionHead/SectionHead';
import styles from './RecommendationsSection.module.css';

const SCROLL_OFFSET_PX = 100;
// Set on <html> while the cards morph, see index.css
const VIEW_TRANSITION_CLASS = 'view-transitioning';

type CopiedStyle = { property: string; read: (style: CSSStyleDeclaration) => string };

// The layers of a view transition are drawn outside the page, so they cannot see its styles.
// These are copied from the real elements when a transition starts (see index.css).
const NAV_STYLES: CopiedStyle[] = [
  { property: '--site-nav-backdrop', read: (style) => style.backdropFilter },
];
const CARD_STYLES: CopiedStyle[] = [
  { property: '--card-background', read: (style) => style.backgroundColor },
  {
    property: '--card-border',
    read: (style) => `${style.borderTopWidth} ${style.borderTopStyle} ${style.borderTopColor}`,
  },
  { property: '--card-radius', read: (style) => style.borderRadius },
  { property: '--card-shadow', read: (style) => style.boxShadow },
  { property: '--card-backdrop', read: (style) => style.backdropFilter },
];

const SPRING_DAMPING = 14.52;
const SPRING_FREQUENCY = 13.2;
const MORPH_STEPS = 120;
const TEXT_SETTLED_AT = 0.34;

const spring = (progress: number) =>
  progress >= 1
    ? 1
    : 1 - Math.exp(-SPRING_DAMPING * progress) * Math.cos(SPRING_FREQUENCY * progress);

/**
 * The morph of a card from one box to another, with every frame on whole pixels.
 *
 * By default the browser slides a card by fractions of a pixel while it changes size. An edge that
 * should stay put, like the right edge of the last card, is then drawn from slightly different
 * pixels every frame, and its border flickers. Here the left and right edges (and the top and
 * bottom ones) are rounded separately in every frame, so an edge that does not move stays exactly
 * where it is, and the box is placed with `left` and `top` rather than with a transform.
 */
const morphKeyframes = (from: DOMRect, to: DOMRect, settledAt = 1): Keyframe[] =>
  Array.from({ length: MORPH_STEPS + 1 }, (_, step) => {
    const offset = step / MORPH_STEPS;
    const settled = offset >= settledAt;
    // The last box is the exact one, so that the real card takes over without any jump
    const snap = step === MORPH_STEPS || settled ? (value: number) => value : Math.round;
    const progress = settled ? 1 : spring(offset);
    const mix = (start: number, end: number) => snap(start + (end - start) * progress);
    const left = mix(from.left, to.left);
    const top = mix(from.top, to.top);
    return {
      offset,
      // Hold each box until the next one, so that no frame lands between two whole pixels
      easing: 'steps(1, end)',
      transform: 'none',
      left: `${left}px`,
      top: `${top}px`,
      width: `${mix(from.right, to.right) - left}px`,
      height: `${mix(from.bottom, to.bottom) - top}px`,
    };
  });

/**
 * Gives the morph of every card, and of the text inside it, its exact boxes, see `morphKeyframes`.
 * The text must follow the very same steps as its card: if it moved even slightly ahead of the
 * card, it would stick out of the card for a moment. Only once the new text starts to appear does
 * it stop following the card's spring and stay in its final box (see `TEXT_SETTLED_AT`).
 */
const pinCardBoxes = (before: Map<string, DOMRect>, after: Map<string, DOMRect>) => {
  document.getAnimations().forEach((animation) => {
    const effect = animation.effect;
    if (!(effect instanceof KeyframeEffect)) return;
    const name = /^::view-transition-group\((recommendation-\d+(?:-content)?)\)$/.exec(
      effect.pseudoElement ?? '',
    )?.[1];
    const from = name && before.get(name);
    const to = name && after.get(name);
    if (!from || !to) return;
    const isText = name.endsWith('-content');
    effect.setKeyframes(morphKeyframes(from, to, isText ? TEXT_SETTLED_AT : 1));
  });
};

/** Copies styles of an element onto <html>. Returns a function that removes them again. */
const copyStyles = (source: Element | null | undefined, copied: CopiedStyle[]) => {
  const root = document.documentElement;
  if (!source) return () => {};
  const style = getComputedStyle(source);
  copied.forEach(({ property, read }) => root.style.setProperty(property, read(style)));
  return () => copied.forEach(({ property }) => root.style.removeProperty(property));
};

export const RecommendationsSection = () => {
  const listRef = useRef<HTMLUListElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const captureLayout = useRearrangeAnimation(listRef, expanded);
  const reducedMotion = usePrefersReducedMotion();
  const activeTransition = useRef<ViewTransition | null>(null);
  // Ends whatever the last click still has going: a running transition, or a delayed scroll
  const cancelPending = useRef<() => void>(() => {});

  useEffect(() => () => cancelPending.current(), []);

  // The open card moves to the top, so bring it back into view if it ended up off screen
  const revealOpenCard = (behavior: ScrollBehavior) => {
    const card = listRef.current?.querySelector<HTMLElement>('[data-expanded="true"]');
    if (!card) return;
    const { top, bottom } = card.getBoundingClientRect();
    if (top >= 0 && bottom <= window.innerHeight) return;
    window.scrollTo({ top: window.scrollY + top - SCROLL_OFFSET_PX, behavior });
  };

  const toggle = (author: string) => {
    cancelPending.current();
    const next = expanded === author ? null : author;
    if (reducedMotion || typeof document.startViewTransition !== 'function') {
      // The browser cannot morph the cards itself: they slide with the animation of the hook, and
      // the open card is brought into view once they have settled, unless the visitor scrolls
      captureLayout();
      setExpanded(next);
      if (next) {
        const timer = setTimeout(
          () => revealOpenCard(reducedMotion ? 'auto' : 'smooth'),
          reducedMotion ? 0 : REARRANGE_DURATION_MS,
        );
        const stopWatching = watchUserScroll(() => clearTimeout(timer));
        cancelPending.current = () => {
          clearTimeout(timer);
          stopWatching();
        };
      }
      return;
    }
    // The browser morphs every card from its old box to its new one in a single motion.
    // Scrolling happens inside the update so the morph already ends where the card will be.
    const root = document.documentElement;
    const forgetNav = copyStyles(document.querySelector('header nav'), NAV_STYLES);
    const forgetCard = copyStyles(listRef.current?.querySelector('article'), CARD_STYLES);
    root.classList.add(VIEW_TRANSITION_CLASS);
    let stopWatching = () => {};
    const cleanUp = () => {
      stopWatching();
      // A click that came after this one has taken over the styles and the class
      if (activeTransition.current !== transition) return;
      activeTransition.current = null;
      root.classList.remove(VIEW_TRANSITION_CLASS);
      forgetNav();
      forgetCard();
    };
    const measureCards = () => {
      const boxes = new Map<string, DOMRect>();
      Array.from(listRef.current?.children ?? []).forEach((card, index) => {
        boxes.set(cardTransitionName(index), card.getBoundingClientRect());
        const text = card.querySelector('[data-card-content]');
        if (text)
          boxes.set(contentTransitionName(cardTransitionName(index)), text.getBoundingClientRect());
      });
      return boxes;
    };
    const before = measureCards();
    let after = new Map<string, DOMRect>();
    const transition = document.startViewTransition(() => {
      flushSync(() => setExpanded(next));
      revealOpenCard('instant');
      after = measureCards();
    });
    activeTransition.current = transition;
    cancelPending.current = () => transition.skipTransition();
    transition.ready.then(() => {
      pinCardBoxes(before, after);
      // While a transition runs, the page shows a picture of itself that does not scroll: so
      // the moment the visitor scrolls, the animation ends and the real page takes over
      stopWatching = watchUserScroll(() => transition.skipTransition());
    }, cleanUp);
    transition.finished.then(cleanUp, cleanUp);
  };

  return (
    <section
      id="recommendations"
      className={styles.section}
      aria-labelledby="recommendations-title"
    >
      <Container>
        <SectionHead
          tag="Recommendations"
          title={RECOMMENDATIONS_TITLE}
          titleId="recommendations-title"
          intro={RECOMMENDATIONS_INTRO}
        />
        <ul ref={listRef} className={styles.grid}>
          {RECOMMENDATIONS.map((recommendation, index) => {
            const isExpanded = expanded === recommendation.author;
            return (
              <li
                key={recommendation.author}
                data-expanded={isExpanded}
                style={{
                  viewTransitionName: cardTransitionName(index),
                  viewTransitionClass: 'recommendation-card',
                }}
                className={clsx({
                  [styles.featured]: recommendation.featured,
                  [styles.expanded]: isExpanded,
                })}
              >
                <RecommendationCard
                  recommendation={recommendation}
                  transitionName={cardTransitionName(index)}
                  expanded={isExpanded}
                  onToggle={() => toggle(recommendation.author)}
                />
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
};
