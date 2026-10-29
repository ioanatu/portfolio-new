export type Job = {
  field: 'engineering' | 'design';
  company: string;
  role: string;
  dates: string;
  highlights: readonly string[];
};

export const EXPERIENCE_TITLE = 'Where I’ve worked';
export const EXPERIENCE_INTRO =
  'Five years of frontend engineering across a product company, a consultancy and a startup, built on a decade of design work.';

export const JOBS: readonly Job[] = [
  {
    field: 'engineering',
    company: 'sonnen',
    role: 'Frontend Software Engineer',
    dates: 'Jan 2026 – Dec 2022',
    highlights: [
      'Maintained Toolbox, a B2B microfrontend dashboard (React, Vite Module Federation, GraphQL) on S3 and CloudFront. Built the PoC, wrote ADRs, set up CI/CD with GitHub Actions and released the MVP.',
      'Developed Tariffs, a B2C energy-contract purchase flow with i18n, 80% test coverage and Sentry monitoring, then cut its load times by 45%.',
      'Led tech-stack research for the web-ui design system, onboarded designers onto atomic design and deployed Storybook to S3.',
      'Reduced bugs in the legacy Partner Portal by 10% by raising test coverage.',
      'Mentored junior engineers, led refinements, wrote tickets and partnered with design and QA on UI and user flows.',
    ],
  },
  {
    field: 'engineering',
    company: 'Futurice',
    role: 'Software Engineer Consultant',
    dates: 'Nov 2022 – Aug 2021',
    highlights: [
      'Built features for Red Bull München’s server-side rendered website.',
      'Developed a B2B mobile app for Royal Unibrew in Denmark and Hartwall in Finland.',
      'Contributed to Dev Breakfast, an agency-wide knowledge-sharing series on clean code, TDD and scalability, and supported recruiting.',
    ],
  },
  {
    field: 'engineering',
    company: 'Aaron.ai',
    role: 'Junior Fullstack JavaScript Developer',
    dates: 'Jul 2021 – Jan 2021',
    highlights: [
      'Owned a feature end to end as feature owner and requirements engineer, aligning stakeholders on business and technical constraints.',
      'Designed and implemented the UI in the absence of a dedicated design team.',
    ],
  },
  {
    field: 'design',
    company: 'dan pearlman',
    role: 'Freelance Graphic & Retail Interior Designer',
    dates: '2019 – 2017',
    highlights: [
      'Supported in-house teams in Berlin across all phases of numerous projects, from 3D modelling and Photoshop post-production to client presentations and CAD blueprints.',
    ],
  },
  {
    field: 'design',
    company: 'Weiss Heiten',
    role: 'Freelance Graphic & Retail Interior Designer',
    dates: '2019 – 2016',
    highlights: [
      'Produced 3D renderings, floor drawings and detailed furniture plans for high-end projects in Berlin.',
    ],
  },
  {
    field: 'design',
    company: 'PIANO:TERRA',
    role: 'Interior Designer',
    dates: '2015 – 2009',
    highlights: [
      'Worked across every aspect of interior design projects in Bucharest, from the conceptual phase to supervising construction sites and coordinating projects.',
    ],
  },
];
