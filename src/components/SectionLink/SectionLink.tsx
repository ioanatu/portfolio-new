import type { ReactNode } from 'react';
import { useSectionClick } from '../../hooks/useSectionClick';

type SectionLinkProps = {
  sectionId: string;
  current: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

/** Scrolls to a section of the home page without putting it in the URL. */
export const SectionLink = ({
  sectionId,
  current,
  className,
  onClick,
  children,
}: SectionLinkProps) => {
  const handleClick = useSectionClick(sectionId, onClick);

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
