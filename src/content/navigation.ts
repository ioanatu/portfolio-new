import cvAts from '../assets/IoanaTatu_ATS_resume.pdf';
import cvHuman from '../assets/IoanaTatu_Human.pdf';

export type SectionNavItem = {
  label: string;
  sectionId: string;
};

export const SECTION_NAV_ITEMS: readonly SectionNavItem[] = [
  { label: 'Certifications', sectionId: 'certifications' },
];

export const SECTION_IDS = SECTION_NAV_ITEMS.map(({ sectionId }) => sectionId);

export const CV_LINKS = [
  { label: 'ATS format', href: cvAts },
  { label: 'Human eye', href: cvHuman },
] as const;

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ioanatatu' },
  { label: 'GitHub', href: 'https://github.com/ioanatatu' },
  { label: 'Behance', href: 'https://behance.net/IoanaTatu' },
  { label: 'Design system', href: 'https://design-system.ioanatatu.com' },
] as const;
