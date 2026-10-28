import developerAssociate from '../assets/certifications/developer-associate.webp';

export type Certification = {
  name: string;
  badge: string;
  issued?: { month: string; year: string };
  expected?: string;
};

export const CERTIFICATIONS_TITLE = 'Certified on AWS, three times over';
export const CERTIFICATIONS_INTRO =
  'From cloud fundamentals to solution architecture and generative AI, so the frontends I build fit the platform they run on.';
export const CERTIFICATIONS_SOURCE_NOTE =
  'A Lambda function on aws is fetching the badges directly from the Credly API.';

export const CREDLY_BADGE_COUNT = 3;

export const IN_PROGRESS_CERTIFICATION: Certification = {
  name: 'AWS Certified Developer – Associate',
  badge: developerAssociate,
  expected: 'November 2026',
};
