import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { THEME_STORAGE_KEY } from '../constants';
import type { Theme } from '../types';
import { ThemeContext } from './ThemeContext';

const DARK_QUERY = '(prefers-color-scheme: dark)';

const readStoredTheme = (): Theme | null => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
};

const getSystemTheme = (): Theme => (window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light');

type ThemeProviderProps = {
  children: ReactNode;
};

/** Saved choice wins; without one the theme follows the system setting. */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => readStoredTheme() ?? getSystemTheme());

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const query = window.matchMedia(DARK_QUERY);
    const onChange = () => {
      if (!readStoredTheme()) setTheme(getSystemTheme());
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage: the choice just lasts for this visit
    }
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
