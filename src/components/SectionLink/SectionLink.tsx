import { useNavigate, useRouterState } from '@tanstack/react-router';
import type { MouseEvent, ReactNode } from 'react';

type SectionLinkProps = {
  sectionId: string;
  current: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

const isPlainLeftClick = (event: MouseEvent) =>
  event.button === 0 && !(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey);

/** Scrolls to a section of the home page without putting it in the URL. */
export const SectionLink = ({
  sectionId,
  current,
  className,
  onClick,
  children,
}: SectionLinkProps) => {
  const navigate = useNavigate();
  const onHome = useRouterState({ select: ({ location }) => location.pathname === '/' });

  const scrollToSection = () => document.getElementById(sectionId)?.scrollIntoView();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
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

  return (
    <a
      href="/"
      className={className}
      aria-current={current ? 'location' : undefined}
      onClick={handleClick}
    >
      {children}
    </a>
  );
};
