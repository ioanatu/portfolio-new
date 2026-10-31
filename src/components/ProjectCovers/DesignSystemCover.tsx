/** Neo-brutalist look of the design system's Storybook: ink outlines, hard offset shadows */
const INK = '#1A1A1A';
const ACCENT = '#3367F6';
const MONO = 'JetBrains Mono, ui-monospace, monospace';

const SWATCHES = [
  { name: 'accent.500', color: ACCENT },
  { name: 'danger.500', color: '#D63F38' },
  { name: 'success.500', color: '#1FA971' },
  { name: 'ink.900', color: INK },
];

const BUTTONS = [
  { label: 'Primary', x: 20, width: 70, fill: ACCENT, text: '#fff', shadow: INK },
  { label: 'Secondary', x: 104, width: 82, fill: '#fff', text: INK, shadow: ACCENT },
  { label: 'Destructive', x: 200, width: 90, fill: '#D63F38', text: '#fff', shadow: INK },
];

export const DesignSystemCover = () => (
  <svg
    viewBox="0 0 320 200"
    preserveAspectRatio="xMidYMid meet"
    fontFamily="Hanken Grotesk, system-ui, sans-serif"
    aria-hidden="true"
  >
    <rect width="320" height="200" fill="#F7F5F5" />
    <rect x="25" y="21" width="92" height="92" rx="14" fill={ACCENT} />
    <rect x="20" y="16" width="92" height="92" rx="14" fill="#fff" stroke={INK} strokeWidth="2" />
    <text
      x="66"
      y="76"
      textAnchor="middle"
      fontSize="46"
      fontWeight="800"
      letterSpacing="-3"
      fill={INK}
    >
      Aa
    </text>
    {SWATCHES.map(({ name, color }, i) => (
      <g key={name} transform={`translate(142 ${19 + i * 24})`}>
        <circle cx="9" cy="9" r="8" fill={color} stroke={INK} strokeWidth="2" />
        <text x="26" y="13" fontSize="11" fontWeight="500" fontFamily={MONO} fill={INK}>
          {name}
        </text>
      </g>
    ))}
    {BUTTONS.map(({ label, x, width, fill, text, shadow }) => (
      <g key={label}>
        <rect x={x + 3} y="143" width={width} height="32" rx="10" fill={shadow} />
        <rect
          x={x}
          y="140"
          width={width}
          height="32"
          rx="10"
          fill={fill}
          stroke={INK}
          strokeWidth="2"
        />
        <text
          x={x + width / 2}
          y="160"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill={text}
        >
          {label}
        </text>
      </g>
    ))}
  </svg>
);
