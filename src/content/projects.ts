export const PROJECTS_TITLE = 'Projects';

export const PROJECTS_INTRO = 'Projects I built for fun and learning.';

export type ProjectCoverId = 'portfolio' | 'design-system' | 'nap';

export type Project = {
  name: string;
  href: string;
  /** Shown as the subtitle, and the text of the link */
  linkLabel: string;
  repoHref: string;
  description: string;
  cover: ProjectCoverId;
};

export const PROJECTS: readonly Project[] = [
  {
    name: 'Old portfolio',
    href: 'https://www.ioanatatu.com',
    linkLabel: 'ioanatatu.com',
    repoHref: 'https://github.com/ioanatatu/portfolio-client',
    description:
      'Frontend hosted on Netlify and backend built with AWS Serverless Framework for Lambda and S3, DynamoDB, and DNS managed with Route 53.',
    cover: 'portfolio',
  },
  {
    name: 'Design system',
    href: 'https://design-system.ioanatatu.com',
    linkLabel: 'design-system.ioanatatu.com',
    repoHref: 'https://github.com/ioanatu/component-library',
    description:
      'I built my own accessible component library and token system with Storybook. The library is WCAG 2.1 AA compliant and supports multiple themes. The package is hosted on GitHub and published on npm.',
    cover: 'design-system',
  },
  {
    name: 'Exercise project',
    href: 'https://www.thenap.de/',
    linkLabel: 'thenap.de',
    repoHref: 'https://github.com/ioanatatu/take-a-nap',
    description:
      "Fun project I built many years ago. It was meant to experiement with all technologies I was curious about at that time. It uses PostgreSQL and Firebase as databases. P.S.: I haven't revewed the SSL certificate yet.",
    cover: 'nap',
  },
];
