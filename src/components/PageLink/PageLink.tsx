import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import type { PageNavItem } from '../../content/navigation';

type PageLinkProps = {
  to: PageNavItem['to'];
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

export const PageLink = ({ to, className, onClick, children }: PageLinkProps) => (
  <Link to={to} className={className} onClick={onClick}>
    {children}
  </Link>
);
