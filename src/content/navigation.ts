import cvAts from '../assets/IoanaTatu_ATS_resume.pdf';
import cvHuman from '../assets/IoanaTatu_Human.pdf';

export type SectionNavItem = {
  label: string;
  sectionId: string;
};

export const SECTION_NAV_ITEMS: readonly SectionNavItem[] = [
  { label: 'Experience', sectionId: 'experience' },
  { label: 'Skills', sectionId: 'skills' },
  { label: 'Certifications', sectionId: 'certifications' },
  { label: 'Education', sectionId: 'education' },
  { label: 'Projects', sectionId: 'projects' },
];

export type PageNavItem = {
  label: string;
  to: '/design-archive';
};

export const PAGE_NAV_ITEMS: readonly PageNavItem[] = [
  { label: 'Design archive', to: '/design-archive' },
];

export const SECTION_IDS = SECTION_NAV_ITEMS.map(({ sectionId }) => sectionId);

export const CV_LINKS = [
  { label: 'ATS format', href: cvAts },
  { label: 'For human reader', href: cvHuman },
] as const;

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ioanatatu' },
  { label: 'GitHub', href: 'https://github.com/ioanatatu' },
  { label: 'Behance', href: 'https://behance.net/IoanaTatu' },
] as const;
