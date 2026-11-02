const LINES = [
  'M60 62 V122',
  'M98 44 C120 44 120 92 140 92',
  'M98 140 C120 140 120 92 140 92',
  'M196 92 C220 92 220 58 238 58',
  'M196 92 C220 92 220 134 238 134',
];

export const PortfolioCover = () => (
  <svg
    viewBox="0 0 340 200"
    preserveAspectRatio="xMidYMid meet"
    fontFamily="Hanken Grotesk Variable, system-ui, sans-serif"
    fontSize="12"
    fontWeight="600"
    aria-hidden="true"
  >
    <path d={LINES.join(' ')} fill="none" stroke="#1B1F3B" strokeWidth="2" strokeDasharray="4 5" />
    <rect x="22" y="26" width="76" height="36" rx="18" fill="#CFCAF4" />
    <text x="60" y="48" textAnchor="middle" fill="#1B1F3B">
      Route 53
    </text>
    <rect x="22" y="122" width="76" height="36" rx="18" fill="#fff" />
    <text x="60" y="144" textAnchor="middle" fill="#1B1F3B">
      Netlify
    </text>
    <rect x="140" y="74" width="56" height="36" rx="12" fill="#1B1F3B" />
    <text x="168" y="96" textAnchor="middle" fill="#fff">
      aws λ
    </text>
    <rect x="238" y="40" width="84" height="36" rx="18" fill="#F6DF7C" />
    <text x="280" y="62" textAnchor="middle" fill="#1B1F3B">
      DynamoDB
    </text>
    <rect x="238" y="116" width="80" height="36" rx="18" fill="#F2B9D3" />
    <text x="280" y="138" textAnchor="middle" fill="#1B1F3B">
      S3
    </text>
  </svg>
);
