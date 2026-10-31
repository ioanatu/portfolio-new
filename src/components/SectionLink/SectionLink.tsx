import { useLinkProps, useRouterState } from '@tanstack/react-router';
import type { ReactNode } from 'react';

type SectionLinkProps = {
  sectionId: string;
  current: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

export const SectionLink = ({
  sectionId,
  current,
  className,
  onClick,
  children,
}: SectionLinkProps) => {
  const linkProps = useLinkProps({ to: '/', hash: sectionId });
  const alreadyThere = useRouterState({
    select: ({ location }) => location.pathname === '/' && location.hash === sectionId,
  });

  return (
    <a
      {...linkProps}
      href={linkProps.href}
      className={className}
      aria-current={current ? 'location' : undefined}
      onClick={(event) => {
        if (alreadyThere) {
          event.preventDefault();
          document.getElementById(sectionId)?.scrollIntoView();
        } else {
          linkProps.onClick?.(event);
        }
        onClick?.();
      }}
    >
      {children}
    </a>
  );
};
