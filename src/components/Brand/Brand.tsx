import { Link, useRouterState } from '@tanstack/react-router';
import clsx from 'clsx';
import type { MouseEvent } from 'react';
import styles from './Brand.module.css';

type BrandProps = {
  className?: string;
};

export const Brand = ({ className }: BrandProps) => {
  const onHome = useRouterState({ select: ({ location }) => location.pathname === '/' });

  const scrollToTop = (event: MouseEvent) => {
    if (!onHome) return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link
      to="/"
      className={clsx(styles.brand, className)}
      aria-label="Ioana Tatu, home"
      onClick={scrollToTop}
    >
      ioana tatu
    </Link>
  );
};
