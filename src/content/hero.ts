export const HERO_LINES = [
  'Hey there, I’m ioana —',
  'a Frontend Engineer with',
  'a designer eye, architect mind',
  'and a passion for product',
] as const;

export const HERO_HOT_WORD = /^(design|architect|product)/i;
export const HERO_NAME = /^ioana$/i;

export const HERO_LEDE =
  'Welcome to my new portfolio, where I showcase my knowledge and have fun building old-school and with AI. Browse around to see my experience, skills, and certifications.';

export const STATUS_TEXT = 'Open to new frontend roles';
export const STATUS_PLACES = ['Berlin', 'Paris', 'Remote'] as const;
export const STATUS_PLACES_LABEL = 'Berlin, Paris or remote';

export const STATS = [
  { value: 5, suffix: 'yrs', description: 'React and TypeScript in production' },
  { value: 3, suffix: 'AWS', description: 'Certifications, including Solutions Architect' },
  { value: 45, suffix: '%', description: 'Faster load times on a B2C purchase flow' },
  { value: 90, suffix: '%', description: 'Test coverage on a shared design-system library' },
] as const;

export const CLIENTS_TITLE = 'Teams and clients I’ve built for';
export const CLIENTS = [
  'sonnen',
  'Red Bull München',
  'Royal Unibrew',
  'Hartwall',
  'Futurice',
  'Aaron.ai',
] as const;
