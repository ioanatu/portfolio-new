import aaronLogo from '../assets/aaron-logo.png';
import futuriceLogo from '../assets/futurice-logo.jpg';
import sonnenLogo from '../assets/sonnen-logo.png';
import { CV_LINKS } from './navigation';

export type JobProject = {
  name: string;
  summary?: string;
  link?: { href: string; label: string };
  stack?: string;
  emphasized?: readonly string[];
  points: readonly string[];
};

export type JobDetail = {
  heading: string;
  logo: string;
  intro: string;
  website: { href: string; label: string };
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
  { label: 'For human reader', href: CV_LINKS[1].href },
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
        'sonnen is an energy company specialized in battery production and energy contracts. As of 29 October 2026, sonnen GmbH has filed for insolvency proceedings under self-administration.',
      projects: [
        {
          name: 'Tariffs',
          emphasized: ['microfrontends', 'GitHub Actions', 'B2B', 'B2C', 'atomic design'],
          summary: 'Purchase flow for new sonnen energy contracts.',
          link: { href: 'https://tariffs.sonnen.de/', label: 'tariffs.sonnen.de' },
          points: [
            'Customer-facing application built with React, TypeScript, Vite, GraphQL, ContextAPI, and a BFF approach.',
            'Bootstrapped project, implemented CI/CD pipeline with GitHub Actions, integrated Sentry, google Analytics, guided frontend architecture decisions.',
            'In addition to ongoing feature development, I ensured accessibility compliance with WCAG 2.1 AA standards, quality standards through 80% test coverage and performance optimization with Lighthouse audits.',
          ],
        },
        {
          name: 'Toolbox',
          emphasized: ['microfrontends', 'GitHub Actions', 'B2B', 'B2C', 'atomic design'],
          summary: 'Modern dashboard for sonnen partners.',
          points: [
            'B2B microfrontends application built with React, Typescript, Vite Module Federation and GraphQL, localization with i18n and POEditor, hosted in a monorepo, deployed to S3 environment buckets, served through CloudFront.',
            'Contributed to all phases of the project: microfrontend architecture research, tech stack selection based on business requirements and trade-offs, ADRs and documentation, CI/CD setup, AWS hosting, CloudFront configuration, MVP development and release.',
          ],
        },
        {
          name: 'Partner Portal',
          summary:
            'Sonnen partners application used for the battery commissioning process and post-sale support.',
          points: [
            'B2B application built with React, Redux, RxJS, SASS, webpack, REST API, deployed on GitLab.',
            'Legacy app where I developed new features and drove code refactorings to improve code quality and maintainability.',
          ],
        },
        {
          name: 'Web-ui',
          summary: 'Component library based on new design system after company rebranding.',
          points: [
            'Led tech stack research and selection, onboarded design team on atomic design methodology, and contributed to building the library from scratch.',
            'Advocated for the early adoption of accessibility standards.',
          ],
        },
      ],
      commonTitle: 'Responsibilities common to all projects:',
      commonPoints: [
        'Thorough code reviews focused on enhancing best practices, code base quality and domain knowledge transfer.',
        'Filled gaps caused by a fast-changing work environment: business requirements clarification, tickets writing, Refinements moderation.',
        'Fostered cross-team collaboration between designers, devs and QA.',
        'Onboarded new team members onto project ecosystem and introduced them to our coding and testing conventions, mentored junior team members on frontend best practices.',
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
        'Futurice is a consultancy company with Finnish roots and values that develops solutions for clients on the German and Scandinavian markets.',
      highlights: [
        'Acted as a consultant on several projects, working with clients across Europe and experiencing different cultures: Red Bull München on their website and with Royal Unibrew (Denmark) and Hartwall (Finland) on a B2B mobile application.',
        'Contributed to Dev Breakfast, an agency-wide knowledge-sharing series on clean code, TDD and scalability, and supported recruiting.',
        'Had first contact with accessibility, WCAG standards, ARIA and browser assistive tools, and started implementing them in projects.',
      ],
      projects: [
        {
          name: 'RedBull München website',
          summary: 'MVP website for ice hockey club Red Bull Munich.',
          link: { href: 'https://www.redbullmuenchen.de/de/', label: 'redbullmuenchen.de' },
          points: [
            'B2C app with React, TypeScript, Remix, Contentful for content management and a serverless backend on AWS.',
            'Built features for a server-side rendered frontend application with Remix and styled-components.',
          ],
        },
        {
          name: 'Mobile application for FC Byern and RedBull München',
          summary: '',
          points: [
            'Developed frontend features with React Native and TypeScript, collaborating closely with the UI/ UX designer team.',
          ],
        },
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
        'Aaron.ai was an AI phone assistant for doctors’ practices that answered calls and booked appointments, helping alleviate the administrative burden from medical assistants. In 2024 Aaron.ai was bought by Doctolib.',
      highlights: [
        'Owned features end-to-end as feature owner, developer and requirements engineer, aligning stakeholders on business and technical constraints.',
        'Designed and implemented UI elements in the absence of a dedicated design team.',
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
