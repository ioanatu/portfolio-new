import aaronLogo from '../assets/aaron-logo.png';
import futuriceLogo from '../assets/futurice-logo.jpg';
import sonnenLogo from '../assets/sonnen-logo.png';
import { CV_LINKS } from './navigation';

export type JobProject = {
  name: string;
  summary: string;
  link?: { href: string; label: string };
  stack?: string;
  /** Phrases to set in bold in the bullet points. */
  emphasized?: readonly string[];
  points: readonly string[];
};

/** A longer write-up of a job: an intro, its projects and what was common to all of them. */
export type JobDetail = {
  heading: string;
  logo: string;
  intro: string;
  website: { href: string; label: string };
  /** Plain bullet points, for jobs that are not split into projects. */
  highlights?: readonly string[];
  projects?: readonly JobProject[];
  commonTitle?: string;
  commonPoints?: readonly string[];
};

export type Job = {
  field: 'engineering' | 'design';
  company: string;
  role: string;
  dates: string;
} & ({ highlights: readonly string[]; detail?: never } | { detail: JobDetail; highlights?: never });

export const EXPERIENCE_TITLE = 'Where I’ve worked';
export const EXPERIENCE_INTRO =
  '5+ years of frontend engineering across a product company, consultancy and a startup. I’ve built B2B and B2C applications, from microfrontend dashboards to component libraries, and have brought value to all phases of the software development lifecycle.';

export const RESUME_DOWNLOAD_LABEL = 'Download streamlined resume:';
export const RESUME_DOWNLOADS = [
  { label: 'ATS format', href: CV_LINKS[0].href },
  { label: 'Happy human eye', href: CV_LINKS[1].href },
] as const;

export const JOBS: readonly Job[] = [
  {
    field: 'engineering',
    company: 'sonnen',
    role: 'Frontend Engineer',
    dates: 'Jan 2026 – Dec 2022',
    detail: {
      heading: 'sonnen GmbH — Berlin',
      logo: sonnenLogo,
      website: { href: 'https://www.sonnen.de/', label: 'sonnen.de' },
      intro:
        'sonnen is an energy company specialized in battery production and energy contracts. As of 29 October 2026, sonnen GmbH has files for insolvency proceedings under self-administration.',
      projects: [
        {
          name: 'Tariffs',
          emphasized: ['microfrontends', 'GitHub Actions', 'B2B', 'B2C', 'atomic design'],
          summary: 'Purchase flow for new sonnen energy contracts.',
          link: { href: 'https://tariffs.sonnen.de/', label: 'tariffs.sonnen.de' },
          points: [
            'B2C customer-facing application built with React, TypeScript, Vite, GraphQL, ContextAPI, and a BFF approach.',
            'Bootstrapped the project, implemented CI/CD pipeline, integrated Sentry, google Analytics, guided frontend architecture decisions.',
            'In addition to ongoing feature development, ensured 80% test coverage, monitored with Sentry, and mentored junior team members.',
          ],
        },
        {
          name: 'Toolbox',
          emphasized: ['microfrontends', 'GitHub Actions', 'B2B', 'B2C', 'atomic design'],
          summary: 'Modern dashboard for sonnen partners.',
          points: [
            'B2B microfrontends application built with React, Typescript, Vite Module Federation and GraphQL, localization with i18n and POEditor, hosted in a GitHub monorepo, and deployed to an S3 bucket served through AWS CloudFront.',
            'Contributed my experience to all phases of the project: microfrontend architecture research and decision, tech stack selection based on business requirements and trade-offs, ADRs and documentation, CI/CD pipeline setup with GitHub Actions, AWS hosting and CloudFront configuration, and ongoing feature development.',
          ],
        },
        {
          name: 'Partner Portal',
          summary:
            'Sonnen partners application used for the battery commissioning process and post-sale support.',
          points: [
            'B2B application built with React, Redux, RxJS, SASS, webpack, REST API, deployed on GitLab.',
            'Legacy app where I performed regular bug fixes, code refactorings, and occasionally developed new features.',
          ],
        },
        {
          name: 'Web-ui',
          summary: 'Component library based on new company design system.',
          points: [
            'Led the implementation of a new design system, including the creation of reusable components, and mentored junior team members on frontend best practices and testing.',
            'I led tech stack research and selection, onboarded the design team on atomic design methodology, and helped build the library from scratch',
          ],
        },
      ],
      commonTitle: 'Responsibilities common to all projects:',
      commonPoints: [
        'Thorough code reviews focused on enhancing best practices, functionality, and maintainability, as well as domain knowledge transfer.',
        'my communication and organisational skills enabled me to occasionally fill gaps caused by a fast-moving environment, such as clarifying business requirements, writing tickets, leading Refinements, while my keen eye for design details made me a go-to person for designers and QA when testing user flows and UI.',
      ],
    },
  },
  {
    field: 'engineering',
    company: 'Futurice',
    role: 'Software Engineer Consultant',
    dates: 'Nov 2022 – Aug 2021',
    detail: {
      heading: 'Futurice',
      logo: futuriceLogo,
      website: { href: 'https://www.futurice.com/de', label: 'futurice.com' },
      intro:
        'Futurice is a consultancy with Finnish roots and values that develops IT solutions for clients on the German and Scandinavian markets.',
      highlights: [
        'Built features for Red Bull München’s server-side rendered website.',
        'Developed a B2B mobile app for Royal Unibrew in Denmark and Hartwall in Finland.',
        'Contributed to Dev Breakfast, an agency-wide knowledge-sharing series on clean code, TDD and scalability, and supported recruiting.',
      ],
    },
  },
  {
    field: 'engineering',
    company: 'Aaron.ai',
    role: 'Junior Fullstack JavaScript Developer',
    dates: 'Jul 2021 – Jan 2021',
    detail: {
      heading: 'Aaron.ai',
      logo: aaronLogo,
      website: { href: 'https://www.aaron.ai/', label: 'aaron.ai' },
      intro:
        'Aaron.ai is an AI phone assistant for doctors’ practices that answers calls around the clock and books appointments automatically. It is now part of Doctolib.',
      highlights: [
        'Owned a feature end to end as feature owner and requirements engineer, aligning stakeholders on business and technical constraints.',
        'Designed and implemented the UI in the absence of a dedicated design team.',
      ],
    },
  },
  /*{
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
  },*/
];
