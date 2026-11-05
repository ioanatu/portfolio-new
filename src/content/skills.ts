export type SkillGroup = {
  label: string;
  title: string;
  description: string;
  skills: readonly string[];
  featured?: boolean;
};

export const SKILLS_TITLE = 'Skills & tech stack';
export const SKILLS_INTRO =
  'Technologies and stacks may change, but the fundamentals persist. I focus on the core concepts, and can adapt to new tools quickly.';

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    label: 'Core stack',
    title: 'TypeScript & React',
    description:
      'Five years of React & TS in production: B2B dashboards, B2C purchase flow and shared component libraries.',
    skills: [
      'TypeScript',
      'React',
      'TanStack Query',
      'Context API',
      'JavaScript ES6+',
      'Vite',
      'semantic HTML5',
      'Accessibility & ARIA',
      'CSS3',
    ],
    featured: true,
  },
  {
    label: 'State management',
    title: 'Client & server state',
    description: '',
    skills: ['Redux Toolkit', 'RTK Query', 'TanStack Query'],
  },
  {
    label: 'Architecture',
    title: 'Microfrontends',
    description: 'Contributed to research and delivery of a monorepo Module Federation setup.',
    skills: ['Module Federation', 'Monorepos', 'Vite'],
  },
  {
    label: 'UI platform',
    title: 'Design systems & accessibility',
    description: 'Led stack research for shared library, introduced team to atomic design.',
    skills: ['Accessibility', 'Lighthouse', 'Storybook', 'postcss', 'Figma', 'Atomic design'],
  },
  {
    label: 'Cloud',
    title: 'AWS & CI/CD',
    description:
      'Certified Solutions Architect. Implemented CI/CD pipeline supporting multiple environments.',
    skills: ['AWS', 'Lambda', 'S3', 'CloudFront', 'GitLab', 'GitHub Actions'],
  },
  {
    label: 'Data',
    title: 'GraphQL & APIs',
    description: '',
    skills: ['GraphQL', 'REST API', 'RxJS', 'Postman'],
  },
  {
    label: 'Quality',
    title: 'Testing & TDD',
    description: '',
    skills: ['Vitest', 'Jest', 'React Testing Library', 'Cypress'],
  },
];

export const AI_PANEL = {
  title: 'AI engineering',
  description:
    'I am educating myself on how to use AI in software engineering and am experimenting with different tools and workflows.',
  skillsTitle: 'AI-assisted development',
  skills: [
    'Claude Code',
    'Cursor',
    'GitHub Copilot',
    'WIP: Agentic workflows with review gates',
    'AI-assisted implementation, refactoring, test generation, and code review',
  ],
  coursesTitle: 'Udemy Courses I took',
  courses: [
    {
      name: 'AI Coder: Complete Claude Code & Coding Agents Course',
      credentialUrl: 'https://www.udemy.com/certificate/UC-a17f0bba-16fc-4655-9b1d-536ebc5c7c0c/',
    },
  ],
} as const;

export const MORE_SKILLS_TITLE = 'Occasional tools & frameworks';
export const MORE_SKILLS: readonly string[] = [
  'React Native',
  'Node.js',
  'Express',
  'Next.js',
  'Sass',
  'styled-components',
  'i18n',
  'GitLab CI',
  'MongoDB',
  'DynamoDB',
  'Sentry',
  'Google Analytics',
  'Contentful',
  'POEditor',
  'LaunchDarkly',
  'Firebase',
  'Figma',
];
