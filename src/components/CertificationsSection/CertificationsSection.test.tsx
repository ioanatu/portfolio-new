import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, within } from '@testing-library/react';
import { CERTIFICATIONS_SOURCE_NOTES } from '../../content/certifications';
import { CertificationsSection } from './CertificationsSection';

const badge = (name: string, issued_at_date: string) => ({
  id: `id-${name}`,
  issued_at_date,
  badge_template: { name, image_url: `https://images.credly.com/${name}.png` },
});

const renderSection = () =>
  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <CertificationsSection />
    </QueryClientProvider>,
  );

describe('CertificationsSection', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_CREDLY_API_URL', 'https://credly.test/');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('shows skeletons while the badges load', () => {
    vi.stubGlobal('fetch', () => new Promise(() => {}));
    renderSection();

    expect(document.querySelectorAll('article[aria-hidden="true"]')).toHaveLength(3);
    expect(screen.getAllByRole('article')).toHaveLength(1);
  });

  it('renders the Credly badges newest first, with the date from the response', async () => {
    vi.stubGlobal('fetch', async () =>
      Response.json({
        data: [
          badge('AWS Certified Cloud Practitioner', '2021-10-24'),
          badge('AWS Certified AI Practitioner', '2026-09-30'),
        ],
      }),
    );
    renderSection();

    expect(await screen.findByText('AWS Certified AI Practitioner')).toBeInTheDocument();
    const names = screen
      .getAllByRole('article')
      .map((card) => within(card).getByRole('heading', { level: 3 }).textContent);
    expect(names).toEqual([
      'AWS Certified AI Practitioner',
      'AWS Certified Cloud Practitioner',
      'AWS Certified Developer – Associate',
    ]);
    expect(screen.getByText('September')).toBeInTheDocument();
    expect(screen.getByText('2021')).toBeInTheDocument();
  });

  it('links each earned badge to its Credly credential in a new tab', async () => {
    vi.stubGlobal('fetch', async () =>
      Response.json({ data: [badge('AWS Certified AI Practitioner', '2026-09-30')] }),
    );
    renderSection();

    const link = await screen.findByRole('link', {
      name: 'Show credential: AWS Certified AI Practitioner',
    });
    expect(link).toHaveAttribute(
      'href',
      'https://www.credly.com/badges/id-AWS Certified AI Practitioner/public_url',
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(screen.getAllByRole('link', { name: /Show credential/ })).toHaveLength(1);
  });

  it('keeps the in-progress certification with its local badge', async () => {
    vi.stubGlobal('fetch', async () => Response.json({ data: [] }));
    renderSection();

    expect(
      await screen.findByRole('article', {
        name: 'In progress: AWS Certified Developer – Associate, expected November 2026',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('Expected November 2026')).toBeInTheDocument();
  });

  it('explains where the badges come from in the source card', () => {
    vi.stubGlobal('fetch', () => new Promise(() => {}));
    renderSection();

    CERTIFICATIONS_SOURCE_NOTES.forEach((note) => {
      expect(screen.getByText(note)).toBeInTheDocument();
    });
  });

  it('reports a failed request', async () => {
    vi.stubGlobal('fetch', async () => new Response('', { status: 500 }));
    renderSection();

    expect(await screen.findByRole('alert')).toHaveTextContent('Could not load');
  });
});
