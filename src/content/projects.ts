export const PROJECTS_TITLE = 'Projects';

export const PROJECTS_INTRO = 'Platforms I build and run on my own.';

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
      'Frontend hosted on Netlify and backend built with Serverless Framework for Lambda and S3, DynamoDB, and DNS managed in AWS.',
    cover: 'portfolio',
  },
  {
    name: 'Design system',
    href: 'https://design-system.ioanatatu.com',
    linkLabel: 'design-system.ioanatatu.com',
    repoHref: 'https://github.com/ioanatu/component-library',
    description:
      'My own accessible component library and token system, hosted on S3 with SSL from AWS Certificate Manager on its own subdomain.',
    cover: 'design-system',
  },
  {
    name: 'Exercise project',
    href: 'https://www.thenap.de/',
    linkLabel: 'thenap.de',
    repoHref: 'https://github.com/ioanatatu/take-a-nap',
    description: 'The landing page of The Nap.',
    cover: 'nap',
  },
];
