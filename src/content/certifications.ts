import developerAssociate from '../assets/certifications/developer-associate.webp';

export type Certification = {
  name: string;
  badge: string;
  credentialUrl?: string;
  issued?: { month: string; year: string };
  expected?: string;
};

export const CERTIFICATIONS_TITLE = 'Certified on AWS,\nthree times and counting';
export const CERTIFICATIONS_INTRO =
  'I\'m passionate about cloud computing and invest in my continuous education. A "full stack" approach helps me build performant, scalable, and secure applications.';
export const CERTIFICATIONS_SOURCE_NOTES: string[] = [
  'Badges are fetched with lazy loading shortly before section is scrolled into view.',
  'A Lambda function on AWS fetches earned badges directly from Credly API.',
  'To prevent direct access to the function, the Lambda is registered as CloudFront origin and only accepts requests forwarded by its distribution.',
];

export const CREDLY_BADGE_COUNT = 3;

export const IN_PROGRESS_CERTIFICATION: Certification = {
  name: 'AWS Certified Developer – Associate',
  badge: developerAssociate,
  expected: 'December 2026',
};
