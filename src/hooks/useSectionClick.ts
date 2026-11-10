import { useNavigate, useRouterState } from '@tanstack/react-router';
import type { MouseEvent } from 'react';

const isPlainLeftClick = (event: MouseEvent) =>
  event.button === 0 && !(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey);

/**
 * The click handler for a link to a section of the home page: it scrolls there without putting
 * the section in the URL, and goes to the home page first when you are on another page. A click
 * with a modifier key is left to the browser, so "open in a new tab" still works.
 */
export const useSectionClick = (sectionId: string, onClick?: () => void) => {
  const navigate = useNavigate();
  const onHome = useRouterState({ select: ({ location }) => location.pathname === '/' });

  const scrollToSection = () => document.getElementById(sectionId)?.scrollIntoView();

  return (event: MouseEvent<Element>) => {
    onClick?.();
    if (!isPlainLeftClick(event)) return;
    event.preventDefault();
    if (onHome) {
      scrollToSection();
      return;
    }
    void navigate({ to: '/', resetScroll: false }).then(() =>
      requestAnimationFrame(scrollToSection),
    );
  };
};
