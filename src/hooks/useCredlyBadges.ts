import { useQuery } from '@tanstack/react-query';
import type { Certification } from '../content/certifications';

type CredlyBadge = {
  id: string;
  issued_at_date: string;
  badge_template: { name: string; image_url: string };
};

type CredlyResponse = { data: CredlyBadge[] };

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** Splits Credly's `YYYY-MM-DD` by hand, so the date can't shift with the visitor's time zone. */
const toIssued = (date: string): Certification['issued'] => {
  const [year = '', month = ''] = date.split('-');
  return { month: MONTHS[Number(month) - 1] ?? '', year };
};

const fetchBadges = async (): Promise<Certification[]> => {
  const url = import.meta.env.VITE_CREDLY_API_URL?.trim();
  if (!url) throw new Error('VITE_CREDLY_API_URL is not set');

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Credly request failed: ${response.status}`);

  const { data }: CredlyResponse = await response.json();
  return [...data]
    .sort((a, b) => b.issued_at_date.localeCompare(a.issued_at_date))
    .map(({ id, issued_at_date, badge_template }) => ({
      name: badge_template.name,
      badge: badge_template.image_url,
      credentialUrl: `https://www.credly.com/badges/${id}/public_url`,
      issued: toIssued(issued_at_date),
    }));
};

export const useCredlyBadges = () =>
  useQuery({ queryKey: ['credly-badges'], queryFn: fetchBadges, staleTime: 60 * 60 * 1000 });
