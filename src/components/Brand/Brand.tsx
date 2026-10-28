import { Link } from '@tanstack/react-router';
import clsx from 'clsx';
import styles from './Brand.module.css';

type BrandProps = {
  className?: string;
};

export const Brand = ({ className }: BrandProps) => (
  <Link to="/" hash="top" className={clsx(styles.brand, className)} aria-label={'Ioana Tatu, home'}>
    ioana tatu
  </Link>
);
