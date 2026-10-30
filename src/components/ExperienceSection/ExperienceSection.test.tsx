import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { JOBS } from '../../content/experience';
import { ExperienceSection } from './ExperienceSection';

describe('ExperienceSection', () => {
  beforeEach(() => render(<ExperienceSection />));

  it('lists every job with its role and dates', () => {
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(JOBS.length);
    expect(screen.getByText(JOBS[0]?.role ?? '')).toBeInTheDocument();
    expect(screen.getByText('Nov 2022 – Aug 2021')).toBeInTheDocument();
  });

  it('starts with every job collapsed', () => {
    document.querySelectorAll('details').forEach((job) => expect(job).not.toHaveAttribute('open'));
  });

  it('expands a job when its summary is clicked', async () => {
    const futurice = screen.getByRole('heading', { name: 'Futurice' });
    const job = futurice.closest('details');
    expect(job).not.toHaveAttribute('open');

    await userEvent.click(futurice);
    expect(job).toHaveAttribute('open');
  });

  it('writes up sonnen project by project, with a link to Tariffs', () => {
    const sonnen = within(
      screen
        .getByRole('heading', { name: JOBS[0]?.detail?.heading })
        .closest('details') as HTMLElement,
    );
    expect(sonnen.getAllByRole('heading', { level: 4 })).toHaveLength(5);
    expect(sonnen.getByText('Responsibilities common to all projects:')).toBeInTheDocument();
    const link = sonnen.getByRole('link', { name: 'Visit tariffs.sonnen.de, opens in a new tab' });
    expect(link).toHaveAttribute('href', 'https://tariffs.sonnen.de/');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('describes sonnen in a card with a link to its website', () => {
    const link = screen.getByRole('link', { name: 'Visit sonnen.de, opens in a new tab' });
    expect(link).toHaveAttribute('href', 'https://www.sonnen.de/');
    expect(link).toHaveAttribute('target', '_blank');
    expect(screen.getByText(JOBS[0]?.detail?.intro ?? '')).toBeInTheDocument();
  });

  it('sets key terms in bold in the Toolbox and Tariffs bullets only', () => {
    const bold = Array.from(document.querySelectorAll('li strong')).map((item) => item.textContent);
    expect(bold).toContain('microfrontends');
    expect(bold).toContain('GitHub Actions');
    expect(bold).toContain('B2B');
    expect(bold).toContain('B2C');

    document.querySelectorAll('li strong').forEach((item) => {
      expect(['Toolbox', 'Tariffs']).toContain(item.closest('section')?.getAttribute('aria-label'));
    });
  });

  it('gives Futurice and Aaron.ai a company card with a link to their website', () => {
    expect(
      screen.getByRole('link', { name: 'Visit futurice.com, opens in a new tab' }),
    ).toHaveAttribute('href', 'https://www.futurice.com/de');
    expect(
      screen.getByRole('link', { name: 'Visit aaron.ai, opens in a new tab' }),
    ).toHaveAttribute('href', 'https://www.aaron.ai/');
  });

  it('offers both resume versions under the jobs', () => {
    expect(screen.getByText('Download streamlined resume:')).toBeInTheDocument();
    for (const name of ['ATS format', 'Happy human eye']) {
      const link = screen.getByRole('link', { name });
      expect(link.getAttribute('href')).toMatch(/\.pdf$/);
      expect(link).toHaveAttribute('target', '_blank');
    }
  });
});
