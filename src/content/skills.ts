export type SkillGroup = {
  label: string;
  title: string;
  description: string;
  skills: readonly string[];
  featured?: boolean;
};

export const SKILLS_TITLE = 'Skills & tech stack';
export const SKILLS_INTRO = '';
// 'Technologies and stacks may change, but the fundamentals persist. I focus on the core concepts, and can adapt to new tools quickly.';

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    label: 'Core stack',
    title: 'TypeScript & React',
    description:
      'Five years of production React & TS: B2B dashboards, B2C purchase flow and a shared component library.',
    skills: [
      'TypeScript',
      'React',
      'TanStack Query',
      'Context API',
      'GraphQL',
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
    label: 'Cloud and Backend',
    title: 'AWS & CI/CD',
    description:
      'Certified Solutions Architect. Implemented CI/CD pipeline supporting multiple environments.',
    skills: ['AWS', 'Lambda', 'S3', 'CloudFront', 'GitLab', 'GitHub Actions', 'Node.js', 'Nest.js'],
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
  skillsTitle: 'AI-assisted development & agentic workflows',
  skills: [
    'Claude Code',
    'Cursor',
    'GitHub Copilot',
    'AI-assisted refactoring, test generation, code review',
    'WIP: Agentic workflows with review gates',
  ],
  coursesTitle: 'Udemy Courses I took',
  courses: [
    {
      name: 'AI Coder: Complete Claude Code & Coding Agents Course',
      credentialUrl: 'https://www.udemy.com/certificate/UC-a17f0bba-16fc-4655-9b1d-536ebc5c7c0c/',
    },
    {
      name: 'Claude Code - The Practical Guide',
      credentialUrl: 'https://www.udemy.com/certificate/UC-ab23f4cc-8313-43fb-813f-34f857e444fc/',
    },
  ],
} as const;

export const MORE_SKILLS_TITLE = 'Occasional tools & frameworks';
export const MORE_SKILLS: readonly string[] = [
  'Node.js',
  'Express',
  'NestJS',
  'MongoDB',
  'DynamoDB',
  'React Native',
  'Next.js',
  'Sass',
  'styled-components',
  'i18n',
  'GitLab CI',
  'Sentry',
  'Google Analytics',
  'Contentful',
  'POEditor',
  'LaunchDarkly',
  'Firebase',
  'Figma',
];
