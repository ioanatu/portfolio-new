import clsx from 'clsx';
import { type KeyboardEvent, useEffect, useRef } from 'react';
import { buttonClassName } from '../Button/buttonClassName';
import styles from './DownloadCvMenu.module.css';

type DownloadCvMenuProps = {
  links: readonly { label: string; href: string }[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
};

export const DownloadCvMenu = ({ links, open, onOpenChange, className }: DownloadCvMenuProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const focusFirstOnOpen = useRef(false);

  useEffect(() => {
    if (!open) return;
    if (focusFirstOnOpen.current) {
      focusFirstOnOpen.current = false;
      listRef.current?.querySelector('a')?.focus();
    }

    const onDocumentClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) onOpenChange(false);
    };
    const onDocumentKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      onOpenChange(false);
      buttonRef.current?.focus();
    };
    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onDocumentKeyDown);
    return () => {
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onDocumentKeyDown);
    };
  }, [open, onOpenChange]);

  const onButtonKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'ArrowDown') return;
    event.preventDefault();
    focusFirstOnOpen.current = true;
    onOpenChange(true);
  };

  const onListKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Tab') return onOpenChange(false);
    const step = { ArrowDown: 1, ArrowUp: -1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const items = Array.from(listRef.current?.querySelectorAll('a') ?? []);
    const current = items.indexOf(document.activeElement as HTMLAnchorElement);
    items[(current + step + items.length) % items.length]?.focus();
  };

  return (
    <div ref={rootRef} className={clsx(styles.downloadCvMenu, className)}>
      <button
        ref={buttonRef}
        type="button"
        className={clsx(buttonClassName({ variant: 'secondary', size: 'small' }), styles.trigger)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="cv-list"
        onClick={() => onOpenChange(!open)}
        onKeyDown={onButtonKeyDown}
      >
        Download CV
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>
      <ul
        ref={listRef}
        id="cv-list"
        className={styles.list}
        role="menu"
        aria-label="CV versions"
        hidden={!open}
        onKeyDown={onListKeyDown}
      >
        {links.map(({ label, href }) => (
          <li key={href} role="none">
            <a
              role="menuitem"
              href={href}
              target="_blank"
              rel="noopener"
              onClick={() => onOpenChange(false)}
            >
              {label}
              <small>PDF</small>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
