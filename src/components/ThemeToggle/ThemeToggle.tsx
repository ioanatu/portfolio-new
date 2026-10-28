import { useTheme } from '../../hooks/useTheme';
import { IconButton } from '../IconButton/IconButton';

const ICON_PROPS = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

type ThemeToggleProps = {
  className?: string;
};

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === 'dark';

  return (
    <IconButton
      label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={toggleTheme}
      className={className}
    >
      {dark ? (
        <svg {...ICON_PROPS}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg {...ICON_PROPS}>
          <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
        </svg>
      )}
    </IconButton>
  );
};
