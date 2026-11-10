import cvAtsCondensed from '../assets/IoanaTatu_FrontendEngineer_ATS_1page.pdf';
import cvAts from '../assets/IoanaTatu_FrontendEngineer_ATS_2pages.pdf';
import cvHuman from '../assets/IoanaTatu_FrontendEngineer_Human.pdf';

export type SectionNavItem = {
  label: string;
  sectionId: string;
};

export const SECTION_NAV_ITEMS: readonly SectionNavItem[] = [
  { label: 'Experience', sectionId: 'experience' },
  { label: 'Recommendations', sectionId: 'recommendations' },
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

/** The Design archive stays out of the header and mobile menu for now. Set to true to bring it back. */
export const SHOW_PAGES_IN_HEADER = false;

export const HEADER_PAGE_NAV_ITEMS: readonly PageNavItem[] = SHOW_PAGES_IN_HEADER
  ? PAGE_NAV_ITEMS
  : [];

export const SECTION_IDS = SECTION_NAV_ITEMS.map(({ sectionId }) => sectionId);

export const CV_HREFS = {
  ats: cvAts,
  atsCondensed: cvAtsCondensed,
  human: cvHuman,
} as const;

export const CV_LINKS = [
  { label: 'ATS condensed', href: CV_HREFS.atsCondensed },
  { label: 'ATS two pages', href: CV_HREFS.ats },
  { label: 'For human reader', href: CV_HREFS.human },
] as const;

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ioanatatu' },
  { label: 'GitHub', href: 'https://github.com/ioanatatu' },
  { label: 'Behance', href: 'https://behance.net/IoanaTatu' },
] as const;
