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
  "I'm passionate about cloud computing and invest in my continuous education. I believe that understanding the platform your code runs on is essential to building performant, scalable, and secure applications.";
export const CERTIFICATIONS_SOURCE_NOTES: string[] = [
  'A Lambda function on aws fetches earned badges directly from the Credly API.',
  'The function has CORS enabled and is cached for one hour, so badges are not fetched on every page load.',
];
export const BADGE_SOURCE_TAG = 'Under the hood';
export const BADGE_SOURCE_STEPS: readonly { name: string; detail: string }[] = [
  { name: 'Browser', detail: 'Asks once an hour, cached by react-query' },
  { name: 'AWS Lambda', detail: 'Function URL in eu-central-1' },
  { name: 'Credly API', detail: 'Returns the accepted badges as JSON' },
];

export const CREDLY_BADGE_COUNT = 3;

export const IN_PROGRESS_CERTIFICATION: Certification = {
  name: 'AWS Certified Developer – Associate',
  badge: developerAssociate,
  expected: 'November 2026',
};
